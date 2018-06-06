Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
// We need version ^3.0.0 to support react 15. Using fragments might mess this up, maybe we should use matchmediaquery directly
var react_responsive_1 = tslib_1.__importDefault(require("react-responsive"))
var lib_1 = require("../../../lib")
var _meta = {
    name: "Breakpoint",
    type: lib_1.META.TYPES.ATOM
}
var _Breakpoint = function(props) {
    var children = props.children,
        minWidth = props.minWidth,
        maxWidth = props.maxWidth,
        rest = tslib_1.__rest(props, ["children", "minWidth", "maxWidth"])
    var minWidthValue = minWidth ? lib_1.breakpoints[minWidth] + "px" : undefined
    var maxWidthValue = maxWidth ? lib_1.breakpoints[maxWidth] - 1 + "px" : undefined
    return React.createElement(
        react_responsive_1.default,
        tslib_1.__assign({ minWidth: minWidthValue, maxWidth: maxWidthValue }, rest),
        children
    )
}
_Breakpoint._meta = _meta
_Breakpoint.xs = lib_1.breakpoints.xs
_Breakpoint.s = lib_1.breakpoints.s
_Breakpoint.m = lib_1.breakpoints.m
_Breakpoint.l = lib_1.breakpoints.l
_Breakpoint.xl = lib_1.breakpoints.xl
/**
 * Show and hide children based on minimum and maximum breakpoints.
 * The currently defined breakpoints are:
 * xs: 480,
 * s: 760,
 * m: 1000,
 * l: 1300,
 * xl: 1760
 */
exports.Breakpoint = _Breakpoint
//# sourceMappingURL=Breakpoint.js.map
