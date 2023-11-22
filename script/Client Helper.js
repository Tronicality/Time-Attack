/*Uneeded for now
const pingGlitchServer = async () => {
  try {
    const response = await fetch('https://evades-sandbox-server.glitch.me');
    if (response.ok) {
      console.log(`Ping successful at ${new Date().toLocaleString()}`);
    } else {
      console.error(`Error pinging the server: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
*/
function GetTopPlayersForArea(areaName) {
  return fetch("https://evades-sandbox-server.glitch.me/topPlayers", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Header': '*'
    },
    body: JSON.stringify({ collection: areaName })
  })
    .then(response => response.json())
    .then(data => {
      //console.log('Get Response:', data);
      return data;
    })
    .catch(error => {
      console.error('Get Error:', error);
      throw error;
    });
}

function SendPlayerData(player, map){
    //console.log("Player Data: ", player)
    //console.log("Map Data: ",map)

    SendToPlayer(player)
    SendToMap(player.map, map)
}

function SendToPlayer(player){
    fetch("https://evades-sandbox-server.glitch.me/updatePlayer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Header': '*'
        },
        body: JSON.stringify(player)
      })
        .then(response => response.json())
        .then(data => { //TODO: UI - tell user that their general info has been updated
          //console.log('POST Response:', data);
          //return data;
        })
        .catch(error => {
          console.error('POST Error:', error);
        });
}

function SendToMap(mapName ,map){
    let data = {
        ...map,
        bestTime: Number,
        collection: mapName
    }

    fetch(`https://evades-sandbox-server.glitch.me/addRunToMap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Header': '*'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => { //TODO: UI - tell user that their run has been logged
          //console.log('POST Response:', data);
          //return data;
        })
        .catch(error => {
          console.error('POST Error:', error);
        });
}