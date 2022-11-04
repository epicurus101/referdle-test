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

document.addEventListener('switchStats', (e) => {
    statsDaily = (e.detail.to == 'Daily') 

    let graph = modal.querySelector("#statsGraph")
    if (graph) {
        content.removeChild(graph)
    }
    addGraph()

})

function addGraph(){

    let recordedString = storage.get('stats', statsDaily)
    let stats;
    if (recordedString == "") {
        stats = []
    } else {
        stats = JSON.parse(recordedString)
    }

    let processed = processStats(stats)

    let graph = getGraph(processed)
    content.appendChild(graph)

}



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

function getGraph(stats){

    let largest = Math.max(...Object.values(stats))
    let scale = getScale(largest)

    console.log(stats)

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

            let axisScale = getAxisScale(scale, largest)
            axis.appendChild(axisScale)
        } else {
            let bar = document.createElement("div");
            if (stats[index+4]) {
                bar.style.height = side * stats[index+4] / largest + 'px'
            } else {
                bar.style.height = 0+'px'
            }


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

    let labelNo = Math.floor(maxValue / scale)

    let holder = document.createElement("div")
    holder.style.height = side +'px';
    holder.style.width = side/24 + 'px';
    holder.style.display = "flex"
    holder.style.flexDirection = "column-reverse"
    holder.style.alignContent = "flex-end"
    holder.style.justifyContent = "flex-start"

    for (let index = 0; index < labelNo; index++) {
        let bar = document.createElement("div");
        bar.style.display = "inline-block"
        bar.classList.add("axisBox")
        bar.style.height = rowHeight + 'px';
        bar.style.borderTop = '1px solid rgb(0,0,0)'
        if (index == 0) {
            bar.style.borderBottom = '1px solid rgb(0,0,0)'
        }
        bar.textContent = (index + 1) * scale
        bar.style.direction = 'rtl'
        bar.style.overflow = "visible"
        bar.style.fontSize = side/30 + 'px'
        holder.append(bar)
        
    }

    return holder;

}

function processStats(stats) {

    console.log(stats)
    let obj = {}

    Array.from(stats).forEach( function(element) {
        console.log(element);

        if (element == "X" && '27' in obj) {
            obj[27] = obj[27] + 1
        } else if (element == "X") {
            obj[27] = 1
        } else if (element in obj) {
            obj[element] = obj[element] + 1
        } else {
            obj[element] = 1
        }
    });

    return obj;

}