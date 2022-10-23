import { Board } from './board.js';
import { getComparison, newPuzzle } from './logic.js';
import {saveCurrentState, loadCurrentState, deleteSave, saveStats, loadStats} from './storage.js'
import {loadDictionary} from './dictionary.js';
import {keyboard} from './keyboard.js';
import {imageGen} from './imageGen.js';
import {uColours} from './colours.js';


export {
    Board,
    getComparison,
    newPuzzle,
    saveCurrentState,
    loadCurrentState,
    deleteSave,
    saveStats,
    loadStats,
    loadDictionary,
    keyboard,
    imageGen,
    uColours,
}