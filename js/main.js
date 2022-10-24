import { 
    Board,
    logic,
    storage,
    loadDictionary,
    keyboard,
    imageGen,
    uColours,
    puzzleDecider,
    } from './contents.js';


document.addEventListener("DOMContentLoaded", () => {

    let boards = [];
    let dictionary = [];
    let dailyPuzzles = [];
    let board;
    let stats = []
    let dailyMode = true;

    document.addEventListener('boardSelect', (e) => {

        const num = e.detail.index;
        if (num == 0 || boards[e.detail.index].success) {return}
        for (let i = 1; i < boards.length; i++) {
            const element = boards[i];
            element.boardDiv.style.borderColor = uColours.darkGrey;
        }
        board = boards[e.detail.index];
        board.boardDiv.style.borderColor = uColours.offWhite;
        boards[0].highlightRow(e.detail.index-1);
    });

    document.addEventListener(`submit`, (e) => {
        handleSubmitWord()
    })

    document.addEventListener(`cycle`, (e) => {
        cycleBoard()
    })

    document.addEventListener(`saveGame`, (e) => { //needs to be accessed by keyboard module
        storage.saveCurrentState(boards);
    })

    document.addEventListener('exclusion', (e) => {
        if (e.detail.index > 5) {return}
        for (let index = e.detail.index; index < 6; index++) {
            if (boards[index].guessedWordCount > 0) {
                return
            }
        }
        // confirmed that remaining boards are clean!
        for (let index = e.detail.index; index < 6; index++) {
            if (e.detail.excluding) {
                boards[index].excludedLetters.add(e.detail.letter)
            } else {
                boards[index].excludedLetters.delete(e.detail.letter)
            }
        }
    })


    initialisation();

    async function initialisation() {

        indicator();
        keyboard.initialise();
        stats = storage.loadStats();
        dictionary = await loadDictionary();
        await puzzleDecider.loadDailies();
        createBoards()
        populateBoards()
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
    }

    function populateBoards(){
        if (puzzleDecider.isDailyInProgress()) {
            dailyMode = true
            storage.loadCurrentState(boards, true);
        } else if (puzzleDecider.isDailyAvailable()) {
            dailyMode = true
            let puzzle = puzzleDecider.getDaily()
            loadPuzzle(puzzle, true)
        } else if (puzzleDecider.isPracticeInProgress()) {
            dailyMode = false
            storage.loadCurrentState(boards, false)
        } else {
            dailyMode = false
            let puzzle = logic.newPuzzle(dictionary);
            loadPuzzle(puzzle, false)
        }
        indicator()
    }

    function loadPuzzle(puzzle, daily) {
        boards[0].setClueGrid(puzzle);
        for (let i = 1; i < boards.length; i++) {
            const element = boards[i];
            element.setTarget(puzzle[i-1])
        }
        storage.saveCurrentState(boards, daily);
    }

    function handleSubmitWord() {
        const currentWordArr = board.getCurrentWordArr();
        const targetWordArr = board.getTargetWordArr();
        const currentWord = currentWordArr.join("");
        const comparisonResult = logic.getComparison(currentWordArr, targetWordArr);

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
            storage.saveCurrentState(boards);
            setTimeout(keyboardUpdate, interval * 6);
            if (allBoardsComplete()) {
                keyboard.changeInput(false);
                setTimeout(handleWin, interval * 8);
                storage.deleteSave()
            } else {
                cycleBoard();
            }
        } else if (board.guessedWords.length === 5) {
            keyboard.changeInput(false);
            setTimeout(handleLoss, interval * 6);
            storage.deleteSave();
        } else {
            setTimeout(keyboardUpdate, interval * 6);
            board.next();
            storage.saveCurrentState(boards);
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
            boards: boards
          }});
        document.dispatchEvent(event);
        stats.push(guesses)
        storage.saveStats(stats)
    }

    document.addEventListener('startAgain', (e) => {
        resetGame()
        loadPuzzle()
    });

    function handleLoss(){
        imageGen.endGameImage(boards)

        const event = new CustomEvent('endGame', {detail: {
            win: board.targetWord,
            guesses: 0,
          }});
        document.dispatchEvent(event);

        stats.push("x")
        storage.saveStats(stats)
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

    function indicator(){
        let indic = document.getElementById(`indicator`)
        if (dailyMode) {
            let num = String(puzzleDecider.getDaily()).padStart(5, '0')
            indic.textContent = `Daily Puzzle #${num}`
        } else {
            indic.textContent = `Practice Mode`
        }
    }

    
})
