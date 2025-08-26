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

// When the first role is clicked event
role[0].onclick = () => {
	role[0].classList.add("role-selected");
	role[1].classList.remove("role-selected");

	// Hide all options with class "admin"
	options.forEach((element) => {
		if (element.classList.contains("admin")) {
			element.style.display = "none";
		}
	});
};

// When the second role is clicked event
role[1].onclick = () => {
	role[1].classList.add("role-selected");
	role[0].classList.remove("role-selected");

	// Show all options with class "admin"
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

	// Sort teams by points (3 per win + 1 per draw)
	const sortedTeams = [...teams].sort(
		(a, b) =>
			b.games.wins * 3 + b.games.draws - (a.games.wins * 3 + a.games.draws)
	);

	// Build table rows
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

	// Highlight the first row
	table.firstChild.classList.add("classification-first");
});

/* Task 3 solution ------------------------------------------------------------------------------ */

/* Task 4 --------------------------------------------------------------------------------------- */

// Function to calculate the sum of all ".amount" values
function calculateAmount() {
	const amounts = document.querySelectorAll(".amount");
	let total = 0;
	amounts.forEach((element) => {
		total += parseFloat(element.textContent) || 0;
	});

	// Put total into the last ".amount" cell
	amounts[amounts.length - 1].textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
	const unpaid = document.querySelectorAll(
		"#customers tbody tr td:nth-child(3)"
	);
	const totalAmount = document.querySelectorAll(".amount");
	let total = 0;

	// Add "unpaid" class if value < 0
	unpaid.forEach((element) => {
		if (element.textContent < 0) {
			element.classList.add("unpaid");
		}
	});
	calculateAmount();
});

// Remove all rows that contain "unpaid"
function removeUnpaid() {
	const unpaidRows = document.querySelectorAll("#customers tbody tr td.unpaid");
	unpaidRows.forEach((element) => {
		element.parentElement.remove();
	});
	calculateAmount();
}

/* Task 4 solution ------------------------------------------------------------------------------ */

/* Task 5 --------------------------------------------------------------------------------------- */

let rating = 0;
const stars = document.querySelectorAll(".star");
for (let i of stars) {
	i.onclick = () => {
		rating = 0;

		// Reset all stars to gray
		for (let j of stars) {
			j.classList.remove("star-pink");
			j.classList.add("star-gray");
		}

		// Color stars up to the clicked one
		for (let k of stars) {
			rating++;
			k.classList.remove("star-gray");
			k.classList.add("star-pink");
			if (k === i) {
				break;
			}
		}
	};
}
/* Task 5 solution ------------------------------------------------------------------------------ */

/* Task 6 --------------------------------------------------------------------------------------- */

// This is how many pixels the bar has to move each time.
const delta = 20;
// Same initial value as left: 200px in CSS.
let left = 200;
const body = document.querySelector("body");
const container = document.querySelector(".bar-container");
const bar = document.querySelector(".bar");

// Listen to keyboard arrows
body.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		left -= delta;
		if (left < 0) {
			left = 0; // prevent leaving container
		}
		bar.style.left = left + "px";
	} else if (event.key === "ArrowRight") {
		left += delta;
		if (left > container.clientWidth - bar.offsetWidth) {
			left = container.clientWidth - bar.offsetWidth; // prevent leaving container
		}
		bar.style.left = left + "px";
	}
});

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
// Select the inner div (the ball)
const ball = document.querySelector(".ball-container div");

// Apply initial position
ball.style.position = "absolute";
ball.style.top = `${topCoord}px`;
ball.style.left = `${leftCoord}px`;

// Function to update ball position and bounce on walls
function moveBall() {
	leftCoord += leftDelta;
	topCoord += topDelta;
	if (leftCoord <= 0 || leftCoord + ball.offsetWidth >= fieldWidth) {
		leftDelta *= -1; // bounce horizontally
	}
	if (topCoord <= 0 || topCoord + ball.offsetHeight >= fieldHeight) {
		topDelta *= -1; // bounce vertically
	}
	//update ball position
	ball.style.left = leftCoord + "px";
	ball.style.top = topCoord + "px";
}

// Run moveBall every 30ms
setInterval(moveBall, 30);

/* Task 7 solution ------------------------------------------------------------------------------ */
