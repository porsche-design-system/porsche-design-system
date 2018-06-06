Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var _meta = {
    name: "Divider",
    type: lib_1.META.TYPES.ATOM
}
var _Divider = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        spacing = props.spacing,
        rest = tslib_1.__rest(props, ["as", "className", "children", "spacing"])
    var ElementType = lib_1.getElementType(as, "div")
    var classes = classnames_1.default(
        lib_1.prefix("divider"),
        ((_a = {}), (_a[lib_1.prefix("divider--spacing-small")] = spacing === "small"), _a),
        ((_b = {}), (_b[lib_1.prefix("divider--spacing-large")] = spacing === "large"), _b),
        className
    )
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: classes }, rest),
        React.createElement("div", { className: lib_1.prefix("divider__line") })
    )
    var _a, _b
}
_Divider._meta = _meta
/**
 * A very basic divider.
 * @see Spacing
 */
exports.Divider = _Divider
//# sourceMappingURL=Divider.js.map
