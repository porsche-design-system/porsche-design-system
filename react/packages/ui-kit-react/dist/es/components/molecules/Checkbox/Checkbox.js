import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, prefix, getElementType } from "../../../lib"
var defaultProps = {
    checked: false,
    type: "default"
}
var _meta = {
    name: "Checkbox",
    type: META.TYPES.MOLECULE
}
var _Checkbox = function(props) {
    var as = props.as,
        checked = props.checked,
        children = props.children,
        className = props.className,
        checkboxProps = props.checkboxProps,
        disabled = props.disabled,
        error = props.error,
        onChange = props.onChange,
        onClick = props.onClick,
        readOnly = props.readOnly,
        singleLine = props.singleLine,
        type = props.type,
        rest = tslib_1.__rest(props, [
            "as",
            "checked",
            "children",
            "className",
            "checkboxProps",
            "disabled",
            "error",
            "onChange",
            "onClick",
            "readOnly",
            "singleLine",
            "type"
        ])
    var ElementType = getElementType(as, "div")
    var iconClasses = cx(
        prefix("checkbox__icon"),
        prefix("icon"),
        prefix("icon--check"),
        ((_a = {}), (_a[prefix("checkbox__icon--default")] = type === "default"), _a),
        ((_b = {}), (_b[prefix("checkbox__icon--red")] = type === "red"), _b),
        ((_c = {}), (_c[prefix("checkbox__icon--blue")] = type === "blue"), _c),
        ((_d = {}), (_d[prefix("checkbox__icon--inverted")] = type === "inverted"), _d)
    )
    var labelClasses = cx(
        prefix("noselect"),
        prefix("checkbox__label"),
        ((_e = {}), (_e[prefix("checkbox__label--error")] = error), _e),
        ((_f = {}), (_f[prefix("checkbox__label--inverted")] = type === "inverted"), _f),
        ((_g = {}), (_g[prefix("checkbox__label--single-line")] = singleLine), _g)
    )
    var handleChange = function(e) {
        if (!onChange) {
            return
        }
        if (disabled || readOnly) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        onChange(!checked, e, props)
    }
    var handleClick = function(e) {
        if (!onClick) {
            return
        }
        if (disabled || readOnly) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        onClick(e, props)
    }
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: className, onClick: handleClick }, rest),
        React.createElement(
            "label",
            { className: prefix("checkbox") },
            React.createElement("input", {
                className: prefix("checkbox__field"),
                type: "checkbox",
                checked: checked,
                disabled: disabled,
                readOnly: readOnly,
                onChange: handleChange
            }),
            React.createElement("span", tslib_1.__assign({ className: iconClasses }, checkboxProps)),
            children &&
                React.Children.count(children) > 0 &&
                React.createElement("span", { className: labelClasses }, children)
        )
    )
    var _a, _b, _c, _d, _e, _f, _g
}
_Checkbox.defaultProps = defaultProps
_Checkbox._meta = _meta
/**
 * A checkbox allows a user to select a binary value.
 * @see Icon
 * @see Input
 * @see TextArea
 * @see Select
 */
export var Checkbox = _Checkbox
//# sourceMappingURL=Checkbox.js.map
