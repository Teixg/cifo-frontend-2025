// =========================
// Pagination State Variables
// =========================
export let currentPage = 1;
export let totalPages = 1;
export let pageSize = 10;

// =========================
// Pagination Setters
// =========================
export function setCurrentPage(page) {
	currentPage = page;
}
export function setPageSize(size) {
	pageSize = size;
}
export function setTotalPages(pages) {
	totalPages = pages;
}

// =========================
// Render Pagination Controls
// =========================
export function renderPaginationControls({
	displayGames,
	steamId,
	gamesUrl,
	fetchAllGames,
	iconH,
	iconA,
}) {
	const controls = document.getElementById("pagination-controls");
	if (!controls) return;

	controls.innerHTML = "";

	// Previous button
	const prevBtn = document.createElement("button");
	prevBtn.textContent = "Previous";
	prevBtn.disabled = currentPage === 1;
	prevBtn.onclick = () => {
		if (currentPage > 1) {
			currentPage--;
			displayGames({ steamId, gamesUrl, fetchAllGames, iconH, iconA });
		}
	};
	controls.appendChild(prevBtn);

	// Page selector
	const pageSelect = document.createElement("select");
	pageSelect.className = "mx-2";
	for (let i = 1; i <= totalPages; i++) {
		const option = document.createElement("option");
		option.value = i;
		option.textContent = `Page ${i}`;
		if (i === currentPage) option.selected = true;
		pageSelect.appendChild(option);
	}
	pageSelect.onchange = function () {
		currentPage = parseInt(this.value, 10);
		displayGames({ steamId, gamesUrl, fetchAllGames, iconH, iconA });
	};
	controls.appendChild(pageSelect);

	// Page info
	const pageInfo = document.createElement("span");
	pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
	controls.appendChild(pageInfo);

	// Next button
	const nextBtn = document.createElement("button");
	nextBtn.textContent = "Next";
	nextBtn.disabled = currentPage === totalPages;
	nextBtn.onclick = () => {
		if (currentPage < totalPages) {
			currentPage++;
			displayGames({ steamId, gamesUrl, fetchAllGames, iconH, iconA });
		}
	};
	controls.appendChild(nextBtn);
}
