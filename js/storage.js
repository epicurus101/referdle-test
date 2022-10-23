import { getComparison, newPuzzle } from './logic.js';
import { passStats } from '../modals/statsModal.js';

let oldPlayer = localStorage.getItem("returningPlayer");

if (oldPlayer == null) {
    console.log("a new player! welcome, friend")
    localStorage.setItem("returningPlayer", "true")
} else {
    console.log("welcome back, friend!")
}

function boardToObject(board){

    let object = {};
    object.targetWord = board.targetWord;
    object.guessedWords = board.guessedWords;
    object.excludedLetters = Array.from(board.excludedLetters);
    object.guessedWordCount = board.guessedWordCount;

    return object;
}

function saveCurrentState(boards){

    let objectArray = [];

    for (let i = 1; i < boards.length; i++) {
        const board = boards[i];
        let object = boardToObject(board);
        objectArray.push(object);
    }
    let str = JSON.stringify(objectArray);
    localStorage.setItem("saveGame", str);
}

function loadCurrentState(boards){
    const save = localStorage.getItem("saveGame");
    if (save == null) { return false };
    let objectArray = JSON.parse(save);
    if (objectArray == null) {return false};
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

function deleteSave(){
    localStorage.setItem("saveGame", null);
}

function saveStats(stats){
    let str = JSON.stringify(stats);
    localStorage.setItem("stats", str);
}

function loadStats(){
    let save = localStorage.getItem("stats")
    return (save != null) ? JSON.parse(save) : []
}



const firstDay = new Date("1 Oct 2022")

const today = new Date().getTime()

const diff = today - firstDay;

console.log(diff);

const daysDiff = Math.floor(diff/(24*60*60*1000));

console.log(daysDiff);



export {saveCurrentState, loadCurrentState, deleteSave, saveStats, loadStats}