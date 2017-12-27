import Field = require("./field");
import View = require("./view");
import Event = require("./UIEventListener");

window.onload = () => {
    let size = 10;
    let view = new View.View();
    let field = new Field.Field(size, view);
    view.drawField(field.field, size);
    let clickEventListener = new Event.UIEventListener(size, 800, field);
    let touchEventListener = new Event.TouchEventListener(size, 800, field);
    view.addCanvasEventListener(clickEventListener);
    view.addCanvasEventListener(touchEventListener);
}
