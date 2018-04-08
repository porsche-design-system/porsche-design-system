Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var defaultProps = {
    as: "header"
};
var _meta = {
    name: "Header",
    type: lib_1.META.TYPES.ORGANISM
};
var _Header = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, sections = props.sections, onLogoClick = props.onLogoClick, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "sections", "onLogoClick"]);
    var ElementType = lib_1.getElementType(as, "header");
    var classes = classnames_1.default(lib_1.prefix("header"), className);
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement(index_1.Flex, { alignMainAxis: "center" },
            React.createElement(index_1.Logo, { className: classnames_1.default((_a = {}, _a[lib_1.prefix("header__logo--clickable")] = onLogoClick, _a)), customAttributes: { onClick: onLogoClick } })),
        React.createElement(index_1.Divider, { className: lib_1.prefix("header__divider") }),
        React.createElement(index_1.Navigation, { sections: sections })));
    var _a;
};
_Header._meta = _meta;
/**
 * The page header with logo and navigation bar
 */
exports.Header = _Header;
//# sourceMappingURL=Header.js.map