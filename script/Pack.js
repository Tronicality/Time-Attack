// ==UserScript==
// @name         Br1h's Pack
// @version      1.0.2
// @description  For evades sandbox, ability to hide card or minimap or time and submit to a leaderboard.
// @author       Br1h
// @match        https://ravel.turudu.repl.co/
// @match        https://ravel-beta.sonicexe66.repl.co/
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// @require      https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/config.js
// @require      https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/html.js
// @require      https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/Client%20Helper.js
// @require      https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/Pack.js
// @downloadURL  https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/Pack.js
// @updateURL    https://raw.githubusercontent.com/Tronicality/Time-Attack/main/script/Pack.js
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?domain=evades.io
// @grant        none
// ==/UserScript==

/* Ideas
 - Allow player to get more data than just the top 10 leaderboard info for example allTopPlayers (all collections)
 - Allow 1 area skip mode
 - Community hero ranking filter(everything, solo, duo, map, top 10 players)
*/

//TODO: update
//TODO: documentation
//TODO: Cheat
//TODO: data
//TODO: server
//TODO: rendering
//TODO: leaderboard
//TODO: accounts
//TODO: beg to either: Kaluub, sonicexe, ravel, DD1

//TODO: leaderboard - if player not in top 10, still show their rank and time info
//TODO: update - bug where user has to make a new userscript for update to come, hopeing changing the version fixes this

window.renderArea = renderBr1hArea;

function handleKey(event) {
    if (event.key.toLowerCase() === "h") { //Toggle hero card
        toggleUI = !toggleUI;
    } else if (event.key.toLowerCase() === "m") {  //Toggle minimap
        toggleMinimap = !toggleMinimap;
    } else if (event.key.toLowerCase() === "p") {  //Show user their time
        if (!game.players[0].hasCheated){
            const readElapsed = convertDuration(elapsedTime)
            const mm120 = convertDuration(mm120Time)

        
            if (endTime){
                timeContent.text(`Your time ${readElapsed.minutes}:${readElapsed.seconds}.${readElapsed.milliseconds}`);
            }
            else{
                timeContent.text("Your time will be shown here once you finish a run")
            }

            if (game.players[0].world == 11){
                mmTimeContent.css('display', 'block');
                if (mm120Reached){
                    mmTimeContent.text(`Your time to MM120: ${mm120.minutes}:${mm120.seconds}.${mm120.milliseconds}, your time to 480 is still ongoing`)
                }
                else{
                    mmTimeContent.text("Once you finish MM120, your time will be shown here but your MM480 time will not stop")
                }
            }
            else{
                mmTimeContent.css('display', 'none')
            }
        }
        else{
            mmTimeContent.css('display', 'none')
            timeContent.text("You have cheated, reload the page (f5) to be able to log runs again")
        }
        
        if (!inMenu){ //This right here is so finicky, it only works with fadeTo for god knows why
            if (timehidden) {
                timeOverlay.fadeTo("fast", 1);  // Fade in
                timehidden = false;
            } else {
                timeOverlay.fadeTo("fast", 0);  // Fade out
                timehidden = true;
            }
        }
    } else if(event.key.toLowerCase() === "o"){
        resetRun = true
    }
}

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

function inPreviousArea(current){
    try{
        if (previousArea != current){
            previousArea = current
            return false
        }
    } catch (error){
        previousArea = current
    }
    return true
}

