Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var PropTypes = require("prop-types");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
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
    type: lib_1.META.TYPES.MOLECULE
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
            document.body.classList.add(lib_1.prefix("nav-mobile--active"));
        };
        _this.closeNav = function () {
            _this.setState({ isOpened: false });
            document.body.classList.remove(lib_1.prefix("nav-mobile--active"));
        };
        _this.renderSectionRow = function (section) {
            return (React.createElement("li", { key: section.key, className: lib_1.prefix("nav-mobile__row") },
                React.createElement(index_1.ContentWrapper, { as: "div", className: lib_1.prefix("nav-mobile__item-wrapper") },
                    React.createElement("a", { className: lib_1.prefix("nav-mobile__item"), 
                        // tslint:disable-next-line jsx-no-lambda
                        onClick: function () { return _this.setState({ openedSectionKey: section.key }); } },
                        _this.renderSectionLabel(section.label, section.counter),
                        React.createElement(index_1.Spacing, { marginLeft: "auto" },
                            React.createElement(index_1.Icon, { name: "arrow_right_hair", className: lib_1.prefix("nav-mobile__icon") })))),
                section &&
                    _this.renderSectionOverlay(section)));
        };
        _this.renderSectionLabel = function (label, counter) {
            if (counter) {
                return (React.createElement("span", null,
                    React.createElement("span", null, label),
                    React.createElement(index_1.Spacing, { marginLeft: 6 },
                        React.createElement(index_1.Text, { type: "copy", color: "red-1", as: "span" }, counter))));
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
            document.body.classList.remove(lib_1.prefix("nav-mobile--active"));
        };
        _this.renderSectionOverlay = function (section) {
            var classesOverlay = classnames_1.default(lib_1.prefix("nav-mobile__overlay"), _this.state.openedSectionKey === section.key ? lib_1.prefix("nav-mobile__overlay--active") : null);
            return (React.createElement("div", { className: classesOverlay },
                React.createElement(index_1.ContentWrapper, { as: "div", className: lib_1.prefix("nav-mobile__bgtop") },
                    React.createElement(index_1.Flex, { alignCrossAxis: "center", alignMainAxis: "center", className: lib_1.prefix("nav-mobile__top"), customAttributes: {
                            onClick: _this.resetOpenedSectionKey
                        } },
                        React.createElement(index_1.Spacing, { marginRight: "auto" },
                            React.createElement(index_1.Icon, { name: "arrow_left_hair", className: lib_1.prefix("nav-mobile__icon") })),
                        React.createElement(index_1.Spacing, { marginRight: "auto" },
                            React.createElement("span", null, section.label)))),
                React.createElement("div", { onClick: _this.resetEvenMore }, section.menu && React.cloneElement(section.menu, { mobile: true }))));
        };
        return _this;
    }
    NavigationMobile.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, customAttributes = _a.customAttributes, sections = _a.sections, children = _a.children, rest = tslib_1.__rest(_a, ["as", "className", "customAttributes", "sections", "children"]);
        var ElementType = lib_1.getElementType(as, "nav");
        return (React.createElement(ElementType, tslib_1.__assign({ className: className }, customAttributes, rest),
            React.createElement(index_1.Flex, { className: lib_1.prefix("nav-mobile__bar"), alignMainAxis: "end" },
                React.createElement("button", { className: lib_1.prefix("nav-mobile__trigger"), onClick: this.openNav }, "Menu")),
            React.createElement("div", { className: classnames_1.default(className, lib_1.prefix("nav-mobile__overlay"), this.state.isOpened ? lib_1.prefix("nav-mobile__overlay--active") : null) },
                React.createElement(index_1.ContentWrapper, { as: "div", className: lib_1.prefix("nav-mobile__bgtop") },
                    React.createElement("div", { onClick: this.closeNav },
                        React.createElement(index_1.Flex, { alignCrossAxis: "center", alignMainAxis: "center", className: lib_1.prefix("nav-mobile__top") },
                            React.createElement(index_1.Spacing, { marginRight: "auto" },
                                React.createElement(index_1.Icon, { name: "arrow_left_hair", className: lib_1.prefix("nav-mobile__icon") })),
                            React.createElement(index_1.Spacing, { marginRight: "auto" },
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
exports.NavigationMobile = NavigationMobile;
//# sourceMappingURL=NavigationMobile.js.map