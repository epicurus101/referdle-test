import { logic, storage, } from './contents.js';

const firstDay = new Date("23 Oct 2022")

let dailyPuzzles

const puzzleDecider = (function(){

    function isDailyInProgress(){

        let day = getDay()
        if (storage.dailySave() && storage.dailyIs(day)) {
            return true
        } else if (storage.dailySave()) {
            storage.addToStats("X", true) // you failed, and the day is past, sorry
            storage.deleteSave(true)
            return false
        }
        return false
    }

    function getDay(){
        const today = new Date().getTime();
        const diff = today - firstDay;
        const daysDiff = Math.floor(diff/(24*60*60*1000));
        console.log("what day is it?", daysDiff);
        return daysDiff;

    }

    function isDailyAvailable(){ // have I completed the daily yet?
        let day = getDay();
        return (!storage.dailySave() && !storage.dailyIs(day))
    }

    async function loadDailies(){
        const response = await fetch('https://epicurus101.github.io/referdle-test/1000.json');
        let array = await response.json();
        array.forEach((word, index) => {
            array[index] = word.toLowerCase();
        })
        dailyPuzzles = array;
    }

    function getDaily(){
        let day = getDay();
        return dailyPuzzles[day]
    }

    return {
        isDailyInProgress: isDailyInProgress,
        isDailyAvailable: isDailyAvailable,
        loadDailies: loadDailies,
        getDaily: getDaily,
        getDay: getDay

    }



})()

export {puzzleDecider}