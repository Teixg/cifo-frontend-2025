const idUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`;

export async function getUserData(steamId) {
	try {
		const response = await fetch(idUrl + steamId);
		const data = await response.json();
		return data.response.players[0] || null;
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
}
