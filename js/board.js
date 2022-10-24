import { logic, uColours } from "./contents.js";

export class Board {
    
    index;
    boardDiv;
    contDiv;
    title;
    targetWord;
    guessedWords = [[]];
    availableSpace = 1;
    guessedWordCount = 0;
    success = false;
    excludedLetters = new Set();

    constructor(index){
        this.index = index;
        this.boardDiv = document.createElement("div");
        this.boardDiv.classList.add("board");

        this.title = document.createElement("div");
        this.title.classList.add("board-title");
        this.title.textContent = `WORD ${index}`;
        this.boardDiv.appendChild(this.title);


        this.contDiv = document.createElement("div");
        this.contDiv.setAttribute("id", `b${index}`);
        this.contDiv.classList.add("square-container");
        this.boardDiv.appendChild(this.contDiv);

        if (index == 0) {
            this.boardDiv.style.borderColor = uColours.highlightGreen;
            this.title.textContent = "CLUE GRID"
            this.title.style.color = uColours.highlightGreen;
            this.contDiv.style.borderTop = `1px solid ${uColours.highlightGreen}`
        }

        for (let i = 0; i < 25; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", `b${index}-${i + 1}`);
            this.contDiv.appendChild(square);
            
        }

        this.boardDiv.onclick = () => {
            if (this.index == 0 || this.success) {return}
            const event = new CustomEvent('boardSelect', {detail: {
                index: this.index,
                board: this
              }});
            document.dispatchEvent(event);
        }
    }

    getAllBoardComparisons(){
        let comparisons = []
        for (let i = 0; i < this.guessedWords.length; i++) {
            let guess = this.guessedWords[i];
            let comparison = logic.getComparison(guess, Array.from(this.targetWord));
            comparisons.push(comparison);
        }
        return comparisons
    }

    getSquare(i){
        if (i < 1 || i > 25) {
            return document.getElementById(`b${this.index}-1`);
        }
        return document.getElementById(`b${this.index}-${i}`);
    }


    loadFromSave(object){
        this.targetWord = object.targetWord;
        this.guessedWords = object.guessedWords;
        this.excludedLetters = new Set(object.excludedLetters);
        this.guessedWordCount = object.guessedWordCount;
        console.log(this.guessedWords, this.guessedWordCount)
        if ((this.guessedWordCount > 0) && (this.guessedWords[this.guessedWordCount-1].join("") == this.targetWord)) {
            this.success = true
        } else {
            this.success = false
        }
        for (let i = 0; i < this.guessedWordCount; i++) {
            let guess = this.guessedWords[i];
            for (let ind = 0; ind < guess.length; ind++) {
                const element = guess[ind];
                const availableSpaceEl = document.getElementById(`b${this.index}-${this.availableSpace}`);
             //   const availableSpaceEl = getSquare(this.availableSpace) //WHY DOESN'T THIS WORK
                availableSpaceEl.textContent = element;
                this.availableSpace += 1;
            }
            let comparison = logic.getComparison(guess, Array.from(this.targetWord));
            this.flipTiles(0,comparison, i);
        }
    }



    adjustText(){
        this.getAllSquares().forEach(element => {
            element.style.fontSize = `${element.offsetHeight * 0.60}px`
        });
    }

    highlightRow(index){
        for (let row = 0; row < 5; row++) {
            for (let space = 0; space < 5; space++) {
                let num = (row * 5) + space + 1
                const element = document.getElementById(`b${this.index}-${num}`);
                if (row == index) {
                    element.style.opacity = 1.0;
                    element.style.border = `1px solid ${uColours.offWhite}`
                } else {
                    element.style.opacity = 0.8;
                    element.style.border = `0px solid`
                }

            }    
        }
    }

    switchOn(row, letter){
        let num = (row * 5) + letter + 1
        const element = document.getElementById(`b${this.index}-${num}`);
        element.style.color = uColours.offWhite;
    }

    getAllSquares(){
        let squares = [];
        for (let i = 0; i < 25; i++) {
            const square = document.getElementById(`b${this.index}-${i+1}`);
            squares.push(square);
        }
        return squares;
    }

    setClueGrid(words) {
        this.guessedWords = []
        let comparisons = []
        words.forEach(element => {
            this.guessedWords.push(Array.from(element));
        });
        this.guessedWords.forEach(wordArr => {
            const compare = logic.getComparison(wordArr, this.guessedWords[4]);
            comparisons.push(compare);
        })
        let joinedArray = this.guessedWords.flat(1);
        let joinedComparisons = comparisons.flat(1);

        for (let i = 0; i < joinedArray.length; i++) {
            const letter = joinedArray[i];
            const result = joinedComparisons[i];
            const square = document.getElementById(`b${this.index}-${i+1}`);
            square.textContent = letter;
            square.style.color = uColours.transparent;
            let tileColor = uColours.darkGrey;
            if (result == 1) {
                tileColor = uColours.yellow;
            } else if (result == 2) {
                tileColor = uColours.green;
            }
            square.style.backgroundColor = tileColor;
            square.style.borderColor = tileColor;
        }

    }

    setTarget(word) {
        this.targetWord = word;
    }


    resetBoard(){
        this.guessedWords = [[]];
        this.availableSpace = 1;
        this.guessedWordCount = 0;
        this.success = false;
        this.excludedLetters.clear();
        const squares = document.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            const element = squares[i];
            element.textContent = ""
            element.style.backgroundColor = uColours.black;
            element.style.borderColor = uColours.darkGrey;
            element.classList.remove("animate__flipInX");
        }
    }

    getCurrentWordArr(){
        const numberOfGuessedWords = this.guessedWords.length;
        return this.guessedWords[numberOfGuessedWords - 1];
    }

    getTargetWordArr(){
        return Array.from(this.targetWord);
    }

    updateGuessedWords(letter) {
        const currentWordArr = this.getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);
            const availableSpaceEl = document.getElementById(`b${this.index}-${this.availableSpace}`);
            availableSpaceEl.textContent = letter;
            this.availableSpace += 1;
        }
    }

    handleDelete() {
        const currentWordArr = this.getCurrentWordArr();
        if (currentWordArr && currentWordArr.length > 0) {
            currentWordArr.pop();
            this.availableSpace -= 1;
            const availableSpaceEl = document.getElementById(`b${this.index}-${this.availableSpace}`);
            availableSpaceEl.textContent = "";
        }
    }

    flipTiles(interval, comparisonResult, guessedWord) {
        guessedWord = guessedWord ?? this.guessedWordCount
        const firstLetterID = guessedWord * 5 + 1;
        this.guessedWords[guessedWord].forEach((letter, letterIndex) => {
            setTimeout(() => {
                let tileColor = uColours.darkGrey;
                if (comparisonResult[letterIndex] == 1) {
                    tileColor = uColours.yellow;
                } else if (comparisonResult[letterIndex] == 2) {
                    tileColor = uColours.green;
                }
                
                const letterID = firstLetterID + letterIndex;
                const letterEl = document.getElementById(`b${this.index}-${letterID}`);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                letterEl.style.fontSize = `${letterEl.offsetHeight * 0.60}px`
            }, interval * letterIndex)
        })
    }

    revealTruth(comparison, wordIndex) {
        for (let index = 0; index < comparison.length; index++) {
            const element = comparison[index];
            if (element == 2) {
                this.switchOn(wordIndex, index);
            }
        }
    }

    next() {
        this.guessedWordCount += 1;
        this.guessedWords.push([]);
    }
}
