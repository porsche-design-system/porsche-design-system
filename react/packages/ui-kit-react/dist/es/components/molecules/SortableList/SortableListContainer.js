import * as React from "react";
import cx from "classnames";
import { SortableContainer } from "react-sortable-hoc";
import { prefix } from "../../../lib";
import { SortableListElement } from "./SortableListElement";
export var SortableListContainer = SortableContainer(function (props) {
    var classes = cx(prefix("sortable-list__container"));
    return (React.createElement("ul", { className: classes }, props.items.map(function (item, index) {
        return (React.createElement(SortableListElement, { key: item.key, item: item, index: index }));
    })));
});
//# sourceMappingURL=SortableListContainer.js.map