Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var index_1 = require("../../../index");
var lib_1 = require("../../../lib");
var defaultProps = {
    align: "left"
};
var _meta = {
    name: "ButtonCircle",
    type: lib_1.META.TYPES.MOLECULE
};
var _ButtonCircle = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, align = props.align, disabled = props.disabled, icon = props.icon, onClick = props.onClick, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "align", "disabled", "icon", "onClick"]);
    var ElementType = lib_1.getElementType(as, "button");
    var buttonClasses = classnames_1.default(lib_1.prefix("button-circle"), className);
    var iconClasses = classnames_1.default(lib_1.prefix("button-circle__icon"), lib_1.prefix("button-circle__icon--" + align), className);
    var handleClick = function (e) {
        if (!onClick) {
            return;
        }
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick(e, props);
    };
    return (React.createElement(ElementType, tslib_1.__assign({ type: "button", className: buttonClasses, onClick: handleClick, disabled: disabled }, customAttributes, rest),
        React.createElement(index_1.Flex, { alignMainAxis: "center", className: iconClasses },
            React.createElement(index_1.Icon, { size: "small", name: props.icon })),
        children &&
            React.createElement("div", { className: "" + lib_1.prefix("button-circle__container") },
                React.createElement(index_1.Flex, { direction: "column", alignMainAxis: "center", alignCrossAxis: "baseline", className: "" + lib_1.prefix("button-circle__container__content") }, children))));
};
_ButtonCircle.defaultProps = defaultProps;
_ButtonCircle._meta = _meta;
/**
 * Displays an icon inside a round outlined button. Text can optionally be displayed to the right or left of that button.
 * @see Icon
 */
exports.ButtonCircle = _ButtonCircle;
//# sourceMappingURL=ButtonCircle.js.map