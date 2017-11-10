import Event = require("./UIEventListener");

export class View {
    _canvas: any;
    _monitor: any;
    _monitor_size: number;
    _start_angle: number = 0;
    _end_angle: number = 2 * Math.PI;

    constructor() {
        this._canvas = document.getElementById("canvas");
        this._monitor_size = this._canvas.width;
    }

    addCanvasEventListener: any = (listener: Event.EventListener) => {
        this._canvas.addEventListener(listener.eventname, listener.callback);
    }

    draw: any = () => {
        let ctx = this._canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(120, 20);
        ctx.lineTo(120, 120);
        ctx.lineTo(20, 120);
        ctx.closePath();
        ctx.stroke();
    }

    drawField: any = (field: Array<Array<number>>, size: number) => {
        let radius = this._monitor_size / size / 2;
        let ctx = this._canvas.getContext('2d');
        ctx.beginPath();

        for (var i: number = 0; i < size; i++) {
            for (var j: number = 0; j < size; j++) {
                ctx.beginPath();
                ctx.strokeRect(i * radius * 2, j * radius * 2, radius * 2, radius * 2);
                ctx.closePath();
                if (field[i][j] == 1) {
                    ctx.beginPath();
                    ctx.arc(i * radius * 2 + radius, j * radius * 2+ radius, radius - 2, this._start_angle, this._end_angle, true);
                    ctx.fill();
                    ctx.closePath();
                } else if (field[i][j] == 2) {
                    ctx.beginPath();
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "white";
                    ctx.arc(i * radius * 2 + radius, j * radius * 2+ radius, radius - 2, this._start_angle, this._end_angle, true);
                    ctx.fill();
                    ctx.fillStyle = "black";
                    ctx.strokeStyle = "black";
                    ctx.closePath();
                }
            }
        }
    }

}
