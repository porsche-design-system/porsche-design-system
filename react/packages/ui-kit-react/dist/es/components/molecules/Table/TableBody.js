import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Flex } from "../../../index";
var _meta = {
    name: "TableBody",
    parent: "Table",
    type: META.TYPES.MOLECULE
};
/**
 * A TableBody.
 */
var TableBody = /** @class */ (function (_super) {
    tslib_1.__extends(TableBody, _super);
    function TableBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBody.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes"]);
        var ElementType = getElementType(as, "div");
        var classes = cx(prefix("table__body"), className);
        return (React.createElement(Flex, tslib_1.__assign({ direction: "column", className: classes, as: as }, customAttributes, rest), children));
    };
    TableBody._meta = _meta;
    return TableBody;
}(React.PureComponent));
export { TableBody };
//# sourceMappingURL=TableBody.js.map