import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
import { FlexItem } from "./FlexItem"
var _meta = {
    name: "Flex",
    type: META.TYPES.ATOM
}
var defaultProps = {
    wrap: true
}
var _Flex = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        alignCrossAxis = props.alignCrossAxis,
        alignLines = props.alignLines,
        alignMainAxis = props.alignMainAxis,
        direction = props.direction,
        gap = props.gap,
        inline = props.inline,
        wrap = props.wrap,
        rest = tslib_1.__rest(props, [
            "as",
            "className",
            "children",
            "alignCrossAxis",
            "alignLines",
            "alignMainAxis",
            "direction",
            "gap",
            "inline",
            "wrap"
        ])
    var ElementType = getElementType(as, "div")
    var classes = cx(
        prefix("flex"),
        ((_a = {}), (_a[prefix("flex--inline")] = inline), _a),
        ((_b = {}), (_b[prefix("flex--direction-" + direction)] = direction), _b),
        ((_c = {}), (_c[prefix("flex--main-axis-" + alignMainAxis)] = alignMainAxis), _c),
        ((_d = {}), (_d[prefix("flex--cross-axis-" + alignCrossAxis)] = alignCrossAxis), _d),
        ((_e = {}), (_e[prefix("flex--align-lines-" + alignLines)] = alignLines), _e),
        ((_f = {}), (_f[prefix("m-nl--" + gap)] = gap && gap !== "grid"), _f),
        ((_g = {}), (_g[prefix("m-nr--" + gap)] = gap && gap !== "grid"), _g),
        ((_h = {}), (_h[prefix("flex--gap")] = gap && gap === "grid"), _h),
        ((_j = {}), (_j[prefix("flex--wrap")] = wrap === true), _j),
        ((_k = {}), (_k[prefix("flex--nowrap")] = wrap === false), _k),
        ((_l = {}), (_l[prefix("flex--wrap-reverse")] = wrap === "reverse"), _l),
        className
    )
    var augmentedChildren = children
    if (gap && React.Children.count(children) > 0) {
        augmentedChildren = React.Children.map(children, function(child) {
            if (!child) {
                return child
            }
            var _a = child.props,
                className = _a.className,
                childRest = tslib_1.__rest(_a, ["className"])
            return React.cloneElement(
                child,
                tslib_1.__assign(
                    {
                        className: cx(
                            className,
                            ((_b = {}), (_b[prefix("pl--" + gap)] = gap && gap !== "grid"), _b),
                            ((_c = {}), (_c[prefix("pr--" + gap)] = gap && gap !== "grid"), _c),
                            ((_d = {}), (_d[prefix("flex__child--gap")] = gap && gap === "grid"), _d)
                        )
                    },
                    childRest
                )
            )
            var _b, _c, _d
        })
    }
    return React.createElement(ElementType, tslib_1.__assign({ className: classes }, rest), augmentedChildren)
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l
}
_Flex.defaultProps = defaultProps
_Flex.Item = FlexItem
_Flex._meta = _meta
/**
 * A flex container component used to create flex box layouts.
 * @see Spacing
 */
export var Flex = _Flex
//# sourceMappingURL=Flex.js.map
