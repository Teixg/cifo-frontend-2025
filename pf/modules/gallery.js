//Variables
const idUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`;
const gamesUrl = `https://corsproxy.io/?url=http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9E43E82E45266C37789162D8E0B27D25&format=json&include_appinfo=1`;
const iconH = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg>`;
const iconA = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill " viewBox="0 0 16 16">
  <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z"/>
</svg>`;
let currentPage = 1;
const itemsPerPage = 10;
let gamesList;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let steamId;
//
function getSteamIdFromUrl() {
	const urlParams = new URLSearchParams(window.location.search);
	steamId = urlParams.get("steamid");
}

document.addEventListener("DOMContentLoaded", async () => {
	getSteamIdFromUrl();
	if (!steamId) {
		document.getElementById("gallery").innerText =
			"No SteamID provided in URL.";
		return;
	}

	console.log("SteamID from URL:", steamId);

	// Mostrar datos del usuario
	const userData = await getUserData(steamId);
	if (userData) {
		document.getElementById("userInfo").innerHTML = `
      <div class="info"><h2>${userData.personaname}</h2>
		<p>Steam Id: ${steamId}
		<p>Last Online: ${new Date(userData.lastlogoff * 1000).toLocaleString()}</p>
		 </div>
    	<img src="${userData.avatarfull}" alt="Avatar" />

    `;
	}
	await displayGames();
});

async function displayGames() {
	// Mostrar juegos del usuario
	const games = await getGames(steamId);
	if (games.length > 0) {
		document.getElementById("gallery").innerHTML = "";
		let gamesGrid = `
    <h2>Owned Games</h2>
    <div class="games-grid">
 	`;

		games.forEach((game) => {
			gamesGrid += `
      <div class="game-card">
        <img src="${game.img}" alt="${game.title} header">
        <h3>${game.title}</h3>
        <p>${iconH}: ${Math.round(game.playtime / 60)}h</p>
        <p>${iconA}: ${game.ach_onwed}/${game.ach_total}</p>
      </div>
    `;
		});

		gamesGrid += `</div>`;
		document.getElementById("gallery").innerHTML += gamesGrid;
	} else {
		document.getElementById("gallery").innerHTML += "<p>No games found.</p>";
	}
}

async function getUserData(steamId) {
	try {
		const response = await fetch(idUrl + steamId);
		const data = await response.json();
		return data.response.players[0] || null;
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
}

async function getGames(steamId) {
	try {
		if (!gamesList) {
			const response = await fetch(`${gamesUrl}&steamid=${steamId}`);
			const data = await response.json();
			const rawGames = data.response.games || [];
			gamesList = rawGames;
		}
		const gamesPagination = gamesList.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		);
		// Transformamos cada entrada en un objeto Game
		const games = await Promise.all(
			gamesPagination.map(async (g) => {
				const ach = await GetPlayerAchievements(steamId, g.appid);
				console.log(ach);
				return new Game(
					g.appid,
					g.name,
					`https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
					g.playtime_forever,
					ach.ach_owned,
					ach.ach_total
				);
			})
		);
		return games;
	} catch (error) {
		console.error("Error fetching games:", error);
		return [];
	}
}

async function GetPlayerAchievements(steamId, appId) {
	try {
		const response = await fetch(
			`https://corsproxy.io/?url=http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}&appid=${appId}`
		);
		const data = await response.json();
		// Si no hay playerstats o achievements, devolvemos 0
		if (!data.playerstats || !data.playerstats.achievements) {
			return { ach_owned: 0, ach_total: 0 };
		}

		const achievements = data.playerstats.achievements;
		const ach_owned = achievements.filter((a) => a.achieved === 1).length;
		const ach_total = achievements.length;

		return { ach_owned, ach_total };
	} catch (error) {
		console.error("Error fetching achievements:", error);
		return { ach_owned: 0, ach_total: 0 };
	}
}

prevBtn.addEventListener("click", async () => {
	if (currentPage > 1) {
		currentPage--;
		await displayGames();
	}
});

nextBtn.addEventListener("click", async () => {
	if (currentPage * itemsPerPage < gamesList.length) {
		currentPage++;
		await displayGames();
	}
});

class Game {
	constructor(id, title, img, playtime, ach_onwed, ach_total) {
		this.id = id;
		this.title = title;
		this.img = img;
		this.playtime = playtime;
		this.ach_onwed = ach_onwed;
		this.ach_total = ach_total;
	}
}
