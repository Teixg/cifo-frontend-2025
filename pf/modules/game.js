// =========================
// Imports
// =========================
import { getUserData } from "./userData.js";
import { fetchAllGames } from "./listGames.js";
import { showError } from "./errorHandler.js";
// =========================
// Constants & API Endpoints
// =========================
const urlParams = new URLSearchParams(window.location.search);
const steamId = urlParams.get("steamid");
const appId = urlParams.get("appid");
const gamesUrl = `http://localhost:8080/http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9E43E82E45266C37789162D8E0B27D25&format=json&include_appinfo=1`;

// =========================
// API Fetch Functions
// =========================
async function fetchGameDetails(appId, steamId) {
	const gameDetailsUrl = `http://localhost:8080/http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}`;
	try {
		const response = await fetch(gameDetailsUrl);
		if (!response.ok) {
			// Show a styled error if the API returns an error
			showError("game-container", {
				message: "Game stats not available.",
				detail:
					"This game may not support achievements or your profile may be private.",
				timeout: 0,
			});
			return null;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching game details:", error);
		showError("game-container", {
			message: "Error fetching game details.",
			detail: "Please check your connection or try again later.",
			timeout: 0,
		});
		return null;
	}
}

async function fetchAchievements(appId) {
	const achievementsUrl = `http://localhost:8080/http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?appid=${appId}&key=9E43E82E45266C37789162D8E0B27D25&format=json`;
	try {
		const response = await fetch(achievementsUrl);
		const data = await response.json();
		if (
			data.game &&
			data.game.availableGameStats &&
			data.game.availableGameStats.achievements
		) {
			return data.game.availableGameStats.achievements;
		}
		return [];
	} catch (error) {
		console.error("Error fetching achievements:", error);
		return [];
	}
}

// =========================
// Achievement Helpers
// =========================
function orderByUnlocked(achievements, playerAchievements) {
	const unlocked = [];
	const locked = [];
	achievements.forEach((ach) => {
		const playerAch = playerAchievements.find((a) => a.name === ach.name);
		if (playerAch && playerAch.achieved > 0) {
			unlocked.push(ach);
		} else {
			locked.push(ach);
		}
	});
	return [...unlocked, ...locked];
}

function isAchievementUnlocked(ach, details) {
	const playerAchievements = details.playerstats.achievements ?? [];
	return !!playerAchievements.find(
		(a) => a.name === ach.name && a.achieved > 0
	);
}

// =========================
// DOM Rendering Functions
// =========================
function displayGameDetails(details, achievements, gameStats) {
	console.log("Game Details:", details);
	console.log("Achievements:", achievements);
	console.log("Game Stats:", gameStats);
	const gameContainer = document.getElementById("game-container");
	const gameTemplate = document.getElementById("game-details-template");
	const achTemplate = document.getElementById("achievement-template");

	if (!details || !details.playerstats) {
		showError(gameContainer, {
			message: "Game details not available",
			detail: "Please check your Steam ID or try again later",
		});
		return;
	}

	const gameName = details.playerstats.gameName || "Unknown Game";
	const headerImg = `https://cdn.akamai.steamstatic.com/steam/apps/${gameStats.id}/logo.png`;
	const description = details.short_description || "";

	const clone = gameTemplate.content.cloneNode(true);

	const imgElem = clone.querySelector(".game-header-img");
	if (headerImg) {
		imgElem.src = headerImg;
		imgElem.alt = `${gameName} header`;
		imgElem.style.display = "";
	}
	clone.querySelector(".game-description").textContent = description;

	// --- Stats block ---
	const statsDiv = clone.querySelector("#game-stats");
	if (statsDiv && gameStats) {
		const playtime = gameStats ? Math.round((gameStats.playtime || 0) / 60) : 0;
		const lastPlayed =
			gameStats && gameStats.rtime_last_played
				? new Date(gameStats.rtime_last_played * 1000).toLocaleString()
				: "Never";
		const timePlayed2Weeks = gameStats
			? Math.round((gameStats.playtime_2weeks || 0) / 60)
			: 0;

		statsDiv.innerHTML = `
            <p><strong>Time played in this game:</strong> ${playtime} hours</p>
            <p><strong>Last played:</strong> ${lastPlayed}</p>
            <p><strong>Time played in the last 2 weeks:</strong> ${timePlayed2Weeks} hours</p>
        `;
	}

	const achievementsList = clone.querySelector(".achievements-list");
	const orderedAchievements = orderByUnlocked(
		achievements,
		details.playerstats.achievements ?? []
	);

	orderedAchievements.forEach((ach) => {
		const achClone = achTemplate.content.cloneNode(true);
		const iconElem = achClone.querySelector(".achievement-icon");
		iconElem.src = isAchievementUnlocked(ach, details)
			? ach.icon
			: ach.icongray;
		iconElem.alt = `${ach.displayName} icon`;

		achClone.querySelector(".achievement-title").textContent = ach.displayName;
		achClone.querySelector(".achievement-desc").textContent =
			ach.description || "";

		achievementsList.appendChild(achClone);
	});

	gameContainer.innerHTML = "";
	gameContainer.appendChild(clone);
}

// =========================
// Main Async Function
// =========================
async function main() {
	// Fetch user info
	const user = await getUserData(steamId);
	if (user) {
		const userDiv = document.getElementById("userInfo");
		userDiv.innerHTML = `
            <div class="info">
                <img src="${user.avatarfull}" alt="Avatar" />
                <h2>${user.personaname}</h2>
                <p>Steam Id: ${user.steamid}</p>
                <p>Last Online: ${new Date(
									user.lastlogoff * 1000
								).toLocaleString()}</p>
            </div>
        `;
	}

	// Fetch all games (basic info only, one fetch for all stats)
	const games = await fetchAllGames(steamId, gamesUrl);
	const gameStats = games.find((g) => g.id == appId);

	// Fetch game details and achievements
	const details = await fetchGameDetails(appId, steamId);
	const achievements = await fetchAchievements(appId);

	displayGameDetails(details, achievements, gameStats);
}

main();

// =========================
// Navigation & Scroll Buttons
// =========================
document.getElementById("back-to-gallery").addEventListener("click", () => {
	// Go back to gallery.html, preserving steamid in URL
	const steamId = new URLSearchParams(window.location.search).get("steamid");
	window.location.href = `gallery.html?steamid=${steamId}`;
});

window.addEventListener("scroll", () => {
	const scrollBtn = document.getElementById("scroll-to-top");
	if (window.scrollY > 200) {
		scrollBtn.style.display = "block";
	} else {
		scrollBtn.style.display = "none";
	}
});

document.getElementById("scroll-to-top").addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});
