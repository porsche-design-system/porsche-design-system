import * as React from "react";
import { prefix } from "../../../lib";
import { ButtonCircle } from "../../../index";
export var TableContextMenuItemComponent = function (props) {
    var _a = props.item, id = _a.id, icon = _a.icon, label = _a.label, onClick = _a.onClick;
    var handleClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        onClick(e, props.item);
    };
    return (React.createElement("li", { className: prefix("table__menu__item") },
        React.createElement(ButtonCircle, { icon: icon, onClick: handleClick }, label)));
};
//# sourceMappingURL=TableContextMenuItem.js.map