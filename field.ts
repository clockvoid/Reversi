import view = require("./view");

class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Field {
    private _field: Array<Array<number>>;
    private _new_field: Array<Array<number>>;
    private _size: number;
    private _view: view.View;
    private _turn: number;
    private _put_able_zone: Array<Array<number>>;
    private ai: number[] = [-1, -1, -1, 0, 1, 1, 1, 0];
    private aj: number[] = [-1, 0, 1, -1, -1, 0, 1, 1];

    get size(): number {
        return this._size;
    }

    get field(): Array<Array<number>> {
        return this._field;
    }

    constructor(arg1: number, arg2: view.View) {
        this._size = arg1;
        this._turn = 0;
        var body: Array<Array<number>> = new Array();
        for (var i: number = 0; i < arg1; i++) {
            var column: Array<number> = new Array(arg1);
            for (var j: number = 0; j < arg1; j++) {
                if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
                    column[j] = 2;
                } else if ((i == 4 && j == 3) || (i == 3 && j == 4)) {
                    column[j] = 1;
                } else {
                    column[j] = 0; //(j + i) % 2 == 0 ? 1 : 2;
                }
            }
            body[i] = column;
        }
        this._field = body;
        this._view = arg2;
        this.makeNewPutableZone();
    }

    doubleArrayCopy: (sourve: Array<Array<number>>) => Array<Array<number>> = (source: Array<Array<number>>) => {
        var body: Array<Array<number>> = new Array(source.length);
        for (var i: number = 0; i < source.length; i++) {
            var column: Array<number> = new Array(source[i].length);
            for (var j: number = 0; j < source[i].length; j++) {
                column[j] = source[i][j];
            }
            body[i] = column;
        }
        return body;
    }

    doubleArrayEquals: (target: Array<Array<number>>, source: Array<Array<number>>) => boolean = (target: Array<Array<number>>, source: Array<Array<number>>) => {
        for (var i: number = 0; i < source.length; i++) {
            for (var j: number = 0; j < source[i].length; j++) {
                if (target[i][j] != source[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    makeNewPutableZone: () => void = () => {
        this._put_able_zone = new Array();
        for (var i: number = 0; i < this._size; i++) {
            for (var j: number = 0; j < this._size; j++) {
                this._new_field = this.doubleArrayCopy(this._field);
                this.checkReverce([i, j]);
                if (!this.doubleArrayEquals(this._new_field, this._field)) {
                    this._put_able_zone.push([i, j]);
                }
            }
        }
    }

    check: (x: number, y: number, dx: number, dy: number) => number = (x: number, y: number, dx: number, dy: number) =>  {
        var returnValue: number = 0;
        if (x + dx >= 0 && x + dx < this._size && y + dy >= 0 && y + dy < this._size) {
            if (this._field[x + dx][y + dy] == (this._turn == 0 ? 2 : 1)) {
                returnValue = this.check(x + dx, y + dy, dx, dy);
                if (returnValue == 1) {
                    this._new_field[x + dx][y + dy] = this._turn == 0 ? 1 : 2;
                }
                return returnValue;
            } else if (this._field[x + dx][y + dy] == (this._turn == 0 ? 1 : 2)) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    checkReverce: (vec: number[]) => number = (vec: number[]) => {
        var returnValue: number = 0;

        for (var n: number = 0; n < 8; n++) {
            let flag: number = this.check(vec[0], vec[1], this.ai[n], this.aj[n]);
            returnValue = returnValue < flag ? flag : returnValue;
        }

        return returnValue;
    }

    searchNewPosition: (vec: number[]) => number = (vec: number[]) => {
        var returnValue: number = 0;

        for (var i = 0; i < this._put_able_zone.length; i++) {
            if (vec[0] == this._put_able_zone[i][0] && vec[1] == this._put_able_zone[i][1]) {
                returnValue = 1;
            }
        }

        return returnValue;
    }

    putStone: (vec: number[]) => void = (vec: number[]) => {
        if (this.searchNewPosition(vec) && this._field[vec[0]][vec[1]] == 0) {
            this.checkReverce(vec);
            this._field = this._new_field;
            this._field[vec[0]][vec[1]] = this._turn == 1 ?  2 : 1;
            this._turn = 1 - this._turn;
            this._view.viewTurn(this._turn);
            this.makeNewPutableZone();
            this._view.drawField(this._field, this._size);
        } else {
            //console.log("You cannot put here, you can put:" + this._put_able_zone);
        }
    }

    skip: () => void = () => {
        console.log("skipped");
        this._turn = 1 - this._turn;
        this.makeNewPutableZone();
        this._view.viewTurn(this._turn);
    }
}
