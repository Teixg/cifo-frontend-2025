const bt1 = document.getElementById("fecth1");
const idUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`;
const vanityUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=9E43E82E45266C37789162D8E0B27D25&vanityurl=`;

// Event listener for the button click
bt1.addEventListener("click", async () => {
	let steamId = document.getElementById("steamId").value;
	const userData = await getUserData(steamId);
	steamId = userData.steamid; // Fallback to input if not found
	if (userData) {
		window.location.href = `gallery.html?steamid=${steamId}`;
		console.log("Redirecting to gallery with SteamID:", steamId);
	} else {
		document.getElementById("response").innerText = "No player data found.";
	}
});

// Function to fetch user data from Steam API
async function getUserData(steamId) {
	try {
		const response = await fetch(vanityUrl + steamId);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		if (data.response.success === 1) {
			steamId = data.response.steamid;
		}
		const userResponse = await fetch(idUrl + steamId);
		const userData = await userResponse.json();

		return userData.response.players[0] || null;
	} catch (error) {
		console.error("Error fetching data:", error);
		document.getElementById("response").innerText =
			"Error fetching data. Please check the console for details.";
	}
}
