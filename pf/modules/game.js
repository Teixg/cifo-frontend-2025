// Get steam id and app id from url
const urlParams = new URLSearchParams(window.location.search);
const steamId = urlParams.get("steamid");
const appId = urlParams.get("gameid");
console.log(steamId, appId);

// Fetch game details from Steam API
async function fetchGameDetails(appId, steamId) {
	const gameDetailsUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}`;
	try {
		const response = await fetch(gameDetailsUrl);
		const data = await response.json();
		console.log("Game details:", data);
		return data;
	} catch (error) {
		console.error("Error fetching game details:", error);
		return null;
	}
}

// Fetch achievements
async function fetchAchievements(appId) {
	const achievementsUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?appid=${appId}&key=9E43E82E45266C37789162D8E0B27D25&format=json`;
	try {
		const response = await fetch(achievementsUrl);
		const data = await response.json();
		if (
			data.game &&
			data.game.availableGameStats &&
			data.game.availableGameStats.achievements
		) {
			console.log("Achievements:", data);
			return data.game.availableGameStats.achievements;
		}
		return [];
	} catch (error) {
		console.error("Error fetching achievements:", error);
		return [];
	}
}

// Order achievements: unlocked first, then locked
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

// function to  se if achievement is unlocked
function isAchievementUnlocked(ach, details) {
	if (
		details.playerstats.achievements.find(
			(a) => a.name === ach.name && a.achieved > 0
		)
	) {
		return true;
	} else {
		return false;
	}
}

// Display game details in the DOM
function displayGameDetails(details, achievements) {
	const gameContainer = document.getElementById("game-container");
	achievements = orderByUnlocked(
		achievements,
		details.playerstats.achievements
	);
	if (!details || !details.playerstats) {
		gameContainer.innerHTML = "<p>Game details not available.</p>";
		return;
	}
	const gameName = details.playerstats.gameName || "Unknown Game";
	const headerImg = details.header_image || ""; // You may need to fetch this from another endpoint
	const description = details.short_description || ""; // You may need to fetch this from another endpoint

	gameContainer.innerHTML = `
        <h1>${gameName}</h1>
        ${
					headerImg ? `<img src="${headerImg}" alt="${gameName} header" />` : ""
				}
        <p>${description}</p>
        <h2>Achievements</h2>
        <ul>
            ${achievements
							.map(
								(ach) =>
									`<li><img src="${
										isAchievementUnlocked(ach, details)
											? ach.icon
											: ach.icongray
									}" alt="${ach.displayName} icon" /> <p><strong>${
										ach.displayName
									}</strong>: ${ach.description}<p></li>`
							)
							.join("")}</ul>`;
}

// Main async function to coordinate everything
async function main() {
	const details = await fetchGameDetails(appId, steamId);
	const achievements = await fetchAchievements(appId);
	const gameInfo = { details, achievements };
	displayGameDetails(gameInfo.details, gameInfo.achievements);
}

// Run main
main();
