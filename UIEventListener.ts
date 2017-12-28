import field = require("./field");
import view = require("./view");

export interface EventListener {
    eventname: string;
    field: field.Field;

    callback: (event: Event) => void;
}

export class UIEventListener implements EventListener {
    private _event: string;
    private _field_size: number;
    private _canvas_size: number;
    private _field: field.Field;
    
    get eventname(): string {
        return this._event;
    }

    get field(): field.Field {
        return this._field;
    }

    constructor(arg0: field.Field, arg1: view.View) {
        this._field_size = arg0.size;
        this._canvas_size = arg1.canvasSize;
        this._event = "click";
        this._field = arg0;
    }

    callback: (event: MouseEvent) => void = (event: MouseEvent) => {
        let rect = (event.target as Element).getBoundingClientRect();
        let x: number = event.clientX - rect.left;
        let y: number = event.clientY - rect.top;
        this._field.putStone([Math.floor(x / (this._canvas_size / this._field_size)), Math.floor(y / (this._canvas_size / this._field_size))]);
    }

}

export class TouchEventListener implements EventListener {
    private _event: string;
    private _field_size: number;
    private _canvas_size: number;
    private _field: field.Field;

    get eventname(): string {
        return this._event;
    }

    get field(): field.Field {
        return this._field;
    }

    constructor(arg0: field.Field, arg1: view.View) {
        this._field_size = arg0.size;
        this._canvas_size = arg1.canvasSize;
        this._event = "touchstart";
        this._field = arg0;
    }

    callback: (event: TouchEvent) => void = (event: TouchEvent) => {
        event.preventDefault();
        let rect = (event.target as Element).getBoundingClientRect();
        let x: number = event.changedTouches[0].clientX - rect.left;
        let y: number = event.changedTouches[0].clientY - rect.top;
        this._field.putStone([Math.floor(x / (this._canvas_size / this._field_size)), Math.floor(y / (this._canvas_size / this._field_size))]);
    }

}

export class ButtonEventListener implements EventListener {
    private _event: string;
    private _field_size: number;
    private _field: field.Field;

    get eventname(): string {
        return this._event;
    }

    get field(): field.Field {
        return this._field;
    }

    constructor(arg0: field.Field) {
        this._event = "click";
        this._field_size = arg0.size;
        this._field = arg0;
    }

    callback: (event: Event) => void = (event: Event) => {
        this._field.skip();
    }
}
