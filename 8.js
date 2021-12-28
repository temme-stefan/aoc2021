import {segments} from "./8-data.js";

const singleTest = [
    {
        input: ["acedgfb", "cdfbe", "gcdfa", "fbcad", "dab", "cefabd", "cdfgeb", "eafb", "cagedb", "ab"],
        output: ["cdfeb", "fcadb", "cdfeb", "cdbaf"]
    }
]

const testSegments = [
    {
        input: ["be", "cfbegad", "cbdgef", "fgaecd", "cgeb", "fdcge", "agebfd", "fecdb", "fabcd", "edb"],
        output: ["fdgacbe", "cefdb", "cefbgd", "gcbe"]
    },
    {
        input: ["edbfga", "begcd", "cbg", "gc", "gcadebf", "fbgde", "acbgfd", "abcde", "gfcbed", "gfec"],
        output: ["fcgedb", "cgb", "dgebacf", "gc"]
    },
    {
        input: ["fgaebd", "cg", "bdaec", "gdafb", "agbcfd", "gdcbef", "bgcad", "gfac", "gcb", "cdgabef"],
        output: ["cg", "cg", "fdcagb", "cbg"]
    },
    {
        input: ["fbegcd", "cbd", "adcefb", "dageb", "afcb", "bc", "aefdc", "ecdab", "fgdeca", "fcdbega"],
        output: ["efabcd", "cedba", "gadfec", "cb"]
    },
    {
        input: ["aecbfdg", "fbg", "gf", "bafeg", "dbefa", "fcge", "gcbea", "fcaegb", "dgceab", "fcbdga"],
        output: ["gecf", "egdcabf", "bgf", "bfgea"]
    },
    {
        input: ["fgeab", "ca", "afcebg", "bdacfeg", "cfaedg", "gcfdb", "baec", "bfadeg", "bafgc", "acf"],
        output: ["gebdcfa", "ecba", "ca", "fadegcb"]
    },
    {
        input: ["dbcfg", "fgd", "bdegcaf", "fgec", "aegbdf", "ecdfab", "fbedc", "dacgb", "gdcebf", "gf"],
        output: ["cefg", "dcbef", "fcge", "gbcadfe"]
    },
    {
        input: ["bdfegc", "cbegaf", "gecbf", "dfcage", "bdacg", "ed", "bedf", "ced", "adcbefg", "gebcd"],
        output: ["ed", "bcgafe", "cdgba", "cbgef"]
    },
    {
        input: ["egadfb", "cdbfeg", "cegd", "fecab", "cgb", "gbdefca", "cg", "fgcdab", "egfdb", "bfceg"],
        output: ["gbdfcae", "bgc", "cg", "cgb"]
    },
    {
        input: ["gcafb", "gcf", "dcaebfg", "ecagb", "gf", "abcdeg", "gaef", "cafbge", "fdbac", "fegbdc"],
        output: ["fgae", "cfgab", "fg", "bagce"]
    }
];

const data = segments;


data.forEach((sequence) => {
    sequence.input = sequence.input.map(sortLetters);
    sequence.output = sequence.output.map(sortLetters);
})


console.log("1,4,7,8", count_1_4_7_8(data));
console.log("sumOutputs", sumOutputs(data));

function sortLetters(s) {
    const letters = s.split("");
    letters.sort();
    return letters.join("");
}

function combine(s1, s2) {
    const s = [...new Set([...s1, ...s2])];
    s.sort();
    return s.join("")
}

function substract(s1, s2) {
    const s = [...s1];
    [...s2].forEach(c => {
        while (s.includes(c)) {
            s.splice(s.indexOf(c), 1);
        }
    });
    return s.join("")
}

function count_1_4_7_8(data) {
    let count = 0;
    data.forEach(({input, output}) => {
        const all = [...input, ...output];
        const one = guessOne(all);
        const four = guessFour(all);
        const seven = guessSeven(all);
        const eight = guessEight(all);
        const use = [one, four, seven, eight];
        count += output.filter(x => use.includes(x)).length;
    });
    return count;
}

function sumOutputs(data) {
    let sum = 0;
    data.forEach(({input, output}) => {
        const all = [...input, ...output];
        const one = guessOne(all);
        const four = guessFour(all);
        const seven = guessSeven(all);
        const eight = guessEight(all);
        const nine = guessNine(all, four, seven);
        const {five, six} = guessFiveSix(all, one, nine);
        const zero = guessZero(all, six, nine);
        const {two, three} = guessTwoThree(all, five, six);
        const digits = [zero, one, two, three, four, five, six, seven,eight,nine];
        const l = output.length;
        for (let i = 0;i<l;i++){
            const digit = digits.indexOf(output[l-1-i]);
            sum+= digit * Math.pow(10,i);

        }
    });
    return sum;
}

function guessZero(digits, six, nine) {
    return digits.find(s => s.length == 6 && s != six && s != nine);
}

function guessOne(digits) {
    return digits.find(s => s.length == 2);
}

function guessTwoThree(digits, five, six) {
    const n = substract(six, five)[0];
    const twoThree = digits.filter(s => s.length == 5 && s != five);
    return {
        two: twoThree.find(s => s.includes(n)),
        three: twoThree.find(s => !s.includes(n))
    }
}

function guessFour(digits) {
    return digits.find(s => s.length == 4);
}

function guessFiveSix(digits, one, nine) {
    const n = [...substract(nine, one)];
    const fiveSix = digits.filter(s => s!=nine && n.every(c => s.includes(c)) );
    return {five: fiveSix.find(s => s.length == 5), six: fiveSix.find(s => s.length == 6)};
}

function guessSeven(digits) {
    return digits.find(s => s.length == 3);
}

function guessEight(digits) {
    return digits.find(s => s.length == 7);
}

function guessNine(digits, four, seven) {
    const n = [...combine(four, seven)];
    return digits.find(s => s.length == 6 && n.every(c => s.includes(c)));
}

