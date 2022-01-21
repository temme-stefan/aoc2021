import {programCheckMONAD, programCheckthreeTimesLarger, programNegate, programToBinary} from "./24-data.js";


/**
 * @param inputs {number[]}
 * @param program {string}
 * @return {Map<string,number>}
 * @constructor
 */
function ALU([...inputs], program) {
    const store = new Map();
    const getValue = (inp) => {
        const n = Number.parseInt(inp);
        if (!Number.isNaN(n)) {
            return n;
        } else {
            if (store.has(inp)) {
                return store.get(inp);
            } else {
                return 0;
            }
        }
    }
    const p = program.split("\n");
    for (let i = 0; i < p.length; i++) {
        const [command, a, b] = p[i].split(" ");
        let result;
        switch (command) {
            case "inp":
                result = inputs.shift();
                break;
            case "add":
                result = getValue(a) + getValue(b);
                break;
            case "mul":
                result = getValue(a) * getValue(b);
                break;
            case "div":
                result = Number.parseInt(getValue(a) / getValue(b));
                break;
            case "mod":
                result = getValue(a) % getValue(b);
                break;
            case "eql":
                result = getValue(a) == getValue(b) ? 1 : 0;
                break;
        }
        if (Number.isNaN(result)){
            console.log("broken at", p[i],store);
            break;
        }
        else{
            store.set(a,result);
        }
    }
    return store;
}

console.log("Negate 6", ALU([6], programNegate))
console.log("Negate -6", ALU([-6], programNegate))

console.log("threeTimesLarger 4,7", ALU([4, 7], programCheckthreeTimesLarger))
console.log("threeTimesLarger 4,13", ALU([4, 13], programCheckthreeTimesLarger))
console.log("threeTimesLarger 4,12", ALU([4, 12], programCheckthreeTimesLarger))

console.log("toBinary 0", ALU([0], programToBinary))
console.log("toBinary 1", ALU([1], programToBinary))
console.log("toBinary 2", ALU([2], programToBinary))
console.log("toBinary 3", ALU([3], programToBinary))
console.log("toBinary 15", ALU([15], programToBinary))

const MONAD = Array.from({length: 14}, _ => 9);
const fix = [
]
for (let i = 0;i<fix.length;i++){
    MONAD[MONAD.length-fix.length+i]=fix[i];
}
const decrMonad = () => {
    let cur = MONAD.length - 1-fix.length;
    let finished = false;
    while (cur >= 0 && !finished) {
        if (MONAD[cur] > 1) {
            MONAD[cur]--;
            finished = true;
        } else {
            MONAD[cur] = 9;
            cur--;
        }
    }
}

const incrMonad = ()=>{
    let cur = MONAD.length - 1-fix.length;
    let finished = false;
    while (cur >= 0 && !finished) {
        if (MONAD[cur] < 9) {
            MONAD[cur]++;
            finished = true;
        } else {
            MONAD[cur] = 1;
            cur--;
        }
    }
}

let valid = false;
while (!valid) {
    const result = ALU(MONAD, programCheckMONAD);
    valid = result.has("z") && result.get("z") == 0;
    if (valid){
        console.log(MONAD,result)
    }

    if (!valid) {
        decrMonad()
    }
}

console.log("largest Monad", Number.parseInt(MONAD.join("")));