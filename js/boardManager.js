import {uColours} from './contents.js';


let boardManager = {

    clearAllHighlighting: function(boards) {
        for (let i = 1; i < boards.length; i++) {
            const element = boards[i];
            element.boardDiv.style.borderColor = uColours.darkGrey;
        }
        boards[0].fullOpacity();
    }


}

export {boardManager}