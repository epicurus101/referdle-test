    const version = "1.03"
   async function loadDictionary() {

    let savedVersion = localStorage.getItem("dictVersion")

    let save = getDictionaryFromLS()
        if (save != null && version == savedVersion) {
            console.log("we had a save and it's the same as the version we think")
            return save
        } else {
            localStorage.removeItem("saveGame")
            save = await downloadDictionary()
            return save
        }
    }

    async function downloadDictionary(){
        const response = await fetch('https://epicurus101.github.io/referdle-test/dictionary.json');
        let array = await response.json();
        array.forEach((word, index) => {
            array[index] = word.toLowerCase();
        })
        saveDictionary(array);
        console.log("dictionary loaded from web and saved");
        return array
    }

    function saveDictionary(dict){
        let str = JSON.stringify(dict);
        localStorage.setItem("dictionary", str);
        localStorage.setItem("dictVersion", version)
        console.log("saving dictionary");
    }
    
    function getDictionaryFromLS(){
        const save = localStorage.getItem("dictionary");
        if (save == null) { return null };
        let dict = JSON.parse(save);
        return dict;
    }




    export {loadDictionary}