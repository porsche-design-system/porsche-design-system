Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var _meta = {
    name: "FlexItem",
    parent: "Flex",
    type: lib_1.META.TYPES.ATOM
};
var _FlexItem = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, alignCrossAxis = props.alignCrossAxis, offset = props.offset, width = props.width, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "alignCrossAxis", "offset", "width"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default(lib_1.prefix("flex__child"), (_a = {}, _a[lib_1.prefix("flex__child--cross-axis-" + alignCrossAxis)] = alignCrossAxis, _a), lib_1.mapBreakpointPropToClasses("flex__child--", width), lib_1.mapBreakpointPropToClasses("flex__child--offset-", offset), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a;
};
_FlexItem._meta = _meta;
/**
 * A child of a flex container.
 */
exports.FlexItem = _FlexItem;
//# sourceMappingURL=FlexItem.js.map