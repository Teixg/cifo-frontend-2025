const bt1 = document.getElementById("fecth1");
const idUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`;
const vanityUrl = `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=9E43E82E45266C37789162D8E0B27D25&vanityurl=`;

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// crear partículas
function init() {
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 9000;
	for (let i = 0; i < numberOfParticles; i++) {
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height;
		let size = Math.random() * 2 + 1;
		let speedX = Math.random() * 1 - 0.5;
		let speedY = Math.random() * 1 - 0.5;
		particlesArray.push({ x, y, size, speedX, speedY });
	}
}

// dibujar partículas
function draw(particle) {
	ctx.beginPath();
	ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
	ctx.fillStyle = "rgba(49, 57, 168, 0.8)";
	ctx.fill();
}

// actualizar partículas
function update(particle) {
	particle.x += particle.speedX;
	particle.y += particle.speedY;

	if (particle.x > canvas.width || particle.x < 0) particle.speedX *= 1;
	if (particle.y > canvas.height || particle.y < 0) particle.speedY *= 1;
}

// conectar partículas con líneas
function connect() {
	for (let a = 0; a < particlesArray.length; a++) {
		for (let b = a; b < particlesArray.length; b++) {
			let dx = particlesArray[a].x - particlesArray[b].x;
			let dy = particlesArray[a].y - particlesArray[b].y;
			let distance = dx * dx + dy * dy;
			if (distance < (canvas.width / 7) * (canvas.height / 7)) {
				ctx.beginPath();
				ctx.strokeStyle = "rgba(48, 52, 102, 0.2)";
				ctx.lineWidth = 1;
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}

// animación principal
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particlesArray.length; i++) {
		draw(particlesArray[i]);
		update(particlesArray[i]);
	}
	connect();
	requestAnimationFrame(animate);
}

// resize
window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

init();
animate();

// Event listener for the button click
bt1.addEventListener("click", async () => {
	let steamId = document.getElementById("steamId").value;
	const userData = await getUserData(steamId);
	console.log(userData);
	steamId = userData.steamid; // Fallback to input if not found
	if (userData) {
		document.getElementById("response").innerHTML = `
                <h2>Player Information</h2>
                <p><strong>Steam ID:</strong> ${userData.steamid}</p>
                <p><strong>Username:</strong> ${userData.personaname}</p>
                <p><strong>Profile URL:</strong> <a href="${userData.profileurl}" target="_blank">${userData.profileurl}</a></p>
                <p><strong>Avatar:</strong> <img src="${userData.avatar}" alt="Avatar"></p>
            `;
	} else {
		document.getElementById("response").innerText = "No player data found.";
	}
	const games = await getGames(steamId);
	if (games.length > 0) {
		let gamesList = "<h2>Owned Games</h2><ul>";
		games.forEach((game) => {
			gamesList += `<li>${game.name} (App ID: ${game.appid})</li> 
                <img src="${
									game.img_icon_url
										? `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`
										: "https://via.placeholder.com/150"
								}" alt="${game.name} icon" ">`;
		});
		gamesList += "</ul>";
		document.getElementById("response").innerHTML += gamesList;
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

// Function to fetch owned games from Steam API
async function getGames(steamId) {
	try {
		const response = await fetch(
			`https://corsproxy.io/?url=http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}&format=json&include_appinfo=1`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.response.games || [];
	} catch (error) {
		console.error("Error fetching games:", error);
		return [];
	}
}
