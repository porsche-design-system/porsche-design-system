import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
import { Icon } from "../../../index"
import { ButtonGroup } from "./ButtonGroup"
var defaultProps = {
    type: "default",
    icon: "arrow_right_hair",
    role: "button"
}
var _meta = {
    name: "Button",
    type: META.TYPES.MOLECULE
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
    var ElementType = getElementType(as, "button")
    var buttonClasses
    var iconClasses
    var loaderClasses
    var labelClasses
    if (isGhostButton(type)) {
        // Ghost button setup
        buttonClasses = cx(
            prefix("button-ghost"),
            ((_a = {}), (_a[prefix("button-ghost--inverted")] = type === "ghost-inverted"), _a),
            ((_b = {}), (_b[prefix("button-ghost--error")] = error), _b),
            ((_c = {}), (_c[prefix("button-ghost--stretch")] = stretch), _c),
            ((_d = {}), (_d[prefix("button-ghost--active")] = active), _d),
            className
        )
        iconClasses = cx(
            prefix("button-ghost__icon"),
            ((_e = {}), (_e[prefix("button-ghost__icon--loading")] = loading), _e)
        )
        loaderClasses = cx(prefix("button-ghost__loader"), prefix("loader-base"))
        labelClasses = cx(
            prefix("button-ghost__label"),
            ((_f = {}), (_f[prefix("button-ghost__label--show-" + showContent)] = showContent), _f)
        )
    } else {
        // Primary button setup
        buttonClasses = cx(
            prefix("button-primary"),
            ((_g = {}), (_g[prefix("button-primary--black")] = type === "black"), _g),
            ((_h = {}), (_h[prefix("button-primary--red")] = type === "red"), _h),
            ((_j = {}), (_j[prefix("button-primary--blue")] = type === "blue"), _j),
            ((_k = {}), (_k[prefix("button-primary--acid-green")] = type === "acid-green"), _k),
            ((_l = {}), (_l[prefix("button-primary--error")] = error), _l),
            ((_m = {}), (_m[prefix("button-primary--stretch")] = stretch), _m),
            ((_o = {}), (_o[prefix("button-primary--centered")] = centered), _o),
            ((_p = {}), (_p[prefix("button-primary--active")] = active), _p),
            className
        )
        iconClasses = cx(
            prefix("button-primary__icon"),
            ((_q = {}), (_q[prefix("button-primary__icon--loading")] = loading), _q)
        )
        loaderClasses = cx(prefix("button-primary__loader"), prefix("loader-base"))
        labelClasses = cx(
            prefix("button-primary__label"),
            ((_r = {}), (_r[prefix("button-primary__label--show-" + showContent)] = showContent), _r)
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
            Icon,
            { name: icon, className: iconClasses },
            loading && React.createElement("span", { className: loaderClasses })
        ),
        React.createElement("span", { className: labelClasses }, children)
    )
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r
}
_Button.defaultProps = defaultProps
_Button.Group = ButtonGroup
_Button._meta = _meta
/**
 * The default Porsche button.
 * @see Icon
 */
export var Button = _Button
//# sourceMappingURL=Button.js.map
