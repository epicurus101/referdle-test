const menuModal = document.getElementById("menuModal");
menuModal.style.display = "none"

document.addEventListener('showMenuModal', (e) => {

    console.log("showMenuModal")
    menuModal.style.display = "block";
    console.log(menuModal.parentElement.offsetWidth)
    console.log(menuModal.offsetWidth)
    console.log(menuModal.parentElement.getBoundingClientRect())
    
    const widthScale = menuModal.parentElement.offsetWidth;

    menuModal.style.width = (widthScale * 0.4) + 'px'
    menuModal.style.height = widthScale/10 + 'px'
    menuModal.style.left = (widthScale + menuModal.parentElement.offsetLeft - menuModal.offsetWidth) + `px`

    const data = [
        ["How to Play", "help"],
        ["Statistics", "graph"],
        ["Abandon Game", "abandon"],
        ["About", "info"]
    ]

    for (let index = 0; index < data.length; index++) {
        let inf = data[index];

        const element = document.createElement("div")
        element.classList.add("menuItem")
        element.style.flexDirection = "row"
        menuModal.appendChild(element)

        const text = document.createElement("div")
        text.classList.add("menuText")
        text.style.lineHeight = widthScale/10 + 'px';
        element.appendChild(text)
        text.textContent = inf[0]

        const img = new Image();
        img.src = "images/" + inf[1] + ".png"
        img.style.width = widthScale/10 + 'px'
        img.style.height = widthScale/10 + 'px'
        img.style.borderRadius = widthScale/20 + 'px'
        img.classList.add("menuLogo")
        element.appendChild(img)

    }

    //menuModal.style.left = '600px'
    // menuModal.style.top = '100px'

});

// function setPosition(board){
//     const container = document.getElementById('board-container')
//     const square1 = board.getSquare(board.guessedWordCount * 5 + 1)
//     const square5 = board.getSquare(board.guessedWordCount * 5 + 5)
//     const unit = square1.offsetHeight * 0.1
//     const cumTop = square1.offsetTop + unit
//     const cumLeft = container.offsetLeft + square1.offsetLeft + unit
//     const cumRight = container.offsetLeft + square5.offsetLeft + square5.offsetWidth - unit

//     menuModal.style.top = cumTop+'px'
//     menuModal.style.height = (square1.offsetHeight-unit*2)+'px'
//     menuModal.style.left = cumLeft+'px'
//     menuModal.style.width = (cumRight-cumLeft)+'px'
//     menuModal.style.lineHeight = dictModal.offsetHeight+'px'
//     menuModal.style.borderRadius = (unit * 3)+'px'
//     menuModal.style.fontSize = `${square1.offsetHeight * 0.35}px`

//     menuModal.classList.remove("animate__tada")
//     menuModal.classList.remove("animate__fadeOutDown")
//     menuModal.style.animationDuration = '1s'
//     menuModal.classList.add("animate__tada");
//     setTimeout(fadeAway, 1000)

// }

// function fadeAway(){
//     menuModal.classList.remove("animate__tada")
//     menuModal.style.animationDuration = '1s'
//     menuModal.classList.add("animate__fadeOutDown");
// }
