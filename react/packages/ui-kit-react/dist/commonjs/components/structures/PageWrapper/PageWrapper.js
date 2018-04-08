Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var _meta = {
    name: "PageWrapper",
    type: lib_1.META.TYPES.STRUCTURE
};
var _PageWrapper = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default("pui-page-wrapper", className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
};
_PageWrapper._meta = _meta;
/**
 * This component must be used as a wrapper of a complete page/view. Direct children may only exist of "AreaWrapper" components.
 */
exports.PageWrapper = _PageWrapper;
//# sourceMappingURL=PageWrapper.js.map