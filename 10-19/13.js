import {testPaper, finalPaper} from "./13-data.js";


const {map,foldings} = parsePaper(testPaper);



printMap(map)
console.log(foldings);

function printMap(map){
    console.log(map.map(r=>r.join("")).join("\n"));
}


function parsePaper(paper){
    const [pointData,foldingData] = paper.split("\n\n");
    const points = pointData.split("\n").map(r=>r.split(",").map(x=>parseInt(x)))
    const size = points.reduce(({x,y},[xi,yi])=>{
        return {
            x:Math.max(x,xi),
            y:Math.max(y,yi)
        }
    } ,{x:0,y:0})
    const map = Array.from({length:size.y+1},_=>Array.from({length:size.x+1},__=>"."));
    points.forEach(([x,y])=>map[y][x]="#");
    const foldings = foldingData.split("\n").map(f=>{
        const [axis,index] = f.split(" ")[2].split("=");
        return {
            axis,
            index:parseInt(index)
        }
    });

    return {map,foldings};
}