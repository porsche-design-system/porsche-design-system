import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, getElementType, prefix } from "../../../lib"
import { Flex, Navigation, Logo, Divider } from "../../../index"
var _meta = {
    name: "Header",
    type: META.TYPES.ORGANISM
}
var _Header = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        sections = props.sections,
        logoComponent = props.logoComponent,
        logoProps = props.logoProps,
        rest = tslib_1.__rest(props, ["as", "className", "children", "sections", "logoComponent", "logoProps"])
    var ElementType = getElementType(as, "div")
    var classes = cx(prefix("header"), className)
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: classes }, rest),
        React.createElement(
            Flex,
            { alignMainAxis: "center" },
            React.createElement(Logo, tslib_1.__assign({ as: logoComponent }, logoProps))
        ),
        React.createElement(Divider, { className: prefix("header__divider") }),
        sections.length > 0 ? React.createElement(Navigation, { sections: sections }) : null
    )
}
_Header._meta = _meta
/**
 * The page header with logo and navigation bar
 */
export var Header = _Header
//# sourceMappingURL=Header.js.map
