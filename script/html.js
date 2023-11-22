$("#settings").after(`
<div id="br1hPack">
    <div>Br1h's Pack Settings:</div>
    <div class="packSettings">
        <input type="checkbox" id="disableCheat">
        <label>Disable Cheat Buttons (b,n,e,r,t) (doesn't work)</label>
        <br>
        <br>
        <input type="checkbox" id="runRecorder">
        <label>Record run (doesn't work)</label>
    </div>
</div>
`);

let packDocContent = $('<div>', {
    id: 'packDocContent',
});

let cssTitle = {
    'color': 'orange',
    'font-size': '35px'
};

let cssDoc = {
    'color': 'white',
    'font-size': '20px',
    'margin-bottom': '5px'
};

let cssDocFinal = {
    'color': 'white',
    'font-size': '20px',
    'margin-bottom': '30px'
};

//Pack Documentation
$('<p>', {
    text: "Br1h's Pack Documentation",
    css: {
        'color': 'crimson',
        'font-size': '50px',
        'padding': '20px;',
        'border-radius': '5px',
        'margin-bottom': '5px'
    }
}).appendTo(packDocContent);

$('<p>', {
    text: 'dm me (.realityy) on discord for anything (bugs, ideas, questions, etc)',
    css: {
        'color': 'white',
        'font-size': '30px',
        'margin-bottom': '35px'
    }
}).appendTo(packDocContent);


//General Info
$('<p>', {
    text: "General Information",
    css: cssTitle
}).appendTo(packDocContent);

$('<p>',{
    text: 'A "run" is the data (if your timer starts) that will be sent to the leaderboard. When doing a run the main ones you should care about is time, deaths and the hero you are using.',
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "The run times on the leaderboard are stored under your name meaning whatever name you choose will store your data under that name. Think of it as an ID or an account with no password",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "PLEASE DON'T USE OTHER PEOPLES NAMES, USE YOUR OWN",
    css: {
        'color': 'red',
        'font-size': '25px',
        'margin-bottom': '10px'
    }
}).appendTo(packDocContent);

$('<p>',{
    text: "Your a valid run is when you:",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "- Don't use any of the cheat buttons, otherwise you will have to f5 (reload the website)",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "- Start in the first safe zone from the first area",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "- Play on the original maps",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "- Don't use any of the unaccepted heroes (Burst, Lantern, Polygon, idk)",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "The ranks on the leaderboard get updated every minute so you may have to wait some time for your run to appear and you can only reset your leaderboard data if you change maps.",
    css: cssDoc
}).appendTo(packDocContent);


//Timing
$('<p>', {
    text: "Timing",
    css: cssTitle
}).appendTo(packDocContent);

$('<p>', {
    text: "The timer (for your run) starts after you leave the first safe zone. Dying doesn't matter you can die as if its normal sandbox (note if you use hard or medium, even if you go back to the start your run will not reset)",
    css: cssDocFinal
}).appendTo(packDocContent);


//Button Shortcuts
$('<p>', {
    text: "Button Shortcuts",
    css: cssTitle
}).appendTo(packDocContent);

$('<p>', {
    text: "H - Hide hero card",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "M - Hide minimap",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "O - Resets your: run, deaths and sends you back to area 1 (if you want to reset your time, turn on Test Mode) (yes I know there's a rendering bug)",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>',{
    text: "P - Shows the time you got for your run (not mm120 timer yet)",
    css: cssDocFinal
}).appendTo(packDocContent);

//Message to Devs
$('<p>', {
    text: "My message to Devs",
    css: cssTitle
}).appendTo(packDocContent);

$('<p>', {
    text: "Dear Dev,",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>', {
    text: "For whatever I asked.",
    css: {
        'color': 'white',
        'font-size': '20px',
        'margin-bottom': '15px'
    }
}).appendTo(packDocContent);

$('<p>', {
    text: "pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls pls",
    css: {
        'color': 'white',
        'font-size': '20px',
        'margin-bottom': '15px'
    }
}).appendTo(packDocContent);

$('<p>', {
    text: "Many thanks,",
    css: cssDoc
}).appendTo(packDocContent);

$('<p>', {
    text: "Br1h",
    css: cssDoc
}).appendTo(packDocContent);


let packDocOverlay = $('<div>', {
    id: 'packDocOverlay',
    style: 'display:none; overflow: auto;',
});

let packDocBtn = $('<button>', {
    id: 'packDocBtn',
    text: "Br1h's pack documentation",
    click: function() {packDocOverlay.fadeIn()}
});

