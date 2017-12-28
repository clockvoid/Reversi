import Field = require("./field");
import View = require("./view");
import Event = require("./UIEventListener");

window.onload = () => {
    let size = 8;
    let view = new View.View();
    let field = new Field.Field(size, view);
    view.drawField(field.field, size);
    let clickEventListener = new Event.UIEventListener(field, view);
    let touchEventListener = new Event.TouchEventListener(field, view);
    let buttonEventListener = new Event.ButtonEventListener(field);
    view.addCanvasEventListener(clickEventListener);
    view.addCanvasEventListener(touchEventListener);
    view.addButtonEventListener(buttonEventListener);
}
