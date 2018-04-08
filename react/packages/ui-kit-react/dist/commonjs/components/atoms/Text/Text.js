Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var defaultProps = {
    type: "copy",
    color: "black",
    wrap: true
};
var _meta = {
    name: "Text",
    type: lib_1.META.TYPES.ATOM
};
var _Text = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, ellipsis = props.ellipsis, align = props.align, color = props.color, inline = props.inline, type = props.type, wrap = props.wrap, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "ellipsis", "align", "color", "inline", "type", "wrap"]);
    var ElementType = lib_1.getElementType(as, "p");
    var classes = classnames_1.default("-" + lib_1.prefix("text-size-" + type), "-" + lib_1.prefix("text-color-" + color), (_a = {}, _a[lib_1.prefix("text--align-" + align)] = align, _a), (_b = {}, _b[lib_1.prefix("text--inline")] = inline, _b), (_c = {}, _c[lib_1.prefix("text--ellipsis")] = ellipsis, _c), (_d = {}, _d[lib_1.prefix("text--wrap")] = wrap, _d), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a, _b, _c, _d;
};
_Text.defaultProps = defaultProps;
_Text._meta = _meta;
/**
 * Use this component any time you want to display plain text anywhere.
 */
exports.Text = _Text;
//# sourceMappingURL=Text.js.map