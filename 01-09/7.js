import {positions} from "./7-data.js";

const testPositions = [16,1,2,0,4,2,7,1,2,14];

const data =[...
    /*
        testPositions
    /*/
    positions
//*/
];
data.sort((a,b)=>Math.sign(a-b))

function calculateFuel(data,position){
    return data.reduce((a,b)=>a+ Math.abs(b-position) ,0);
}

function calculateFuel2(data,position){
    return data.reduce((a,b)=>{
        const n = Math.abs(b-position);
        return a + (n*(n+1)/2)
    } ,0);
}

const median = data[Math.floor(data.length/2)];

console.log("One Step one Fuel:", calculateFuel(data,median));

const mittelwert = data.reduce((a,b)=>a+b,0)/data.length;

const m1 = Math.floor(mittelwert), m2 = Math.ceil(mittelwert);
const m = calculateFuel2(data,m1)<calculateFuel2(data, m2)?m1:m2;
console.log("One Step increasing Fuel:", calculateFuel2(data,m));