$('#menu').append(packDocBtn)
$('#menu').append(packDocOverlay)
packDocOverlay.append(packDocContent)

let timeContent = $('<div>', {
    id: 'timeContent',
    text: `Your Time: ${elapsedTime}`
});

let timeOverlay = $('<div>', {
    id: 'timeOverlay'
});

packDocOverlay.click(function(e) {
    if (e.target.id === 'packDocOverlay') {
        $(this).fadeOut();
    }
});

packDocContent.click(function(e) {
    if (e.target.id === 'packDocContent') {
        $("#packDocOverlay").fadeOut();
    }
});

timeOverlay.click(function(e) {
    if (e.target.id === 'timeOverlay') {
        $(this).fadeOut();
    }
});


function updateLeaderboard(data) {
    var leaderboardContainer = $('#leaderboard');

    // Check if the leaderboard already exists
    if (leaderboardContainer.length === 0) {
        // If not, create the leaderboard
        var leaderboardHtml = '<div id="leaderboard">';
        leaderboardHtml += '<ul style="position: absolute; list-style: none; right: 0; padding: 0; margin: 0; background-color: rgba(0, 0, 0, 0.8);">';

        for (var i = 0; i < data.length; i++) {
            let readBestTime = convertDuration(data[i].bestTime);
            const trimmedUsername = data[i].username.length > 15 ? data[i].username.substring(0, 12) + '...' : data[i].username;
            const spaces = '&nbsp;'.repeat(Math.max(0, 17 - trimmedUsername.length));
            let rankColor = 'white';
            if (data[i].rank === 1) {
                rankColor = 'gold';
            } else if (data[i].rank === 2) {
                rankColor = 'silver';
            } else if (data[i].rank === 3) {
                rankColor = '#cd7f32';
            }

            leaderboardHtml += `<li style="margin: 10px 0; padding: 0 10px; display: flex; justify-content: space-between; color: ${rankColor};">#${data[i].rank}. ${trimmedUsername}${spaces}<span>${readBestTime.minutes}:${readBestTime.seconds}.${readBestTime.milliseconds}</span></li>`;
        }

        leaderboardHtml += '</ul>';
        leaderboardHtml += '</div>';

        // Append the leaderboard to the body
        $('#gamed').append(leaderboardHtml);

        $('#leaderboard').css({
            'position': 'absolute',
            'top': $('#game').offset().top,
            'right': 0
        });
    } else {
        // If the leaderboard already exists, update its content
        var leaderboardHtml = '<ul style="position: absolute; list-style: none; right: 0; padding: 0; margin: 0; background-color: rgba(0, 0, 0, 0.8);">'; // Adjusted opacity

        for (var i = 0; i < data.length; i++) {
            let readBestTime = convertDuration(data[i].bestTime);
            const trimmedUsername = data[i].username.length > 15 ? data[i].username.substring(0, 12) + '...' : data[i].username;
            const spaces = '&nbsp;'.repeat(Math.max(0, 17 - trimmedUsername.length));
            let rankColor = 'white';
            if (data[i].rank === 1) {
                rankColor = 'gold';
            } else if (data[i].rank === 2) {
                rankColor = 'silver';
            } else if (data[i].rank === 3) {
                rankColor = '#cd7f32';
            }

            leaderboardHtml += `<li style="margin: 10px 0; padding: 0 10px; display: flex; justify-content: space-between; color: ${rankColor};">#${data[i].rank}. ${trimmedUsername}${spaces}<span>${readBestTime.minutes}:${readBestTime.seconds}.${readBestTime.milliseconds}</span></li>`;
        }

        leaderboardHtml += '</ul>';

        // Update the content of the existing leaderboard
        leaderboardContainer.html(leaderboardHtml);
    }
}

$('#gamed').append(timeOverlay);
timeOverlay.append(timeContent);


const styles = `
#br1hPack {
    position: absolute;
    right: 0px;
    top: 50%;
    background-color: white;
    padding: 5px;
}

#packDocBtn {
    position: absolute;
    width: auto;
    height: auto;
    right: 0;
    bottom: 0;
    padding: 10px;
    margin: 10px;
}

#packDocOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    justify-content: center;
    align-items: center;
    z-index : 9999;
}

#packDocContent {
    color: white;
    padding: 20px;
    border-radius: 5px;
}

#timeOverlay {
     display: none;
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: rgba(0, 0, 0, 0.8);
     justify-content: center;
     align-items: center;
}

#timeContent {
     background-color: #fff;
     padding: 20px;
     border-radius: 5px;
}

`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);