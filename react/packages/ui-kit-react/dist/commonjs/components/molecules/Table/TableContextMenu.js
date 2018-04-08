Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Icon_1 = require("../../atoms/Icon/Icon");
var lib_1 = require("../../../lib");
var TableContextMenuItem_1 = require("./TableContextMenuItem");
exports.TableContextMenu = function (props) {
    var items = props.items;
    return (React.createElement("div", { className: lib_1.prefix("table__menu") },
        React.createElement(Icon_1.Icon, { name: "menu_dots_vertical" }),
        React.createElement("div", { className: lib_1.prefix("table__menu__container") },
            React.createElement("ul", null, items.length > 0 && items.map(function (item) {
                return (React.createElement(TableContextMenuItem_1.TableContextMenuItemComponent, { key: item.id, item: item }));
            })))));
};
//# sourceMappingURL=TableContextMenu.js.map