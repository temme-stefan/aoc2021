export class countingMap extends Map {

    /**
     * @param key {any}
     * @param amount {number}
     */
    increase(key, amount = 1) {
        this.set(key, (this.get(key) ?? 0) + amount);
    };

    /**
     * @returns {{min: [any,number], max: [any,number]}}
     */
    minmax() {
        return [...this.entries()].reduce(({min, max}, x) => {
                min = min[1] <= x[1] ? min : x;
                max = max[1] >= x[1] ? max : x;
                return {
                    min, max
                }
            }
            , {min: [null, Number.MAX_SAFE_INTEGER], max: [null, Number.MIN_SAFE_INTEGER]});
    }
}

