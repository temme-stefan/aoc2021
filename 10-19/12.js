import {testCave1, testCave2, testCave3, finalCave} from "./12-data.js";

const start = "start";
const end = "end";
const part = 2;


const {nodes, adjacentList} = getCaveMap(finalCave);


const visited = nodes.map(_ => false);
setVisited(start, true);
const path = [start]; //only used for debugging purposses
let pathcount = 0;
let doubleVisited = null;

getPathesToEnd(start, path);

function getPathesToEnd(lastNode) {
    if (lastNode == end) {
        pathcount++;
        console.log(path.join("-"));
    } else {
        getVisitableNeighbours(lastNode)
            .forEach(node => {
                setVisited(node, true);
                path.push(node);
                getPathesToEnd(node)
                path.pop(node);
                setVisited(node, false);
            });
    }
}

console.log("Pathes found:", pathcount)

function getVisitableNeighbours(node) {
    return adjacentList.get(node)
        .filter(neighbour => !isVisited(neighbour)
            || (part == 2 && doubleVisited == null && neighbour != start)
        ); // and maybe ensure no Big-CaveCircel?
}

function setVisited(cave, visit) {
    if (!isBigCave(cave)) {
        if (part == 2) {
            if (visited[nodes.indexOf(cave)] && visit) {
                doubleVisited = cave;
            } else if (!visit && doubleVisited == cave) {
                doubleVisited = null;
            } else {
                visited[nodes.indexOf(cave)] = visit;
            }
        } else {
            visited[nodes.indexOf(cave)] = visit;
        }
    }
}

function isVisited(cave) {
    return visited[nodes.indexOf(cave)];
}

function isBigCave(cave) {
    return cave.toUpperCase() == cave;
}

function getCaveMap(caveScan) {
    const nodeNames = new Set();
    const adjacentList = new Map();
    const addToList = (from, to) => {
        if (!adjacentList.has(from)) {
            adjacentList.set(from, []);
        }
        const l = adjacentList.get(from);
        l.push(to);
        l.sort();
    };
    caveScan.split("\n").forEach(edge => {
        const [a, b] = edge.split('-');
        nodeNames.add(a);
        nodeNames.add(b);
        addToList(a, b);
        addToList(b, a);
    });
    return {nodes: [...nodeNames], adjacentList};
}