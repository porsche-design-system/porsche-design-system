import * as tslib_1 from "tslib"
import * as React from "react"
// We need version ^3.0.0 to support react 15. Using fragments might mess this up, maybe we should use matchmediaquery directly
import MediaQuery from "react-responsive"
import { breakpoints, META } from "../../../lib"
var _meta = {
    name: "Breakpoint",
    type: META.TYPES.ATOM
}
var _Breakpoint = function(props) {
    var children = props.children,
        minWidth = props.minWidth,
        maxWidth = props.maxWidth,
        rest = tslib_1.__rest(props, ["children", "minWidth", "maxWidth"])
    var minWidthValue = minWidth ? breakpoints[minWidth] + "px" : undefined
    var maxWidthValue = maxWidth ? breakpoints[maxWidth] - 1 + "px" : undefined
    return React.createElement(
        MediaQuery,
        tslib_1.__assign({ minWidth: minWidthValue, maxWidth: maxWidthValue }, rest),
        children
    )
}
_Breakpoint._meta = _meta
_Breakpoint.xs = breakpoints.xs
_Breakpoint.s = breakpoints.s
_Breakpoint.m = breakpoints.m
_Breakpoint.l = breakpoints.l
_Breakpoint.xl = breakpoints.xl
/**
 * Show and hide children based on minimum and maximum breakpoints.
 * The currently defined breakpoints are:
 * xs: 480,
 * s: 760,
 * m: 1000,
 * l: 1300,
 * xl: 1760
 */
export var Breakpoint = _Breakpoint
//# sourceMappingURL=Breakpoint.js.map
