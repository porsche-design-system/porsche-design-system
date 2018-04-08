Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var react_sortable_hoc_1 = require("react-sortable-hoc");
var lib_1 = require("../../../lib");
var SortableListElement_1 = require("./SortableListElement");
exports.SortableListContainer = react_sortable_hoc_1.SortableContainer(function (props) {
    var classes = classnames_1.default(lib_1.prefix("sortable-list__container"));
    return (React.createElement("ul", { className: classes }, props.items.map(function (item, index) {
        return (React.createElement(SortableListElement_1.SortableListElement, { key: item.key, item: item, index: index }));
    })));
});
//# sourceMappingURL=SortableListContainer.js.map