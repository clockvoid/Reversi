import Field = require("./field");
import View = require("./view");
import Event = require("./UIEventListener");


window.onload = () => {
    let view = new View.View();
    let field = new Field.Field(8, view);
    view.drawField(field.field, 8);
    let clickEventListener = new Event.UIEventListener(8, 800, field);
    let touchEventListener = new Event.TouchEventListener(8, 800, field);
    view.addCanvasEventListener(clickEventListener);
    view.addCanvasEventListener(touchEventListener);
}
