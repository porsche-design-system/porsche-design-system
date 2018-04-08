Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var defaultProps = {
    theme: "light"
};
var _meta = {
    name: "ThemeWrapper",
    type: lib_1.META.TYPES.STRUCTURE
};
var _ThemeWrapper = function (props) {
    var as = props.as, className = props.className, customAttributes = props.customAttributes, theme = props.theme, children = props.children, rest = tslib_1.__rest(props, ["as", "className", "customAttributes", "theme", "children"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default("pui-theme-wrapper", (_a = {}, _a["pui-theme-wrapper--light"] = props.theme === "light", _a["pui-theme-wrapper--dark"] = props.theme === "dark", _a["pui-theme-wrapper--transparent"] = props.theme === "transparent", _a), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a;
};
_ThemeWrapper.defaultProps = defaultProps;
_ThemeWrapper._meta = _meta;
/**
 * This component is a direct child of "AreaWrapper" component and adds basic background themings to visually define larger content sections.
 * Direct children of this component may only exist of "ContentWrapper" components.
 */
exports.ThemeWrapper = _ThemeWrapper;
//# sourceMappingURL=ThemeWrapper.js.map