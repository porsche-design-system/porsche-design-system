Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var TableHeader_1 = require("./TableHeader");
var TableHeaderCell_1 = require("./TableHeaderCell");
var TableBody_1 = require("./TableBody");
var TableRow_1 = require("./TableRow");
var TableCell_1 = require("./TableCell");
var _meta = {
    name: "Table",
    type: lib_1.META.TYPES.MOLECULE
};
/**
 * A Table.
 */
var Table = /** @class */ (function (_super) {
    tslib_1.__extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes"]);
        var ElementType = lib_1.getElementType(as, "div");
        var classes = classnames_1.default(lib_1.prefix("table"), className);
        return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest), children));
    };
    Table.Header = TableHeader_1.TableHeader;
    Table.HeaderCell = TableHeaderCell_1.TableHeaderCell;
    Table.Body = TableBody_1.TableBody;
    Table.Row = TableRow_1.TableRow;
    Table.Cell = TableCell_1.TableCell;
    Table._meta = _meta;
    return Table;
}(React.PureComponent));
exports.Table = Table;
//# sourceMappingURL=Table.js.map