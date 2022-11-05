import {imageGen} from '../js/imageGen.js';


const modal = document.getElementById("endGameModal");
const span = modal.querySelector('.close');
const content = modal.querySelector('.modal-content')

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

    addText(e.detail.win, e.detail.guesses, e.detail.streak, e.detail.daily);
    modal.style.display = "block";

    let holder = imageGen.endGameImage(e.detail.boards, e.detail.guesses, content.offsetWidth * 0.8, e.detail.topText);

    content.appendChild(holder);

    let button = document.createElement("a")
    button.classList.add('twitter-share-button')
    button.href ="https://twitter.com/intent/tweet?text=Hello%20world"
    button.dataSize = 'large'
    button.textContent = 'Tweet'
    content.appendChild(button)
    document.dispatchEvent(new CustomEvent(`keyboardDisappear`));
});


function closeModal() {
    while (content.hasChildNodes()) {
        content.removeChild(content.lastChild);
      }
    modal.style.display = "none";
    document.dispatchEvent(new CustomEvent(`reviewMode`));
}


function addText(win, guesses, streak, daily) {

    const text1 = document.createElement("div")
    text1.classList.add("modal-body")
    content.appendChild(text1)

    if (win == true) {
        let mode = daily ? "the Daily Referdle" : "a Practice Referdle"
        let mode2 = daily ? "Daily Mode" : "Practice Mode"
        text1.textContent = `\r\nYou completed ${mode} in ${guesses}/25 guesses.\r\n\r\nCurrent ${mode2} Streak: ${streak}`
    } else {
        text1.textContent = `\r\nYou ran out of guesses for the word ${win.toUpperCase()}\r\nNever mind, try again tomorrow.\r\n\r\nOr you can keep on playing in Practice Mode`
    }


}

