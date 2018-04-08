import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { META, getElementType, prefix } from "../../../lib";
import { Flex, Navigation, Logo, Divider } from "../../../index";
var defaultProps = {
    as: "header"
};
var _meta = {
    name: "Header",
    type: META.TYPES.ORGANISM
};
var _Header = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, sections = props.sections, onLogoClick = props.onLogoClick, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "sections", "onLogoClick"]);
    var ElementType = getElementType(as, "header");
    var classes = cx(prefix("header"), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement(Flex, { alignMainAxis: "center" },
            React.createElement(Logo, { className: cx((_a = {}, _a[prefix("header__logo--clickable")] = onLogoClick, _a)), customAttributes: { onClick: onLogoClick } })),
        React.createElement(Divider, { className: prefix("header__divider") }),
        React.createElement(Navigation, { sections: sections })));
    var _a;
};
_Header._meta = _meta;
/**
 * The page header with logo and navigation bar
 */
export var Header = _Header;
//# sourceMappingURL=Header.js.map