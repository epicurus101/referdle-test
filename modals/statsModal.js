import {storage, uColours, statElement} from '../js/contents.js';

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
    statElement.sideH = sideH;
    statElement.sideW = sideW;
    let graph2 = statElement.getGraph(statsDaily)
    content.appendChild(graph2);


})



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