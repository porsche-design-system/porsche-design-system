Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var defaultProps = {
    raw: false
};
var _meta = {
    name: "ContentWrapper",
    type: lib_1.META.TYPES.STRUCTURE
};
var _ContentWrapper = function (props) {
    var as = props.as, className = props.className, customAttributes = props.customAttributes, raw = props.raw, children = props.children, rest = tslib_1.__rest(props, ["as", "className", "customAttributes", "raw", "children"]);
    var ElementType = lib_1.getElementType(as, "section");
    var classes = classnames_1.default("pui-content-wrapper", (_a = {}, _a["pui-content-wrapper--raw"] = raw, _a), className);
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
exports.ContentWrapper = _ContentWrapper;
//# sourceMappingURL=ContentWrapper.js.map