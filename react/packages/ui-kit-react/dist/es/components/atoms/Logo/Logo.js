import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { base64logo } from "../../../lib/base64logo";
var _meta = {
    name: "Logo",
    type: META.TYPES.ATOM
};
var _Logo = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = getElementType(as, "div");
    return (React.createElement(ElementType, tslib_1.__assign({ className: cx(prefix("logo-protection"), className) }, customAttributes, rest),
        React.createElement("img", { className: "pui-logo-image", src: base64logo, alt: "Porsche\u00AE" })));
};
_Logo._meta = _meta;
/**
 * The famous and loved Porsche Logo, currently available in like one size.
 */
export var Logo = _Logo;
//# sourceMappingURL=Logo.js.map