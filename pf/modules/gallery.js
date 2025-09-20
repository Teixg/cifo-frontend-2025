const idUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`;
const gamesUrl = `https://corsproxy.io/?url=http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9E43E82E45266C37789162D8E0B27D25&format=json&include_appinfo=1`;

document.addEventListener("DOMContentLoaded", async () => {
	const steamId = getSteamIdFromUrl();
	if (!steamId) {
		document.getElementById("gallery").innerText =
			"No SteamID provided in URL.";
		return;
	}

	console.log("SteamID from URL:", steamId);

	// Mostrar datos del usuario
	const userData = await getUserData(steamId);
	if (userData) {
		document.getElementById("gallery").innerHTML = `
      <h2>${userData.personaname}</h2>
      <img src="${userData.avatarfull}" alt="Avatar" />
    `;
	}

	// Mostrar juegos del usuario
	const games = await getGames(steamId);

	if (games.length > 0) {
		let gamesGrid = `
    <h2>Owned Games</h2>
    <div class="games-grid">
  `;

		games.forEach((game) => {
			gamesGrid += `
      <div class="game-card">
        <img src="${game.img}" alt="${game.title} header">
        <h3>${game.title}</h3>
        <p>Playtime: ${Math.round(game.playtime / 60)}h</p>
        <p>Achievements: ${game.ach_owned}/${game.ach_total}</p>
      </div>
    `;
		});

		gamesGrid += `</div>`;
		document.getElementById("gallery").innerHTML += gamesGrid;
	} else {
		document.getElementById("gallery").innerHTML += "<p>No games found.</p>";
	}
});
function getSteamIdFromUrl() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("steamid");
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
		const response = await fetch(`${gamesUrl}&steamid=${steamId}`);
		const data = await response.json();
		const rawGames = data.response.games || [];

		// Transformamos cada entrada en un objeto Game
		const games = rawGames.map((g) => {
			return new Game(
				g.appid,
				g.name,
				`https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
				g.playtime_forever
			);
		});
		console.log("Fetched games:", games);
		return games;
	} catch (error) {
		console.error("Error fetching games:", error);
		return [];
	}
}

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
