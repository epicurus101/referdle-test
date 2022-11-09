

let copyText = {

    get: function(detail){
        let text = detail.topText + `: ${detail.win ? detail.guesses : "X"}/25\r\n\r\n`
        if (detail.win) {
            let guesses = []
            for (let index = 1; index < detail.boards.length; index++) {
                const board = detail.boards[index];
                text += copyText.emojis[board.guessedWordCount-1]
            }
        } else {
            text += copyText.emojis[5]
        }
        text += `\r\n\r\nwww.referdle.com`
        return text

    },

    emojis: ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","💀"],

    

}

export {copyText}