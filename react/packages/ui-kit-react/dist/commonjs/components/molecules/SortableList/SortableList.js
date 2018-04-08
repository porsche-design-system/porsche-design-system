Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var react_sortable_hoc_1 = require("react-sortable-hoc");
var lib_1 = require("../../../lib");
var SortableListContainer_1 = require("./SortableListContainer");
var _meta = {
    name: "SortableList",
    type: lib_1.META.TYPES.MOLECULE
};
var _SortableList = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, value = props.value, onChange = props.onChange, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "value", "onChange"]);
    var ElementType = lib_1.getElementType(as, "div");
    var classes = classnames_1.default(className);
    var handleSortEnd = function (sort, event) {
        var update = react_sortable_hoc_1.arrayMove(value, sort.oldIndex, sort.newIndex);
        onChange(update, props);
    };
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement(SortableListContainer_1.SortableListContainer, { axis: "y", items: value, helperClass: lib_1.prefix("sortable-list__element--dragging"), onSortEnd: handleSortEnd })));
};
_SortableList._meta = _meta;
/**
 * A list where you can sort items via drag and drop.
 */
exports.SortableList = _SortableList;
//# sourceMappingURL=SortableList.js.map