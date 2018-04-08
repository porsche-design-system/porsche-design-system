import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import * as PropTypes from "prop-types";
import { META, prefix, getElementType } from "../../../lib";
import { ContentWrapper, Flex, Text, Icon, Spacing } from "../../../index";
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
    name: "NavigationMobile",
    parent: "Navigation",
    type: META.TYPES.MOLECULE
};
/**
 * A navigation bar intended for smaller screen sizes.
 */
var NavigationMobile = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationMobile, _super);
    function NavigationMobile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpened: false
        };
        _this.openNav = function () {
            _this.setState({ isOpened: true });
            document.body.classList.add(prefix("nav-mobile--active"));
        };
        _this.closeNav = function () {
            _this.setState({ isOpened: false });
            document.body.classList.remove(prefix("nav-mobile--active"));
        };
        _this.renderSectionRow = function (section) {
            return (React.createElement("li", { key: section.key, className: prefix("nav-mobile__row") },
                React.createElement(ContentWrapper, { as: "div", className: prefix("nav-mobile__item-wrapper") },
                    React.createElement("a", { className: prefix("nav-mobile__item"), 
                        // tslint:disable-next-line jsx-no-lambda
                        onClick: function () { return _this.setState({ openedSectionKey: section.key }); } },
                        _this.renderSectionLabel(section.label, section.counter),
                        React.createElement(Spacing, { marginLeft: "auto" },
                            React.createElement(Icon, { name: "arrow_right_hair", className: prefix("nav-mobile__icon") })))),
                section &&
                    _this.renderSectionOverlay(section)));
        };
        _this.renderSectionLabel = function (label, counter) {
            if (counter) {
                return (React.createElement("span", null,
                    React.createElement("span", null, label),
                    React.createElement(Spacing, { marginLeft: 6 },
                        React.createElement(Text, { type: "copy", color: "red-1", as: "span" }, counter))));
            }
            else {
                return label;
            }
        };
        _this.resetOpenedSectionKey = function () {
            _this.setState({ openedSectionKey: undefined });
        };
        _this.resetEvenMore = function () {
            _this.setState({ isOpened: false, openedSectionKey: undefined });
            document.body.classList.remove(prefix("nav-mobile--active"));
        };
        _this.renderSectionOverlay = function (section) {
            var classesOverlay = cx(prefix("nav-mobile__overlay"), _this.state.openedSectionKey === section.key ? prefix("nav-mobile__overlay--active") : null);
            return (React.createElement("div", { className: classesOverlay },
                React.createElement(ContentWrapper, { as: "div", className: prefix("nav-mobile__bgtop") },
                    React.createElement(Flex, { alignCrossAxis: "center", alignMainAxis: "center", className: prefix("nav-mobile__top"), customAttributes: {
                            onClick: _this.resetOpenedSectionKey
                        } },
                        React.createElement(Spacing, { marginRight: "auto" },
                            React.createElement(Icon, { name: "arrow_left_hair", className: prefix("nav-mobile__icon") })),
                        React.createElement(Spacing, { marginRight: "auto" },
                            React.createElement("span", null, section.label)))),
                React.createElement("div", { onClick: _this.resetEvenMore }, section.menu && React.cloneElement(section.menu, { mobile: true }))));
        };
        return _this;
    }
    NavigationMobile.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, customAttributes = _a.customAttributes, sections = _a.sections, children = _a.children, rest = tslib_1.__rest(_a, ["as", "className", "customAttributes", "sections", "children"]);
        var ElementType = getElementType(as, "nav");
        return (React.createElement(ElementType, tslib_1.__assign({ className: className }, customAttributes, rest),
            React.createElement(Flex, { className: prefix("nav-mobile__bar"), alignMainAxis: "end" },
                React.createElement("button", { className: prefix("nav-mobile__trigger"), onClick: this.openNav }, "Menu")),
            React.createElement("div", { className: cx(className, prefix("nav-mobile__overlay"), this.state.isOpened ? prefix("nav-mobile__overlay--active") : null) },
                React.createElement(ContentWrapper, { as: "div", className: prefix("nav-mobile__bgtop") },
                    React.createElement("div", { onClick: this.closeNav },
                        React.createElement(Flex, { alignCrossAxis: "center", alignMainAxis: "center", className: prefix("nav-mobile__top") },
                            React.createElement(Spacing, { marginRight: "auto" },
                                React.createElement(Icon, { name: "arrow_left_hair", className: prefix("nav-mobile__icon") })),
                            React.createElement(Spacing, { marginRight: "auto" },
                                React.createElement("span", null, "Menu"))))),
                React.createElement("ul", null, this.props.sections.map(this.renderSectionRow)))));
    };
    NavigationMobile.propTypes = propTypes;
    NavigationMobile.defaultProps = {
        as: "nav"
    };
    NavigationMobile._meta = _meta;
    return NavigationMobile;
}(React.PureComponent));
export { NavigationMobile };
//# sourceMappingURL=NavigationMobile.js.map