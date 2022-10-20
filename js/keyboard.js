import { getComparison } from './logic.js';

const keyboard = (function () {

    const keys = document.querySelectorAll(".keyboard-row button"); //keyboard
    let standardKeys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    let board;

    let boards = []

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
                console.log("a key was clicked, but do we allow input?" ,allowInput)
                if (!allowInput || board.success) { return }
                keyHandler(letter);
            })
        }
    }

    function giveBoardsRef(boards){
        for (let index = 0; index < boards.length; index++) {
            const element = boards[index];
            boards.push(element)
        }
        console.log("boards assigned")
        console.log(boards)
    }

    document.addEventListener('boardSelect', (e) => {
        board = e.detail.board;
        console.log("but do we still have boards eh?", boards)
        reset();
        update();
    });

    function keyHandler(letter) {

        console.log("we're trying to handle keys")
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
            console.log("add a ", letter)
            board.updateGuessedWords(letter);
        }

    }

    function longpressHandler(letter) {
        console.log("do we still have boards?", boards)
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
    }

    function intelligentExclusion(excluding, letter) {
        let startBoard = board.index + 1
        console.log(boards)
        if (startBoard > 5) {return}
        for (let index = startBoard; index < 6; index++) {
            if (boards[index].guessedWordCount > 0) {
                return
            }
        }
        // confirmed that remaining boards are clean!
        for (let index = startBoard; index < 6; index++) {
            if (excluding) {
                boards[index].excludedLetters.add(letter)
            } else {
                boards[index].excludedLetters.delete(letter)
            }
        }
    }

    function reset(){ //keyboard
        for (let i = 0; i < keys.length; i++) {
            keys[i].customInfo = -2;
            keys[i].style.backgroundColor = "rgb(58, 58, 60)";
        }
    }

    function update(){

        board.excludedLetters.forEach(letter => {
            const button = document.getElementById(`k-${letter}`);
            updateKey(button, -1);
        });

        for (let row = 0; row < board.guessedWordCount; row++) {
            console.log(`updating keyboard for row ${row}`)
            const element = board.guessedWords[row];
            if (element.length == 5) {
                const compare = getComparison(element, board.getTargetWordArr())
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
        console.log(key.customInfo)
        if (key.customInfo >= newValue) {
            return;
        } else {
            key.customInfo = newValue;  
       //     key.style.borderStyle = "solid";
            if (newValue == -1) {
                key.style.backgroundColor = "rgb(40, 0, 0)";
            } else if (newValue == 0) {
                key.style.backgroundColor = "rgb(0, 0, 0)";
            } else if (newValue == 1) {
                key.style.backgroundColor = "rgb(181, 159, 59)";
            } else if (newValue == 2) {
                key.style.backgroundColor = "rgb(83, 141, 78)";
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
        giveBoardsRef: giveBoardsRef,
        initialise: initialise,
        reset: reset,
        changeInput: changeInput,
        update: update,
    }
  })();

  export {keyboard}