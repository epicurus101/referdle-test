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

    let board = document.getElementById("board-container")
    board.style.filter = "blur(10px)"
    let menu = document.getElementById("menuModal")
    menu.style.filter = "blur(0)"

    addText(e.detail.win, e.detail.guesses, e.detail.streak, e.detail.daily, e.detail.boards);
    modal.style.display = "block";

    let holder = imageGen.endGameImage(e.detail.boards, e.detail.guesses, content.offsetWidth * 0.2, e.detail.topText);

    content.appendChild(holder);

    let button = document.createElement("div")
    button.setAttribute("id", "share-button")
    button.onclick = () => {
        let shareText = getShareText(e.detail)
    }
    button.textContent = 'Share'
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
    let board = document.getElementById("board-container")
    board.style.filter = "blur(0)"
    document.dispatchEvent(new CustomEvent(`reviewMode`));
}

function getShareText(detail) {
    let text
    if (detail.win) {
        text = detail.topText + `\r\n` + `${detail.guesses}/25\r\n `
    } else {
        text = "I failed to complete " + (detail.daily ? 'the' + detail.topText : 'a Practice Referdle')
    }
    return text

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
        text1.textContent = `\r\nThe answers were ${boards[1].targetWord.toUpperCase()}, ${boards[2].targetWord.toUpperCase()}, ${boards[3].targetWord.toUpperCase()}, ${boards[4].targetWord.toUpperCase()} and ${boards[5].targetWord.toUpperCase()}\r\nYou can keep on playing in Practice Mode`
    }


}

