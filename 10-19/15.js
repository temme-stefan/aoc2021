import {cavern, testCavern} from "./15-data.js";


let data = cavern
    .split("\n").map(r => r.split("").map(x => parseInt(x)));
const step = 2;
if (step == 2) {
    data = multiSize(data);
}
const size = {x: data[0].length, y: data.length}

const nodes = data.map((r, y) => r.map((_, x) => [x, y])).flat();
const distances = Array.from({length: size.x * size.y}, (_, i) => i == 0 ? 0 : Number.POSITIVE_INFINITY);
const preceder = Array.from({length: size.x * size.y}, (_) => null);
const Q = new Set(Array.from({length: size.x * size.y}, (_, i) => i));
const cand = [0];

//(using Q as Set and seperate cand we tweek the runtime a little)


while (Q.size > 0) {
    const u = getNextNode();
    if (u == nodes.length - 1) {
        break;
    }
    const [x, y] = nodes[u];
    getNeighboursInQ(x, y).forEach(v => {
        updateDistance(u, v);
    })
}
console.log("Shortest Path:", distances[distances.length - 1]);

// const path = [distances.length-1];
// while (preceder[path[0]]!=null){
//     path.unshift(preceder[path[0]]);
// }
// console.log(path.map(i=>{
//     const [x,y]= nodes[i];
//     return data[y][x];
// }).reduce((a,b)=>a+b ,-data[0][0]))

function getNextNode() { //~ O(|V|)
    const next = cand.reduce((a, b) => (a!=null && distances[a] < distances[b])?a:b, null);
    cand.splice(cand.indexOf(next),1);
    Q.delete(next);
    return next;
}

function getNeighboursInQ(x, y) { //much faster than O(|V|) No Implementation details found for Set.prototype.has
    const n = [];
    if (x + 1 < size.x) {
        n.push(y * size.y + x + 1);
    }
    if (y + 1 < size.y) {
        n.push((y + 1) * size.y + x);
    }
    if (x - 1 >= 0) {
        n.push(y * size.y + x - 1);
    }
    if (y - 1 >= 0) {
        n.push((y - 1) * size.y + x);
    }
    return n.filter(x => Q.has(x));
}

function updateDistance(u, v) { //O(1)
    const cost_uv = data[nodes[v][1]][nodes[v][0]];
    const alt = distances[u] + cost_uv;
    if (distances[v] == Number.POSITIVE_INFINITY) {
        cand.push(v);
    }
    if (alt < distances[v]) {
        distances[v] = alt;
        preceder[v] = u;
    }
}

function multiSize(cavern) {
    const updateValue = (v, add) => (v + add) < 10 ? (v + add) : (v + add - 9);
    const newCave = Array.from({length: cavern.length * 5}, (_, y) => Array.from({length: cavern[0].length * 5}, (__, x) => {
        const oX = x % cavern[0].length;
        const oY = y % cavern.length;
        const dX = Math.floor(x / cavern[0].length);
        const dY = Math.floor(y / cavern.length);
        return updateValue(cavern[oY][oX], dX + dY);
    }));
    return newCave;
}

