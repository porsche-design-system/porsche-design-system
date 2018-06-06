Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var defaultProps = {
    type: "default"
}
var _NavigationMenuList = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        type = props.type,
        submenu = props.submenu,
        mobile = props.mobile,
        rest = tslib_1.__rest(props, ["as", "className", "children", "type", "submenu", "mobile"])
    var ElementType = lib_1.getElementType(as, "div")
    var NavigationMenuListClasses = classnames_1.default(
        lib_1.prefix("nav-menu-list"),
        ((_a = {}), (_a[lib_1.prefix("nav-menu-list--mobile")] = mobile), _a),
        ((_b = {}), (_b[lib_1.prefix("nav-menu-list--default")] = type === "default"), _b),
        ((_c = {}), (_c[lib_1.prefix("nav-menu-list--category")] = type === "categorized"), _c),
        className
    )
    var renderCategoryTitle = function(category) {
        return React.createElement(
            index_1.Spacing,
            { key: category.key, marginBottom: 18 },
            React.createElement(
                index_1.Text,
                { type: "3-thin", as: "h4", className: lib_1.prefix("nav-menu-list__category") },
                category.label
            )
        )
    }
    var renderItems = function(items) {
        return items.map(function(item) {
            var LinkElementType = item.component || "a"
            return React.createElement(
                index_1.Flex.Item,
                { as: "li", key: item.key, className: lib_1.prefix("nav-menu-list__item") },
                React.createElement(
                    LinkElementType,
                    tslib_1.__assign({ className: lib_1.prefix("nav-menu-list__link") }, item.props),
                    React.createElement(index_1.Icon, {
                        name: "arrow_right_hair",
                        className: lib_1.prefix("nav-menu-list__entry-icon")
                    }),
                    React.createElement("span", { className: lib_1.prefix("nav-menu-list__text") }, item.label)
                )
            )
        })
    }
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: NavigationMenuListClasses }, rest),
        submenu &&
            submenu.map(function(category) {
                if (type === "categorized" && category.label && category.items) {
                    return React.createElement(
                        "div",
                        { key: category.key, className: lib_1.prefix("nav-menu-list__category-block") },
                        renderCategoryTitle(category),
                        React.createElement(
                            index_1.Flex,
                            { as: "ul", wrap: true, gap: 12, className: lib_1.prefix("nav-menu-list__list-category") },
                            renderItems(category.items)
                        )
                    )
                } else if (type === "default" && category.items) {
                    return React.createElement(
                        index_1.Flex,
                        {
                            key: category.key,
                            as: "ul",
                            direction: "column",
                            className: lib_1.prefix("nav-menu-list__list")
                        },
                        renderItems(category.items)
                    )
                } else {
                    return null
                }
            })
    )
    var _a, _b, _c
}
_NavigationMenuList.defaultProps = defaultProps
exports.NavigationMenuList = _NavigationMenuList
//# sourceMappingURL=NavigationMenuList.js.map
