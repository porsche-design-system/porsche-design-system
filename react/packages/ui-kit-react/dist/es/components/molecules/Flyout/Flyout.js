import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
var defaultProps = {
    position: "left"
}
var _meta = {
    name: "Flyout",
    type: META.TYPES.MOLECULE
}
var _Flyout = function(props) {
    var as = props.as,
        className = props.className,
        position = props.position,
        children = props.children,
        rest = tslib_1.__rest(props, ["as", "className", "position", "children"])
    var ElementType = getElementType(as, "div")
    var classes = cx(
        prefix("flyout"),
        ((_a = {}), (_a[prefix("flyout--left")] = position === "left"), _a),
        ((_b = {}), (_b[prefix("flyout--right")] = position === "right"), _b),
        className
    )
    return React.createElement(ElementType, tslib_1.__assign({ className: classes }, rest), children)
    var _a, _b
}
_Flyout.defaultProps = defaultProps
_Flyout._meta = _meta
/**
 * A flyout that can contain arbitrary content.
 * Example usage: Container for the desktop navigation menus.
 */
export var Flyout = _Flyout
//# sourceMappingURL=Flyout.js.map
