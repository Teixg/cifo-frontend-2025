export class Game {
	constructor(id, title, img, playtime, ach_onwed, ach_total) {
		this.id = id;
		this.title = title;
		this.img = img;
		this.playtime = playtime;
		this.ach_onwed = ach_onwed;
		this.ach_total = ach_total;
	}
}

// Helper to convert raw API data to Game instances
export async function createGamesFromRaw(rawGames, steamId) {
	return await Promise.all(
		rawGames.map(async (g) => {
			const ach = await GetPlayerAchievements(steamId, g.appid);
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
}

export async function getGames(steamId, gamesUrl) {
	try {
		const response = await fetch(`${gamesUrl}&steamid=${steamId}`);
		const data = await response.json();
		const rawGames = data.response.games || [];
		return await createGamesFromRaw(rawGames, steamId);
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
