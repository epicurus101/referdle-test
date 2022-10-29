import { 
    Board,
    logic,
    storage,
    loadDictionary,
    keyboard,
    uColours,
    puzzleDecider,
    boardManager,
    loadPuzzles
    } from './contents.js';


document.addEventListener("DOMContentLoaded", () => {

    let boards = [];
    let dictionary = [];
    let dailyPuzzles = [];
    let board;
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
        storage.saveCurrentState(boards, dailyMode);
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
        dictionary = await loadDictionary();
        dailyPuzzles = await loadPuzzles();
        createBoards()
        populateBoards()
        keyboard.changeInput(true);
        cycleBoard();
        document.dispatchEvent(new CustomEvent(`showMenuModal`))

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

    function populateBoards(){ // this is when to update streaks
        if (puzzleDecider.isDailyInProgress()) {
            console.log("detected a current daily in progress")
            dailyMode = true
            storage.loadCurrentState(boards, dailyMode);
        } else if (puzzleDecider.isDailyAvailable()) {
            console.log("getting fresh daily")
            dailyMode = true
            let puzzle = dailyPuzzles[puzzleDecider.getDay()]
            puzzle.forEach((word,index) => {puzzle[index] = word.toLowerCase()})
            loadPuzzle(puzzle, dailyMode)
            puzzleDecider.startStreakProcess(dailyMode)
        } else if (puzzleDecider.isPracticeInProgress()) {
            console.log("done daily, found a saved practice")
            dailyMode = false
            storage.loadCurrentState(boards, dailyMode)
        } else {
            console.log("all other routes explored, creating a new practice")
            dailyMode = false
            let puzzle = logic.newPuzzle(dictionary);
            loadPuzzle(puzzle, dailyMode)
            puzzleDecider.startStreakProcess(dailyMode)
        }
        console.log('changing the indicator')
        indicator()
    }

    function loadPuzzle(puzzle, daily) {
        boards[0].setClueGrid(puzzle);
        for (let i = 1; i < boards.length; i++) {
            const element = boards[i];
            element.setTarget(puzzle[i-1])
        }
        console.log(boards)
        storage.saveCurrentState(boards, daily);
        console.log(`we saved a ${daily ? "daily" : "practice"} puzzle`)
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
            storage.saveCurrentState(boards, dailyMode);
            setTimeout(keyboardUpdate, interval * 6);
            if (allBoardsComplete()) {
                keyboard.changeInput(false);
                boardManager.clearAllHighlighting(boards)
                setTimeout(handleWin, interval * 8);
                storage.deleteSave(dailyMode)
            } else {
                cycleBoard();
            }
        } else if (board.guessedWords.length === 5) {
            keyboard.changeInput(false);
            boardManager.clearAllHighlighting(boards);
            setTimeout(handleLoss, interval * 6);
            storage.deleteSave(dailyMode);
        } else {
            setTimeout(keyboardUpdate, interval * 6);
            board.next();
            storage.saveCurrentState(boards, dailyMode);
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
        storage.resolveStreak(dailyMode)
        storage.addToStats(guesses, dailyMode)
        let streak = storage.get("currentStreak", dailyMode)
        const event = new CustomEvent('endGame', {detail: {
            win: true,
            guesses: guesses,
            boards: boards,
            streak: streak,
            daily: dailyMode
          }});
        document.dispatchEvent(event);
    }

    document.addEventListener('startAgain', (e) => {
        resetGame()
        populateBoards()
        boards[1].boardDiv.onclick();
    });

    function handleLoss(){

        storage.addToStats("X", dailyMode)
        storage.resetStreak(dailyMode)
        let streak = storage.get("currentStreak", dailyMode)

        const event = new CustomEvent('endGame', {detail: {
            win: board.targetWord,
            boards: boards,
            guesses: 0,
            streak: streak,
            daily: dailyMode
          }});
        document.dispatchEvent(event);

    }

    function resetGame(){
        keyboard.reset();
        boards.forEach(element => {
            element.resetBoard()
        });
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
            let num = String(puzzleDecider.getDay()).padStart(5, '0')
            indic.textContent = `Daily Puzzle #${num}`
        } else {
            indic.textContent = `Practice Mode`
        }
    }

    
})
