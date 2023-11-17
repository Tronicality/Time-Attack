// ==UserScript==
// @name         Br1h's Pack
// @version      1.0
// @description  For evades sandbox, ability to hide card or minimap or time and submit to a leaderboard.
// @author       Br1h
// @match        https://ravel.turudu.repl.co/
// @match        https://ravel-beta.sonicexe66.repl.co/
// @downloadURL  https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/Pack.js?token=GHSAT0AAAAAACKMW56MSR5B3XGUQ6PQMPT4ZKX6VXA
// @updateURL    https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/Pack.js?token=GHSAT0AAAAAACKMW56MSR5B3XGUQ6PQMPT4ZKX6VXA
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?domain=evades.io
// @grant        none
// ==/UserScript==
const originalRenderArea = window.renderArea; //Soon to be used for different options
window.renderArea = renderBr1hArea;

//Toggle Options
let toggleUI = true;
let toggleMinimap = true;

function handleKey(event) {
    if (event.key.toLowerCase() === "h") {
        toggleUI = !toggleUI;
    } else if (event.key.toLowerCase() === "m") {
        toggleMinimap = !toggleMinimap;
    } else if (event.key.toLowerCase() === "p") {

        let readStart = convertDuration(startTime)
        let readEnd = convertDuration(endTime)
        let readElapsed = convertDuration(elapsedTime)


        console.log(`Start: ${readStart.minutes}:${readStart.seconds}:${readStart.milliseconds}`)
        console.log(`End: ${readEnd.minutes}:${readEnd.seconds}:${readEnd.milliseconds}`)
        console.log(`Elapsed: ${readElapsed.minutes}:${readElapsed.seconds}:${readElapsed.milliseconds}`)
    }
}

document.addEventListener("keydown", handleKey);

//Timing
let timerStart = false;
let timerEnd = false;
let typeErrorReceived = false;
let startTime = 0;
let endTime = 0;
let elapsedTime = 0;

function convertDuration(milliseconds) {
    if (typeof milliseconds !== 'number') {
        throw new Error('Input must be a number representing milliseconds.');
    }

    // Ensure milliseconds is non-negative
    milliseconds = Math.max(0, milliseconds);

    // Calculate minutes
    const minutes = Math.floor(milliseconds / (60 * 1000));

    // Calculate remaining milliseconds
    milliseconds %= (60 * 1000);

    // Calculate seconds
    const seconds = Math.floor(milliseconds / 1000);

    // Calculate remaining milliseconds
    const remainingMilliseconds = milliseconds % 1000;

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: remainingMilliseconds
    };
}


