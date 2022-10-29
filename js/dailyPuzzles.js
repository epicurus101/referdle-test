const version = "1.00"
    async function loadPuzzles() {

        let savedVersion = localStorage.getItem("puzzleVersion")

        let save = getPuzzlesFromLS()
        if (save != null && version == savedVersion) {
            console.log("we had a save and it's the same as the version we think")
            return save
        } else {
            save = await downloadPuzzles()
            return save
        }
 }

 async function downloadPuzzles(){
     const response = await fetch('1000.json');
     let array = await response.json();
     savePuzzles(array);
     console.log("puzzles loaded from web and saved");
     return array
 }

 function savePuzzles(array){
     let str = JSON.stringify(array);
     localStorage.setItem("dailyPuzzles", str);
     localStorage.setItem("puzzleVersion", version)

 }
 
 function getPuzzlesFromLS(){
     const save = localStorage.getItem("dailyPuzzles");
     if (save == null) { return null };
     let puzzles = JSON.parse(save);
     return puzzles;
 }


 export {loadPuzzles}