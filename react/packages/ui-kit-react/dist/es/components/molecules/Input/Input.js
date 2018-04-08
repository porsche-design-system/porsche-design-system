import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, prefix } from "../../../lib";
import { Icon } from "../../../index";
var defaultProps = {
    type: "text"
};
var _meta = {
    name: "Input",
    type: META.TYPES.MOLECULE
};
var _Input = function (props) {
    var className = props.className, children = props.children, customAttributes = props.customAttributes, basic = props.basic, disabled = props.disabled, error = props.error, icon = props.icon, name = props.name, onChange = props.onChange, placeholder = props.placeholder, type = props.type, unit = props.unit, value = props.value, rest = tslib_1.__rest(props, ["className", "children", "customAttributes", "basic", "disabled", "error", "icon", "name", "onChange", "placeholder", "type", "unit", "value"]);
    var handleChange = function (event) {
        if (!onChange || disabled) {
            return;
        }
        onChange(event.currentTarget.value, event, props);
    };
    var labelClasses = cx(prefix("input"), className);
    var inputClasses = cx(prefix("input__field"), (_a = {}, _a[prefix("input__field--has-value")] = !basic && value && value.length > 0, _a), (_b = {}, _b[prefix("input__field--error")] = error, _b), (_c = {}, _c[prefix("input__field--number")] = type === "number", _c), (_d = {}, _d[prefix("input__field--no-label")] = basic, _d), (_e = {}, _e[prefix("input__field--with-icon")] = !!icon, _e));
    var floatingPlaceholderClasses = cx(prefix("input__label"), (_f = {}, _f[prefix("input__label--with-icon")] = !!icon, _f));
    var iconClasses = cx(prefix("input__icon"), (_g = {}, _g[prefix("input__icon--error")] = error, _g));
    return (React.createElement("label", tslib_1.__assign({ className: labelClasses }, customAttributes, rest),
        React.createElement("input", { className: inputClasses, disabled: disabled, name: name, onChange: handleChange, placeholder: placeholder, required: true, spellCheck: false, type: type, value: value }),
        !basic && React.createElement("span", { className: floatingPlaceholderClasses }, placeholder),
        icon && React.createElement(Icon, { name: icon, className: iconClasses }),
        unit && !icon && React.createElement("span", { className: prefix("input__unit") }, unit),
        children));
    var _a, _b, _c, _d, _e, _f, _g;
};
_Input.defaultProps = defaultProps;
_Input._meta = _meta;
/**
 * An Input is a field used to elicit a textual response from a user.
 * @see Icon
 * @see Checkbox
 * @see TextArea
 * @see Select
 */
export var Input = _Input;
//# sourceMappingURL=Input.js.map