import {heightMap} from "./9-data.js";

const testHeightMap = `2199943210
3987894921
9856789892
8767896789
9899965678`

const map = heightMap
    .split("\n").map(r => r.split("").map(x => Number.parseInt(x)));


function isLowPoint(map, i, j) {
    const val = map[i][j];
    return getNeighbours(map, i, j).every(([x, y]) => map[x][y] > val);
}

const lowPoints = map.map((r, i) => r.filter((c, j) => isLowPoint(map, i, j))).flat();
console.log("RiskLevelSum", lowPoints.length + lowPoints.reduce((a, b) => a + b, 0));


const visited = map.map(r => r.map(_ => false));
const bassinList = [];

let free = []
while (!visited.every(r => r.every(x => x))) {
    for (let i = 0; i < visited.length && free.length == 0; i++) {
        for (let j = 0; j < visited[i].length && free.length == 0; j++) {
            if (!visited[i][j]) {
                free.push([i, j]);
            }
        }
    }
    const bassin = [];
    while (free.length > 0) {
        const [x, y] = free.shift();
        if (map[x][y] < 9 && !visited[x][y]) {
            getNeighbours(map, x, y).forEach(([x, y]) => {
                if (!visited[x][y]) {
                    free.push([x, y]);
                }
            });

            bassin.push([x, y]);
        }
        visited[x][y] = true;
    }
    if (bassin.length > 1) {
        bassinList.push(bassin);
    }
}

const bassinSizes = bassinList.map(b=>b.length);
bassinSizes.sort((a,b)=>Math.sign(b-a));
const product = bassinSizes.filter((_,i)=>i<3).reduce((a,b)=>a*b,1);
console.log("BassinSizeProduct:",product);


function getNeighbours(map, x, y) {
    const check = [[x - 1, y], [x, y - 1], [x + 1, y], [x, y + 1]];
    return check.filter(([x, y]) => inbounds(map, x, y));
}


function inbounds(map, x, y) {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}