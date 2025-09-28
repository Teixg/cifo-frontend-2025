export function sortGames(games, sortType = "ach") {
	const sorted = [...games];
	if (sortType === "ach") {
		sorted.sort((a, b) => {
			const aPerc = a.ach_total > 0 ? a.ach_onwed / a.ach_total : 0;
			const bPerc = b.ach_total > 0 ? b.ach_onwed / b.ach_total : 0;
			return bPerc - aPerc;
		});
	} else if (sortType === "alpha") {
		sorted.sort((a, b) => a.title.localeCompare(b.title));
	} else if (sortType === "time") {
		sorted.sort((a, b) => b.playtime - a.playtime);
	}
	return sorted;
}
