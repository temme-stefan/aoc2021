import {examplePolymerization, polymerization} from "./14-data.js";
import {countingMap} from "../CountingMap/countingMap.js";

const {start, rules} = parsePolymerizationInput(polymerization)
const steps = 40;
const letterCount = new countingMap();
const nextPairs = new countingMap();
start.split("").forEach(c => letterCount.increase(c));
for (let i = 1; i < start.length; i++) {
    nextPairs.increase(start.substr(i - 1, 2));
}
for (let i = 0; i < steps; i++) {
    const proceed = [...nextPairs.entries()];
    nextPairs.clear();
    proceed.forEach(([key, count]) => {
        if (rules.has(key)) {
            const {letter,pairs} = rules.get(key);
            letterCount.increase(letter,count);
            pairs.forEach(p=>nextPairs.increase(p,count));
        }
    });
}


const {min:[,min], max:[,max]} = letterCount.minmax();


console.log(`Score:`, max - min);

/**
 * @param input {string}
 * @returns {{start: string, rules: Map<string,{letter:string,pairs:string[]}>}}
 */
function parsePolymerizationInput(input) {
    const [start, ruleBlock] = input.split("\n\n");
    const rules = new Map();
    ruleBlock.split("\n").forEach(r => {
        const [key, insert] = r.split(" -> ");
        rules.set(key, {letter: insert, pairs: [key[0] + insert, insert + key[1]]});
    });
    return {start, rules};
}