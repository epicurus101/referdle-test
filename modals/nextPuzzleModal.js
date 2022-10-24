const modal = document.getElementById("nextPuzzleModal");
const span = modal.querySelector('.close');

modal.onclick = function(e) {
    e.stopPropagation();
    startAgain()
    return;
}


document.addEventListener('reviewMode', (e) => {
    console.log('review');
    modal.style.display = "inline";

});


function startAgain() {
    modal.style.display = "none";
    console.log(`starting again`);
    document.dispatchEvent(new CustomEvent('keyboardAppear'));
    document.dispatchEvent(new CustomEvent('startAgain'));
}



