import {lines} from "./5-data.js";

const testdata = [
    {from:{x:0,y:9},to:{x:5,y:9}},
    {from:{x:8,y:0},to:{x:0,y:8}},
    {from:{x:9,y:4},to:{x:3,y:4}},
    {from:{x:2,y:2},to:{x:2,y:1}},
    {from:{x:7,y:0},to:{x:7,y:4}},
    {from:{x:6,y:4},to:{x:2,y:0}},
    {from:{x:0,y:9},to:{x:2,y:9}},
    {from:{x:3,y:4},to:{x:1,y:4}},
    {from:{x:0,y:0},to:{x:8,y:8}},
    {from:{x:5,y:5},to:{x:8,y:2}},

];

const data = testdata;

const map = ()=> {
    const m = [];
    const drawLine = ({from:{x:fX,y:fY},to:{x:tX,y:tY}})=>{

    }
    return {drawLine}
}
