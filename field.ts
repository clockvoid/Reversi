import View = require("./view");

export class Field {
    _field: Array<Array<number>>;
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

    _decision: any = (cell: number, range: Array<Array<number>>) => {
        var f1 = 0;
        var f2 = 0;
        var f3 = 0;

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (i == 0) {
                    if (range[i][j] == cell) f1 = 1;
                    else f1 = 0;
                } else if (i == j) {
                    if (range[i][j] == cell) f2 = 1;
                    else f2 = 0;
                } else if (j == 0) {
                    if (range[i][j] == cell) f3 = 1;
                    else f3 = 0;
                }
            }
        }
        return f1 || f2 || f3;
    }

    decision: any = () => {
        var range: Array<Array<number>> = new Array();

        for (var i = 0; i < 5; i++) {
            var array = new Array();
            for (var j = 0; j < 5; j++) {
                array.push(0);
            }
            range.push(array);
        }

        for (var i = 0; i < this._size; i++) {
            for (var j = 0; j < this._size; j++) {
                if ((this._field[i][j] == 1 || this._field[i][j] == 2) && i + 4 < this._size && j + 4 < this._size) {
                    for (var a = 0; a < 5; a++) {
                        for (var b = 0; b < 5; b++) {
                            range[a][b] = this._field[i + a][j + b];
                        }
                    }
                    if (this._decision(this._field[i][j], range) == 1) { // game is over
                        return 1;
                    }
                }
            }
        }

        return 0;
    }

    putStone: any = (vec: number[]) => {
        if (this._field[vec[0]][vec[1]] == 0) {
            this._field[vec[0]][vec[1]] = this._turn == 1 ?  2 : 1;
            if (this.decision() == 1) {
                this._view.drawField(this._field, 8);
                this._view.seeDialog((this._turn == 0 ? "black" : "white") + " wins!");
            }
            this._turn = 1 - this._turn;
        }
        this._view.drawField(this._field, 8);
    }
}
