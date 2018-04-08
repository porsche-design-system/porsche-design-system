import * as tslib_1 from "tslib";
import * as React from "react";
import * as PropTypes from "prop-types";
import cx from "classnames";
import { META, prefix, getElementType } from "../../../lib";
import { Flex, Divider, Flyout, Text, Spacing } from "../../../index";
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
    name: "NavigationDesktop",
    parent: "Navigation",
    type: META.TYPES.MOLECULE
};
/**
 * A navigation bar intended for larger screen sizes.
 */
var NavigationDesktop = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationDesktop, _super);
    function NavigationDesktop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hoveredSectionKey: undefined,
            isActive: false
        };
        _this.renderSection = function (section) {
            return (React.createElement(Flex.Item, { as: "li", key: section.key, width: "auto", className: prefix("nav__item"), customAttributes: {
                    onClick: _this.onSectionUnhovered,
                    onMouseEnter: function () { _this.onSectionHovered(section.key); },
                    onMouseLeave: _this.onSectionUnhovered
                } },
                React.createElement("a", { href: typeof section.link === "string" ? section.link : undefined, onClick: typeof section.link === "function" ? section.link : undefined, className: cx(prefix("nav__item-link"), (_a = {}, _a[prefix("nav__item-link--active")] = _this.state.isActive, _a)) }, _this.renderLabel(section.label, section.counter)),
                _this.renderFlyout(section)));
            var _a;
        };
        _this.renderLabel = function (label, counter) {
            if (counter) {
                return (React.createElement(Flex, null,
                    React.createElement("span", null, label),
                    React.createElement(Spacing, { marginLeft: 6 },
                        React.createElement(Text, { type: "copy", color: "red-1", as: "span" }, counter))));
            }
            else {
                return label;
            }
        };
        _this.renderFlyout = function (section) {
            if (_this.state.hoveredSectionKey === section.key && section.menu) {
                return (React.createElement(Flyout, { className: prefix("nav__flyout") }, section.menu));
            }
            else {
                return null;
            }
        };
        _this.onSectionHovered = function (key) {
            _this.setState({ hoveredSectionKey: key });
        };
        _this.onSectionUnhovered = function () {
            _this.setState({ hoveredSectionKey: undefined });
        };
        return _this;
    }
    NavigationDesktop.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, customAttributes = _a.customAttributes, sections = _a.sections, children = _a.children, rest = tslib_1.__rest(_a, ["as", "className", "customAttributes", "sections", "children"]);
        var ElementType = getElementType(as, "nav");
        return (React.createElement(ElementType, tslib_1.__assign({ className: className }, customAttributes, rest),
            React.createElement(Flex, { as: "ul", className: prefix("nav") }, this.props.sections && this.props.sections.length > 0 &&
                this.props.sections.map(this.renderSection)),
            React.createElement(Divider, null)));
    };
    NavigationDesktop.propTypes = propTypes;
    NavigationDesktop.defaultProps = {
        as: "nav"
    };
    NavigationDesktop._meta = _meta;
    return NavigationDesktop;
}(React.PureComponent));
export { NavigationDesktop };
//# sourceMappingURL=NavigationDesktop.js.map