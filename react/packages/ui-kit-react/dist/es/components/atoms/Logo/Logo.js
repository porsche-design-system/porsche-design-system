import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
import { base64logo } from "../../../lib/base64logo"
var _meta = {
    name: "Logo",
    type: META.TYPES.ATOM
}
var _Logo = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        rest = tslib_1.__rest(props, ["as", "className", "children"])
    var ElementType = getElementType(as, "div")
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: cx(prefix("logo"), className) }, rest),
        React.createElement("img", { className: prefix("logo__image"), src: base64logo, alt: "Porsche\u00AE" })
    )
}
_Logo._meta = _meta
/**
 * The famous and loved Porsche Logo, currently available in like one size.
 * @see Header
 */
export var Logo = _Logo
//# sourceMappingURL=Logo.js.map
