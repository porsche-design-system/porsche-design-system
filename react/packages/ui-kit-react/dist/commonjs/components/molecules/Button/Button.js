Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var ButtonGroup_1 = require("./ButtonGroup")
var defaultProps = {
    type: "default",
    icon: "arrow_right_hair",
    role: "button"
}
var _meta = {
    name: "Button",
    type: lib_1.META.TYPES.MOLECULE
}
var isGhostButton = function(type) {
    return type === "ghost" || type === "ghost-inverted"
}
var _Button = function(props) {
    var as = props.as,
        role = props.role,
        className = props.className,
        children = props.children,
        active = props.active,
        disabled = props.disabled,
        error = props.error,
        icon = props.icon,
        loading = props.loading,
        onClick = props.onClick,
        showContent = props.showContent,
        stretch = props.stretch,
        centered = props.centered,
        type = props.type,
        rest = tslib_1.__rest(props, [
            "as",
            "role",
            "className",
            "children",
            "active",
            "disabled",
            "error",
            "icon",
            "loading",
            "onClick",
            "showContent",
            "stretch",
            "centered",
            "type"
        ])
    var ElementType = lib_1.getElementType(as, "button")
    var buttonClasses
    var iconClasses
    var loaderClasses
    var labelClasses
    if (isGhostButton(type)) {
        // Ghost button setup
        buttonClasses = classnames_1.default(
            lib_1.prefix("button-ghost"),
            ((_a = {}), (_a[lib_1.prefix("button-ghost--inverted")] = type === "ghost-inverted"), _a),
            ((_b = {}), (_b[lib_1.prefix("button-ghost--error")] = error), _b),
            ((_c = {}), (_c[lib_1.prefix("button-ghost--stretch")] = stretch), _c),
            ((_d = {}), (_d[lib_1.prefix("button-ghost--active")] = active), _d),
            className
        )
        iconClasses = classnames_1.default(
            lib_1.prefix("button-ghost__icon"),
            ((_e = {}), (_e[lib_1.prefix("button-ghost__icon--loading")] = loading), _e)
        )
        loaderClasses = classnames_1.default(lib_1.prefix("button-ghost__loader"), lib_1.prefix("loader-base"))
        labelClasses = classnames_1.default(
            lib_1.prefix("button-ghost__label"),
            ((_f = {}), (_f[lib_1.prefix("button-ghost__label--show-" + showContent)] = showContent), _f)
        )
    } else {
        // Primary button setup
        buttonClasses = classnames_1.default(
            lib_1.prefix("button-primary"),
            ((_g = {}), (_g[lib_1.prefix("button-primary--black")] = type === "black"), _g),
            ((_h = {}), (_h[lib_1.prefix("button-primary--red")] = type === "red"), _h),
            ((_j = {}), (_j[lib_1.prefix("button-primary--blue")] = type === "blue"), _j),
            ((_k = {}), (_k[lib_1.prefix("button-primary--acid-green")] = type === "acid-green"), _k),
            ((_l = {}), (_l[lib_1.prefix("button-primary--error")] = error), _l),
            ((_m = {}), (_m[lib_1.prefix("button-primary--stretch")] = stretch), _m),
            ((_o = {}), (_o[lib_1.prefix("button-primary--centered")] = centered), _o),
            ((_p = {}), (_p[lib_1.prefix("button-primary--active")] = active), _p),
            className
        )
        iconClasses = classnames_1.default(
            lib_1.prefix("button-primary__icon"),
            ((_q = {}), (_q[lib_1.prefix("button-primary__icon--loading")] = loading), _q)
        )
        loaderClasses = classnames_1.default(lib_1.prefix("button-primary__loader"), lib_1.prefix("loader-base"))
        labelClasses = classnames_1.default(
            lib_1.prefix("button-primary__label"),
            ((_r = {}), (_r[lib_1.prefix("button-primary__label--show-" + showContent)] = showContent), _r)
        )
    }
    var handleClick = function(e) {
        if (!onClick) {
            return
        }
        if (disabled || loading) {
            e.preventDefault()
            return
        }
        onClick(e, props)
    }
    return React.createElement(
        ElementType,
        tslib_1.__assign(
            { type: role, onClick: handleClick, className: buttonClasses, disabled: disabled || loading },
            rest
        ),
        React.createElement(
            index_1.Icon,
            { name: icon, className: iconClasses },
            loading && React.createElement("span", { className: loaderClasses })
        ),
        React.createElement("span", { className: labelClasses }, children)
    )
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r
}
_Button.defaultProps = defaultProps
_Button.Group = ButtonGroup_1.ButtonGroup
_Button._meta = _meta
/**
 * The default Porsche button.
 * @see Icon
 */
exports.Button = _Button
//# sourceMappingURL=Button.js.map
