import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Icon } from "../../../index";
var _meta = {
    name: "TableHeaderCell",
    parent: "Table",
    type: META.TYPES.MOLECULE
};
/**
 * A TableHeaderCell.
 */
var TableHeaderCell = /** @class */ (function (_super) {
    tslib_1.__extends(TableHeaderCell, _super);
    function TableHeaderCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e, _this.props);
            }
        };
        return _this;
    }
    TableHeaderCell.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, grow = _a.grow, sorted = _a.sorted, onClick = _a.onClick, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "grow", "sorted", "onClick"]);
        var ElementType = getElementType(as, "div");
        var classes = cx(prefix("table__cell"), (_b = {}, _b[prefix("table__cell--grow-" + grow)] = grow, _b), (_c = {}, _c[prefix("table__cell--clickable")] = onClick, _c), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes, as: as, onClick: this.handleClick }, customAttributes, rest),
            sorted === "ascending" && React.createElement(Icon, { className: prefix("padding-right--8"), name: "arrow_open_full_up" }),
            sorted === "descending" && React.createElement(Icon, { className: prefix("padding-right--8"), name: "arrow_open_full_down" }),
            children));
        var _b, _c;
    };
    TableHeaderCell._meta = _meta;
    return TableHeaderCell;
}(React.PureComponent));
export { TableHeaderCell };
//# sourceMappingURL=TableHeaderCell.js.map