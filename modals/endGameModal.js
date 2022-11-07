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

    addText(e.detail.win, e.detail.guesses, e.detail.streak, e.detail.daily, e.detail.boards);
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
      let span = document.createElement("span")
      span.classList.add("close")
      span.classList.add("prevent-select")
      span.innerHTML = "&times;"
      content.appendChild(span)
      let heading = document.createElement("h2")
      heading.textContent = "Game Over"
      content.appendChild(heading)
    modal.style.display = "none";
    document.dispatchEvent(new CustomEvent(`reviewMode`));
}


function addText(win, guesses, streak, daily, boards) {

    const text1 = document.createElement("div")
    text1.classList.add("modal-body")
    content.appendChild(text1)

    if (win == true) {
        let mode = daily ? "the Daily Referdle" : "a Practice Referdle"
        let mode2 = daily ? "Daily Mode" : "Practice Mode"
        text1.textContent = `\r\nYou completed ${mode} in ${guesses}/25 guesses.\r\n\r\nCurrent ${mode2} Streak: ${streak}`
    } else {
        text1.textContent = `\r\nYou failed. The answers were ${boards[1].targetWord.toUpperCase()}, ${boards[2].targetWord.toUpperCase()}, ${boards[3].targetWord.toUpperCase()}, ${boards[4].targetWord.toUpperCase()} and ${boards[5].targetWord.toUpperCase()}\r\nYou can keep on playing in Practice Mode`
    }


}

