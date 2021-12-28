import {fishes} from "./6-data.js";

const testFishes = [3, 4, 3, 1, 2];

const data =
    /*
        testFishes;
    /*/
    fishes;
//*/

const days = 256


function getFishCountAfterDays(days, initalFishes) {
    const amount = Array.from({length: 9}, _ => 0);
    initalFishes.forEach(f => amount[f]++);

    for (let i = 0; i < days; i++) {
        const birthgiving = amount.shift();
        amount.push(birthgiving);
        amount[6] += birthgiving;
    }

    const fishCount = amount.reduce((a, b) => a + b, 0);
    return fishCount;
}

const fishCount = getFishCountAfterDays(days, data);

console.log(fishCount);

