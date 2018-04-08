import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, prefix } from "../../../lib";
var defaultProps = {
    checked: false,
    type: "default"
};
var _meta = {
    name: "Checkbox",
    type: META.TYPES.MOLECULE
};
var _Checkbox = function (props) {
    var checked = props.checked, children = props.children, className = props.className, customAttributes = props.customAttributes, checkboxCustomAttributes = props.checkboxCustomAttributes, disabled = props.disabled, error = props.error, onChange = props.onChange, readOnly = props.readOnly, singleLine = props.singleLine, type = props.type, rest = tslib_1.__rest(props, ["checked", "children", "className", "customAttributes", "checkboxCustomAttributes", "disabled", "error", "onChange", "readOnly", "singleLine", "type"]);
    var classes = cx("pui-checkbox", className);
    var iconClasses = cx(prefix("checkbox__icon"), prefix("icon"), prefix("icon--check"), (_a = {}, _a[prefix("checkbox__icon--default")] = type === "default", _a), (_b = {}, _b[prefix("checkbox__icon--red")] = type === "red", _b), (_c = {}, _c[prefix("checkbox__icon--blue")] = type === "blue", _c), (_d = {}, _d[prefix("checkbox__icon--inverted")] = type === "inverted", _d));
    var labelClasses = cx(prefix("noselect"), prefix("checkbox__label"), (_e = {}, _e[prefix("checkbox__label--error")] = error, _e), (_f = {}, _f[prefix("checkbox__label--inverted")] = type === "inverted", _f), (_g = {}, _g[prefix("checkbox__label--single-line")] = singleLine, _g));
    var handleChange = function (e) {
        if (!onChange) {
            return;
        }
        if (disabled || readOnly) {
            e.preventDefault();
            return;
        }
        onChange(!checked, e, props);
    };
    return (React.createElement("label", tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement("input", { className: prefix("checkbox__field"), type: "checkbox", checked: checked, disabled: disabled, readOnly: readOnly, onChange: handleChange }),
        React.createElement("span", tslib_1.__assign({ className: iconClasses }, checkboxCustomAttributes)),
        React.createElement("span", { className: labelClasses }, children)));
    var _a, _b, _c, _d, _e, _f, _g;
};
_Checkbox.defaultProps = defaultProps;
_Checkbox._meta = _meta;
/**
 * A checkbox allows a user to select a binary value.
 * @see Icon
 * @see Input
 * @see TextArea
 * @see Select
 */
export var Checkbox = _Checkbox;
//# sourceMappingURL=Checkbox.js.map