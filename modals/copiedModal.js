import {animateCSS} from '../js/contents.js'

document.addEventListener('showCopiedModal', (e) => {

    let modal = document.getElementById("endGameModal")
    const content = modal.querySelector(".modal-content")
    const button = modal.querySelector('#share-button')

    let popup = document.createElement("div")
    popup.style.setProperty('--animate-duration', '1s');
    let child = document.createElement("span")
    child.textContent = `Copied to Clipboard`
    child.style.display = "table-cell"
    child.style.verticalAlign = "middle"
    popup.appendChild(child)
    popup.setAttribute("id", `copiedModal`);
    popup.classList.add("animate__animated");

    content.appendChild(popup)
    console.log(button.offsetTop, button.offsetLeft)

    popup.style.height = button.offsetHeight + 'px'
    popup.style.width = button.offsetWidth + 'px'
    popup.style.left = button.offsetLeft + 'px'
    popup.style.top = button.offsetTop + 'px'
    child.style.fontSize = button.offsetWidth / 9 + 'px'
    animateCSS(`#copiedModal`, "fadeOut").then(() => { // wow learn how this works some time!
        if (content) {
            content.removeChild(popup)
        }
    });


});