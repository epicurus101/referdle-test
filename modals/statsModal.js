const modal = document.getElementById("statsModal");

const button = document.getElementById("stats-button");

let stats = []

function passStats(stats){
    stats = stats
}

button.onclick = () => {
    console.log(`stats button clicked`);
    
    modal.style.display = "block";

}

modal.onclick = function() {
    console.log("click detected")
     modal.style.display = "none";
}

const span = modal.querySelector('.close');

span.onclick = function() {

    modal.style.display = "none";
}

export { passStats }