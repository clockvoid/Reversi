import Field = require("./field");

export interface EventListener {
    _event: string;
    _field: Field.Field;

    eventname: string;

    callback(event: any): any;
}

export class UIEventListener implements EventListener {
    _event: string;
    _field_size: number;
    _canvas_size: number;
    _field: Field.Field;
    eventname: string;
    
    constructor(arg0: number, arg1: number, arg2: Field.Field) {
        this._field_size = arg0;
        this._canvas_size = arg1;
        this._event = "click";
        this.eventname = this._event;
        this._field = arg2;
    }

    callback: any = (event: any) => {
        let rect = event.target.getBoundingClientRect();
        let x: number = event.clientX - rect.left;
        let y: number = event.clientY - rect.top;
        this._field.putStone([Math.floor(x / (this._canvas_size / this._field_size)), Math.floor(y / (this._canvas_size / this._field_size))]);
    }

}

export class TouchEventListener implements EventListener {
    _event: string;
    _field_size: number;
    _canvas_size: number;
    _field: Field.Field;

    eventname: string;

    constructor(arg0: number, arg1: number, arg2: Field.Field) {
        this._field_size = arg0;
        this._canvas_size = arg1;
        this._event = "touchstart";
        this.eventname = this._event;
        this._field = arg2;
    }

    callback: any = (event: any) => {
        event.preventDefault();
        let rect = event.target.getBoundingClientRect();
        let x: number = event.changedTouches[0].clientX - rect.left;
        let y: number = event.changedTouches[0].clientY - rect.top;
        this._field.putStone([Math.floor(x / (this._canvas_size / this._field_size)), Math.floor(y / (this._canvas_size / this._field_size))]);
    }

}

export class ButtonEventListener implements EventListener {
    _event: string;
    _field: Field.Field;

    eventname: string;

    constructor() {
        this._event = "onclick";
    }

    callback(event: any): any;
}
