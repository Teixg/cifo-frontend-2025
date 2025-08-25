/* Task 1 --------------------------------------------------------------------------------------- */

/* This is a line with exactly 100 characters --------------------------------------------------- */

/**
 * The question about the DOM:
 * El DOM és una interfície de programació per a documents HTML i XML que representa el document
 * com un conjunt de nodes i objectes amb propietats i mètodes. Permet als programes accedir i
 * modificar l’estructura, l’estil i el contingut, connectant les pàgines web amb scripts o
 * llenguatges de programació.
 */

/**
 * The question about `defer`:
 *L’atribut booleà defer indica al navegador que el script s’ha d’executar després d’analitzar 
 el document però abans de l’esdeveniment DOMContentLoaded. A més, impedeix que aquest 
 esdeveniment es dispari fins que el script estigui carregat i avaluat completament.
 */

/**
 * The question about `getElementBy...` vs `getElementsBy...`:
 *Sense "s" -> retorna un sol element.
  Amb "s" -> retorna una col·lecció d’elements.
  Altres dos mètodes: querySelector() i querySelectorAll().
 */

/* Task 2 --------------------------------------------------------------------------------------- */
const role = document.querySelectorAll(".nav-role li");
const options = document.querySelectorAll(".nav-options li");

role[0].onclick = () => {
	role[0].classList.add("role-selected");
	role[1].classList.remove("role-selected");
	options.forEach((element) => {
		if (element.classList.contains("admin")) {
			element.style.display = "none";
		}
	});
};

role[1].onclick = () => {
	role[1].classList.add("role-selected");
	role[0].classList.remove("role-selected");
	options.forEach((element) => {
		if (element.classList.contains("admin")) {
			element.style.display = "inline-block";
		}
	});
};

/* Task 2 solution ------------------------------------------------------------------------------ */

/* Task 3 --------------------------------------------------------------------------------------- */

let teams = [
	{
		team: "South Korea",
		games: {
			wins: 0,
			draws: 1,
			losses: 2,
		},
	},
	{
		team: "Denmark",
		games: {
			wins: 1,
			draws: 0,
			losses: 2,
		},
	},
	{
		team: "Finland",
		games: {
			wins: 2,
			draws: 1,
			losses: 0,
		},
	},
	{
		team: "Italy",
		games: {
			wins: 1,
			draws: 2,
			losses: 0,
		},
	},
];

document.addEventListener("DOMContentLoaded", () => {
	const table = document.querySelector("#classification tbody");
	if (!table) return console.error("No s'ha trobat la taula de classificació.");
	const sortedTeams = [...teams].sort(
		(a, b) =>
			b.games.wins * 3 + b.games.draws - (a.games.wins * 3 + a.games.draws)
	);
	table.innerHTML = sortedTeams
		.map(
			(t) =>
				`<tr>
     <td>${t.team}</td>
     <td>${t.games.wins}</td>
     <td>${t.games.draws}</td>
     <td>${t.games.losses}</td>
     <td>${t.games.wins * 3 + t.games.draws}</td>
   </tr>`
		)
		.join("");
	table.firstChild.classList.add("classification-first");
});

/* Task 3 solution ------------------------------------------------------------------------------ */

/* Task 4 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 4 solution ------------------------------------------------------------------------------ */

/* Task 5 --------------------------------------------------------------------------------------- */

let rating = 0;

/* Task 5 solution ------------------------------------------------------------------------------ */

/* Task 6 --------------------------------------------------------------------------------------- */

// This is how many pixels the bar has to move each time.
const delta = 20;
// Same initial value as left: 200px in CSS.
let left = 200;

/* Task 6 solution ------------------------------------------------------------------------------ */

/* Task 7 --------------------------------------------------------------------------------------- */

// These indicate how many pixels the ball has to move each time on each axis.
let topDelta = (leftDelta = 5);
// These are the coordinates for ball position.
let topCoord = (leftCoord = 0);
// This is the width of the playground area.
const fieldWidth = document.querySelector(".ball-container").clientWidth;
// This is the height of the playground area.
const fieldHeight = document.querySelector(".ball-container").clientHeight;

/* Task 7 solution ------------------------------------------------------------------------------ */
