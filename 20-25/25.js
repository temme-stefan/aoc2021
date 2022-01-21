import {seaCucumberKeys, seaCucumberMap, testSeaCucumberMap} from "./25-data.js";

let map = seaCucumberMap.split("\n").map(r => r.split(""));
let moved = false;
let steps = 0;

do {
    let eastMoved = false;
    let southMoved = false;
    ({map, moved: eastMoved} = moveEast(map));
    ({map, moved: southMoved} = moveSouth(map));
    moved = eastMoved || southMoved;
    steps++;
} while (moved);
console.log("Nothing moved in Step ", steps)

function moveEast(map) {
    let moved = false;
    const newMap = map.map(r => r.map(_ => seaCucumberKeys.free));
    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            if (map[i][j] == seaCucumberKeys.south) {
                newMap[i][j] = seaCucumberKeys.south;
            } else {
                if (map[i][j] == seaCucumberKeys.east) {
                    const aheadJ = (j + 1) % newMap[i].length;
                    if (map[i][aheadJ] == seaCucumberKeys.free) {
                        newMap[i][aheadJ] = seaCucumberKeys.east;
                        moved = true;
                    } else {
                        newMap[i][j] = seaCucumberKeys.east;
                    }
                }
            }
        }
    }
    return {
        map: newMap,
        moved
    }
}

function moveSouth(map) {
    let moved = false;
    const newMap = map.map(r => r.map(_ => seaCucumberKeys.free));
    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            if (map[i][j] == seaCucumberKeys.east) {
                newMap[i][j] = seaCucumberKeys.east;
            } else {
                if (map[i][j] == seaCucumberKeys.south) {
                    const aheadI = (i + 1) % newMap.length;
                    if (map[aheadI][j] == seaCucumberKeys.free) {
                        newMap[aheadI][j] = seaCucumberKeys.south;
                        moved = true;
                    } else {
                        newMap[i][j] = seaCucumberKeys.south;
                    }
                }
            }
        }
    }
    return {
        map: newMap,
        moved
    }
}


function print(map) {
    console.log(map.map(r => r.join("")).join("\n") + "\n");
}