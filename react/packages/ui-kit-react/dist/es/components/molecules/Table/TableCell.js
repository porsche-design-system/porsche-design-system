import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
var _meta = {
    name: "TableCell",
    parent: "Table",
    type: META.TYPES.MOLECULE
};
/**
 * A TableCell.
 */
var TableCell = /** @class */ (function (_super) {
    tslib_1.__extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e, _this.props);
            }
        };
        return _this;
    }
    TableCell.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, grow = _a.grow, onClick = _a.onClick, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "grow", "onClick"]);
        var ElementType = getElementType(as, "div");
        var classes = cx(prefix("table__cell"), (_b = {}, _b[prefix("table__cell--grow-" + grow)] = grow, _b), (_c = {}, _c[prefix("table__cell--clickable")] = onClick, _c), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes, as: as }, customAttributes, rest), children));
        var _b, _c;
    };
    TableCell._meta = _meta;
    return TableCell;
}(React.PureComponent));
export { TableCell };
//# sourceMappingURL=TableCell.js.map