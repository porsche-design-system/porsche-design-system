import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType } from "../../../lib";
var _meta = {
    name: "PageWrapper",
    type: META.TYPES.STRUCTURE
};
var _PageWrapper = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = getElementType(as, "div");
    var classes = cx("pui-page-wrapper", className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
};
_PageWrapper._meta = _meta;
/**
 * This component must be used as a wrapper of a complete page/view. Direct children may only exist of "AreaWrapper" components.
 */
export var PageWrapper = _PageWrapper;
//# sourceMappingURL=PageWrapper.js.map