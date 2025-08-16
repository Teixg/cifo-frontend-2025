const bt1= document.getElementById("fecth1");
const idUrl= `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9E43E82E45266C37789162D8E0B27D25&steamids=`
const vanityUrl= `https://corsproxy.io/?url=http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=9E43E82E45266C37789162D8E0B27D25&vanityurl=`


// Event listener for the button click
bt1.addEventListener("click", async () => {
        let steamId=document.getElementById("steamId").value;
        const userData = await getUserData(steamId);
        console.log(userData);
        steamId = userData.steamid; // Fallback to input if not found
        if (userData) {;
            document.getElementById("response").innerHTML = `
                <h2>Player Information</h2>
                <p><strong>Steam ID:</strong> ${userData.steamid}</p>
                <p><strong>Username:</strong> ${userData.personaname}</p>
                <p><strong>Profile URL:</strong> <a href="${userData.profileurl}" target="_blank">${userData.profileurl}</a></p>
                <p><strong>Avatar:</strong> <img src="${userData.avatar}" alt="Avatar"></p>
            `;
        } 
        else {
            document.getElementById("response").innerText = 'No player data found.';
        }
        const games = await getGames(steamId);
        if (games.length > 0) {
            let gamesList = '<h2>Owned Games</h2><ul>';
            games.forEach(game => {
                gamesList += `<li>${game.name} (App ID: ${game.appid})</li>`;
            });
            gamesList += '</ul>';
            document.getElementById("response").innerHTML += gamesList;
        }
});

// Function to fetch user data from Steam API
async function getUserData(steamId){
try {
        const response = await fetch(vanityUrl+steamId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.response.success === 1) {
            steamId= data.response.steamid;
        }
        const userResponse = await fetch(idUrl+steamId);
        const userData = await userResponse.json();

        
        return userData.response.players[0] || null;
        } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById("response").innerText = 'Error fetching data. Please check the console for details.';
    }
}

// Function to fetch owned games from Steam API
async function getGames(steamId) {
    try {
        const response = await fetch(`https://corsproxy.io/?url=http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9E43E82E45266C37789162D8E0B27D25&steamid=${steamId}&format=json&include_appinfo=1`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.response.games || [];
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
    
}