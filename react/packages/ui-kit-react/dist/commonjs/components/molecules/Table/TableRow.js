Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var TableContextMenu_1 = require("./TableContextMenu");
var _meta = {
    name: "TableRow",
    parent: "Table",
    type: lib_1.META.TYPES.MOLECULE
};
/**
 * A TableRow.
 */
var TableRow = /** @class */ (function (_super) {
    tslib_1.__extends(TableRow, _super);
    function TableRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e, _this.props);
            }
        };
        return _this;
    }
    TableRow.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, contextMenuItems = _a.contextMenuItems, onClick = _a.onClick, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "contextMenuItems", "onClick"]);
        var ElementType = lib_1.getElementType(as, "div");
        var classes = classnames_1.default(lib_1.prefix("table__row-container"), (_b = {}, _b[lib_1.prefix("table__row--clickable")] = onClick, _b), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes, onClick: this.handleClick }, customAttributes, rest),
            React.createElement(index_1.Flex, { direction: "row", className: lib_1.prefix("table__row") }, children),
            contextMenuItems && contextMenuItems.length > 0 &&
                React.createElement("div", { className: lib_1.prefix("table__cell-menu") },
                    React.createElement(TableContextMenu_1.TableContextMenu, { items: contextMenuItems }))));
        var _b;
    };
    TableRow._meta = _meta;
    return TableRow;
}(React.PureComponent));
exports.TableRow = TableRow;
//# sourceMappingURL=TableRow.js.map