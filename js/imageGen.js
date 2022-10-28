import { uColours } from './contents.js';

const imageGen = (function () {

   
    function endGameImage(boards, guesses) {

        let trinaryArr = []

        for (let r = 1; r < boards.length; r++) {
            const board = boards[r];
            let comparisons = board.getAllBoardComparisons()
            console.log(comparisons)

            // for (let index = comparisons.length; index < 5; index++) {
            //     comparisons.splice(0,0,["0","0","0","0","0"])

            //     console.log(`splicing for board ${r} which has guess count ${board.guessedWordCount}`)
            // }
            trinaryArr.push(comparisons.reverse())
        }

        let holder = document.createElement("CANVAS")
        holder.setAttribute("id", "endPatternHolder")
        holder.width = 300;
        holder.height = 300;

        let ctx = holder.getContext("2d");

        let miniGap = Math.PI * 1/180
        let maxiGap = Math.PI * 4/180
        let blockArc = ((Math.PI * 2) - (20 * miniGap + 5 * maxiGap))/25

        let innerRadius = 50
        let maxBlockHeight = 90
        let blockGap = 3
        

        for (let iB = 0; iB < trinaryArr.length; iB++) {
            const board = trinaryArr[iB];
            const rows = board.length;
            const blockHeight = (maxBlockHeight - (blockGap * (rows-1)))/rows

            for (let iR = 0; iR < board.length; iR++) {

                const row = board[iR];
                for (let iL = 0; iL < row.length; iL++) {
                    const letter = row[iL];

                    ctx.fillStyle = uColours.darkGrey;
                    if (letter == 1) {
                        ctx.fillStyle = uColours.yellow;
                    } else if (letter == 2) {
                        ctx.fillStyle = uColours.green;
                    }
                    
                    const startAngle = (iB/5 * Math.PI * 2) + (miniGap + blockArc) * iL
                    const endAngle = startAngle + blockArc
                    const startRadius = innerRadius + (blockHeight + blockGap) * iR
                    const endRadius = startRadius + blockHeight

                    const ax = 150 + startRadius * Math.cos(startAngle)
                    const ay = 150 + startRadius * Math.sin(startAngle)

                    const bx = 150 + endRadius * Math.cos(startAngle)
                    const by = 150 + endRadius * Math.sin(startAngle)

                    const dx = 150 + startRadius * Math.cos(endAngle)
                    const dy = 150 + startRadius * Math.sin(endAngle)

                    ctx.beginPath()

                    ctx.moveTo(ax,ay)
                    ctx.lineTo(bx,by)
                    ctx.arc(150,150,endRadius,startAngle,endAngle,false)
                    ctx.lineTo(dx,dy)
                    ctx.arc(150,150,startRadius,endAngle,startAngle,true)
                    ctx.closePath()
                    ctx.fill()

                }

            }
        }

        ctx.font = 'bold 50px customWebFont';
        ctx.fillStyle = uColours.offWhite;
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText((guesses > 0 ? guesses : "X"), holder.width/2, holder.height/2); 


        return holder;
    }




    return {
        endGameImage: endGameImage,
    }
  })();

  export {imageGen}