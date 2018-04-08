import * as React from "react";
import { Checkbox } from "../../../index";
export var CheckboxOptionRenderer = function (option, index) {
    // Option Group, show only a label
    if (option.options) {
        return option.label;
    }
    // Option, show Checkbox
    return (React.createElement(Checkbox, { checked: option.selected, singleLine: true }, option.label));
};
//# sourceMappingURL=CheckboxOptionRenderer.js.map