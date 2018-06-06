import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { META, prefix, getElementType } from "../../../lib"
import { Icon } from "../../../index"
var defaultProps = {
    rows: 4
}
var _meta = {
    name: "TextArea",
    type: META.TYPES.MOLECULE
}
var _TextArea = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        basic = props.basic,
        disabled = props.disabled,
        error = props.error,
        icon = props.icon,
        maxLength = props.maxLength,
        name = props.name,
        onChange = props.onChange,
        placeholder = props.placeholder,
        rows = props.rows,
        value = props.value,
        rest = tslib_1.__rest(props, [
            "as",
            "className",
            "children",
            "basic",
            "disabled",
            "error",
            "icon",
            "maxLength",
            "name",
            "onChange",
            "placeholder",
            "rows",
            "value"
        ])
    var ElementType = getElementType(as, "div")
    var inputFieldClasses = cx(
        prefix("text-area__field"),
        ((_a = {}), (_a[prefix("text-area__field--has-value")] = !basic && value && value.length > 0), _a),
        ((_b = {}), (_b[prefix("text-area__field--error")] = !!error), _b),
        ((_c = {}), (_c[prefix("text-area__field--no-label")] = basic), _c)
    )
    var renderMaxLength = function(max) {
        return React.createElement(
            "span",
            { className: prefix("text-area__max-length") },
            (value || "").toString().length,
            "/",
            max > 0 ? max : 1
        )
    }
    var handleChange = function(event) {
        if (disabled) {
            return
        }
        if (!onChange) {
            return
        }
        var result = maxLength
            ? event.currentTarget.value.substring(0, maxLength)
            : event.currentTarget.value.toString()
        onChange(result, event, props)
    }
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: className }, rest),
        React.createElement(
            "label",
            { className: prefix("text-area") },
            React.createElement("textarea", {
                className: inputFieldClasses,
                rows: rows,
                disabled: disabled,
                name: name,
                onChange: handleChange,
                placeholder: placeholder,
                required: true,
                spellCheck: false,
                value: value
            }),
            !basic && React.createElement("span", { className: prefix("text-area__label") }, placeholder),
            icon && React.createElement(Icon, { name: icon, className: prefix("text-area__icon") }),
            maxLength && renderMaxLength(maxLength),
            children
        )
    )
    var _a, _b, _c
}
_TextArea.defaultProps = defaultProps
_TextArea._meta = _meta
/**
 * A TextArea.
 * @see Checkbox
 * @see TextArea
 * @see Input
 * @see Icon
 */
export var TextArea = _TextArea
//# sourceMappingURL=TextArea.js.map
