import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType } from "../../../lib";
var _meta = {
    name: "Divider",
    type: META.TYPES.ATOM
};
var _Divider = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = getElementType(as, "div");
    var classes = cx("pui-divider", className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest)));
};
_Divider._meta = _meta;
/**
 * A very basic divider.
 */
export var Divider = _Divider;
//# sourceMappingURL=Divider.js.map