import * as React from "react";
import cx from "classnames";
import { SortableElement } from "react-sortable-hoc";
import { Icon, Spacing } from "../../../index";
import { prefix } from "../../../lib";
export var SortableListElement = SortableElement(function (props) {
    var classes = cx(prefix("sortable-list__element"));
    return (React.createElement("li", { className: classes },
        React.createElement(Spacing, { marginLeft: 12, marginRight: 12 },
            React.createElement(Icon, { name: "list", size: "medium" })),
        props.item.label));
});
//# sourceMappingURL=SortableListElement.js.map