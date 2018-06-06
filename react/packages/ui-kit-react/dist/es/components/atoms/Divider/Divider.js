import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
var _meta = {
    name: "Divider",
    type: META.TYPES.ATOM
}
var _Divider = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        spacing = props.spacing,
        rest = tslib_1.__rest(props, ["as", "className", "children", "spacing"])
    var ElementType = getElementType(as, "div")
    var classes = cx(
        prefix("divider"),
        ((_a = {}), (_a[prefix("divider--spacing-small")] = spacing === "small"), _a),
        ((_b = {}), (_b[prefix("divider--spacing-large")] = spacing === "large"), _b),
        className
    )
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: classes }, rest),
        React.createElement("div", { className: prefix("divider__line") })
    )
    var _a, _b
}
_Divider._meta = _meta
/**
 * A very basic divider.
 * @see Spacing
 */
export var Divider = _Divider
//# sourceMappingURL=Divider.js.map
