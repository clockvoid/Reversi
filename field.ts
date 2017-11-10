import View = require("./view");

export class Field {
    _field: Array<Array<number>>
    _size: number;
    _view: View.View;
    _turn: number;

    get size(): number {
        return this._size;
    }

    get field(): Array<Array<number>> {
        return this._field;
    }

    constructor(size: number, view: View.View) {
        this._size = size;
        this._turn = 0;
        var body = new Array(size);
        for (var i: number = 0; i < size; i++) {
            var column: Array<number> = new Array(size);
            for (var j: number = 0; j < size; j++) {
                column[j] = 0; //(j + i) % 2 == 0 ? 1 : 2;
            }
            body[i] = column;
        }
        this._field = body;
        this._view = view;
    }

    putStone: any = (vec: number[]) => {
        if (this._field[vec[0]][vec[1]] == 0) {
            this._field[vec[0]][vec[1]] = this._turn == 1 ?  2 : 1;
            this._turn = 1 - this._turn;
        }
        this._view.drawField(this._field, 8);
    }
}
