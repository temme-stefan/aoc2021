import {binaryData} from "./3-data.js";

const testData = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
];

function powerConsumption(binaryData) {
    const data = binaryData.map((x) => x.split("").map(d => d == "1"));

    const counter = Array.from(data[0], () => 0);

    const count = data.reduce((a, b) => {
        b.forEach((x, i) => {
            a[i] += x ? 1 : -1;
        });
        return a;
    }, counter);

    const gamma = Number.parseInt(count.map(c => c < 0 ? "0" : "1").join(""), 2);
    const epsilon = Number.parseInt(count.map(c => c < 0 ? "1" : "0").join(""), 2);
    return {gamma, epsilon};
}

const {gamma, epsilon} = powerConsumption(binaryData);

console.log(`3a) power consumption ${gamma * epsilon} gamma rate: ${gamma} epsilon rate:  ${epsilon}`);


function lifeSupport(binaryData) {
    function groupByNthBit(data, n) {
        const result = [[], []];
        data.forEach(bits => result[bits[n]].push(bits));
        return result;
    }

    let oxygenList = [...binaryData];
    let co2List = [...oxygenList];
    const length = oxygenList[0].length;
    let n = 0;
    while ((oxygenList.length > 1 || co2List.length > 1) && n < length) {
        if (oxygenList.length > 1) {
            const [zero, one] = groupByNthBit(oxygenList, n);
            if (zero.length > one.length) {
                oxygenList = zero;
            } else {
                oxygenList = one;
            }
        }
        if (co2List.length > 1) {
            const [zero, one] = groupByNthBit(co2List, n);
            if (one.length < zero.length) {
                co2List = one;
            } else {
                co2List = zero;
            }
        }
        n++;
    }
    const oxygen = Number.parseInt(oxygenList[0], 2);
    const co2 = Number.parseInt(co2List[0], 2);
    return {oxygen, co2};
}

const {oxygen, co2} = lifeSupport(binaryData);

console.log(`3b) life support ${oxygen * co2} oxygen generator rating: ${oxygen} CO2 scrubber rating:  ${co2}`);