// =========================
// Game Class
// =========================
export class Game {
	constructor(id, title, img, playtime, ach_onwed = 0, ach_total = 0) {
		this.id = id;
		this.title = title;
		this.img = img;
		this.playtime = playtime;
		this.ach_onwed = ach_onwed;
		this.ach_total = ach_total;
	}
}

// =========================
// Fetch All Games (Basic Info)
// =========================
export async function fetchAllGames(steamId, gamesUrl) {
	try {
		const response = await fetch(`${gamesUrl}&steamid=${steamId}`);
		const data = await response.json();
		const rawGames = data.response.games || [];
		return rawGames.map(
			(g) =>
				new Game(
					g.appid,
					g.name,
					`https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
					g.playtime_forever
				)
		);
	} catch (error) {
		console.error("Error fetching games:", error);
		return [];
	}
}

// =========================
// Add Achievements to Games (Current Page)
// =========================
export async function addAchievementsToGames(games, steamId) {
	return await Promise.all(
		games.map(async (game) => {
			const ach = await getPlayerAchievements(steamId, game.id);
			game.ach_onwed = ach.ach_owned;
			game.ach_total = ach.ach_total;
			return game;
		})
	);
}

// =========================
// Fetch Achievements for a Single Game
// =========================
export async function getPlayerAchievements(steamId, appId) {
	try {
		const url = `http://localhost:8080/http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}&appid=${appId}`;
		const response = await fetch(url);
		const data = await response.json();
		const achs = data.playerstats?.achievements || [];
		const ach_owned = achs.filter((a) => a.achieved).length;
		const ach_total = achs.length;
		return { ach_owned, ach_total };
	} catch (error) {
		console.error("Error fetching achievements:", error);
		return { ach_owned: 0, ach_total: 0 };
	}
}
