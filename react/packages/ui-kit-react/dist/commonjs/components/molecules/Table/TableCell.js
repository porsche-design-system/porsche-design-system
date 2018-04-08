Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var _meta = {
    name: "TableCell",
    parent: "Table",
    type: lib_1.META.TYPES.MOLECULE
};
/**
 * A TableCell.
 */
var TableCell = /** @class */ (function (_super) {
    tslib_1.__extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e, _this.props);
            }
        };
        return _this;
    }
    TableCell.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, grow = _a.grow, onClick = _a.onClick, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes", "grow", "onClick"]);
        var ElementType = lib_1.getElementType(as, "div");
        var classes = classnames_1.default(lib_1.prefix("table__cell"), (_b = {}, _b[lib_1.prefix("table__cell--grow-" + grow)] = grow, _b), (_c = {}, _c[lib_1.prefix("table__cell--clickable")] = onClick, _c), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes, as: as }, customAttributes, rest), children));
        var _b, _c;
    };
    TableCell._meta = _meta;
    return TableCell;
}(React.PureComponent));
exports.TableCell = TableCell;
//# sourceMappingURL=TableCell.js.map