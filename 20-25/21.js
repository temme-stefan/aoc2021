// Player 1 starting position: 4
// Player 2 starting position: 8
const testpositions = [3, 7];
const finalpositions = [7, 3];

const positions = finalpositions;
const score = [0, 0];
const victoryCount = [0, 0];

const maxScorePart2 = 21;
const dieResultsPart2 = [
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1]
]

gamePart1(positions, score);
gamePart2([...positions], [...score], 0);
console.log(victoryCount);

function gamePart2(positions, score, current, factor = 1) {
    dieResultsPart2.forEach(([dieSum, times]) => {
        const newPos = (positions[current] + dieSum) % 10;
        const newScore = score[current] + newPos + 1
        if (newScore >= maxScorePart2) {
            victoryCount[current] += factor * times;
        } else {
            const s = [...score];
            const p = [...positions];
            s[current] = newScore;
            p[current] = newPos;
            const c = 1 - current;
            gamePart2(p, s, c, factor * times);
        }
    })

}


function gamePart1([...positions], [...score]) {
    console.log("gamePart1");
    const {maxscore, ...die} = deterministicD100();

    let player = 0;

    while (score.every(s => s < maxscore)) {
        playTurn(player, die, positions, score);
        player = (player + 1) % 2;
    }
    console.log(score, die.totalRolls());
    console.log(Math.min(...score) * die.totalRolls());

    function playTurn(player, die, positions, score) {
        const roll = die.roll() + die.roll() + die.roll();
        positions[player] = (positions[player] + roll) % 10;
        score[player] += positions[player] + 1;
    }
}

/**
 * @returns {{roll: (function(): number), totalRolls: (function(): number), maxscore: number}}
 */
function deterministicD100() {
    let dieRoles = 0;
    /**
     * @returns {number}
     */
    const roll = () => {
        const roll = (dieRoles % 100) + 1;
        dieRoles++;
        return roll;
    }
    return {roll, totalRolls: () => dieRoles, maxscore: 1000};
}