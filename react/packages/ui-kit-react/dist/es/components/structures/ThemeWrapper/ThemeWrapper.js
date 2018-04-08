import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType } from "../../../lib";
var defaultProps = {
    theme: "light"
};
var _meta = {
    name: "ThemeWrapper",
    type: META.TYPES.STRUCTURE
};
var _ThemeWrapper = function (props) {
    var as = props.as, className = props.className, customAttributes = props.customAttributes, theme = props.theme, children = props.children, rest = tslib_1.__rest(props, ["as", "className", "customAttributes", "theme", "children"]);
    var ElementType = getElementType(as, "div");
    var classes = cx("pui-theme-wrapper", (_a = {}, _a["pui-theme-wrapper--light"] = props.theme === "light", _a["pui-theme-wrapper--dark"] = props.theme === "dark", _a["pui-theme-wrapper--transparent"] = props.theme === "transparent", _a), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a;
};
_ThemeWrapper.defaultProps = defaultProps;
_ThemeWrapper._meta = _meta;
/**
 * This component is a direct child of "AreaWrapper" component and adds basic background themings to visually define larger content sections.
 * Direct children of this component may only exist of "ContentWrapper" components.
 */
export var ThemeWrapper = _ThemeWrapper;
//# sourceMappingURL=ThemeWrapper.js.map