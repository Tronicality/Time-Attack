//General
const multipleAreaMaps = ["Wacky Wonderland", "Humongous Hollow", "Elite Expanse", "Dangerous District", "Monumental Migration"]
const acceptedHeroes = ['Basic', 'Magmax', 'Rime', 'Aurora', 'Brute', 'Shade', 'Reaper', 'Rameses', 'Cent', 'Jötunn', 'Candy', 'Pole', 'Clown'] //TODO: server - expect altered data

//Listeners
document.addEventListener("keydown", handleKey);

//Toggle Options
const originalRenderArea = window.renderArea; //Soon to be used for different options
let previousArea;
let showLeaderboard = true;
let timehidden = true;
let toggleUI = true;
let toggleMinimap = true;
let resetRun = false;
let inSafe = true;

let totalDeaths = 0; //TODO: data - recording totalDeaths
let typeErrorReceived = false;
let skippedOnce = false;
let mm480Reached = false;
let mm120Reached = false;


//Run time
let timerStart = false;
let timerEnd = false;
let startTime = 0;
let endTime = 0;
let mm120Time = 0;
let elapsedTime = 0;


//Start for first zone, valid time start zone
const worldBoundaries = {
    "Central Core": {
        "x": 12,
        "top": 2,
        "bottom": 13
    },
    "Haunted Halls": {
        "x": 12,
        "top": 82,
        "bottom": 93
    },
    "Peculiar Pyramid": {
        "x": 12,
        "top": 162,
        "bottom": 173
    },
    "Wacky Wonderland": {
        "x": 12,
        "top": 527,
        "bottom": 538
    },
    "Glacial Gorge": {
        "x": 12,
        "top": 572,
        "bottom": 583
    },
    "Vicious Valley": {
        "x": 12,
        "top": 617,
        "bottom": 628
    },
    "Humongous Hollow": {
        "x": 12,
        "top": 662,
        "bottom": 673
    },
    "Elite Expanse": {
        "x": 12,
        "top": 707,
        "bottom": 718
    },
    "Central Core Hard": {
        "x": 12,
        "top": 752,
        "bottom": 763
    },
    "Dangerous District": {
        "x": 12,
        "top": 797,
        "bottom": 808
    },
    "Quiet Quarry": {
        "x": 12,
        "top": 842,
        "bottom": 853
    },
    "Monumental Migration": {
        "x": 12,
        "top": 887,
        "bottom": 898
    },
    "Ominous Occult": {
        "x": 12,
        "top": 932,
        "bottom": 938
    },
    "Vicious Valley Hard": {
        "x": 12,
        "top": 972,
        "bottom": 983
    },
    "Frozen Fjord": {
        "x": 12,
        "top": 1017,
        "bottom": 1030
    },
    "Restless Ridge": {
        "x": -48,
        "top": 1467,
        "bottom": 1480
    },
    "Toxic Territory": {
        "x": -48,
        "top": 1365,
        "bottom": 1369.9
    },
    "Magnetic Monopole": {
        "x": -48,
        "top": 1400,
        "bottom": 1406
    },
    "Old Assorted Alcove": {
        "x": -49,
        "top": 1440,
        "bottom": 1453
    }
};

function convertDuration(totalMilliseconds) {
    const minutes = Math.floor(totalMilliseconds / (60 * 1000));

    totalMilliseconds %= (60 * 1000);
    const remainingMilliseconds = Math.round(totalMilliseconds % 1000);

    const seconds = Math.floor(totalMilliseconds / 1000) + (remainingMilliseconds === 1000 ? 1 : 0);

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: remainingMilliseconds === 1000 ? '000' : remainingMilliseconds
    };
};

function SetData(player, area){
    const playerData = {
        name: player.name,
        map: area
    }

    let mapData = {}
    if (area === "Monumental Migration 120"){
        mapData = {
            username: player.name,
            rank: 999,
            runs: {
                hero: player.className,
                deaths: player.deathCounter,
                fps: (window.sandbox.checked) ? 60 : 30,
                time: mm120Time,
                noPoints: window.no_points.checked
            }
        }
    }
    else{
        mapData = {
            username: player.name,
            rank: 99,
            runs: {
                hero: player.className,
                deaths: player.deathCounter,
                fps: (window.sandbox.checked) ? 60 : 30,
                time: elapsedTime,
                noPoints: window.no_points.checked
            }
        }
    }

    return {
        player: playerData,
        map: mapData
    }
}

function logIn(name, password){
    alert("Does Jack Shit LMAOOOOOOOOO")
}