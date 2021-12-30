const octoData = `7777838353
2217272478
3355318645
2242618113
7182468666
5441641111
4773862364
5717125521
7542127721
4576678341`;

const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;



const dataMap = octoData
    .split("\n").map((r) => r.split(""));
const octoMap = dataMap.map((r, i) => r.map((c, j) => getOctopus(c, i, j)));
const allOctos = octoMap.flat();

const steps = 300;
let i=0;
let flashes=0;

for (; i < steps; i++) {
    allOctos.forEach(o => o.increase());
    let needsFlash = allOctos.filter(o => o.needsFlash());
    let lastflashes=0;
    while (needsFlash.length > 0) {
        needsFlash.forEach(o => o.flash());
        lastflashes+=needsFlash.length;
        needsFlash = allOctos.filter(o => o.needsFlash());
    }
    flashes+=lastflashes;
    allOctos.forEach(o => o.reset());
    if (lastflashes==100){
        break;
    }
}
console.log("After Step:", i+1);
printOctoMap();
console.log("Flashes:", flashes);
console.log("All simoultaneous:", i+1);


function printOctoMap() {
    console.log(octoMap.map(r => r.map(o => o.print()).join("")).join("\n") + "\n");
}

function getOctopus(input, i, j) {
    let val = parseInt(input);
    const neighbours = [
        [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
        [i, j - 1], [i, j + 1],
        [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
    ].filter(([x, y]) => x >= 0 && y >= 0 && x < dataMap.length && y < dataMap[x].length);
    let flashed = false;
    const increase = () => {
        if (!flashed && val <= 9) {
            val++;
        }
    }
    const reset = () => {
        flashed = false;
    };
    const needsFlash = () => {
        return !flashed && val > 9;
    }
    const flash = () => {
        flashed = true;
        val = 0;
        neighbours.forEach(([x, y]) => {
            const other = octoMap[x][y];
            other.increase();
        });

    }

    const print = () => {
        return flashed ? "\x1b[31m" + val + "\x1b[0m" : val;
    }
    return {
        increase, reset, needsFlash, print, flash
    }
}