Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var react_sortable_hoc_1 = require("react-sortable-hoc");
var index_1 = require("../../../index");
var lib_1 = require("../../../lib");
exports.SortableListElement = react_sortable_hoc_1.SortableElement(function (props) {
    var classes = classnames_1.default(lib_1.prefix("sortable-list__element"));
    return (React.createElement("li", { className: classes },
        React.createElement(index_1.Spacing, { marginLeft: 12, marginRight: 12 },
            React.createElement(index_1.Icon, { name: "list", size: "medium" })),
        props.item.label));
});
//# sourceMappingURL=SortableListElement.js.map