//Area boundaries cuz map placements are so shit
let areaBoundaries = {
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

//Re-written render Area
function renderBr1hArea(area, players, focus, old) {
    //Timing shit
    let check = false
    let info = "";
    try{ //Starting Timer
        if (!timerStart){
            if (!players[0].hasCheated){
                if (players[0].area == 0){
                    //Validate if player is in area
                    if(players[0].pos.x < areaBoundaries[area.name].x){
                        if (players[0].pos.y > areaBoundaries[area.name].top && players[0].pos.y < areaBoundaries[area.name].bottom){
                            if (!players[0].safeZone){
                                console.log(true)
                                startTime = players[0].timer;
                                timerStart = true
                            }
                            //console.log(players[0].vel)
                            check = true
                        }
                        else{
                            info = "Y value"
                        }
                    }
                    else{
                        info = "X value"
                    }
                }
                else{
                    info = "Not in First Area"
                }
            }
            else{
                info = "Player has Cheated"
            }
        }
        else if (!timerEnd){
            for (const zoneKey in area.zones) {
                if (area.zones.hasOwnProperty(zoneKey)) {
                    const zone = area.zones[zoneKey];
                    if (zone.type === 4){
                        endTime = players[0].timer;
                        elapsedTime = endTime - startTime;
                        timerEnd = true
                    }
                }
            }
        }

        if (!check && !timerStart){
            console.log(`${false} as ${info}`)
        }
    } catch (error) {
        if (error instanceof TypeError && !typeErrorReceived){
            console.error("Map not implemented for timer therefore TypeError");
            typeErrorReceived = true
        }
        else{
            throw error;
        }
    }

    //Rendering Shit
    var ligth = document.createElement('canvas');
    var context1 = ligth.getContext("2d");
    ligth.width = width;
    ligth.height = height;
    var world = game.worlds[players[0].world];
    if(old.area!=players[0].area||old.world!=players[0].world||!canv&&tiles.complete){
        canv = renderTiles(area, players, focus);
    }
    if(canv){
        context.drawImage(canv.can,(-focus.x)*fov+width/2+area.pos.x*fov,(-focus.y)*fov+height/2+area.pos.y*fov)//-focus.x*fov,-focus.y*fov)//(-focus.x+world.pos.x)*fov,(-focus.y+world.pos.y)*fov);
    }
    renderFirstEntities(area, players, focus)
    renderAssets(area, players, focus)
    context.globalAlpha = 1;
    renderPlayers(area, players, focus);
    renderSecondEntities(area, players, focus)
    if (area.lighting < 1){ //Optimising
        for (var i in players) {
            try{
                var player = players[i];
                var grad = context1.createRadialGradient(width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov, 0, width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov, (player.radius + 30 / 32) * fov);
                grad.addColorStop(0, "rgba(0, 0, 0, 1)");
                grad.addColorStop(1, "rgba(0, 0, 0, 0)");
                context1.beginPath();
                context1.fillStyle = grad;
                context1.arc(width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov, (player.radius + 30 / 32) * fov, 0, 2 * Math.PI, !1);
                context1.fill();
                context1.closePath();
            }catch(e){}
            if(player.flashlight_active){
                player.energy -= 1 / 30;
                if(player.energy<=0){player.flashlight_active = false}
                try{var player = players[i];
                    var grad = context1.createRadialGradient(width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov, 0, width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov, (460 / 32) * fov);
                    grad.addColorStop(0, "rgba(0, 0, 0, 1)");
                    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
                    context1.beginPath();
                    context1.fillStyle = grad;
                    var rotationSpeed = 15;
                    var flashlight_angle = 15;
                    var flashlight_distance = 500;
                    if(!mouse&&player.moving){
                        var angle = player.lastAng;
                        if(player.dirX>0){angle = 0;}
                        else if(player.dirX<0){angle = 180;}
                        if(player.dirY>0){angle = 90;}
                        else if(player.dirY<0){angle = 270;}
                        if(player.dirX>0&&player.dirY>0){angle = 45}
                        else if(player.dirX>0&&player.dirY<0){angle = 315}
                        else if(player.dirX<0&&player.dirY>0){angle = 135}
                        else if(player.dirX<0&&player.dirY<0){angle = 225}
                        player.inputAng = angle;
                    }
                    else if(mouse){
                        var angle = Math.atan2(mousePos.y-(height / 2 + (player.pos.y - focus.y) * fov), mousePos.x-(width / 2 + (player.pos.x - focus.x) * fov));
                        angle = (angle * 180) / Math.PI;
                        player.inputAng = angle;
                    }
                    if(player.inputAng<0){player.inputAng+=360}
                    if(player.inputAng>=360){player.inputAng-=360}
                    var distanceOne = player.inputAng - Math.abs(player.lastAng);
                    if(player.lastAng<=player.inputAng+rotationSpeed&&player.lastAng>=player.inputAng-rotationSpeed){}
                    else if(distanceOne<-180){player.lastAng+=rotationSpeed;}
                    else if(distanceOne>180){player.lastAng-=rotationSpeed;}
                    else if(distanceOne<0){player.lastAng-=rotationSpeed;}
                    else if(distanceOne>0){player.lastAng+=rotationSpeed;}
                    if(player.lastAng>=360)player.lastAng-=360;
                    if(player.lastAng<0)player.lastAng+=360;
                    if(player.lastAng<=player.inputAng+rotationSpeed&&player.lastAng>=player.inputAng-rotationSpeed){player.lastAng = player.inputAng}

                    context1.moveTo(width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov);
                    context1.arc(width / 2 + (player.pos.x - focus.x) * fov, height / 2 + (player.pos.y - focus.y) * fov, (flashlight_distance / 32) * fov,(Math.PI/180)*(-flashlight_angle+player.lastAng), (Math.PI/180)*(flashlight_angle+player.lastAng));
                    context1.fill();
                    context1.closePath();
                   }catch(e){}}
        }
        for(let i in area.entities){
            for(let j in area.entities[i]){
                var ent = area.entities[i][j]
                if(ent.isLight){
                    try{var grad1 = context1.createRadialGradient(width / 2 + (area.pos.x + ent.pos.x - focus.x) * fov, height / 2 + (area.pos.y + ent.pos.y - focus.y) * fov, 0, width / 2 + (area.pos.x + ent.pos.x - focus.x) * fov, height / 2 + (area.pos.y + ent.pos.y - focus.y) * fov, (ent.radius + ent.lightCount / 32) * fov);
                        grad1.addColorStop(0, "rgba(0, 0, 0, 1)");
                        grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
                        context1.beginPath();
                        context1.fillStyle = grad1;
                        context1.arc(width / 2 + (area.pos.x + ent.pos.x - focus.x) * fov, height / 2 + (area.pos.y + ent.pos.y - focus.y) * fov, (ent.radius + ent.lightCount / 32) * fov, 0, 2 * Math.PI, !1);
                        context1.fill();
                        context1.closePath();
                       }catch(e){}
                }
            }
        }
        for (var i in area.assets) {
            var zone = area.assets[i];
            if(zone.type==6||zone.type==8||zone.type==4){
                try{
                    let lightPower = 110;
                    if(zone.type==4){
                        lightPower = 250;
                        zone.pos.x += zone.size.x/2
                        zone.pos.y += zone.size.y/2
                    }
                    var grad1 = context1.createRadialGradient(width / 2 + (area.pos.x + zone.pos.x - focus.x) * fov, height / 2 + (area.pos.y + zone.pos.y - focus.y) * fov, 0, width / 2 + (area.pos.x + zone.pos.x - focus.x) * fov, height / 2 + (area.pos.y + zone.pos.y - focus.y) * fov, (lightPower / 32) * fov);
                    grad1.addColorStop(0, "rgba(0, 0, 0, 1)");
                    grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
                    context1.beginPath();
                    context1.fillStyle = grad1;
                    context1.arc(width / 2 + (area.pos.x + zone.pos.x - focus.x) * fov, height / 2 + (area.pos.y + zone.pos.y - focus.y) * fov, (lightPower / 32) * fov, 0, 2 * Math.PI, !1);
                    context1.fill();
                    context1.closePath();
                    if(zone.type==4){
                        zone.pos.x -= zone.size.x/2
                        zone.pos.y -= zone.size.y/2
                    }
                }catch(e){}
            }
        }
        context1.beginPath();
        context1.fillStyle = "rgba(0, 0, 0, " + area.lighting + ")"
        context1.fillRect(0, 0, width, height);
        context1.fill();
        context1.closePath();
        context.globalCompositeOperation = "destination-in"
        context.drawImage(ligth, 0, 0)
        context.globalCompositeOperation = "source-over"

        context.beginPath();
        context.font = "22px cursive";
        context.fillStyle = "gray";
        context.strokeStyle = "gray";
        context.textAlign = "start";
        context.lineWidth = 0.5;
        const diff = document.getElementById("diff").value;
        const devStat = "Comb Spd: "+ combineSpeed(player) + ", Amount: " + player.safeAmount;
        let offset = 0;
        if(diff == "Easy"){
            const deathCounter = (settings.dev) ? "Death Count: " + players[0].deathCounter + ", " + devStat : "Death Count: " + players[0].deathCounter;
            context.fillText(deathCounter, 0, 20);
            context.strokeText(deathCounter, 0, 20);
        } else if (diff == "Medium"){
            const lives = (settings.dev) ? "Lives: " + players[0].lives + ", " + devStat : "Lives: " + players[0].lives;
            let liveColor;
            switch(players[0].lives){
                case 3: liveColor = "green"
                    break;
                case 2: liveColor = "yellow"
                    break;
                case 1: liveColor = "orange"
                    break;
                case 0: liveColor = "red"
                    break;
            }
            context.fillStyle = liveColor;
            context.strokeStyle = liveColor;//'black';
            context.fillText(lives, 0, 20);
            context.strokeText(lives, 0, 20);
        } else if (settings.dev) {
            const text = devStat;
            context.fillText(text, 0, 20);
            context.strokeText(text, 0, 20);
        }
        if(settings.dev){
            context.fillStyle = "gray";
            context.strokeStyle = 'gray';
            const safePoint = (player.safePoint) ? "Safe Point: {X:" + Math.round(player.safePoint.pos.x*fov) + ", Y: " + Math.round(player.safePoint.pos.y*fov) + "} ([), to clear (])" : "None ([)";
            context.fillText(safePoint, 0, 45+offset);
            context.strokeText(safePoint, 0, 45+offset);
            const playerPos = "Player: {X:" + Math.round(player.pos.x*fov) + ", Y: " + Math.round(player.pos.y*fov) + ", Speed: "+greaterMax(player)+"}";
            context.fillText(playerPos, 0, 70+offset);
            context.strokeText(playerPos, 0, 70+offset);
            const timerClear = "Timer-clear: "+settings.timerClear+" (P), (O)";
            context.fillText(timerClear, 0, 95+offset);
            context.strokeText(timerClear, 0, 95+offset);
        }
        context.fill();
        context.stroke();
        context.closePath();
    }

    if (toggleUI){
        renderUI(area, players, focus)
    }

    if (toggleMinimap){
        renderMinimap(area, players, focus)
    }
}