import {testPaper, finalPaper} from "./13-data.js";

const point = "\x1b[40m#\x1b[0m";
const other = ".";

const {map, foldings} = parsePaper(finalPaper);

let step = map;

foldings.forEach((f,i)=>{
    step=foldMap(f,step);
    if (i==0){
        console.log("Nach ersten Schritt:",count(step));
    }
});
printMap(step);

function foldMap({axis, index}, map) {
    let newMap;
    if (axis == "y") {
        newMap = map.filter((r, i) => i < index);
        const mirrored = map.filter((r, i) => i > index);
        mirrored.forEach((r, i) => r.forEach((p, j) => {
            if (p == point) {
                newMap[index - 1 - i][j] = p;
            }
        }))
    } else {
        newMap = map.map(r => r.filter((x, i) => i < index));
        const mirrored = map.map(r => r.filter((x, i) => i > index));
        mirrored.forEach((r, i) => r.forEach((p, j) => {
            if (p == point) {
                newMap[i][index - 1 - j] = p;
            }
        }));
    }
    return newMap;
}


function count(map) {
    return map.reduce((a, b) => a + b.reduce((c, d) => c + (d == point ? 1 : 0), 0), 0)
}

function printMap(map) {
    console.log(map.map(r => r.join("")).join("\n")+"\n");
}

function parseMap(pointData) {
    const points = pointData.split("\n").map(r => r.split(",").map(x => parseInt(x)))
    const size = points.reduce(({x, y}, [xi, yi]) => {
        return {
            x: Math.max(x, xi),
            y: Math.max(y, yi)
        }
    }, {x: 0, y: 0})
    const map = Array.from({length: size.y + 1}, _ => Array.from({length: size.x + 1}, __ => other));
    points.forEach(([x, y]) => map[y][x] = point);
    return map;
}

function parseFoldings(foldingData) {
    return foldingData.split("\n").map(f => {
        const [axis, index] = f.split(" ")[2].split("=");
        return {
            axis,
            index: parseInt(index)
        }
    });
}

function parsePaper(paper) {
    const [pointData, foldingData] = paper.split("\n\n");
    const map = parseMap(pointData);
    const foldings = parseFoldings(foldingData);

    return {map, foldings};
}