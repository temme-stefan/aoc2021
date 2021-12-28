import {bingo} from "./4-data.js";

const testdata = {
    numbers: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24],//, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1],
    boards: [
        [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19]
        ], [
            [3, 15, 0, 2, 22],
            [9, 18, 13, 17, 5],
            [19, 8, 7, 25, 23],
            [20, 11, 10, 24, 4],
            [14, 21, 16, 12, 6],
        ], [
            [14, 21, 17, 24, 4],
            [10, 16, 15, 9, 19],
            [18, 8, 23, 26, 20],
            [22, 11, 13, 6, 5],
            [2, 0, 12, 3, 7],
        ]
    ]
}

const {numbers, boards} = bingo;

const board = (aBoard) => {
    let lastScore = null;
    const size = aBoard.length;
    if (aBoard.some(x => x.length != size)) {
        throw "non square board";
    }
    const marked = aBoard.map(row => row.map(_ => false));
    const playNumber = (number) => {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (aBoard[i][j] == number) {
                    marked[i][j] = true;
                }
            }
        }
    };
    const isWinner = () => {
        const test = (a) => a.every(x => x);
        let isWinner = false;
        // const diag1 = [], diag2 = [];
        for (let i = 0; i < size && !isWinner; i++) {
            const row = marked[i];
            const column = marked.map(row => row[i]);
            isWinner = test(row) || test(column);
            // diag1.push(marked[i][i]);
            // diag2.push(marked[size - 1 - i][i]);
        }
        // isWinner = isWinner || test(diag1) || test(diag2);
        return isWinner;
    }
    const getScore = () => {
        let score = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (!marked[i][j]) {
                    score += aBoard[i][j];
                }
            }
        }
        return score;
    }

    const print = () => {
        console.log(aBoard.map((row, i) => row.map((cell, j) => (marked[i][j] ? "\tX" : "\t" + cell)).join("")).join("\n") + "\n");
    }

    return {isWinner, playNumber, getScore, print}
}

const allBoards = boards.map(board);
let winners = [];

for (let i = 0; i < numbers.length && allBoards.length > 0; i++) {
    const n = numbers[i];
    allBoards.forEach(b => b.playNumber(n));
    const newWinners = allBoards.filter(b => b.isWinner());
    newWinners.forEach(w => {
        winners.push({winner: w, winningNumber: n})
        allBoards.splice(allBoards.findIndex(x=>x==w),1);
    });
}
if (winners.length > 0) {
    const {winner, winningNumber} = winners[0];
    console.log(`Winner with Score: ${winner.getScore() * winningNumber}, winning number: ${winningNumber}`);
    const {winner:lastWinner, winningNumber:lastWinningNumber} = winners[winners.length-1];
    console.log(`Last Winner with Score: ${lastWinner.getScore() * lastWinningNumber}, winning number: ${lastWinningNumber}`);
} else {
    console.log("no Winner");
}