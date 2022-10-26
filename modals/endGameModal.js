import {imageGen} from '../js/imageGen.js';


const modal = document.getElementById("endGameModal");
const span = modal.querySelector('.close');

modal.onclick = function(e) {
    e.stopPropagation();
    closeModal();
    return;
}

span.onclick = function(e) {
    e.stopPropagation();
    closeModal();
    return;
}

document.addEventListener('endGame', (e) => {

    updateText(e.detail.win, e.detail.guesses, e.detail.streak, e.detail.daily);
    modal.style.display = "flex";
    modal.style.flexDirection = "column";

    let footer = modal.querySelector('.modal-footer');

    let holder = imageGen.endGameImage(e.detail.boards, e.detail.guesses);
    footer.appendChild(holder);
    document.dispatchEvent(new CustomEvent(`keyboardDisappear`));
});


function closeModal() {
    let footer = modal.querySelector('.modal-footer');
    while (footer.hasChildNodes()) {
        footer.removeChild(footer.lastChild);
      }
    modal.style.display = "none";
    document.dispatchEvent(new CustomEvent(`reviewMode`));
}


function updateText(win, guesses, streak, daily) {
    const body = modal.querySelector('.modal-body');

    if (win == true) {
        let mode = daily ? "the Daily Referdle" : "a Practice Referdle"
        let mode2 = daily ? "Daily Mode" : "Practice Mode"
        body.textContent = `\r\nVictory!\r\nYou completed ${mode} in ${guesses}/25 guesses.\r\n\r\nWell done!\r\nCurrent ${mode2} Streak: ${streak}`
    } else {
        body.textContent = `\r\nYou ran out of guesses for the word ${win.toUpperCase()}\r\nNever mind, try again tomorrow.\r\n\r\nOr you can keep on playing in Practice Mode`
    }


}

