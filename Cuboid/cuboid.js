export class cuboid {
    x = {min: 0, max: 0}
    y = {min: 0, max: 0}
    z = {min: 0, max: 0}

    /**
     *
     * @param x{{min:number,max:number}}
     * @param y{{min:number,max:number}}
     * @param z{{min:number,max:number}}
     */
    constructor({x, y, z}) {
        this.x = {...this.x, ...x};
        this.y = {...this.y, ...y};
        this.z = {...this.z, ...z};
    }


    /**
     *
     * @param s {string}
     * @return {cuboid}
     */
    static fromString(s) {
        const pattern = /x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;
        const m = s.match(pattern);
        return new cuboid({
            x: {
                min: parseInt(m[1]),
                max: parseInt(m[2])
            },
            y: {
                min: parseInt(m[3]),
                max: parseInt(m[4])
            },
            z: {
                min: parseInt(m[5]),
                max: parseInt(m[6])
            }
        })
    }

    toString() {
        return `x=${this.x.min}..${this.x.max},y=${this.y.min}..${this.y.max},z=${this.z.min}..${this.z.max}`;
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return ["x", "y", "z"].some(k => this[k].min > this[k].max);
    }

    /**
     * @returns {number}
     */
    getSize() {
        if (this.isEmpty()) {
            return 0;
        }
        return ["x", "y", "z"].reduce((a, k) => a * (this[k].max - this[k].min + 1), 1);
    }

    /**
     * @param other {cuboid}
     * @return {boolean}
     */
    hasIntersection(other) {
        const intervallContains = (min, max, v) => min <= v && v <= max;
        const intervallIntersects = ({min: min1, max: max1}, {min: min2, max: max2}) =>
            intervallContains(min1, max1, min2)
            || intervallContains(min1, max1, max2)
            || intervallContains(min2, max2, min1)
            || intervallContains(min2, max2, max1);

        return ["x", "y", "z"].every(k => intervallIntersects(this[k], other[k]))
    }

    /**
     * @param other {cuboid}
     * @return {cuboid}
     */
    getIntersection(other) {
        return new cuboid({
            x: {
                min: Math.max(this.x.min, other.x.min),
                max: Math.min(this.x.max, other.x.max)
            },
            y: {
                min: Math.max(this.y.min, other.y.min),
                max: Math.min(this.y.max, other.y.max)
            },
            z: {
                min: Math.max(this.z.min, other.z.min),
                max: Math.min(this.z.max, other.z.max)
            }
        })
    }

    /**
     * @param other {cuboid}
     * @return {cuboid[]}
     */
    doIntersectWith(other) {
        if (this.hasIntersection(other)) {
            const i = this.getIntersection(other);
            const above = new cuboid({
                x: {
                    min: this.x.min,
                    max: this.x.max
                },
                y: {
                    min: i.y.max + 1,
                    max: this.y.max
                },
                z: {
                    min: this.z.min,
                    max: this.z.max
                }
            });
            const below = new cuboid({
                x: {
                    min: this.x.min,
                    max: this.x.max
                },
                y: {
                    min: this.y.min,
                    max: i.y.min - 1
                },
                z: {
                    min: this.z.min,
                    max: this.z.max
                }
            });
            const left = new cuboid({
                x: {
                    min: this.x.min,
                    max: i.x.min - 1
                },
                y: {
                    min: i.y.min,
                    max: i.y.max
                },
                z: {
                    min: this.z.min,
                    max: this.z.max
                }
            });
            const right = new cuboid({
                x: {
                    min: i.x.max + 1,
                    max: this.x.max
                },
                y: {
                    min: i.y.min,
                    max: i.y.max
                },
                z: {
                    min: this.z.min,
                    max: this.z.max
                }
            });
            const front = new cuboid({
                x: {
                    min: i.x.min,
                    max: i.x.max
                },
                y: {
                    min: i.y.min,
                    max: i.y.max
                },
                z: {
                    min: i.z.max + 1,
                    max: this.z.max
                }
            });
            const back = new cuboid({
                x: {
                    min: i.x.min,
                    max: i.x.max
                },
                y: {
                    min: i.y.min,
                    max: i.y.max
                },
                z: {
                    min: this.z.min,
                    max: i.z.min - 1
                }
            });
            return [above, below, left, right, front, back].filter(c => !c.isEmpty());
        } else {
            return [this];
        }
    }

}