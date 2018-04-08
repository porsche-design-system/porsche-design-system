import * as tslib_1 from "tslib";
import * as React from "react";
import * as PropTypes from "prop-types";
import { META } from "../../../lib";
import { Breakpoint } from "../../../index";
import { NavigationDesktop } from "./NavigationDesktop";
import { NavigationMobile } from "./NavigationMobile";
var propTypes = {
    /** The html element type to render as. */
    as: PropTypes.string,
    /** Additional CSS classes. */
    className: PropTypes.string,
    /** Custom dom attributes. */
    customAttributes: PropTypes.object,
    /** The navigation sections to be displayed. */
    sections: PropTypes.arrayOf(PropTypes.object).isRequired
};
var _meta = {
    name: "Navigation",
    type: META.TYPES.MOLECULE
};
/**
 * A responsive navigation bar.
 */
var _Navigation = function (props) {
    var children = props.children, rest = tslib_1.__rest(props, ["children"]);
    return (React.createElement("div", null,
        React.createElement(Breakpoint, { maxWidth: "s" },
            React.createElement(NavigationMobile, tslib_1.__assign({}, rest))),
        React.createElement(Breakpoint, { minWidth: "s" },
            React.createElement(NavigationDesktop, tslib_1.__assign({}, rest)))));
};
_Navigation.propTypes = propTypes;
_Navigation._meta = _meta;
export var Navigation = _Navigation;
//# sourceMappingURL=Navigation.js.map