//Re-written render Area
function renderBr1hArea(area, players, focus, old) {
    inSafe = players[0].safeZone

    //totalTimeStart = performance.now(); //TODO: data - recording time played
    // Reset Run
    if (resetRun){ //TODO: rendering - resetting does not render original area
        resetRun = false;


        timerStart = false;
        timerEnd = false;
        startTime = 0;
        endTime = 0;
        elapsedTime = 0;


        totalDeaths += players[0].deathCounter;
        players[0].deathCounter = 0;


        mm120Reached = false;
        skippedOnce = false;


        //players[0].world = 0; //buggy
        players[0].area = 0;

        players[0].pos.x = worldBoundaries[area.name].x - 5

        let areaY = (worldBoundaries[area.name].top + worldBoundaries[area.name].bottom)/2
        players[0].pos.y = areaY
    }

    if (!(area.name in worldBoundaries)){
        $('#leaderboard').css('display', 'none');
    }

    if (area.name in worldBoundaries){
         //Leaderboard Data
        $('#leaderboard').css('display', 'block');
        try {
            //TODO: (fixed?) leaderboard - after victory/ending run doesn't doesn't update
            if (!inPreviousArea(area.name) ) {
                GetTopPlayersForArea(area.name)
                    .then(data => {
                        updateLeaderboard(data);
                    })
                    .catch(error => {
                        console.error("Leaderboard data error: ", error.message);
                    });
                }
        } catch (error) {
            console.error("Error in getting data: ", error.message);
        }

        //Timing
        let check = false
        let info = "";
        try{
            if (!timerStart){
                if (acceptedHeroes.includes(players[0].className)){
                    if (!players[0].hasCheated){
                        if (players[0].area == 0){
                            if(players[0].pos.x < worldBoundaries[area.name].x){ //Validate if player is in area
                                if (players[0].pos.y > worldBoundaries[area.name].top && players[0].pos.y < worldBoundaries[area.name].bottom){
                                    if (!players[0].safeZone){ //TODO: UI - tell user run is valid
                                        //console.log(true)
                                        startTime = players[0].timer;
                                        timerStart = true
                                    }
                                    check = true
                                }
                                else{
                                    info = "Not in safe zone (Invalid Y value)"
                                }
                            }
                            else{
                                info = "Not in safe zone (Invalid X value)"
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
                else{
                    info = "Not Accepted Hero"
                }
            }
            else if (!timerEnd){
                for (const zoneKey in area.zones) {
                    if (area.zones.hasOwnProperty(zoneKey)) {
                        const zone = area.zones[zoneKey];

                        if (zone.type === 4){
                            let skipVictory = false

                            if (area.name != "Monumental Migration"){
                                mm480Reached = true
                            }
                            else{
                                if (area.pos.x === 47967 && area.pos.y === 885){
                                    mm480Reached = true
                                }
                                else{
                                    mm480Reached = false
                                }
                            }

                            if (multipleAreaMaps.includes(area.name)){
                                for (const map of multipleAreaMaps){
                                    if (skippedOnce && mm480Reached){
                                        skipVictory = true;
                                    }
                                }
                            }
                            else{
                                skipVictory = true;
                            }

                            if (skipVictory){
                                endTime = players[0].timer;
                                elapsedTime = endTime - startTime;
                                timerEnd = true

                                if (!players[0].hasCheated){
                                    let mapName = area.name

                                    if (mapName === "Peculiar Pyramid"){
                                        if(area.pos.x === 380 && area.pos.y === 384){
                                            mapName = "Peculiar Pyramid Perimeter"
                                        }
                                        else{
                                            mapName = "Peculiar Pyramid Inner"
                                        }
                                    }
                                    else if (mapName === "Monumental Migration"){
                                        if (area.pos.x === 11994 && area.pos.y === 885){
                                            mapName = "Monumental Migration 120"
                                        }
                                        else{
                                            mapName = "Monumental Migration 480"
                                        }
                                    }
                                    else if (mapName === "Magnetic Monopole"){
                                        if (area.pos.x === 731 && area.pos.y === 3352.5){
                                            mapName = "Magnetic Monopole"
                                        }
                                        else{
                                            mapName = "Magnetic Monopole Dipole"
                                        }
                                    }

                                    try{ 
                                        let data = SetData(players[0], mapName)
                                        SendPlayerData(data.player, data.map)

                                    } catch(error){ //TODO: data - save data to local storage if server is offline
                                        console.error('Error message: ', error)
                                    }
                                }

                                break
                            }
                            else{
                                if (area.name == "Monumental Migration" && !mm120Reached){
                                    if (area.pos.x === 11994 && area.pos.y === 885){
                                        mm120Reached = true;
                                        mm120Time = players[0].timer - startTime

                                        let data = SetData(players[0], "Monumental Migration 120")
                                        SendPlayerData(data.player, data.map)
                                    }
                                }
                                else if (area.name == "Wacky Wonderland"){
                                    if (area.pos.x === 7760 && area.pos.y === 525){
                                        skippedOnce = true
                                    }
                                }
                                else if (area.name == "Humongous Hollow"){
                                    if (area.pos.x === 8000 && area.pos.y === 660){
                                        skippedOnce = true
                                    }
                                }
                                else if (area.name == "Elite Expanse"){
                                    if (area.pos.x === 7997 && area.pos.y === 705){
                                        skippedOnce = true
                                    }
                                }
                                else if (area.name == "Dangerous District"){
                                    if (area.pos.x === 8000 && area.pos.y === 795){
                                        skippedOnce = true
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (!check && !timerStart){ //todo UI - tell user why run is not valid
                //console.log(`${false} as ${info}`)
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
    }


    //Rendering
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