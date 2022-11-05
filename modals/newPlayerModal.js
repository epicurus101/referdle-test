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
text1.textContent = `Cluebot loves to do a popular word puzzle. And when he's completed a puzzle he sends it to you!`
+`\r\n\r\n`
+`You have to deduce what each of Cluebot's five guesses were by using the Clue Grid.`
+`\r\n\r\n`

let br2 = document.createElement("div")
br2.classList.add("break")
content.appendChild(br2)

const text2 = document.createElement("div");
text2.classList.add("modal-body");
text2.textContent = "blah boopedy baya bap bap blah boopedy here is some text I wonder how it looks when there's line upon line of this stuff going on for ages. I'm not sure where all the sentences are ending and whether the line justification works. You really need quite a lot of text for that to become apparent so here is lots of text. Is it enough? Probably but let's do a bit more to be sure."
content.appendChild(text2)



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

