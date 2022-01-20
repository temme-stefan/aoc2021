import {cuboids, minitestcuboids, testcuboids, testcuboids2} from "./22-data.js";

const data = parseInput(cuboids)

const cuboid = (range) => (point) => ["x", "y", "z"].every(k => range[k].min <= point[k] && point[k] <= range[k].max);
const union = (c1, c2) => (point) => c2(point) || c1(point);
const substract = (c1, c2) => (point) => !c2(point) && c1(point);

const reactor = data.reduce((a, {
    on,
    ...range
}) => on ? union(a, cuboid(range)) : substract(a, cuboid(range)), (point) => false);

const range = {
    x: {
        min: -50,
        max: 50
    },
    y: {
        min: -50,
        max: 50
    },
    z: {
        min: -50,
        max: 50
    }
};
const step = 2;
if (step == 2) {
    data.forEach(({on,x, y, z}) => {
        if (on) {
            range.x.min = Math.min(range.x.min, x.min);
            range.y.min = Math.min(range.y.min, y.min);
            range.z.min = Math.min(range.z.min, z.min);
            range.x.max = Math.max(range.x.max, x.max);
            range.y.max = Math.max(range.y.max, y.max);
            range.z.max = Math.max(range.z.max, z.max);
        }
    })
}
console.log(range);

let count = 0;
console.time()
for (let x = range.x.min; x <= range.x.max; x++) {
    for (let y = range.y.min; y <= range.y.max; y++) {
        for (let z = range.z.min; z <= range.z.max; z++) {
            if (reactor({x, y, z})) {
                count++;

            }
        }
    }
}
console.timeEnd();

console.log(count);


/**
 * @param s {string}
 * @returns { {on:boolean,x:{min:number,max:number},y:{min:number,max:number},z:{min:number,max:number}}[] }
 */
function parseInput(s) {
    const cuboids = s.split("\n").map(r => {
        const m = r.match(/(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/);
        return {
            on: m[1] == "on",
            x: {
                min: parseInt(m[2]),
                max: parseInt(m[3])
            },
            y: {
                min: parseInt(m[4]),
                max: parseInt(m[5])
            },
            z: {
                min: parseInt(m[6]),
                max: parseInt(m[7])
            }
        }

    })

    return cuboids;
}