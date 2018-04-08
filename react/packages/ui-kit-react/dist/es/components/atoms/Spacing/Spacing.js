import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
var _meta = {
    name: "Spacing",
    type: META.TYPES.ATOM
};
var _Spacing = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, wrap = props.wrap, margin = props.margin, marginBottom = props.marginBottom, marginLeft = props.marginLeft, marginRight = props.marginRight, marginTop = props.marginTop, padding = props.padding, paddingBottom = props.paddingBottom, paddingLeft = props.paddingLeft, paddingRight = props.paddingRight, paddingTop = props.paddingTop, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "wrap", "margin", "marginBottom", "marginLeft", "marginRight", "marginTop", "padding", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop"]);
    var ElementType = getElementType(as, "div");
    var classes = cx((_a = {}, _a[prefix("m--" + margin)] = margin, _a), (_b = {}, _b[prefix("mt--" + marginTop)] = marginTop, _b), (_c = {}, _c[prefix("ml--" + marginLeft)] = marginLeft, _c), (_d = {}, _d[prefix("mb--" + marginBottom)] = marginBottom, _d), (_e = {}, _e[prefix("mr--" + marginRight)] = marginRight, _e), (_f = {}, _f[prefix("p--" + padding)] = padding, _f), (_g = {}, _g[prefix("pt--" + paddingTop)] = paddingTop, _g), (_h = {}, _h[prefix("pl--" + paddingLeft)] = paddingLeft, _h), (_j = {}, _j[prefix("pb--" + paddingBottom)] = paddingBottom, _j), (_k = {}, _k[prefix("pr--" + paddingRight)] = paddingRight, _k), className);
    if (React.Children.count(children) === 1 && !wrap) {
        // One child => append spacing classes and unhandled props to child
        return React.Children.map(children, function (child) {
            if (!child) {
                return child;
            }
            var _a = child.props, className = _a.className, childRest = tslib_1.__rest(_a, ["className"]);
            return (React.cloneElement(child, tslib_1.__assign({ className: cx(className, classes) }, childRest)));
        })[0];
    }
    else {
        // Multiple childs => render wrapper element with spacing classes and unhandled props
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
};
_Spacing._meta = _meta;
/**
 * A component to add margins and paddings to components.
 * If it has only one child, those classes are added directly to the child to avoid unnecessary wrapper divs.
 */
export var Spacing = _Spacing;
//# sourceMappingURL=Spacing.js.map