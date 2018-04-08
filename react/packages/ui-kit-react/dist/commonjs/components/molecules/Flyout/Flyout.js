Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var defaultProps = {
    position: "left"
};
var _meta = {
    name: "Flyout",
    type: lib_1.META.TYPES.MOLECULE
};
var _Flyout = function (props) {
    var as = props.as, className = props.className, position = props.position, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "position", "children", "customAttributes"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default(lib_1.prefix("flyout"), (_a = {}, _a[lib_1.prefix("flyout--left")] = position === "left", _a), (_b = {}, _b[lib_1.prefix("flyout--right")] = position === "right", _b), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a, _b;
};
_Flyout.defaultProps = defaultProps;
_Flyout._meta = _meta;
/**
 * A flyout that can contain arbitrary content.
 * Example usage: Container for the desktop navigation menus.
 */
exports.Flyout = _Flyout;
//# sourceMappingURL=Flyout.js.map