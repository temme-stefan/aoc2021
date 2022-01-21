import {miniTestReactorCommands, reactorCommands, testReactorCommands, testReactorCommands2} from "./22-data.js";
import {cuboid} from "../Cuboid/cuboid.js";

const data = parseInput(testReactorCommands2)
console.time();

/**
 * @type {cuboid[]}
 */
let reactor = [];

data.forEach(({on, cuboid}) => {
    reactor = reactor.map(c => c.doIntersectWith(cuboid)).flat();
    if (on) {
        reactor.push(cuboid);
    }
});

const count = reactor.reduce((a, c) => a + c.getSize(), 0);
console.log("Cubes ON:", count);

const infinityCube={
    x:{min:Number.NEGATIVE_INFINITY,max:Number.POSITIVE_INFINITY},
    y:{min:Number.NEGATIVE_INFINITY,max:Number.POSITIVE_INFINITY},
    z:{min:Number.NEGATIVE_INFINITY,max:Number.POSITIVE_INFINITY}
}
const limitCubes = [
    new cuboid({...infinityCube,x:{min:Number.NEGATIVE_INFINITY,max:-51}}),
    new cuboid({...infinityCube,x:{min:51,max:Number.POSITIVE_INFINITY}}),
    new cuboid({...infinityCube,y:{min:Number.NEGATIVE_INFINITY,max:-51}}),
    new cuboid({...infinityCube,y:{min:51,max:Number.POSITIVE_INFINITY}}),
    new cuboid({...infinityCube,z:{min:Number.NEGATIVE_INFINITY,max:-51}}),
    new cuboid({...infinityCube,z:{min:51,max:Number.POSITIVE_INFINITY}})
];
limitCubes.forEach(c=>{
    reactor = reactor.map(c2=>c2.doIntersectWith(c)).flat();
})

const count2 = reactor.reduce((a, c) => a + c.getSize(), 0);
console.log("Cubes ON in limitBox [-50,50]x[-50,50]x[-50,50]:", count2);



console.timeEnd();


/**
 * @param s {string}
 * @returns {{cuboid: cuboid, on: boolean}[]}
 */
function parseInput(s) {
    const cuboids = s.split("\n").map(r => {
        const [on, cString] = r.split(" ");
        return {
            on: on == "on",
            cuboid: cuboid.fromString(cString)
        }
    });
    return cuboids;
}