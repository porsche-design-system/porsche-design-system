Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var _meta = {
    name: "ButtonGroup",
    parent: "Button",
    type: lib_1.META.TYPES.MOLECULE
}
var _ButtonGroup = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        rest = tslib_1.__rest(props, ["as", "className", "children"])
    var classes = classnames_1.default(lib_1.prefix("button-group"), className)
    return React.createElement(
        index_1.Flex,
        tslib_1.__assign({ as: as, className: classes }, rest),
        React.Children.map(children, function(child, i) {
            return React.createElement("div", { key: i, className: lib_1.prefix("button-group__button") }, child)
        })
    )
}
_ButtonGroup._meta = _meta
/**
 * A button group wrapper for the default button.
 */
exports.ButtonGroup = _ButtonGroup
//# sourceMappingURL=ButtonGroup.js.map
