Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var _meta = {
    name: "AreaWrapper",
    type: lib_1.META.TYPES.STRUCTURE
};
var _AreaWrapper = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default("pui-area-wrapper", className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
};
_AreaWrapper._meta = _meta;
/**
 * This component is a direct child of "PageWrapper" component and defines basic content sections like header, footer, main, etc.
 * Direct children of this component may only exist of "ThemeWrapper" components.
 */
exports.AreaWrapper = _AreaWrapper;
//# sourceMappingURL=AreaWrapper.js.map