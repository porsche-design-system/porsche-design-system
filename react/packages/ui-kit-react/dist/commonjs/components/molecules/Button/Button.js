Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var ButtonGroup_1 = require("./ButtonGroup");
var defaultProps = {
    type: "default",
    icon: "arrow_right_hair"
};
var _meta = {
    name: "Button",
    type: lib_1.META.TYPES.MOLECULE
};
var isGhostButton = function (type) {
    return type === "ghost" || type === "ghost-inverted";
};
var _Button = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, icon = props.icon, type = props.type, disabled = props.disabled, loading = props.loading, error = props.error, stretch = props.stretch, onClick = props.onClick, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "icon", "type", "disabled", "loading", "error", "stretch", "onClick"]);
    var ElementType = lib_1.getElementType(as, "button");
    var baseClass = isGhostButton(type) ? "button-ghost" : "button-primary";
    var buttonClasses = classnames_1.default(lib_1.prefix("" + baseClass), (_a = {}, _a[lib_1.prefix("button-primary--black")] = type === "black", _a), (_b = {}, _b[lib_1.prefix("button-primary--red")] = type === "red", _b), (_c = {}, _c[lib_1.prefix("button-primary--blue")] = type === "blue", _c), (_d = {}, _d[lib_1.prefix("button-primary--acid-green")] = type === "acid-green", _d), (_e = {}, _e[lib_1.prefix("button-ghost--inverted")] = type === "ghost-inverted", _e), (_f = {}, _f[lib_1.prefix(baseClass + "--error")] = error, _f), (_g = {}, _g[lib_1.prefix(baseClass + "--stretch")] = stretch, _g), className);
    var iconClasses = classnames_1.default(lib_1.prefix(baseClass + "__icon"), (_h = {}, _h[lib_1.prefix(baseClass + "__icon--loading")] = loading, _h));
    var loaderClasses = classnames_1.default(lib_1.prefix(baseClass + "__loader"), "loader-base");
    var labelClasses = classnames_1.default(lib_1.prefix(baseClass + "__label"));
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
        React.createElement(index_1.Icon, { name: icon, className: iconClasses }, loading &&
            React.createElement("span", { className: loaderClasses })),
        React.createElement("span", { className: labelClasses }, children)));
    var _a, _b, _c, _d, _e, _f, _g, _h;
};
_Button.defaultProps = defaultProps;
_Button.Group = ButtonGroup_1.ButtonGroup;
_Button._meta = _meta;
/**
 * The default Porsche button.
 * @see Icon
 */
exports.Button = _Button;
//# sourceMappingURL=Button.js.map