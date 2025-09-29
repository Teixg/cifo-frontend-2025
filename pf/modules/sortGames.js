export function sortGames(games, sortType = "ach") {
	const sorted = [...games];
	if (sortType === "alpha") {
		sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
	} else if (sortType === "time") {
		sorted.sort(
			(a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0)
		);
	}
	return sorted;
}
