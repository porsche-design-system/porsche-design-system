import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
var defaultProps = {
    direction: "vertical"
}
var _meta = {
    name: "Scroll",
    type: META.TYPES.ATOM
}
var _Scroll = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        direction = props.direction,
        rest = tslib_1.__rest(props, ["as", "className", "children", "direction"])
    var ElementType = getElementType(as, "div")
    var classes = cx(prefix("scroll"), prefix("scroll--" + direction), className)
    return React.createElement(ElementType, tslib_1.__assign({ className: classes }, rest), children)
}
_Scroll.defaultProps = defaultProps
_Scroll._meta = _meta
/**
 * Use this component any time you want to provide a scrolling section for long content.
 */
export var Scroll = _Scroll
//# sourceMappingURL=Scroll.js.map
