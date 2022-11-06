const modal = document.getElementById("helpModal");

document.addEventListener('showHelpModal', () => {

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
text1.textContent = `\r\n`
+`Cluebot loves to do Wordle puzzles and then send you their answer grid (with all the letters blanked out) to see if you can guess what words they used in their grid. You guess each of Words 1 to 5 with normal Wordle rules: letters turn green if they are correct and in the correct place, and yellow if they are in that word but you\’ve guessed them in the wrong place.  Word 1 is Cluebot\’s first guess and Word 5 is the final answer to the Clue Grid.`
+`\r\n\r\n`
+`Your score is the total number of guesses it takes you to get all of Words 1 - 5 and fill in the Clue Grid.  The lower the better!  If you fail to guess any of the words with five guesses then you lose that game.`
+`\r\n\r\n`
+`If you do each puzzle separately then it\’s really tough.  But the Clue Grid gives you lots of extra information that can help.  Cluebot always plays logically. For example, if you guess the first word correctly as FIRES with this Clue Grid...\r\n\r\n`


modal.style.display = "block" // to get width!
const img = new Image();
img.src = "images/help_fires.jpg"
img.style.width = (content.offsetWidth * 0.8) + 'px'
img.style.height =  (content.offsetWidth * 0.8 * 286/500) + 'px'
content.appendChild(img)
modal.style.display = "none"

const text2 = document.createElement("div");
text2.classList.add("modal-body");
content.appendChild(text2)
text2.textContent = `\r\n`
+`…then you know for certain that Cluebot will not guess F, I, R or E for any of Words 2-5, because all of those letters are dark in the Clue Grid.  Because the letter S is yellow, Cluebot will always make sure that future guesses include the letter S, but they will try it in a different place.`
+`\r\n\r\n`
+`You can visit the \‘Tips & Tricks\’ page from the menu to find out more.\r\n\r\n`

const heading = document.createElement("h2");
heading.textContent = "Controls";
content.appendChild(heading);

const text3 = document.createElement("div");
text3.classList.add("modal-body");
content.appendChild(text3)
text3.textContent = `\r\n`
+`You can enter words using either the on-screen keyboard or a proper keyboard.`
+`\r\n\r\n`
+`You can use your guesses on any board in any order - just click or press the board you want to try.  If you are using a proper keyboard, \‘tab\’ will cycle through the boards.`
+`\r\n\r\n`
+`To help you, you can use the on-screen keyboard to keep track of your deductions.  The keyboard will automatically turn keys dark grey / yellow / green for a particular board, just like Wordle. However in addition you can either long-press (or long-click or right-click with a mouse) to turn a key dark blue and indicate that you have ruled it out.  For example, you might know from Word 1 that the letter \‘F\’ never appears again in the Clue Grid.  Just long-press on the \‘F\’ key with Board 2 selected to turn that key dark.  If you have not made any guesses for Words 3-5 then the letter \‘F\’ will also go dark on those boards.`
