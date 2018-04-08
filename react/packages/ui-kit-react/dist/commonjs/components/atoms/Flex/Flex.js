Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var FlexItem_1 = require("./FlexItem");
var _meta = {
    name: "Flex",
    type: lib_1.META.TYPES.ATOM
};
var defaultProps = {
    wrap: true
};
var _Flex = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, alignCrossAxis = props.alignCrossAxis, alignLines = props.alignLines, alignMainAxis = props.alignMainAxis, direction = props.direction, gap = props.gap, inline = props.inline, wrap = props.wrap, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "alignCrossAxis", "alignLines", "alignMainAxis", "direction", "gap", "inline", "wrap"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default(lib_1.prefix("flex"), (_a = {}, _a[lib_1.prefix("flex--inline")] = inline, _a), (_b = {}, _b[lib_1.prefix("flex--direction-" + direction)] = direction, _b), (_c = {}, _c[lib_1.prefix("flex--main-axis-" + alignMainAxis)] = alignMainAxis, _c), (_d = {}, _d[lib_1.prefix("flex--cross-axis-" + alignCrossAxis)] = alignCrossAxis, _d), (_e = {}, _e[lib_1.prefix("flex--align-lines-" + alignLines)] = alignLines, _e), (_f = {}, _f[lib_1.prefix("m-nl--" + gap)] = gap && gap !== "grid", _f), (_g = {}, _g[lib_1.prefix("m-nr--" + gap)] = gap && gap !== "grid", _g), (_h = {}, _h[lib_1.prefix("flex--gap")] = gap && gap === "grid", _h), (_j = {}, _j[lib_1.prefix("flex--wrap")] = wrap === true, _j), (_k = {}, _k[lib_1.prefix("flex--nowrap")] = wrap === false, _k), (_l = {}, _l[lib_1.prefix("flex--wrap-reverse")] = wrap === "reverse", _l), className);
    var augmentedChildren = children;
    if (gap && React.Children.count(children) > 0) {
        augmentedChildren = React.Children.map(children, function (child) {
            if (!child) {
                return child;
            }
            var _a = child.props, className = _a.className, childRest = tslib_1.__rest(_a, ["className"]);
            return (React.cloneElement(child, tslib_1.__assign({ className: classnames_1.default(className, (_b = {}, _b[lib_1.prefix("pl--" + gap)] = gap && gap !== "grid", _b), (_c = {}, _c[lib_1.prefix("pr--" + gap)] = gap && gap !== "grid", _c), (_d = {}, _d[lib_1.prefix("flex__child--gap")] = gap && gap === "grid", _d)) }, childRest)));
            var _b, _c, _d;
        });
    }
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), augmentedChildren));
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
};
_Flex.defaultProps = defaultProps;
_Flex.Item = FlexItem_1.FlexItem;
_Flex._meta = _meta;
/**
 * A flex container component used to create flex box layouts.
 */
exports.Flex = _Flex;
//# sourceMappingURL=Flex.js.map