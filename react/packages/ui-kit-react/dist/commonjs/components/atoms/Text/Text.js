Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var defaultProps = {
    type: "copy",
    wrap: true
}
var _meta = {
    name: "Text",
    type: lib_1.META.TYPES.ATOM
}
var _Text = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        ellipsis = props.ellipsis,
        align = props.align,
        color = props.color,
        inline = props.inline,
        type = props.type,
        wrap = props.wrap,
        rest = tslib_1.__rest(props, [
            "as",
            "className",
            "children",
            "ellipsis",
            "align",
            "color",
            "inline",
            "type",
            "wrap"
        ])
    var ElementType = lib_1.getElementType(as, "p")
    var classes = classnames_1.default(
        "-" + lib_1.prefix("text-size-" + type),
        ((_a = {}), (_a["-" + lib_1.prefix("text-color-" + color)] = color), _a),
        ((_b = {}), (_b[lib_1.prefix("text--align-" + align)] = align), _b),
        ((_c = {}), (_c[lib_1.prefix("text--inline")] = inline), _c),
        ((_d = {}), (_d[lib_1.prefix("text--ellipsis")] = ellipsis), _d),
        ((_e = {}), (_e[lib_1.prefix("text--wrap")] = wrap), _e),
        className
    )
    return React.createElement(ElementType, tslib_1.__assign({ className: classes }, rest), children)
    var _a, _b, _c, _d, _e
}
_Text.defaultProps = defaultProps
_Text._meta = _meta
/**
 * Use this component any time you want to display plain text anywhere.
 */
exports.Text = _Text
//# sourceMappingURL=Text.js.map
