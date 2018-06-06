import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, prefix } from "../../../lib"
import { Flex } from "../../../index"
var _meta = {
    name: "ButtonGroup",
    parent: "Button",
    type: META.TYPES.MOLECULE
}
var _ButtonGroup = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        rest = tslib_1.__rest(props, ["as", "className", "children"])
    var classes = cx(prefix("button-group"), className)
    return React.createElement(
        Flex,
        tslib_1.__assign({ as: as, className: classes }, rest),
        React.Children.map(children, function(child, i) {
            return React.createElement("div", { key: i, className: prefix("button-group__button") }, child)
        })
    )
}
_ButtonGroup._meta = _meta
/**
 * A button group wrapper for the default button.
 */
export var ButtonGroup = _ButtonGroup
//# sourceMappingURL=ButtonGroup.js.map
