import {storage, uColours} from '../js/contents.js';

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

    let recordedString = storage.get('stats', statsDaily)
    let stats;
    if (recordedString == "") {
        stats = []
    } else {
        stats = JSON.parse(recordedString)
    }
    addText(stats)
    addGraph(stats)


})

function addGraph(stats){

    let processed = processStatsForGraph(stats)

    let graph = getGraph(processed)
    content.appendChild(graph)

}



function addText(stats){
    let processed = processStatsForText(stats)
    let labels = ['Win %','Current Streak', 'Max Streak', 'Played', 'Average Guesses']

    const text = document.createElement("div");
    content.appendChild(text)
    text.setAttribute("id", "textStatsHolder")
    text.style.width = sideW + 'px'
    text.style.height = sideH * 0.6 + 'px'
    labels.forEach(statLabel => {
        let box = document.createElement("div");
        box.classList.add("textStatsBox");
        text.appendChild(box)
        let stat = document.createElement("div")
        stat.classList.add("textStat")
        stat.textContent = processed[statLabel]
        stat.style.fontSize = sideH / 6 + 'px'
        box.appendChild(stat)
        let label = document.createElement("div")
        label.classList.add('textStatLabel')
        label.textContent = statLabel
        label.style.fontSize = sideH / 15 + 'px'
        box.appendChild(label)
        // stat.style.lineHeight = stat.offsetHeight + 'px'
        // label.style.lineHeight = label.offsetHeight + 'px'
        // console.log(stat.offsetHeight, label.offsetHeight)
    });


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
    graph.style.gridTemplateRows = `${sideH}px ${sideW/15}px`
 //   graph.style.border = `1px solid ${uColours.midGrey}`
    graph.style.width = sideW + 'px';
    graph.style.alignItems = 'end'
    graph.style.margin = '0px auto'
    console.log(graph)

    for (let index = 0; index < 24; index++) {
        if (index == 0) {
            let axis = document.createElement("div")
            axis.style.borderRight = "1px solid rgb(58,58,60)"
            axis.style.height = sideH + 'px'
            axis.style.width = (sideW / 24 ) + 'px'
            graph.append(axis)

            let axisScale = getAxisScale(scale, largest)
            axis.appendChild(axisScale)
        } else {
            let bar = document.createElement("div");
            if (stats[index+4]) {
                bar.style.height = sideH * stats[index+4] / largest + 'px'
            } else {
                bar.style.height = 0+'px'
            }

            bar.style.width = ((sideW / 24) -1 ) + 'px'
            bar.style.backgroundColor = "rgb(150,150,30)"
            graph.append(bar)
        }
    }

    for (let index = 0; index < 24; index++) {
        let txt = document.createElement("div");
        txt.classList.add("grid-axis")
        txt.style.fontSize = sideW/30 + 'px'
        txt.style.height = sideW/15 + 'px'
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

    let rowHeight = (scale / maxValue) * sideH

    let labelNo = Math.floor(maxValue / scale)

    let holder = document.createElement("div")
    holder.style.height = sideH +'px';
    holder.style.width = sideW/24 + 'px';
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
        bar.style.fontSize = sideW/30 + 'px'
        holder.append(bar)
        
    }

    return holder;

}

function processStatsForGraph(stats) {

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

function processStatsForText(stats) {

    let played = stats.length;

    let streak = 0
    let maxStreak = 0
    let wins = 0
    let totalGuesses = 0
    stats.forEach(element => {
        if (element == "X") {
            streak = 0
        } else {
            totalGuesses += element;
            streak += 1;
            wins += 1;
            maxStreak = Math.max(streak, maxStreak);
        }
    });


    let processed = {};
    processed['Win %'] = (played == 0) ? 0 : (Math.round(wins * 1000 / played) / 10)
    processed['Current Streak'] = streak
    processed['Max Streak'] = maxStreak
    processed['Played'] = played
    processed['Average Guesses'] = (wins == 0) ? "-" : Math.round(totalGuesses * 10/wins) / 10

    return processed

}