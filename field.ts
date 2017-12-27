import view = require("./view");

export class Field {
    private _field: Array<Array<number>>;
    private _size: number;
    private _view: view.View;
    private _turn: number;

    get size(): number {
        return this._size;
    }

    get field(): Array<Array<number>> {
        return this._field;
    }

    constructor(arg1: number, arg2: view.View) {
        this._size = arg1;
        this._turn = 0;
        var body = new Array(arg1);
        for (var i: number = 0; i < arg1; i++) {
            var column: Array<number> = new Array(arg1);
            for (var j: number = 0; j < arg1; j++) {
                column[j] = 0; //(j + i) % 2 == 0 ? 1 : 2;
            }
            body[i] = column;
        }
        this._field = body;
        this._view = arg2;
    }

    putStone: (vec: number[]) => void = (vec: number[]) => {
        if (this._field[vec[0]][vec[1]] == 0) {
            this._field[vec[0]][vec[1]] = this._turn == 1 ?  2 : 1;
       }
        this._view.drawField(this._field, this._size);
    }
}
