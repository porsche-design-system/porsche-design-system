import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
var defaultProps = {
    type: "copy",
    wrap: true
}
var _meta = {
    name: "Text",
    type: META.TYPES.ATOM
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
    var ElementType = getElementType(as, "p")
    var classes = cx(
        "-" + prefix("text-size-" + type),
        ((_a = {}), (_a["-" + prefix("text-color-" + color)] = color), _a),
        ((_b = {}), (_b[prefix("text--align-" + align)] = align), _b),
        ((_c = {}), (_c[prefix("text--inline")] = inline), _c),
        ((_d = {}), (_d[prefix("text--ellipsis")] = ellipsis), _d),
        ((_e = {}), (_e[prefix("text--wrap")] = wrap), _e),
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
export var Text = _Text
//# sourceMappingURL=Text.js.map
