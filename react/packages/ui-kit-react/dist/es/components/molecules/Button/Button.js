import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Icon } from "../../../index";
import { ButtonGroup } from "./ButtonGroup";
var defaultProps = {
    type: "default",
    icon: "arrow_right_hair"
};
var _meta = {
    name: "Button",
    type: META.TYPES.MOLECULE
};
var isGhostButton = function (type) {
    return type === "ghost" || type === "ghost-inverted";
};
var _Button = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, icon = props.icon, type = props.type, disabled = props.disabled, loading = props.loading, error = props.error, stretch = props.stretch, onClick = props.onClick, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "icon", "type", "disabled", "loading", "error", "stretch", "onClick"]);
    var ElementType = getElementType(as, "button");
    var baseClass = isGhostButton(type) ? "button-ghost" : "button-primary";
    var buttonClasses = cx(prefix("" + baseClass), (_a = {}, _a[prefix("button-primary--black")] = type === "black", _a), (_b = {}, _b[prefix("button-primary--red")] = type === "red", _b), (_c = {}, _c[prefix("button-primary--blue")] = type === "blue", _c), (_d = {}, _d[prefix("button-primary--acid-green")] = type === "acid-green", _d), (_e = {}, _e[prefix("button-ghost--inverted")] = type === "ghost-inverted", _e), (_f = {}, _f[prefix(baseClass + "--error")] = error, _f), (_g = {}, _g[prefix(baseClass + "--stretch")] = stretch, _g), className);
    var iconClasses = cx(prefix(baseClass + "__icon"), (_h = {}, _h[prefix(baseClass + "__icon--loading")] = loading, _h));
    var loaderClasses = cx(prefix(baseClass + "__loader"), "loader-base");
    var labelClasses = cx(prefix(baseClass + "__label"));
    var handleClick = function (e) {
        if (!onClick) {
            return;
        }
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        onClick(e, props);
    };
    return (React.createElement(ElementType, tslib_1.__assign({ type: "button", onClick: handleClick, className: buttonClasses, disabled: disabled || loading }, customAttributes, rest),
        React.createElement(Icon, { name: icon, className: iconClasses }, loading &&
            React.createElement("span", { className: loaderClasses })),
        React.createElement("span", { className: labelClasses }, children)));
    var _a, _b, _c, _d, _e, _f, _g, _h;
};
_Button.defaultProps = defaultProps;
_Button.Group = ButtonGroup;
_Button._meta = _meta;
/**
 * The default Porsche button.
 * @see Icon
 */
export var Button = _Button;
//# sourceMappingURL=Button.js.map