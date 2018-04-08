import * as tslib_1 from "tslib";
import * as React from "react";
import * as PropTypes from "prop-types";
import cx from "classnames";
import { getElementType, prefix } from "../../../lib";
import { Flex, Spacing, Text, Icon } from "../../../index";
export var propTypes = {
    /** The html element type to render as. */
    as: PropTypes.string,
    /** Additional CSS classes. */
    className: PropTypes.string,
    /** The display type of the list. */
    type: PropTypes.oneOf(["default", "categorized"]),
    contents: PropTypes.array
};
var defaultProps = {
    type: "default"
};
var _NavigationMenuList = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, type = props.type, categories = props.categories, mobile = props.mobile, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "type", "categories", "mobile"]);
    var ElementType = getElementType(as, "div");
    var NavigationMenuListClasses = cx(prefix("nav-menu-list"), (_a = {}, _a[prefix("nav-menu-list--mobile")] = mobile, _a), (_b = {}, _b[prefix("nav-menu-list--default")] = type === "default", _b), (_c = {}, _c[prefix("nav-menu-list--category")] = type === "categorized", _c), className);
    var renderCategoryTitle = function (category) {
        return (React.createElement(Spacing, { key: category.key, marginBottom: 18 },
            React.createElement(Text, { type: "3-thin", as: "h4", className: prefix("nav-menu-list__category") },
                "    ",
                category.label)));
    };
    var renderItems = function (items) {
        return items.map(function (item) {
            return (React.createElement(Flex.Item, { as: "li", key: item.key, className: prefix("nav-menu-list__item") },
                React.createElement("a", { className: prefix("nav-menu-list__link"), href: typeof item.link === "string" ? item.link : undefined, onClick: typeof item.link === "function" ? item.link : undefined },
                    React.createElement(Icon, { name: "arrow_right_hair", className: prefix("nav-menu-list__entry-icon") }),
                    React.createElement("span", { className: prefix("nav-menu-list__text") }, item.label))));
        });
    };
    return (React.createElement(ElementType, tslib_1.__assign({ className: NavigationMenuListClasses }, customAttributes, rest), categories && categories.map(function (category) {
        if (type === "categorized" && category.label && category.items) {
            return (React.createElement("div", { key: category.key, className: prefix("nav-menu-list__category-block") },
                renderCategoryTitle(category),
                React.createElement(Flex, { as: "ul", wrap: true, gap: 12, className: prefix("nav-menu-list__list-category") }, renderItems(category.items))));
        }
        else if (type === "default" && category.items) {
            return (React.createElement(Flex, { key: category.key, as: "ul", direction: "column", className: prefix("nav-menu-list__list") }, renderItems(category.items)));
        }
        else {
            return null;
        }
    })));
    var _a, _b, _c;
};
_NavigationMenuList.propTypes = propTypes;
_NavigationMenuList.defaultProps = defaultProps;
export var NavigationMenuList = _NavigationMenuList;
//# sourceMappingURL=NavigationMenuList.js.map