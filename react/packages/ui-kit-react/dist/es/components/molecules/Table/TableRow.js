import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Flex } from "../../../index";
import { TableContextMenu } from "./TableContextMenu";
var _meta = {
    name: "TableRow",
    parent: "Table",
    type: META.TYPES.MOLECULE
};
/**
 * A TableRow.
 */
var TableRow = /** @class */ (function (_super) {
    tslib_1.__extends(TableRow, _super);
    function TableRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e, _this.props);
            }
        };
        return _this;
    }
    TableRow.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, contextMenuItems = _a.contextMenuItems, onClick = _a.onClick, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "contextMenuItems", "onClick"]);
        var ElementType = getElementType(as, "div");
        var classes = cx(prefix("table__row-container"), (_b = {}, _b[prefix("table__row--clickable")] = onClick, _b), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes, onClick: this.handleClick }, customAttributes, rest),
            React.createElement(Flex, { direction: "row", className: prefix("table__row") }, children),
            contextMenuItems && contextMenuItems.length > 0 &&
                React.createElement("div", { className: prefix("table__cell-menu") },
                    React.createElement(TableContextMenu, { items: contextMenuItems }))));
        var _b;
    };
    TableRow._meta = _meta;
    return TableRow;
}(React.PureComponent));
export { TableRow };
//# sourceMappingURL=TableRow.js.map