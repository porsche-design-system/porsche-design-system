import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { Flex, Icon } from "../../../index";
import { META, getElementType, prefix } from "../../../lib";
var defaultProps = {
    align: "left"
};
var _meta = {
    name: "ButtonCircle",
    type: META.TYPES.MOLECULE
};
var _ButtonCircle = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, align = props.align, disabled = props.disabled, icon = props.icon, onClick = props.onClick, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "align", "disabled", "icon", "onClick"]);
    var ElementType = getElementType(as, "button");
    var buttonClasses = cx(prefix("button-circle"), className);
    var iconClasses = cx(prefix("button-circle__icon"), prefix("button-circle__icon--" + align), className);
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
        React.createElement(Flex, { alignMainAxis: "center", className: iconClasses },
            React.createElement(Icon, { size: "small", name: props.icon })),
        children &&
            React.createElement("div", { className: "" + prefix("button-circle__container") },
                React.createElement(Flex, { direction: "column", alignMainAxis: "center", alignCrossAxis: "baseline", className: "" + prefix("button-circle__container__content") }, children))));
};
_ButtonCircle.defaultProps = defaultProps;
_ButtonCircle._meta = _meta;
/**
 * Displays an icon inside a round outlined button. Text can optionally be displayed to the right or left of that button.
 * @see Icon
 */
export var ButtonCircle = _ButtonCircle;
//# sourceMappingURL=ButtonCircle.js.map