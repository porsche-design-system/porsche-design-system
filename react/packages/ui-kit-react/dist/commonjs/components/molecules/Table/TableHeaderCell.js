Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var _meta = {
    name: "TableHeaderCell",
    parent: "Table",
    type: lib_1.META.TYPES.MOLECULE
};
/**
 * A TableHeaderCell.
 */
var TableHeaderCell = /** @class */ (function (_super) {
    tslib_1.__extends(TableHeaderCell, _super);
    function TableHeaderCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e, _this.props);
            }
        };
        return _this;
    }
    TableHeaderCell.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, grow = _a.grow, sorted = _a.sorted, onClick = _a.onClick, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "grow", "sorted", "onClick"]);
        var ElementType = lib_1.getElementType(as, "div");
        var classes = classnames_1.default(lib_1.prefix("table__cell"), (_b = {}, _b[lib_1.prefix("table__cell--grow-" + grow)] = grow, _b), (_c = {}, _c[lib_1.prefix("table__cell--clickable")] = onClick, _c), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes, as: as, onClick: this.handleClick }, customAttributes, rest),
            sorted === "ascending" && React.createElement(index_1.Icon, { className: lib_1.prefix("padding-right--8"), name: "arrow_open_full_up" }),
            sorted === "descending" && React.createElement(index_1.Icon, { className: lib_1.prefix("padding-right--8"), name: "arrow_open_full_down" }),
            children));
        var _b, _c;
    };
    TableHeaderCell._meta = _meta;
    return TableHeaderCell;
}(React.PureComponent));
exports.TableHeaderCell = TableHeaderCell;
//# sourceMappingURL=TableHeaderCell.js.map