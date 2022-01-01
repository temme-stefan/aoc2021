import {examplePolymerization, polymerization} from "./14-data.js";

const {start, rules} = parsePolymerizationInput(polymerization)
const steps = 40;
const letterCount = new Map();
const nextPairs = new Map();
start.split("").forEach(c => increaseCountingMap(c, letterCount));
for (let i = 1; i < start.length; i++) {
    increaseCountingMap(start.substr(i - 1, 2), nextPairs);
}
for (let i = 0; i < steps; i++) {
    const proceed = [...nextPairs.entries()];
    nextPairs.clear();
    proceed.forEach(([key, count]) => {
        if (rules.has(key)) {
            const {letter,pairs} = rules.get(key);
            increaseCountingMap(letter,letterCount,count);
            pairs.forEach(p=>increaseCountingMap(p,nextPairs,count));
        }
    });
}


const {min, max} = minMaxFromMap(letterCount);


console.log(`Score:`, max - min);


/**
 *
 * @param map{Map<*,number>}
 * @returns { {min:number,max:number} }
 */
function minMaxFromMap(map) {
    return [...map.values()].reduce(({min, max}, x) => {
        min = Math.min(min, x);
        max = Math.max(max, x);
        return {min, max};
    }, {min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER});
}

/**
 * @param key {*}
 * @param map {Map<*,number>}
 * @param amount {number}
 */
function increaseCountingMap(key, map, amount = 1) {
    map.set(key, (map.get(key) ?? 0) + amount);
}


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