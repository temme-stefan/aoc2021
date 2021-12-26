import {data1a} from "./1-data.js";

function getIncreasesedCount(data = [], sumOver = 1) {
    const result = data.reduce(({sum, count, queue}, b) => {
        const oldSum = sum;
        const oldLength= queue.length;
        queue.push(b);
        sum += b;
        if (queue.length > sumOver) {
            const last = queue.shift();
            sum -= last;
        }
        if (oldLength == sumOver && oldSum < sum){
            count++;
        }
        return {sum, count, queue};
    }, {sum: 0, count: 0, queue: []})
    return result.count;
}

console.log("1a:",getIncreasesedCount(data1a,1));
console.log("1b:",getIncreasesedCount(data1a,3));


