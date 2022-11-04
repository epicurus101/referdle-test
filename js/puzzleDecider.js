import { logic, storage, } from './contents.js';

const firstDay = new Date("23 Oct 2022")



const puzzleDecider = (function(){

    function startStreakProcess(daily) {
        if (daily) {
            if ((getDay()-storage.getDaily()) == 1) { 
                storage.incrementStreak(daily)
            } else {
                storage.resetStreak(daily) // is this nec? done elsewhere?
                storage.incrementStreak(daily)
            }
            storage.updateDaily(getDay())
        } else {
            storage.incrementStreak(daily)
        }
    }




    function isDailyInProgress(){

        let day = getDay()
        if (storage.dailySave() && storage.dailyIs(day)) {
            return true
        } else if (storage.dailySave()) {
            storage.addToStats("X", true) // you failed, and the day is past, sorry
            storage.deleteSave(true)
            storage.resetStreak(true)
            return false
        }
        return false
    }

    function isPracticeInProgress(){
        return storage.isPracticeInProgress();
    }

    function getDay(){
        const today = new Date().getTime();
        const diff = today - firstDay;
        const daysDiff = Math.floor(diff/(24*60*60*1000));
        // console.log("what day is it?", daysDiff);
        return daysDiff;

    }

    function isDailyAvailable(){ // have I completed the daily yet?
        let day = getDay();
        console.log('is there a daily save?', storage.dailySave())
        console.log('does current day, ', day, ',match the latest daily, ', localStorage.getItem("lastDaily"))
        return (!storage.dailySave() && !storage.dailyIs(day))
    }


    return {
        isDailyInProgress: isDailyInProgress,
        isDailyAvailable: isDailyAvailable,
        getDay: getDay,
        isPracticeInProgress: isPracticeInProgress,
        startStreakProcess: startStreakProcess,

    }



})()

export {puzzleDecider}