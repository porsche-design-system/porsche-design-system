import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
var defaultProps = {
    type: "copy",
    color: "black",
    wrap: true
};
var _meta = {
    name: "Text",
    type: META.TYPES.ATOM
};
var _Text = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, ellipsis = props.ellipsis, align = props.align, color = props.color, inline = props.inline, type = props.type, wrap = props.wrap, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "ellipsis", "align", "color", "inline", "type", "wrap"]);
    var ElementType = getElementType(as, "p");
    var classes = cx("-" + prefix("text-size-" + type), "-" + prefix("text-color-" + color), (_a = {}, _a[prefix("text--align-" + align)] = align, _a), (_b = {}, _b[prefix("text--inline")] = inline, _b), (_c = {}, _c[prefix("text--ellipsis")] = ellipsis, _c), (_d = {}, _d[prefix("text--wrap")] = wrap, _d), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    var _a, _b, _c, _d;
};
_Text.defaultProps = defaultProps;
_Text._meta = _meta;
/**
 * Use this component any time you want to display plain text anywhere.
 */
export var Text = _Text;
//# sourceMappingURL=Text.js.map