import { uColours } from './contents.js';

const imageGen = (function () {

    function endGameImage(boards, guesses) {

        let trinaryArr = []

        for (let r = 1; r < boards.length; r++) {
            const board = boards[r];
            let comparisons = board.getAllBoardComparisons()

            for (let index = board.guessedWordCount+1; index < 6; index++) {
                comparisons.splice(0,0,["0","0","0","0","0"])
            }
            trinaryArr.push(comparisons)
        }

        let holder = document.createElement("div")
        holder.setAttribute("id", "endPatternHolder")

        let angle = 0

        let miniGap = Math.PI * 2/27
        let maxiGap = Math.PI * 14/135
        

        for (let iB = 0; iB < trinaryArr.length; iB++) {
            const board = trinaryArr[iB];
            let radius = 131
            let vWidth = 26

            let savedBoardAngle = angle

            for (let iR = 0; iR < board.length; iR++) {

                angle = savedBoardAngle // restart 
                console.log(angle)
                const row = board[iR];
                for (let iL = 0; iL < row.length; iL++) {
                    const letter = row[iL];

                    let block = document.createElement('div');
                    block.className = 'circle';
                    block.style.width = vWidth + 'px'
                    block.style.top = (150-5)+'px'
                    block.style.left = (150-vWidth/2) + 'px'
                    block.style.transform = ` rotate(${angle}rad) translate(0px, ${radius}px)`
                    holder.appendChild(block)

                    let result = trinaryArr[iB][iR][iL]
                    let tileColor = uColours.darkGrey;
                    if (result == 1) {
                        tileColor = uColours.yellow;
                    } else if (result == 2) {
                        tileColor = uColours.green;
                    }
                    block.style.backgroundColor = tileColor;
                    block.style.borderColor = tileColor;

                    angle += miniGap
                }
                radius -= 14
                vWidth /= 1.16
            }
            angle -= miniGap // reverse out last addition
            angle += maxiGap // extra gap
        }

        let text = document.createElement("div")
        text.setAttribute("id", "endPatternText")
        text.textContent = guesses
        holder.appendChild(text)

        return holder;
    }



    return {
        endGameImage: endGameImage,
    }
  })();

  export {imageGen}