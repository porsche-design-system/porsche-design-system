import * as React from "react";
// import { ArrowRendererProps } from "../../../frameworks/react-select-plus-1.1.0"
import { Icon } from "../../../index";
import { prefix } from "../../../lib";
export var SelectArrowRenderer = function (props) {
    return (React.createElement(Icon, { name: props.isOpen ? "arrow_up_hair" : "arrow_down_hair", className: prefix("Select-icon"), customAttributes: {
            onMouseDown: props.onMouseDown
        } }));
};
//# sourceMappingURL=SelectArrowRenderer.js.map