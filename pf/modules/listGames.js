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
	console.log("Creating Game objects for:", rawGames.length, "games");

	return await Promise.all(
		rawGames.map(async (g) => {
			const ach = await getPlayerAchievements(steamId, g.appid);
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

// Built-in pagination: page (1-based), pageSize
/*
export async function getGames(steamId, gamesUrl, page, pageSize = 10) {
	try {
		const response = await fetch(`${gamesUrl}&steamid=${steamId}`);
		const data = await response.json();
		console.log("Raw API data:", data); // <--- Add this line

		const rawGames = data.response.games || [];
		const totalGames = rawGames.length;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		console.log("page:", page, "pageSize:", pageSize);
		const pagedGames = rawGames.slice(start, end);
		const games = await createGamesFromRaw(pagedGames, steamId);
		return {
			games,
			totalGames,
			page,
			pageSize,
			totalPages: Math.ceil(totalGames / pageSize),
		};
	} catch (error) {
		console.error("Error fetching games:", error);
		return {
			games: [],
			totalGames: 0,
			page,
			pageSize,
			totalPages: 0,
		};
	}
}*/

export async function fetchAllGames(steamId, gamesUrl) {
	try {
		const response = await fetch(`${gamesUrl}&steamid=${steamId}`);
		const data = await response.json();
		const rawGames = data.response.games || [];
		const games = await createGamesFromRaw(rawGames, steamId);
		console.log("All games fetched and cached:", games);
		return games;
	} catch (error) {
		console.error("Error fetching all games:", error);
		return [];
	}
}

async function getPlayerAchievements(steamId, appId) {
	try {
		const response = await fetch(
			`http://localhost:8080/http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}&appid=${appId}`
		);
		if (!response.ok) {
			// 400 likely means no achievements or not owned/private
			return { ach_owned: 0, ach_total: 0 };
		}
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
