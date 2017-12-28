import Event = require("./UIEventListener");

export class View {
    private _canvas: HTMLCanvasElement;
    private _monitor_size: number;
    private _start_angle: number = 0;
    private _end_angle: number = 2 * Math.PI;
    private _skip_button: HTMLButtonElement;
    private _turn_monitor: HTMLFormElement;

    public get canvasSize(): number {
        return this._monitor_size;
    }

    constructor() {
        this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this._monitor_size = this._canvas.width;
        this._skip_button = document.getElementById("skip") as HTMLButtonElement;
        this._turn_monitor = document.getElementById("turn") as HTMLFormElement;
    }

    addCanvasEventListener: (listener: Event.EventListener) => void = (listener: Event.EventListener) => {
        this._canvas.addEventListener(listener.eventname, listener.callback);
    }

    addButtonEventListener: (listener: Event.EventListener) => void = (listener: Event.EventListener) => {
        this._skip_button.addEventListener(listener.eventname, listener.callback);
    }

    draw: () => void = () => {
        let ctx = this._canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(120, 20);
        ctx.lineTo(120, 120);
        ctx.lineTo(20, 120);
        ctx.closePath();
        ctx.stroke();
    }

    drawField: (field: Array<Array<number>>, sizse: number) => void = (field: Array<Array<number>>, size: number) => {
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

    seeDialog: (body: string) => void = (body: string) => {
        alert(body);
    }

    viewTurn: (turn: number) => void = (turn: number) => {
        this._turn_monitor.innerHTML = "Turn: " + (turn == 0 ? "黒" : "白");
    }

}
