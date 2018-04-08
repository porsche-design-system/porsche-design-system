import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { TableHeader } from "./TableHeader";
import { TableHeaderCell } from "./TableHeaderCell";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
var _meta = {
    name: "Table",
    type: META.TYPES.MOLECULE
};
/**
 * A Table.
 */
var Table = /** @class */ (function (_super) {
    tslib_1.__extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes"]);
        var ElementType = getElementType(as, "div");
        var classes = cx(prefix("table"), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    };
    Table.Header = TableHeader;
    Table.HeaderCell = TableHeaderCell;
    Table.Body = TableBody;
    Table.Row = TableRow;
    Table.Cell = TableCell;
    Table._meta = _meta;
    return Table;
}(React.PureComponent));
export { Table };
//# sourceMappingURL=Table.js.map