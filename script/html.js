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