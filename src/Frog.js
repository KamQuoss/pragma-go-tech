import { getAdjustingFields } from './helpers'

export default class Frog {
    constructor(gender, position, characteristics) {
        this.gender = gender;
        this.position = position
        this.characteristics = characteristics
    }
    getJumpCoverage() {
        let range = this.gender === 'male' ? 3 : 2;
        let diagonalRange = this.gender === 'male' ? [-33, -22, -11, -9, -18, -27, 9, 18, 27, 11, 22, 33] : [-22, -11, -9, -18, 9, 18, 11, 22]

        let possibleHorizontal = [...Array((range * 2) + 1)].map((_, i) => (this.position - range) + i * 1); // method from https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only/49577331#49577331
        let possibleVertical = [...Array((range * 2) + 1)].map((_, i) => (this.position - (range * 10)) + i * 10);
        let possibleDiagonal = diagonalRange.map(value => this.position + value)

        return [...possibleVertical, ...possibleHorizontal, ...possibleDiagonal]
    }

    updatePosition(newPosition) {
        this.position = newPosition
    }

    getChildPositions() {
        return getAdjustingFields(this.position)
    }

    getCharacteristic() {
        let oneOrZero = (Math.random() >= 0.5) ? 1 : 0;
        return this.characteristics[oneOrZero]
    }

}