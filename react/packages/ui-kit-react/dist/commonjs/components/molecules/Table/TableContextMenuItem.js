Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
exports.TableContextMenuItemComponent = function (props) {
    var _a = props.item, id = _a.id, icon = _a.icon, label = _a.label, onClick = _a.onClick;
    var handleClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        onClick(e, props.item);
    };
    return (React.createElement("li", { className: lib_1.prefix("table__menu__item") },
        React.createElement(index_1.ButtonCircle, { icon: icon, onClick: handleClick }, label)));
};
//# sourceMappingURL=TableContextMenuItem.js.map