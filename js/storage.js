import { puzzleDecider } from "./contents.js";

const storageVersion = "1.04"

if (localStorage.getItem("storageVersion") != storageVersion) {
    console.log('clearing data')
    localStorage.clear()
    localStorage.setItem("storageVersion", storageVersion)
}

const storage = (function() {

    function doesStorageKeyExist(str){
        let save = localStorage.getItem(str)
        return (save != null && save != "null")
    }

    function get(stat, daily) {
        let key = stat + ( daily? "-D" : "-P" )
        return (doesStorageKeyExist(key) ? localStorage.getItem(key) : "")
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

    function getDaily() {
        if (doesStorageKeyExist("lastDaily")) {
            return Number(localStorage.getItem("lastDaily"))
        } else {
            return -1
        }
    }

    function updateDaily(day){
        localStorage.setItem("lastDaily", day)
    }

    function incrementStreak(daily){
        let cKey = daily ? "currentStreak-D" : "currentStreak-P"
        let pKey = daily ? "potentialStreak-D" : "potentialStreak-P"
        let num = doesStorageKeyExist(cKey) ? Number(localStorage.getItem(cKey)) : 0
        localStorage.setItem(cKey, String(num))
        localStorage.setItem(pKey, String(num+1))
    }

    function resetStreak(daily){
        let cKey = daily ? "currentStreak-D" : "currentStreak-P"
        localStorage.setItem(cKey, "0")
    }

    function resolveStreak(daily){
        let cKey = daily ? "currentStreak-D" : "currentStreak-P"
        let pKey = daily ? "potentialStreak-D" : "potentialStreak-P"
        let num = doesStorageKeyExist(pKey) ? Number(localStorage.getItem(pKey)) : 1
        localStorage.setItem(cKey, String(num))
        // console.log(`${daily ? "Daily" : "Practice"} streak is ${num}`)
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
        // console.log(save)
        let objectArray = JSON.parse(save);
        // console.log(objectArray)
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
        console.log(stats);
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
        doesStorageKeyExist: doesStorageKeyExist,
        getDaily: getDaily,
        incrementStreak: incrementStreak,
        resetStreak: resetStreak,
        updateDaily: updateDaily,
        resolveStreak: resolveStreak,
        get: get,
        returningPlayer: returningPlayer,
    }

})();

export {storage}






