import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType } from "../../../lib";
var _meta = {
    name: "AreaWrapper",
    type: META.TYPES.STRUCTURE
};
var _AreaWrapper = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = getElementType(as, "div");
    var classes = cx("pui-area-wrapper", className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
};
_AreaWrapper._meta = _meta;
/**
 * This component is a direct child of "PageWrapper" component and defines basic content sections like header, footer, main, etc.
 * Direct children of this component may only exist of "ThemeWrapper" components.
 */
export var AreaWrapper = _AreaWrapper;
//# sourceMappingURL=AreaWrapper.js.map