const modal = document.getElementById("helpModal");

const button = document.getElementById("help-button");
button.onclick = () => {
    console.log(`help button clicked`);
    
    modal.style.display = "block";
}

modal.onclick = function() {
    modal.style.display = "none";
}

const span = modal.querySelector('.close');

span.onclick = function() {
    modal.style.display = "none";
}

const element = modal.querySelector('.modal-body')

element.textContent = `\r\nWelcome to Referdle!`
+`\r\n`
+`\r\n`
+`In Referdle you need to solve each of Words 1 to 5 in as few guesses as possible. They each work like a normal Wordle puzzle. It\'s tricky! However each board is linked by the Clue Grid to help you. Each of Words 1 to 5 represent a guess in the Clue Grid that was played in \'hard mode\' (i.e. each guess in the Clue Grid follows strict logic from the previous guesses). So you can deduce a lot of information from the Clue Grid. Good luck!`
+`\r\n\r\n`
+`You can enter words using the on screen keyboard (if you\'re playing on a mobile device) or a real keyboard if you're playing at a desktop.`
+`\r\n\r\n`
+`You can also select any board (with a click or press) to make your guesses in any order. If you are using a real keyboard you can use 'tab' to cycle through them. Use your guesses carefully and use all the information to solve the puzzle in as few guesses as possible.`
+`\r\n\r\n`
+`Your keyboard will automatically update with colour-coding to show you which letters you have identified / ruled out for particular boards.`
+`\r\n\r\n`
+`And finally, the keyboard can be used to help you keep track of your deductions.  For example, if you\'ve used information from Word 1 to rule out the letter "E" in Word 2 then you can hold down the "E" key (or long press it) on Word 2 and it will go dark on the keyboard to indicate that it\'s been ruled out.`