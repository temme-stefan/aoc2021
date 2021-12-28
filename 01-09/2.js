import {commands} from "./2-data.js";


let depth = 0;
let position = 0;
let aim = 0;

const reset = ()=>{
    depth = 0;
    position = 0;
    aim = 0;
}

const processCommand1 = ({amount, command}) => {
    switch (command) {
        case "forward":
            position += amount;
            break;
        case "down":
            depth += amount;
            break;
        case "up":
            depth -= amount
            break;
    }
}

const processCommand2 = ({amount, command}) => {
    switch (command) {
        case "forward":
            position += amount;
            depth += aim * amount;
            break;
        case "down":
            aim += amount;
            break;
        case "up":
            aim -= amount
            break;
    }
}

commands.forEach(processCommand1);

console.log("2a", depth*position, depth,position);

reset();
commands.forEach(processCommand2);

console.log("2b", depth*position, depth,position);