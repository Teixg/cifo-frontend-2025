export function sortGames(games, sortType = "alpha") {
	const sorted = [...games];
	if (sortType === "alpha") {
		sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
	} else if (sortType === "time") {
		sorted.sort((a, b) => (b.playtime || 0) - (a.playtime || 0));
	}
	return sorted;
}
