const modal = document.getElementById("newPlayerModal");

document.addEventListener('showNewPlayerModal', () => {

    modal.style.display = "block"

})

modal.onclick = function() {
    modal.style.display = "none";
}

const span = modal.querySelector('.close');

span.onclick = function() {
    modal.style.display = "none";
}

modal.style.display = "block"
const content = modal.querySelector('.modal-content')

content.style.display = "flex"
content.style.flexDirection = "row"
content.style.flexWrap = "wrap"
content.style.alignItems = "center"

let br1 = document.createElement("div")
br1.classList.add("break")
content.appendChild(br1)

const cluebot = new Image();
cluebot.src = "images/cluebot.png"

cluebot.style.width = (content.offsetWidth * 0.3) + 'px'
cluebot.style.height =  (content.offsetWidth * 0.3) + 'px'
// cluebot.style.marginRight = '0px'
// cluebot.style.padding = '0px'

content.appendChild(cluebot)


const text1 = document.createElement("div");
text1.classList.add("modal-body");
text1.style.width = (modal.offsetWidth * 0.8) - cluebot.offsetWidth -2 + 'px'
// text1.style.marginLeft = '0px'
// text1.style.padding = '0px'
content.appendChild(text1)
text1.textContent = `Cluebot loves to do a popular word puzzle, and send the empty grid to you. You have to deduce what each of Cluebot's five guesses were by using the Clue Grid.`
+`\r\n\r\n`

let br2 = document.createElement("div")
br2.classList.add("break")
content.appendChild(br2)

const text2 = document.createElement("div");
text2.classList.add("modal-body");
text2.textContent = `Each of Words 1 to 5 matches with one of the words in Cluebot's Clue Grid. By using the extra information in the Clue Grid, you can guess all five words using the fewest guesses.\r\n\r\n`
content.appendChild(text2)

const img = new Image();
img.src = "images/grid_connect.png"
console.log(img)
img.style.width = (content.offsetWidth * 0.8) + 'px'
img.style.margin = "auto"
//img.style.height =  (content.offsetWidth * 0.8 * 495/1281) + 'px'
content.appendChild(img)

const text3 = document.createElement("div");
text3.classList.add("modal-body");
text3.textContent = `There's a Daily Puzzle and then you can play as many games as you like in Practice Mode.\r\n\r\nCheck out 'How to Play' in the menu for more information.  For even more help, there's a 'Tips & Tricks' to explore the logic of Referdle.`
content.appendChild(text3)

modal.style.display = "none"



// +`The font is Public Sans (https://public-sans.digital.gov)`
// +`\r\n\r\n`
// +`Except for the Referdle logo itself, all icons come from the incredible https://game-icons.net`
// +`\r\n\r\n`
// +`The word list has been mashed together and edited from a variety of sources including the Wiktionary top 100,000 most used words.`
// +`\r\n\r\n`
// +`Thanks to the very funny Log Blythe (@disappointment on Twitter) for this silly tweet that planted the idea from which Referdle grew:\r\n\r\n`

// modal.style.display = "block" // to get width!
// const img = new Image();
// img.src = "images/log_tweet.jpg"
// img.style.width = (content.offsetWidth * 0.8) + 'px'
// img.style.height =  (content.offsetWidth * 0.8 * 495/1281) + 'px'
// content.appendChild(img)
// modal.style.display = "none"

// const text2 = document.createElement("div");
// text2.classList.add("modal-body");
// content.appendChild(text2)
// text2.textContent = `\r\nAnd finally, thanks to Pete, Kathy, Tim and Emily for providing invaluable feedback on early versions of the game.`

