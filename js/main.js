import { Board } from './board.js';
import { getComparison, newPuzzle } from './logic.js';
import {saveCurrentState, loadCurrentState, deleteSave, saveStats, loadStats} from './storage.js'
import {loadDictionary} from './dictionary.js';
import {keyboard} from './keyboard.js';

document.addEventListener("DOMContentLoaded", () => {

    let boards = [];
    let dictionary = [];
    let board;
    let stats = []

    document.addEventListener('boardSelect', (e) => {

        const num = e.detail.index;
        if (num == 0 || boards[e.detail.index].success) {return}
        for (let i = 1; i < boards.length; i++) {
            const element = boards[i];
            element.boardDiv.style.borderColor = "rgb(58, 58, 60)";
        }
        board = boards[e.detail.index];
        board.boardDiv.style.borderColor = "rgb(255,255,255)";
        boards[0].highlightRow(e.detail.index-1);
    });

    document.addEventListener(`submit`, (e) => {
        handleSubmitWord()
    })

    document.addEventListener(`cycle`, (e) => {
        cycleBoard()
    })

    initialisation();

    async function initialisation() {

        keyboard.initialise()
        stats = loadStats()
        dictionary = await loadDictionary();
        createBoards()
        keyboard.giveBoardsRef(boards);
        keyboard.changeInput(true);
        cycleBoard();

    }

    function createBoards() {
        console.log("creating boards")
        const container = document.getElementById("board-container");
        for (let i = 0; i < 6; i++) {
            const newB = new Board(i);
            container.appendChild(newB.boardDiv);
            boards.push(newB);
        }

        boards.forEach(element => {
            element.adjustText();
        });
        console.log("checking for save game")
        if (!loadCurrentState(boards)) {  //Checks AND loads - consider splitting
            loadPuzzle();
        } else {

        }
    }

    function loadPuzzle() {
        let next = newPuzzle(dictionary);
        console.log(next);
        boards[0].setClueGrid(next);
        for (let i = 1; i < boards.length; i++) {
            const element = boards[i];
            element.setTarget(next[i-1])
        }
        saveCurrentState(boards);
    }

    function handleSubmitWord() {
        const currentWordArr = board.getCurrentWordArr();
        const targetWordArr = board.getTargetWordArr();
        const currentWord = currentWordArr.join("");
        const comparisonResult = getComparison(currentWordArr, targetWordArr);

        if (currentWordArr.length !== 5) {
            const event = new CustomEvent('showDictModal', {detail: {
                board: board,
                message: "MUST BE FIVE LETTERS"
              }});
            document.dispatchEvent(event);
            return;
        } else if (!dictionary.includes(currentWord)) {
            const event = new CustomEvent('showDictModal', {detail: {
                board: board,
                message: "NOT IN DICTIONARY"
              }});
            document.dispatchEvent(event);
            return;
        }
        const interval = 200;
        board.flipTiles(interval, comparisonResult);

        setTimeout(revealTruth, interval * 6, comparisonResult, board.index);

        if (currentWord === board.targetWord) {
            board.success = true;
            board.guessedWordCount += 1;
            saveCurrentState(boards);
            setTimeout(keyboardUpdate, interval * 6);
            if (allBoardsComplete()) {
                keyboard.changeInput(false);
                setTimeout(handleWin, interval * 8);
                deleteSave()
            } else {
                cycleBoard();
            }
        } else if (board.guessedWords.length === 5) {
            keyboard.changeInput(false);
            setTimeout(handleLoss, interval * 6);
            deleteSave();
        } else {
            setTimeout(keyboardUpdate, interval * 6);
            board.next();
            saveCurrentState(boards);
        }
    }

    function keyboardUpdate(){
        keyboard.update()
    }

    function revealTruth(comparisonResult, index) {
        boards[0].revealTruth(comparisonResult, index-1);
    }

    function allBoardsComplete(){
        for (let index = 1; index < boards.length; index++) {
            const element = boards[index];
            if (!element.success) {
                return false;
            }
        }
        return true;
    }

    function totalGuesses(){
        let total = 0
        for (let i = 1; i < boards.length; i++) {
            const board = boards[i];
            total += (board.guessedWordCount)
        }
        return total;
    }

    function handleWin(){

        let guesses = totalGuesses()

        const event = new CustomEvent('endGame', {detail: {
            win: true,
            guesses: guesses,
          }});
        console.log(`endGame event`)
        document.dispatchEvent(event);

        stats.push(guesses)
        saveStats(stats)
    }

    document.addEventListener('startAgain', (e) => {
        resetGame()
        loadPuzzle()
    });

    function handleLoss(){

        const event = new CustomEvent('endGame', {detail: {
            win: board.targetWord,
            guesses: 0,
          }});
        console.log(`endGame event`)
        document.dispatchEvent(event);

        stats.push("x")
        saveStats(stats)
    }

    function resetGame(){
        keyboard.reset();
        boards.forEach(element => {
            element.resetBoard()
        });
        boards[1].boardDiv.onclick();
        document.getElementById(`b1-1`).scrollIntoView(false);
        keyboard.changeInput(true);
    }

    function cycleBoard(){

        let curr = (board != null) ? board.index : 0;
        curr += 1;
        if (curr > 5) {
            curr = 1;
        }
        board = boards[curr];
        while (board.success) {
            curr += 1
            if (curr > 5) {
                curr = 1;
            }
            board = boards[curr];
        }
        boards[curr].boardDiv.onclick();
        let sq = ((boards[curr].guessedWords.length-1)*5)+1;
        document.getElementById(`b${curr}-${sq}`).scrollIntoView(false);
    }

    
})
