const modal = document.getElementById("nextPuzzleModal");
modal.classList.add("animate__animated");

let active = false

modal.onclick = function(e) {
    e.stopPropagation();
    startAgain()
    modal.classList.remove("animate__tada");
    active = false;
    return;
}


document.addEventListener('reviewMode', (e) => {
    console.log('review');
    modal.style.display = "inline-block";
    modal.classList.add("animate__tada");
    active = true;


});

modal.addEventListener('animationend', () => {
    modal.classList.remove("animate__tada");
    setTimeout(shakeAgain, 10000);
  });

function shakeAgain(){
    if (active) {
        modal.classList.add("animate__tada");
    }
}

function startAgain() {
    modal.style.display = "none";
    console.log(`starting again`);
    document.dispatchEvent(new CustomEvent('keyboardAppear'));
    document.dispatchEvent(new CustomEvent('startAgain'));
}



