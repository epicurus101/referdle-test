import { copyText, imageGen, statElement } from '../js/contents.js'

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

    let text = modal.querySelector("#textStatsHolder")
    if (text) {
        content.removeChild(text)
    }

    let graph = modal.querySelector("#statsGraph")
    if (graph) {
        content.removeChild(graph)
    }

    statElement.sideW = content.offsetWidth * 0.8;
    statElement.sideH = statElement.sideW * 0.5;
    let textBoxes = statElement.getTextBoxes(e.detail.daily)
    content.appendChild(textBoxes)
    let graph2 = statElement.getGraph(e.detail.daily)
    content.appendChild(graph2);

    let button = document.createElement("div")
    button.setAttribute("id", "share-button")
    button.onclick = (e2) => {
        e2.stopPropagation();
        document.dispatchEvent(new CustomEvent(`showCopiedModal`));
        let shareText = copyText.get(e.detail)
        console.log(shareText)
    }
    button.textContent = 'Share'
    content.appendChild(button)
    button.style.maxHeight = button.offsetHeight + 'px'
    button.style.lineHeight = button.offsetHeight + 'px'

    const img = new Image();
    img.src = "images/share.png"
    let size = button.offsetHeight
    img.style.display = "inline-block"
    img.style.width = size + 'px'
    img.style.height = size + 'px'
    img.style.margin = "0px"
    img.style.marginLeft = "10px"
    button.appendChild(img)

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

function addText(win, guesses, streak, daily, boards) {

    const text1 = document.createElement("div")
    text1.classList.add("modal-body")
    content.appendChild(text1)

    if (win == true) {
        let mode = daily ? "the Daily Referdle" : "a Practice Referdle"
        text1.textContent = `\r\nYou completed ${mode} in ${guesses}/25 guesses`
    } else {
        text1.textContent = `\r\nThe answers were ${boards[1].targetWord.toUpperCase()}, ${boards[2].targetWord.toUpperCase()}, ${boards[3].targetWord.toUpperCase()}, ${boards[4].targetWord.toUpperCase()} and ${boards[5].targetWord.toUpperCase()}\r\nYou can keep on playing in Practice Mode`
    }


}

