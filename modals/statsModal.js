import { uColours, statElement} from '../js/contents.js';

const modal = document.getElementById("statsModal");
const content = modal.querySelector(".modal-content")
modal.style.display = "block"
let sideW = content.offsetWidth * 0.8
let sideH = sideW * 0.5;
modal.style.display = "none"
let statsDaily = false;


let buttons = modal.querySelectorAll(".stat-mode-button")
buttons.forEach(element => {
    element.style.fontSize = (sideW / 20) + 'px'
    element.onclick = () => {
        buttons.forEach(e => {
            e.style.color = uColours.offWhite
            e.style.backgroundColor = uColours.black
            e.style.border = "0px"

        });
        element.style.color = uColours.black
        element.style.backgroundColor = uColours.yellow
        element.style.border = "1px solid rgb(0,0,0)"
        const event = new CustomEvent('switchStats', {detail: {
            to:element.textContent,
          }});
        document.dispatchEvent(event);
    }
}); 

document.addEventListener('switchStats', (e) => {
    statsDaily = (e.detail.to == 'Daily') 

    let graph = modal.querySelector("#statsGraph")
    if (graph) {
        content.removeChild(graph)
    }
    let text = modal.querySelector("#textStatsHolder")
    if (text) {
        content.removeChild(text)
    }

    statElement.sideH = sideH;
    statElement.sideW = sideW;
    let textBoxes = statElement.getTextBoxes(statsDaily)
    content.appendChild(textBoxes)

    let graph2 = statElement.getGraph(statsDaily)
    content.appendChild(graph2);


})




document.addEventListener('showStatsModal', () => {

    modal.style.display = "block"
    console.log(content)
    buttons[0].onclick()

})

const span = modal.querySelector('.close');

span.onclick = function() {

    modal.style.display = "none";
    let graph = modal.querySelector("#statsGraph")
    content.removeChild(graph)

}
