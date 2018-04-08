Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var _meta = {
    name: "Divider",
    type: lib_1.META.TYPES.ATOM
};
var _Divider = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default("pui-divider", className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest)));
};
_Divider._meta = _meta;
/**
 * A very basic divider.
 */
exports.Divider = _Divider;
//# sourceMappingURL=Divider.js.map