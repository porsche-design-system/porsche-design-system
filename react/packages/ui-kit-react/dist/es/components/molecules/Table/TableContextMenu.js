import * as React from "react";
import { Icon } from "../../atoms/Icon/Icon";
import { prefix } from "../../../lib";
import { TableContextMenuItemComponent } from "./TableContextMenuItem";
export var TableContextMenu = function (props) {
    var items = props.items;
    return (React.createElement("div", { className: prefix("table__menu") },
        React.createElement(Icon, { name: "menu_dots_vertical" }),
        React.createElement("div", { className: prefix("table__menu__container") },
            React.createElement("ul", null, items.length > 0 && items.map(function (item) {
                return (React.createElement(TableContextMenuItemComponent, { key: item.id, item: item }));
            })))));
};
//# sourceMappingURL=TableContextMenu.js.map