/* Task 1 --------------------------------------------------------------------------------------- */

function testCdn() {
	const p = $("#cdn");
	p.text(p.text() + new Date().getFullYear());
}

/* Task 1 solution ------------------------------------------------------------------------------ */

// There is nothing to do here. For this task you only need to add something to index8.html.

/* Task 2 --------------------------------------------------------------------------------------- */
$(document).ready(function () {
	$("#task21 li:not(.killed)").addClass("killed");
	$("#task22 li").removeClass("killed");
});
/* Task 2 solution ------------------------------------------------------------------------------ */

/* Task 3 --------------------------------------------------------------------------------------- */

$(document).ready(function () {
	const btnColors = ["#9009", "#0909"];
	const bgColors = ["#9009", "#fff"];

	$("#task3").hover(function () {
		const randomColor = btnColors[Math.floor(Math.random() * btnColors.length)];
		$(this).css("background-color", randomColor);
	});

	$("#task3").click(function () {
		const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
		$("body").css("background-color", randomBg);
	});
});

/* Task 3 solution ------------------------------------------------------------------------------ */

/* Task 4 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 4 solution ------------------------------------------------------------------------------ */

/* Task 5 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 5 solution ------------------------------------------------------------------------------ */

/* DOMContentLoaded ----------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
	testCdn();
	// ajaxPokemon();
});
