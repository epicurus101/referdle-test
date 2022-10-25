import { puzzleDecider } from "./contents.js";

const storage = (function() {

    function doesStorageKeyExist(str){
        let save = localStorage.getItem(str)
        return (save != null && save != "null")
    }

    function returningPlayer(){
        return doesStorageKeyExist("returningPlayer")
    }

    function dailySave(){
        return doesStorageKeyExist("saveGame-D")
    }

    function dailyIs(num){
        return (Number(localStorage.getItem("lastDaily")) == num)
    }

    function isPracticeInProgress(){
        return doesStorageKeyExist("saveGame-P")
    }

    function boardToObject(board){

        let object = {};
        object.targetWord = board.targetWord;
        object.guessedWords = board.guessedWords;
        object.excludedLetters = Array.from(board.excludedLetters);
        object.guessedWordCount = board.guessedWordCount;
    
        return object;
    }

    function saveCurrentState(boards, daily){

        let objectArray = [];
        for (let i = 1; i < boards.length; i++) {
            const board = boards[i];
            let object = boardToObject(board);
            objectArray.push(object);
        }
        let str = JSON.stringify(objectArray);
        if (daily) {
            localStorage.setItem("saveGame-D", str);
            localStorage.setItem("lastDaily", String(puzzleDecider.getDay()))
        } else {
            localStorage.setItem("saveGame-P", str);
        }
    }

    function loadCurrentState(boards, daily){  // needs to be carefully managed - ensure save is available
        let save;
        if (daily){
            save = localStorage.getItem("saveGame-D");
        } else {
            save = localStorage.getItem("saveGame-P");
        }
        console.log(save)
        let objectArray = JSON.parse(save);
        console.log(objectArray)
        let targetWords = []
        for (let i = 0; i < objectArray.length; i++) {
            let saveData = objectArray[i];
            let board = boards[i+1];
            targetWords.push(saveData.targetWord);
            board.loadFromSave(saveData);
        }
        console.log(targetWords)
        boards[0].setClueGrid(targetWords);
        for (let i = 0; i < boards.length-1; i++) {
            let board = boards[i+1]; // only does 1 to 5
            let comparisons = board.getAllBoardComparisons();
            for (let z = 0; z < comparisons.length; z++) {
                const comparison = comparisons[z];
                boards[0].revealTruth(comparison, i)
            }
        }
        return true;
    }

    function deleteSave(daily){
        if (daily) {
            localStorage.setItem("saveGame-D", null);
        } else {
            localStorage.setItem("saveGame-P", null);
        }

    }

    function addToStats(item, daily){
        let stats = loadStats(daily);
        stats.push(item);
        saveStats(stats, daily);
    }


    function saveStats(stats, daily){
        let str = JSON.stringify(stats);
        if (daily) {
            localStorage.setItem("stats-D", str);
        } else {
            localStorage.setItem("stats-P", str);
        }

    }
    
    function loadStats(daily){
        let save
        if (daily) {
            save = localStorage.getItem("stats-D")
        } else {
            save = localStorage.getItem("stats-P")
        }
        return (save != null) ? JSON.parse(save) : []
    }

    return {
        saveCurrentState: saveCurrentState,
        loadCurrentState: loadCurrentState,
        deleteSave: deleteSave,
        saveStats: saveStats,
        loadStats: loadStats,
        addToStats: addToStats,
        dailySave: dailySave,
        dailyIs: dailyIs,
        isPracticeInProgress: isPracticeInProgress,

    }

})();

export {storage}






