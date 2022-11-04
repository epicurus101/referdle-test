import {storage, uColours} from '../js/contents.js';

const modal = document.getElementById("statsModal");
const content = modal.querySelector(".modal-content")
modal.style.display = "block"
let side = content.offsetWidth * 0.8
modal.style.display = "none"
let statsDaily = false;


let buttons = modal.querySelectorAll(".stat-mode-button")
buttons.forEach(element => {
    element.style.fontSize = (side / 20) + 'px'
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



document.addEventListener('showStatsModal', () => {

    modal.style.display = "block"
    console.log(content)
    const graph = getGraph()
    content.appendChild(graph)
    buttons[0].onclick()
})



const span = modal.querySelector('.close');

span.onclick = function() {

    modal.style.display = "none";
    let graph = modal.querySelector("#statsGraph")
    content.removeChild(graph)

}

function getGraph(){

    const graph = document.createElement("div");
    graph.setAttribute("id", "statsGraph")

    graph.style.display = "grid"
    graph.style.gridTemplateColumns = "repeat(24,1fr)"
    graph.style.gridTemplateRows = `${side}px ${side/15}px`
 //   graph.style.border = `1px solid ${uColours.midGrey}`
    graph.style.width = side + 'px';
    graph.style.alignItems = 'end'
    graph.style.margin = '0px auto'
    console.log(graph)

    for (let index = 0; index < 24; index++) {
        if (index == 0) {
            let axis = document.createElement("div")
            axis.style.borderRight = "1px solid rgb(58,58,60)"
            axis.style.height = side + 'px'
            axis.style.width = (side / 24 ) + 'px'
            graph.append(axis)
            let scale = getScale(100)
            let axisScale = getAxisScale(scale, 100)
            axis.appendChild(axisScale)
        } else {
            let bar = document.createElement("div");
            bar.style.height = Math.random() * 100 + 'px'
            bar.style.width = ((side / 24) -1 ) + 'px'
            bar.style.backgroundColor = "rgb(150,150,30)"
            graph.append(bar)
        }
    }

    for (let index = 0; index < 24; index++) {
        let txt = document.createElement("div");
        txt.classList.add("grid-axis")
        txt.style.fontSize = side/30 + 'px'
        txt.style.height = side/15 + 'px'
        let num = index+4

        if (num >= 5) {
            txt.style.borderTop = "1px solid rgb(58,58,60)"
        }
        if (num >= 5 && num%5 == 0 && num <= 25) {
            txt.textContent = num
        } else if (num == 27) {
            txt.textContent = "X"
        }

        graph.append(txt)
        
    } 
    return graph

}

function getScale(maxValue) {

    const array = [1,2,5,10,25,50,100,250,500,1000,2500,5000,10000]

    for (let index = 0; index < array.length; index++) {
        const scale = array[index];
        if (maxValue/scale <= 6) {
            return scale
        }

    }
    return 1000000000
}

function getAxisScale(scale, maxValue) {

    let rowHeight = (scale / maxValue) * side

    let holder = document.createElement("div")
    holder.style.height = side +'px';
    holder.style.width = side/24 + 'px';
    holder.style.display = "flex"
    holder.style.flexDirection = "column-reverse"
    holder.style.alignContent = "flex-end"
    holder.style.justifyContent = "flex-start"

    for (let index = 0; index < 3; index++) {
        let bar = document.createElement("div");
        bar.style.display = "inline-block"
        bar.classList.add("axisBox")
        bar.style.height = rowHeight + 'px';
        bar.style.borderBottom = '1px solid rgb(0,0,0)'
        bar.textContent = "1,000"
        bar.style.direction = 'rtl'
        bar.style.overflow = "visible"
        bar.style.fontSize = side/30 + 'px'
        holder.append(bar)
        
    }

    return holder;



}