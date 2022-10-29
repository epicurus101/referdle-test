const modal = document.getElementById("statsModal");

let stats = []

function passStats(stats){
    stats = stats
}

document.addEventListener('showStatsModal', () => {

    modal.style.display = "block"
    
    })

modal.onclick = function() {
     modal.style.display = "none";
}

const span = modal.querySelector('.close');

span.onclick = function() {

    modal.style.display = "none";
}

export { passStats }