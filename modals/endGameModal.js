const modal = document.getElementById("endGameModal");
const span = modal.querySelector('.close');

modal.onclick = function() {
    startAgain()
}

span.onclick = function() {
    startAgain();
}

document.addEventListener('endGame', (e) => {

    updateText(e.detail.win, e.detail.guesses)
    modal.style.display = "block"

});


function startAgain() {
    modal.style.display = "none";
    const event = new CustomEvent('startAgain');
    console.log(`starting again`)
    document.dispatchEvent(event);
}


function updateText(win, guesses) {
    const body = modal.querySelector('.modal-body')

    if (win == true) {
        body.textContent = `\r\nVictory!\r\nYou completed today's Referdle in ${guesses} guesses.\r\n\r\n Well done!`
    } else {
        body.textContent = `\r\nYou ran out of guesses for the word ${win}\r\nNever mind, try again tomorrow.\r\n\r\nOr you can keep on playing in Practice Mode`
    }
}
