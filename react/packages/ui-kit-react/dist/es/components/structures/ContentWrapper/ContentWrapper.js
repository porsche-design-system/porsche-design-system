import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType } from "../../../lib";
var defaultProps = {
    raw: false
};
var _meta = {
    name: "ContentWrapper",
    type: META.TYPES.STRUCTURE
};
var _ContentWrapper = function (props) {
    var as = props.as, className = props.className, customAttributes = props.customAttributes, raw = props.raw, children = props.children, rest = tslib_1.__rest(props, ["as", "className", "customAttributes", "raw", "children"]);
    var ElementType = getElementType(as, "section");
    var classes = cx("pui-content-wrapper", (_a = {}, _a["pui-content-wrapper--raw"] = raw, _a), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a;
};
_ContentWrapper.defaultProps = defaultProps;
_ContentWrapper._meta = _meta;
/**
 * This component is a direct child of "ThemeWrapper" and defines content sections like section, article.
 * It also adds safe area paddings to the left/right and a max-content-width.
 * Direct children of this component may only exist of organisms and molecules.
 */
export var ContentWrapper = _ContentWrapper;
//# sourceMappingURL=ContentWrapper.js.map