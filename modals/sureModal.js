import { uColours, storage } from '../js/contents.js';

const modal = document.getElementById("sureModal");

document.addEventListener('showSureModal', () => {
    modal.style.display = "block"
})


modal.style.display = "block"
const content = modal.querySelector('.modal-content')
const width = content.offSetWidth


let buttons = modal.querySelectorAll(".sure-mode-button")
console.log(buttons)
buttons.forEach(element => {
    console.log("changing a button")
    element.style.fontSize = (width / 100) + 'px'
    element.onclick = () => {

        console.log("clicked")
        element.style.color = uColours.black
        element.style.backgroundColor = uColours.yellow
        element.style.border = "1px solid rgb(0,0,0)"
        if (element.textContent == "Back") {
            modal.style.display = "none"
        } else if (element.textContent == "Quit") {
            modal.style.display = "none"
            storage.deleteSave(true);
            document.dispatchEvent(new CustomEvent('quitGame'));
        }
    }
}); 

modal.style.display = "none"