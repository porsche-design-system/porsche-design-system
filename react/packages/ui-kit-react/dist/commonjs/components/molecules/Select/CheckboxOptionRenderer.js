Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("../../../index");
exports.CheckboxOptionRenderer = function (option, index) {
    // Option Group, show only a label
    if (option.options) {
        return option.label;
    }
    // Option, show Checkbox
    return (React.createElement(index_1.Checkbox, { checked: option.selected, singleLine: true }, option.label));
};
//# sourceMappingURL=CheckboxOptionRenderer.js.map