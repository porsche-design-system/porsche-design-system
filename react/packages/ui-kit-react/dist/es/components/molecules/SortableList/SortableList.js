import * as tslib_1 from "tslib";
import * as React from "react";
import cx from "classnames";
import { arrayMove } from "react-sortable-hoc";
import { META, getElementType, prefix } from "../../../lib";
import { SortableListContainer } from "./SortableListContainer";
var _meta = {
    name: "SortableList",
    type: META.TYPES.MOLECULE
};
var _SortableList = function (props) {
    var as = props.as, className = props.className, children = props.children, customAttributes = props.customAttributes, value = props.value, onChange = props.onChange, rest = tslib_1.__rest(props, ["as", "className", "children", "customAttributes", "value", "onChange"]);
    var ElementType = getElementType(as, "div");
    var classes = cx(className);
    var handleSortEnd = function (sort, event) {
        var update = arrayMove(value, sort.oldIndex, sort.newIndex);
        onChange(update, props);
    };
    return (React.createElement(ElementType, tslib_1.__assign({ className: classes }, customAttributes, rest),
        React.createElement(SortableListContainer, { axis: "y", items: value, helperClass: prefix("sortable-list__element--dragging"), onSortEnd: handleSortEnd })));
};
_SortableList._meta = _meta;
/**
 * A list where you can sort items via drag and drop.
 */
export var SortableList = _SortableList;
//# sourceMappingURL=SortableList.js.map