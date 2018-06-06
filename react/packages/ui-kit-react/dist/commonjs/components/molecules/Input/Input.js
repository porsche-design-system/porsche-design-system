Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var defaultProps = {
    type: "text"
}
var _meta = {
    name: "Input",
    type: lib_1.META.TYPES.MOLECULE
}
var _Input = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        basic = props.basic,
        disabled = props.disabled,
        error = props.error,
        icon = props.icon,
        name = props.name,
        onChange = props.onChange,
        placeholder = props.placeholder,
        type = props.type,
        unit = props.unit,
        value = props.value,
        rest = tslib_1.__rest(props, [
            "as",
            "className",
            "children",
            "basic",
            "disabled",
            "error",
            "icon",
            "name",
            "onChange",
            "placeholder",
            "type",
            "unit",
            "value"
        ])
    var handleChange = function(event) {
        if (!onChange || disabled) {
            return
        }
        onChange(event.currentTarget.value, event, props)
    }
    var ElementType = lib_1.getElementType(as, "div")
    var inputClasses = classnames_1.default(
        lib_1.prefix("input__field"),
        ((_a = {}), (_a[lib_1.prefix("input__field--has-value")] = !basic && value && value.length > 0), _a),
        ((_b = {}), (_b[lib_1.prefix("input__field--error")] = error), _b),
        ((_c = {}), (_c[lib_1.prefix("input__field--number")] = type === "number"), _c),
        ((_d = {}), (_d[lib_1.prefix("input__field--no-label")] = basic || placeholder === undefined), _d),
        ((_e = {}), (_e[lib_1.prefix("input__field--with-icon")] = !!icon), _e)
    )
    var floatingPlaceholderClasses = classnames_1.default(
        lib_1.prefix("input__label"),
        ((_f = {}), (_f[lib_1.prefix("input__label--with-icon")] = !!icon), _f)
    )
    var iconClasses = classnames_1.default(
        lib_1.prefix("input__icon"),
        ((_g = {}), (_g[lib_1.prefix("input__icon--error")] = error), _g)
    )
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: className }, rest),
        React.createElement(
            "label",
            { className: lib_1.prefix("input") },
            React.createElement("input", {
                className: inputClasses,
                disabled: disabled,
                name: name,
                onChange: handleChange,
                placeholder: placeholder,
                required: true,
                spellCheck: false,
                type: type,
                value: value
            }),
            !basic && React.createElement("span", { className: floatingPlaceholderClasses }, placeholder),
            icon && React.createElement(index_1.Icon, { name: icon, className: iconClasses }),
            unit && !icon && React.createElement("span", { className: lib_1.prefix("input__unit") }, unit),
            children
        )
    )
    var _a, _b, _c, _d, _e, _f, _g
}
_Input.defaultProps = defaultProps
_Input._meta = _meta
/**
 * An Input is a field used to elicit a textual response from a user.
 * @see Icon
 * @see Checkbox
 * @see TextArea
 * @see Select
 */
exports.Input = _Input
//# sourceMappingURL=Input.js.map
