Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var _meta = {
    name: "Header",
    type: lib_1.META.TYPES.ORGANISM
}
var _Header = function(props) {
    var as = props.as,
        className = props.className,
        children = props.children,
        sections = props.sections,
        logoComponent = props.logoComponent,
        logoProps = props.logoProps,
        rest = tslib_1.__rest(props, ["as", "className", "children", "sections", "logoComponent", "logoProps"])
    var ElementType = lib_1.getElementType(as, "div")
    var classes = classnames_1.default(lib_1.prefix("header"), className)
    return React.createElement(
        ElementType,
        tslib_1.__assign({ className: classes }, rest),
        React.createElement(
            index_1.Flex,
            { alignMainAxis: "center" },
            React.createElement(index_1.Logo, tslib_1.__assign({ as: logoComponent }, logoProps))
        ),
        React.createElement(index_1.Divider, { className: lib_1.prefix("header__divider") }),
        sections.length > 0 ? React.createElement(index_1.Navigation, { sections: sections }) : null
    )
}
_Header._meta = _meta
/**
 * The page header with logo and navigation bar
 */
exports.Header = _Header
//# sourceMappingURL=Header.js.map
