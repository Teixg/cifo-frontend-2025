// =========================
// Fetch User Data from Steam API
// =========================
export async function getUserData(steamId) {
	try {
		const url = `http://localhost:8080/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=${steamId}`;
		const response = await fetch(url);
		const data = await response.json();
		return data.response.players[0] || null;
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
}
