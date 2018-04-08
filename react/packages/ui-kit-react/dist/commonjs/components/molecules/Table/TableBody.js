Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var _meta = {
    name: "TableBody",
    parent: "Table",
    type: lib_1.META.TYPES.MOLECULE
};
/**
 * A TableBody.
 */
var TableBody = /** @class */ (function (_super) {
    tslib_1.__extends(TableBody, _super);
    function TableBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBody.prototype.render = function () {
        var _a = this.props, as = _a.as, className = _a.className, children = _a.children, customAttributes = _a.customAttributes, rest = tslib_1.__rest(_a, ["as", "className", "children", "customAttributes"]);
        var ElementType = lib_1.getElementType(as, "div");
        var classes = classnames_1.default(lib_1.prefix("table__body"), className);
        return (React.createElement(index_1.Flex, tslib_1.__assign({ direction: "column", className: classes, as: as }, customAttributes, rest), children));
    };
    TableBody._meta = _meta;
    return TableBody;
}(React.PureComponent));
exports.TableBody = TableBody;
//# sourceMappingURL=TableBody.js.map