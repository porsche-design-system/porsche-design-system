Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var _meta = {
    name: "Spacing",
    type: lib_1.META.TYPES.ATOM
}
var _Spacing = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        wrap = props.wrap,
        margin = props.margin,
        marginBottom = props.marginBottom,
        marginLeft = props.marginLeft,
        marginRight = props.marginRight,
        marginTop = props.marginTop,
        padding = props.padding,
        paddingBottom = props.paddingBottom,
        paddingLeft = props.paddingLeft,
        paddingRight = props.paddingRight,
        paddingTop = props.paddingTop,
        rest = tslib_1.__rest(props, [
            "as",
            "className",
            "children",
            "wrap",
            "margin",
            "marginBottom",
            "marginLeft",
            "marginRight",
            "marginTop",
            "padding",
            "paddingBottom",
            "paddingLeft",
            "paddingRight",
            "paddingTop"
        ])
    var ElementType = lib_1.getElementType(as, "div")
    var classes = classnames_1.default(
        ((_a = {}), (_a[lib_1.prefix("m--" + margin)] = margin), _a),
        ((_b = {}), (_b[lib_1.prefix("mt--" + marginTop)] = marginTop), _b),
        ((_c = {}), (_c[lib_1.prefix("ml--" + marginLeft)] = marginLeft), _c),
        ((_d = {}), (_d[lib_1.prefix("mb--" + marginBottom)] = marginBottom), _d),
        ((_e = {}), (_e[lib_1.prefix("mr--" + marginRight)] = marginRight), _e),
        ((_f = {}), (_f[lib_1.prefix("p--" + padding)] = padding), _f),
        ((_g = {}), (_g[lib_1.prefix("pt--" + paddingTop)] = paddingTop), _g),
        ((_h = {}), (_h[lib_1.prefix("pl--" + paddingLeft)] = paddingLeft), _h),
        ((_j = {}), (_j[lib_1.prefix("pb--" + paddingBottom)] = paddingBottom), _j),
        ((_k = {}), (_k[lib_1.prefix("pr--" + paddingRight)] = paddingRight), _k),
        className
    )
    if (React.Children.count(children) === 1 && !wrap) {
        // One child => append spacing classes and unhandled props to child
        return React.Children.map(children, function(child) {
            if (!child) {
                return child
            }
            var _a = child.props,
                childrenClassName = _a.className,
                childRest = tslib_1.__rest(_a, ["className"])
            return React.cloneElement(
                child,
                tslib_1.__assign({ className: classnames_1.default(childrenClassName, classes) }, childRest)
            )
        })[0]
    } else {
        // Multiple childs => render wrapper element with spacing classes and unhandled props
        return React.createElement(ElementType, tslib_1.__assign({ className: classes }, rest), children)
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k
}
_Spacing._meta = _meta
/**
 * A component to add margins and paddings to components.
 * If it has only one child, those classes are added directly to the child to avoid unnecessary wrapper divs.
 * @see Flex
 */
exports.Spacing = _Spacing
//# sourceMappingURL=Spacing.js.map
