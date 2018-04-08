Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var _meta = {
    name: "ColorTile",
    type: lib_1.META.TYPES.MOLECULE
};
var _ColorTile = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, color = props.color, circle = props.circle, secondaryColor = props.secondaryColor, size = props.size, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "color", "circle", "secondaryColor", "size"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default((_a = {}, _a[lib_1.prefix("color-tile--huge")] = size === "huge", _a), className);
    var previewContainerClasses = classnames_1.default(lib_1.prefix("color-tile__preview-container"), (_b = {}, _b[lib_1.prefix("color-tile__preview-container--circle")] = circle, _b));
    var previewClasses = classnames_1.default(lib_1.prefix("color-tile__preview"), (_c = {}, _c[lib_1.prefix("color-tile__preview--split")] = secondaryColor, _c), (_d = {}, _d[lib_1.prefix("color-tile__preview--full")] = !secondaryColor, _d));
    var labelClasses = classnames_1.default(lib_1.prefix("color-tile__label"));
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement(index_1.Flex, { alignCrossAxis: "center" },
            React.createElement("span", { className: previewContainerClasses },
                React.createElement("span", { className: previewClasses, style: { backgroundColor: color } }),
                secondaryColor &&
                    React.createElement("span", { className: previewClasses, style: { backgroundColor: secondaryColor } })),
            React.createElement("span", { className: labelClasses }, children))));
    var _a, _b, _c, _d;
};
_ColorTile._meta = _meta;
/**
 * A tile that can display one or two colors as a rectangle or circle in various sizes.
 * Example usage: Display interior and exterior colors and color combinations.
 */
exports.ColorTile = _ColorTile;
//# sourceMappingURL=ColorTile.js.map