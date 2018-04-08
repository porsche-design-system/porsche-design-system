Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var defaultProps = {
    rows: 4
};
var _meta = {
    name: "TextArea",
    type: lib_1.META.TYPES.MOLECULE
};
var _TextArea = function (props) {
    var className = props.className, children = props.children, customAttributes = props.customAttributes, basic = props.basic, disabled = props.disabled, error = props.error, icon = props.icon, maxLength = props.maxLength, name = props.name, onChange = props.onChange, placeholder = props.placeholder, rows = props.rows, value = props.value, rest = tslib_1.__rest(props, ["className", "children", "customAttributes", "basic", "disabled", "error", "icon", "maxLength", "name", "onChange", "placeholder", "rows", "value"]);
    var labelClasses = classnames_1.default(lib_1.prefix("text-area"), className);
    var inputFieldClasses = classnames_1.default(lib_1.prefix("text-area__field"), (_a = {}, _a[lib_1.prefix("text-area__field--has-value")] = !basic && value && value.length > 0, _a), (_b = {}, _b[lib_1.prefix("text-area__field--error")] = !!error, _b), (_c = {}, _c[lib_1.prefix("text-area__field--no-label")] = basic, _c));
    var renderMaxLength = function (max) {
        return (React.createElement("span", { className: lib_1.prefix("text-area__max-length") },
            (value || "").toString().length,
            "/",
            max > 0 ? max : 1));
    };
    var handleChange = function (event) {
        if (disabled) {
            return;
        }
        if (!onChange) {
            return;
        }
        var value = maxLength
            ? event.currentTarget.value.substring(0, maxLength)
            : event.currentTarget.value.toString();
        onChange(value, event, props);
    };
    return (React.createElement("label", tslib_1.__assign({ className: labelClasses }, customAttributes, rest),
        React.createElement("textarea", { className: inputFieldClasses, rows: rows, disabled: disabled, name: name, onChange: handleChange, placeholder: placeholder, required: true, spellCheck: false, value: value }),
        !basic && React.createElement("span", { className: lib_1.prefix("text-area__label") }, placeholder),
        icon && React.createElement(index_1.Icon, { name: icon, className: lib_1.prefix("text-area__icon") }),
        maxLength && renderMaxLength(maxLength),
        children));
    var _a, _b, _c;
};
_TextArea.defaultProps = defaultProps;
_TextArea._meta = _meta;
/**
 * A TextArea.
 * @see Checkbox
 * @see TextArea
 * @see Input
 * @see Icon
 */
exports.TextArea = _TextArea;
//# sourceMappingURL=TextArea.js.map