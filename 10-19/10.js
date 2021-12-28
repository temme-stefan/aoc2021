import {navigationLines} from "./10-data.js";

const testLines = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const lines = navigationLines
    .split("\n");
const validated = lines.map(validateRow);

console.log("ErrorScore", validated.map(getErrorScore).reduce((a, b) => a + b, 0));

const autoCompletescores = validated.filter(x=>x.incomplete).map(getAutocompleteScore);
autoCompletescores.sort((a,b)=>Math.sign(a-b));

console.log("AutoCompleteScore", autoCompletescores[Math.floor(autoCompletescores.length/2)]);

function validateRow(row) {
    let reduced = row;
    let oldlength = reduced.length + 1;
    while (oldlength > reduced.length) {
        oldlength = reduced.length;
        reduced = reduced.replace(/(\(\)|<>|\[\]|\{\})/, "");
    }
    const incomplete = reduced.match(/^[(<[{]+$/) != null
    const error = reduced.match(/[\])>}]/)?.[0] ?? null;
    return {
        valid: reduced.length==0,
        error,
        incomplete,
        row,
        reduced
    }
}

function getErrorScore({error}) {
    switch (error) {
        case ")":
            return 3;
        case "]":
            return 57;
        case "}":
            return 1197;
        case ">":
            return 25137;
        default :
            return 0;
    }

}

function getAutocompleteScore({reduced}) {
    let score = 0;
    reduced.split("").reverse().forEach(c => {
        let value = 0;
        switch (c) {
            case "(":
                value = 1;
                break;
            case "[":
                value = 2;
                break;
            case "{":
                value = 3;
                break;
            case "<":
                value = 4;
                break;
        }
        score = score * 5 + value;
    });
    return score;
}