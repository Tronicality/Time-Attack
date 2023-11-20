// @require      https://code.jquery.com/jquery-3.6.4.min.js

$("#settings").after(`
<div id="br1hPack">
    <div>Br1h's Pack Settings:</div>
    <div class="packsettings">
        <input type="checkbox" id="disableCheat">
        <label>Disable Cheat Buttons (b,n,e,r,t)</label>
        <br>
        <br>
    </div>
</div>
`);

var timeOverlay = $('<div>', {
    id: 'timeOverlay'
});

var timeContent = $('<div>', {
    id: 'timeContent',
    text: `Your Time: ${elapsedTime}`
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
        leaderboardHtml += '<ul style="position: absolute; list-style: none; padding: 0; margin: 0; background-color: rgba(0, 0, 0, 0.8);">';

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
        $('body').append(leaderboardHtml);

        $('#leaderboard').css({
            'position': 'absolute',
            'top': $('#game').offset().top,
            'right': $('#game').offset().right,
            'z-index': '10000' // Adjust the z-index as needed
        });
    } else {
        // If the leaderboard already exists, update its content
        var leaderboardHtml = '<ul style="position: absolute; list-style: none; padding: 0; margin: 0; background-color: rgba(0, 0, 0, 0.8);">'; // Adjusted opacity

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

$('body').append(timeOverlay);
timeOverlay.append(timeContent);


const styles = `
#br1hPack {
    position: absolute;
    right: 0px;
    top: 50%;
    background-color: white;
    padding: 5px;
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