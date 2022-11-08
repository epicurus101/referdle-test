const modal = document.getElementById("aboutModal");

document.addEventListener('showAboutModal', () => {
    modal.style.display = "block"
})

modal.onclick = function() {
    modal.style.display = "none";
}

const span = modal.querySelector('.close');

span.onclick = function() {
    modal.style.display = "none";
}

const content = modal.querySelector('.modal-content')

const text1 = document.createElement("div");
text1.classList.add("modal-body");
content.appendChild(text1)
text1.textContent = `\r\nReferdle was designed and developed by Matthew Rowbotham.`
+`\r\n\r\n`
+`Referdle was inspired by the fantastic Wordle game by Josh Wardle (although the game has existed in one form or another since at least 1955!). Referdle is not associated with Wordle or the New York Times.`
+`\r\n\r\n`
+`The font is Public Sans (https://public-sans.digital.gov)`
+`\r\n\r\n`
+`Except for the Referdle logo itself, all icons come from the incredible https://game-icons.net. Cluebot was created by Dall-E, from https://labs.openai.com. The prompt was 'friendly green and yellow robot waving hello, high quality, brightly-coloured cartoon painting' if you're interested.`
+`\r\n\r\n`
+`The word list has been pulled together and edited from a variety of sources including the Wiktionary top 100,000 most used words and the Linux spellcheck dictionary. Because I'm a Brit I've taken the liberty of deleting most American spellings, like 'COLOR' and 'LITER'. Sorry Americans.`
+`\r\n\r\n`
+`Thanks to the very funny Log Blythe (@disappointment on Twitter) for this silly tweet that planted the idea from which Referdle grew:\r\n\r\n`

modal.style.display = "block" // to get width!
const img = new Image();
img.src = "images/log_tweet.jpg"
img.style.width = (content.offsetWidth * 0.8) + 'px'
img.style.height =  (content.offsetWidth * 0.8 * 495/1281) + 'px'
img.style.margin = "auto"
content.appendChild(img)
modal.style.display = "none"

const text2 = document.createElement("div");
text2.classList.add("modal-body");
content.appendChild(text2)
text2.textContent = `\r\nAnd finally, thanks to Pete, Kathy, Tim and Emily for providing invaluable feedback on early versions of the game.`
+`\r\n\r\n`
+`All feedback, and offers of seven-figure sums to buy the site, should be sent to contact@referdle.com `
