import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Flex } from "../../../index";
var _meta = {
    name: "ColorTile",
    type: META.TYPES.MOLECULE
};
var _ColorTile = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, color = props.color, circle = props.circle, secondaryColor = props.secondaryColor, size = props.size, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "color", "circle", "secondaryColor", "size"]);
    var ElementType = getElementType(as, "div");
    var classes = cx((_a = {}, _a[prefix("color-tile--huge")] = size === "huge", _a), className);
    var previewContainerClasses = cx(prefix("color-tile__preview-container"), (_b = {}, _b[prefix("color-tile__preview-container--circle")] = circle, _b));
    var previewClasses = cx(prefix("color-tile__preview"), (_c = {}, _c[prefix("color-tile__preview--split")] = secondaryColor, _c), (_d = {}, _d[prefix("color-tile__preview--full")] = !secondaryColor, _d));
    var labelClasses = cx(prefix("color-tile__label"));
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement(Flex, { alignCrossAxis: "center" },
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
export var ColorTile = _ColorTile;
//# sourceMappingURL=ColorTile.js.map