Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var defaultProps = {
    direction: "vertical"
};
var _meta = {
    name: "Scroll",
    type: lib_1.META.TYPES.ATOM
};
var _Scroll = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, direction = props.direction, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "direction"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default(lib_1.prefix("scroll"), lib_1.prefix("scroll--" + direction), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
};
_Scroll.defaultProps = defaultProps;
_Scroll._meta = _meta;
/**
 * Use this component any time you want to provide a scrolling section for long content.
 */
exports.Scroll = _Scroll;
//# sourceMappingURL=Scroll.js.map