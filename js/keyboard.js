import { logic, uColours } from './contents.js';

const keyboard = (function () {

    const keys = document.querySelectorAll(".keyboard-row button"); //keyboard
    let standardKeys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    let board;

    let allowInput = false;
    
    function initialise() {
        for (let i = 0; i < keys.length; i++) { //keyboard
            const letter = keys[i].getAttribute("data-key");
            keys[i].setAttribute("id", `k-${letter}`);
            keys[i].classList.add("prevent-select")
            keys[i].customInfo = -2;
    
            keys[i].addEventListener('long-press', function(e) {
                e.preventDefault(); //maybe work out what this does some day
                longpressHandler(letter);
            });
    
            keys[i].addEventListener('click', function(e) {
                if (!allowInput || board.success) { return }
                keyHandler(letter);
            })
        }
    }

    document.addEventListener('keyboardDisappear', (e) => {
        console.log('keyboard disappear called')
        let kc = document.getElementById("keyboard-container")
        kc.style.display = "none";
    })

    document.addEventListener('keyboardAppear', (e) => {
        console.log('keyboard appear called')
        let kc = document.getElementById("keyboard-container")
        kc.style.display = "block";
    })


    document.addEventListener('boardSelect', (e) => {
        board = e.detail.board;
        reset();
        update();
    });

    function keyHandler(letter) {

        if (letter === 'enter') {
            const event = new CustomEvent('submit');
            document.dispatchEvent(event);
            return;
        } else if (letter === 'del') {
            board.handleDelete();
            return;
        } else if (!standardKeys.includes(letter)){
            return;
        } else {
            board.updateGuessedWords(letter);
        }

    }

    function longpressHandler(letter) {
        if (!standardKeys.includes(letter)) {
            return;
        } else if (board.excludedLetters.has(letter)) {
            board.excludedLetters.delete(letter);
            intelligentExclusion(false, letter);
        } else {
            board.excludedLetters.add(letter);
            intelligentExclusion(true, letter);
        }
        reset();
        update();
        document.dispatchEvent(new CustomEvent(`saveGame`))
    }

    function intelligentExclusion(excluding, letter) {

        const event = new CustomEvent('exclusion', {detail: {
            index: (board.index+1),
            letter: letter,
            excluding: excluding
          }});
        document.dispatchEvent(event);
    }

    function reset(){ //keyboard
        for (let i = 0; i < keys.length; i++) {
            keys[i].customInfo = -2;
            keys[i].style.backgroundColor = uColours.midGrey;
        }
    }

    function update(){

        board.excludedLetters.forEach(letter => {
            const button = document.getElementById(`k-${letter}`);
            updateKey(button, -1);
        });

        for (let row = 0; row < board.guessedWordCount; row++) {
            const element = board.guessedWords[row];
            if (element.length == 5) {
                const compare = logic.getComparison(element, board.getTargetWordArr())
                updateKeyboardRow(compare, element)
            }
        }

    }

    function updateKeyboardRow( comparisonResult, currentWordArr ) { // keyboard
        for (let i = 0; i < comparisonResult.length; i++) {
            const letter = currentWordArr[i];
            const button = document.getElementById(`k-${letter}`);
            updateKey(button, comparisonResult[i]);
        }
    }

    function updateKey( key, newValue ) { //keyboard
        if (key.customInfo >= newValue) {
            return;
        } else {
            key.customInfo = newValue;  
            if (newValue == -1) {
                key.style.backgroundColor = uColours.darkBlue;
            } else if (newValue == 0) {
                key.style.backgroundColor = uColours.darkGrey;
            } else if (newValue == 1) {
                key.style.backgroundColor = uColours.yellow;
            } else if (newValue == 2) {
                key.style.backgroundColor = uColours.green;
            }
        }
    }

    function changeInput(allow) {
        allowInput = allow
    }

    let keyTimers = {};

    document.addEventListener('keydown', function(event) {
        let str = event.key.toLowerCase();
        if (str == "backspace") {
            str = "del";
        } 
        if (keyTimers[str] == null) {
            keyTimers[str] = Date.now();
        } else {
            return;
        }
    });

    document.addEventListener('keyup',function(event) {
        let str = event.key.toLowerCase();
        if (str == "backspace") {
            keyHandler("del");
            return
        } else if (str == "enter") {
            keyHandler("enter");
            return
        } else if (str == "tab") {
            const event = new CustomEvent('cycle');
            document.dispatchEvent(event);
            return;
        }
        if (keyTimers[str]) {
            const interval = Date.now()-keyTimers[str];
            delete keyTimers[str];
            if (interval > 800) {
                longpressHandler(str);
            } else {
                keyHandler(str);
            }
        }

    } )

    return {
        initialise: initialise,
        reset: reset,
        changeInput: changeInput,
        update: update,
    }
  })();

  export {keyboard}