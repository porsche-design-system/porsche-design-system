Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// import { ArrowRendererProps } from "../../../frameworks/react-select-plus-1.1.0"
var index_1 = require("../../../index");
var lib_1 = require("../../../lib");
exports.SelectArrowRenderer = function (props) {
    return (React.createElement(index_1.Icon, { name: props.isOpen ? "arrow_up_hair" : "arrow_down_hair", className: lib_1.prefix("Select-icon"), customAttributes: {
            onMouseDown: props.onMouseDown
        } }));
};
//# sourceMappingURL=SelectArrowRenderer.js.map