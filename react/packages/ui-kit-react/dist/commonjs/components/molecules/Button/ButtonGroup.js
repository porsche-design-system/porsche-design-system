Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var _meta = {
    name: "ButtonGroup",
    parent: "Button",
    type: lib_1.META.TYPES.MOLECULE
};
var _ButtonGroup = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var classes = classnames_1.default(lib_1.prefix("button-group"), className);
    return (React.createElement(index_1.Flex, tslib_1.__assign({ as: as, className: classes }, customAttributes, rest), children));
};
_ButtonGroup._meta = _meta;
/**
 * A button group wrapper for the default button.
 */
exports.ButtonGroup = _ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map