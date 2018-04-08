import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Flex } from "../../../index";
var _meta = {
    name: "TableHeader",
    parent: "Table",
    type: META.TYPES.MOLECULE
};
/**
 * A TableHeader.
 */
var TableHeader = /** @class */ (function (_super) {
    tslib_1.__extends(TableHeader, _super);
    function TableHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableHeader.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes"]);
        var ElementType = getElementType(as, "div");
        var classes = cx(prefix("table__header"), className);
        return (React.createElement(Flex, tslib_1.__assign({ direction: "row", className: classes, as: as }, customAttributes, rest), children));
    };
    TableHeader._meta = _meta;
    return TableHeader;
}(React.PureComponent));
export { TableHeader };
//# sourceMappingURL=TableHeader.js.map