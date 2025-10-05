import { showError } from "./modules/errorHandler.js";

// =========================
// Constants & API Endpoints
// =========================
const bt1 = document.getElementById("fecth1");
const idUrl = `http://localhost:8080/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`;
const vanityUrl = `http://localhost:8080/http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=9E43E82E45266C37789162D8E0B27D25&vanityurl=`;

// =========================
// Event Listeners
// =========================
bt1.addEventListener("click", async () => {
	let steamId = document.getElementById("steamId").value;
	const userData = await getUserData(steamId);
	console.log("Fetched User Data:", userData);
	if (userData) {
		window.location.href = `gallery.html?steamid=${userData.steamid}`;
	} else {
		showError("response", {
			message: "No player data found.",
			detail: "Please check your Steam ID and try again.",
		});
	}
});

// =========================
// API Functions
// =========================
async function getUserData(steamIdOrVanity) {
	try {
		// First, resolve vanity URL to SteamID64
		const response = await fetch(vanityUrl + steamIdOrVanity);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		let steamId = steamIdOrVanity;
		if (data.response.success === 1) {
			steamId = data.response.steamid;
		}
		const userResponse = await fetch(idUrl + steamId);
		const userData = await userResponse.json();

		// Attach steamId to userData for easy access
		const player = userData.response.players[0] || null;
		if (player) player.steamid = steamId;
		return player;
	} catch (error) {
		console.error("Error fetching data:", error);
		document.getElementById("response").innerText =
			"Error fetching data. Please check the console for details.";
	}
}
