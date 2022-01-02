import {exampleTrench, trench} from "./20-data.js";

let {algorithm, image} = parseData(trench);
let def = "0"
const steps = 50;

for (let step = 0; step < steps; step++) {
    image = grow(image,def);
    image = image.map((r, i) => r.map((c, j) => {
        if (i == 0 || j == 0 || i == image.length - 1 || j == image[0].length - 1) {
            return c;
        } else {
            return getPixel(image,i,j);
        }
    }));
    def = def=="0"?algorithm[0]:algorithm[512-1];
    image = shrink(image);
}
printImage(image)

console.log(count1(image));

function count1(image){
    return image.reduce((a,r)=>a+r.reduce((a,c)=>a+parseInt(c),0),0);
}

function grow(image,def) {
    const h = image.length + 6;
    const w = image[0].length + 6;
    const zeroRow = Array.from({length: w}, _ => def);
    const result = image.map(r => [def,def,def, ...r, def,def,def]);
    result.unshift([...zeroRow],[...zeroRow],[...zeroRow]);
    result.push([...zeroRow],[...zeroRow],[...zeroRow]);
    return result;
}

function shrink(image){
    image.pop();
    image.shift();
    return image.map(([_,...r])=>{
        r.pop();
        return r;
    })
}

function printImage(image) {
    console.log(image.map((r) => r.map(c => c == "0" ? "." : "\x1b[40m#\x1b[0m").join("")).join("\n") + "\n");
}

/**
 *
 * @param s {string}
 * @returns {string}
 */
function getPixel(image,i,j) {
    const s = [
        image[i - 1][j - 1], image[i - 1][j], image[i - 1][j + 1],
        image[i][j - 1], image[i][j], image[i][j + 1],
        image[i + 1][j - 1], image[i + 1][j], image[i + 1][j + 1],
    ].join("");
    const ind = parseInt(s, 2);
    return algorithm[ind];
}

/**
 *
 * @param trench {string}
 * @returns {{image: ("0" | "1")[][], algorithm: string}}
 */
function parseData(trench) {
    const [algorithm, imageData] = trench.split("\n\n");
    /**
     * @type {("0" | "1")[][]}
     */
    const image = imageData.split("\n").map(r => r.split("").map(c => c == "." ? "0" : "1"));

    return {algorithm:algorithm.split("").map(c => c == "." ? "0" : "1"), image};
}