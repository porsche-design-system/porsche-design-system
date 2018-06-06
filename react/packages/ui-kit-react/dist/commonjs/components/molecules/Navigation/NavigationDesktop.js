Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var _meta = {
    name: "NavigationDesktop",
    parent: "Navigation",
    type: lib_1.META.TYPES.MOLECULE
}
/**
 * A navigation bar intended for larger screen sizes.
 */
var NavigationDesktop = /** @class */ (function(_super) {
    tslib_1.__extends(NavigationDesktop, _super)
    function NavigationDesktop() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this
        _this.state = {
            hoveredSectionKey: undefined,
            isActive: false
        }
        _this.renderSection = function(section) {
            var LinkElementType = section.component || "a"
            return React.createElement(
                index_1.Flex.Item,
                tslib_1.__assign(
                    { as: "li", key: section.key, width: "auto", className: lib_1.prefix("nav__item") },
                    {
                        onMouseLeave: _this.onSectionUnhovered,
                        onClick: _this.onSectionUnhovered
                    }
                ),
                React.createElement(
                    LinkElementType,
                    // tslint:disable:jsx-no-lambda
                    tslib_1.__assign(
                        {
                            // tslint:disable:jsx-no-lambda
                            onMouseEnter: function() {
                                return _this.onSectionHovered(section.key)
                            },
                            onTouchStart: function() {
                                return _this.onSectionHovered(section.key)
                            },
                            onFocus: function() {
                                return _this.onSectionHovered(section.key)
                            },
                            onTouchEnd: _this.onSectionUnhovered,
                            className: classnames_1.default(
                                lib_1.prefix("nav__item-link"),
                                ((_a = {}), (_a[lib_1.prefix("nav__item-link--active")] = _this.state.isActive), _a)
                            )
                        },
                        section.props
                    ),
                    _this.renderLabel(section.label, section.counter)
                ),
                _this.renderFlyout(section)
            )
            var _a
        }
        _this.renderLabel = function(label, counter) {
            if (counter) {
                return React.createElement(
                    index_1.Flex,
                    null,
                    React.createElement("span", null, label),
                    React.createElement(
                        index_1.Spacing,
                        { marginLeft: 6 },
                        React.createElement(index_1.Text, { type: "copy", color: "red-1", as: "span" }, counter)
                    )
                )
            } else {
                return label
            }
        }
        _this.renderFlyout = function(section) {
            if (_this.state.hoveredSectionKey === section.key && section.menu) {
                return React.createElement(index_1.Flyout, { className: lib_1.prefix("nav__flyout") }, section.menu)
            } else {
                return null
            }
        }
        _this.onSectionHovered = function(key) {
            _this.setState({ hoveredSectionKey: key })
        }
        _this.onSectionUnhovered = function() {
            _this.setState({ hoveredSectionKey: undefined })
        }
        return _this
    }
    NavigationDesktop.prototype.render = function() {
        var _a = this.props,
            as = _a.as,
            className = _a.className,
            sections = _a.sections,
            children = _a.children,
            rest = tslib_1.__rest(_a, ["as", "className", "sections", "children"])
        var ElementType = lib_1.getElementType(as, "nav")
        return React.createElement(
            ElementType,
            tslib_1.__assign({ className: className }, rest),
            React.createElement(
                index_1.Flex,
                { as: "ul", className: lib_1.prefix("nav") },
                this.props.sections && this.props.sections.length > 0 && this.props.sections.map(this.renderSection)
            ),
            React.createElement(index_1.Divider, null)
        )
    }
    NavigationDesktop.defaultProps = {
        as: "nav"
    }
    NavigationDesktop._meta = _meta
    return NavigationDesktop
})(React.PureComponent)
exports.NavigationDesktop = NavigationDesktop
//# sourceMappingURL=NavigationDesktop.js.map
