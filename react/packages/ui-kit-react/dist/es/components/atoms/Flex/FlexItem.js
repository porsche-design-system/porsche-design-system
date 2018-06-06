import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix, mapBreakpointPropToClasses } from "../../../lib"
var _meta = {
    name: "FlexItem",
    parent: "Flex",
    type: META.TYPES.ATOM
}
var _FlexItem = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        alignCrossAxis = props.alignCrossAxis,
        offset = props.offset,
        width = props.width,
        rest = tslib_1.__rest(props, ["as", "className", "children", "alignCrossAxis", "offset", "width"])
    var ElementType = getElementType(as, "div")
    var classes = cx(
        prefix("flex__child"),
        ((_a = {}), (_a[prefix("flex__child--cross-axis-" + alignCrossAxis)] = alignCrossAxis), _a),
        mapBreakpointPropToClasses("flex__child--", width),
        mapBreakpointPropToClasses("flex__child--offset-", offset),
        className
    )
    return React.createElement(ElementType, tslib_1.__assign({ className: classes }, rest), children)
    var _a
}
_FlexItem._meta = _meta
/**
 * A child of a flex container.
 */
export var FlexItem = _FlexItem
//# sourceMappingURL=FlexItem.js.map
