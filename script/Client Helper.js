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
      console.log('Get Response:', data);
      return data; // Return the data
    })
    .catch(error => {
      console.error('Get Error:', error);
      throw error; // Throw the error to be caught by the caller
    });
}
/* Just a consideration
function GetAllTopPlayers(){
  fetch("http://localhost:3000/allTopPlayers", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Header': '*'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('POST Response:', data);
        })
        .catch(error => {
          console.error('POST Error:', error);
        });
}
*/
function SendPlayerData(player, map){ //TODO: data - Actually send it over and save (in local storage) if cannot connect to api
    console.log("Player Data: ", player)
    console.log("Map Data: ",map)

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
        .then(data => {
          console.log('POST Response:', data);
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
        .then(data => {
          console.log('POST Response:', data);
        })
        .catch(error => {
          console.error('POST Error:', error);
        });
}