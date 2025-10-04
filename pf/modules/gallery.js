//------------------Imports--------------------
import { getUserData } from "./userData.js";
import { fetchAllGames, addAchievementsToGames } from "./listGames.js";
import {
	currentPage,
	setCurrentPage,
	setPageSize,
	setTotalPages,
	renderPaginationControls,
} from "./pagination.js";
import { sortGames } from "./sortGames.js";

//-----------------Variables--------------------
// Steam API URL for fetching owned games
const gamesUrl = `http://localhost:8080/http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9E43E82E45266C37789162D8E0B27D25&format=json&include_appinfo=1`;

// SVG icons for hours and achievements
const iconH = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg>`;
const iconA = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill " viewBox="0 0 16 16">
  <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z"/>
</svg>`;
let steamId;
let allGames = [];
let sortType = "alpha";
//----------------------------------------------
// Helper to extract SteamID from URL
function getSteamIdFromUrl() {
	const urlParams = new URLSearchParams(window.location.search);
	steamId = urlParams.get("steamid");
}

// Set initial page size based on screen width
if (window.innerWidth <= 600) {
	setPageSize(10); // Mobile: 10 games per page
} else {
	setPageSize(20); // Desktop/tablet: 20 games per page
}
document.addEventListener("DOMContentLoaded", () => {
	const pageSizeSelect = document.getElementById("pageSize");
	if (pageSizeSelect) {
		const initial = window.innerWidth <= 600 ? 10 : 20;
		pageSizeSelect.value = initial;
		pageSizeSelect.addEventListener("change", function () {
			setCurrentPage(1);
			displayGames({ steamId });
		});
	}

	const sortSelect = document.getElementById("sortType");
	if (sortSelect) sortSelect.value = "alpha";
	if (sortSelect) {
		sortSelect.addEventListener("change", function () {
			sortType = this.value;
			setCurrentPage(1);
			displayGames({ steamId });
		});
	}
});

// Main entry point: runs when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
	getSteamIdFromUrl();
	if (!steamId) {
		// If no SteamID, show error and stop
		document.getElementById("gallery").innerText =
			"No SteamID provided in URL.";
		return;
	}

	// Fetch and display user info
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

	// Fetch and display games for the user (first page)
	await displayGames({ steamId });
});

// Main function to fetch and render games for the current page
async function displayGames({ steamId }) {
	const loader = document.getElementById("loader");
	const gallery = document.getElementById("gallery");
	const template = document.getElementById("game-card-template");

	if (loader) loader.style.display = "flex";
	if (gallery) gallery.style.display = "none";

	// Fetch all games if not already loaded
	if (!allGames.length) {
		allGames = await fetchAllGames(steamId, gamesUrl); // Basic info only
	}

	const pageSizeSelect = document.getElementById("pageSize");
	const pageSize = pageSizeSelect ? parseInt(pageSizeSelect.value, 10) : 10;

	const sortedGames = sortGames(allGames, sortType);
	const start = (currentPage - 1) * pageSize;
	const end = start + pageSize;
	let pageGames = sortedGames.slice(start, end);

	// Fetch achievements only for games on this page
	pageGames = await addAchievementsToGames(pageGames, steamId);

	setTotalPages(Math.ceil(sortedGames.length / pageSize));
	gallery.innerHTML = "";

	if (pageGames.length > 0) {
		const gamesGrid = document.createElement("div");
		gamesGrid.className = "games-grid";

		pageGames.forEach((game) => {
			const clone = template.content.cloneNode(true);

			const link = clone.querySelector(".game-card-link");
			link.href = `game.html?appid=${game.id}&steamid=${steamId}`;

			const card = clone.querySelector(".game-card");
			if (game.ach_onwed === game.ach_total && game.ach_total > 0) {
				card.classList.add("completed");
			}

			const img = clone.querySelector(".game-img");
			img.src = game.img;
			img.alt = `${game.title} header`;

			const title = clone.querySelector(".game-title");
			title.textContent = game.title;

			const stats = clone.querySelector(".stats");
			stats.innerHTML = `
                <p>${iconH}: ${Math.round((game.playtime || 0) / 60)}h</p>
                <p>${iconA}: ${game.ach_onwed ?? 0}/${game.ach_total ?? 0}</p>
            `;

			gamesGrid.appendChild(clone);
		});
		gallery.appendChild(gamesGrid);
	} else {
		gallery.innerHTML = "<p>No games found.</p>";
	}

	if (loader) loader.style.display = "none";
	if (gallery) gallery.style.display = "";

	renderPaginationControls({
		displayGames: () => displayGames({ steamId }),
		steamId,
		gamesUrl,
		fetchAllGames,
		iconH,
		iconA,
	});
}
