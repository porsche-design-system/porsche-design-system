Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var NavigationDesktop_1 = require("./NavigationDesktop")
var NavigationMobile_1 = require("./NavigationMobile")
var _meta = {
    name: "Navigation",
    type: lib_1.META.TYPES.MOLECULE
}
/**
 * A responsive navigation bar.
 */
var _Navigation = function(props) {
    var children = props.children,
        rest = tslib_1.__rest(props, ["children"])
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            index_1.Breakpoint,
            { maxWidth: "s" },
            React.createElement(NavigationMobile_1.NavigationMobile, tslib_1.__assign({}, rest))
        ),
        React.createElement(
            index_1.Breakpoint,
            { minWidth: "s" },
            React.createElement(NavigationDesktop_1.NavigationDesktop, tslib_1.__assign({}, rest))
        )
    )
}
_Navigation._meta = _meta
exports.Navigation = _Navigation
//# sourceMappingURL=Navigation.js.map
