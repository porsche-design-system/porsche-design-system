Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var base64logo_1 = require("../../../lib/base64logo");
var _meta = {
    name: "Logo",
    type: lib_1.META.TYPES.ATOM
};
var _Logo = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes"]);
    var ElementType = lib_1.getElementType(as, "div");
    return (React.createElement(ElementType, tslib_1.__assign({ className: classnames_1.default(lib_1.prefix("logo-protection"), className) }, customAttributes, rest),
        React.createElement("img", { className: "pui-logo-image", src: base64logo_1.base64logo, alt: "Porsche\u00AE" })));
};
_Logo._meta = _meta;
/**
 * The famous and loved Porsche Logo, currently available in like one size.
 */
exports.Logo = _Logo;
//# sourceMappingURL=Logo.js.map