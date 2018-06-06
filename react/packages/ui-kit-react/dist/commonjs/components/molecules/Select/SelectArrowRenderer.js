Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var classnames_1 = tslib_1.__importDefault(require("classnames"))
var index_1 = require("../../../index")
var lib_1 = require("../../../lib")
exports.SelectArrowRenderer = function(props) {
    return React.createElement(
        index_1.Icon,
        tslib_1.__assign(
            {
                name: props.isOpen ? "arrow_up_hair" : "arrow_down_hair",
                className: classnames_1.default(
                    lib_1.prefix("Select-icon"),
                    ((_a = {}), (_a[lib_1.prefix("Select-icon--open")] = props.isOpen), _a)
                )
            },
            {
                onMouseDown: props.onMouseDown
            }
        )
    )
    var _a
}
//# sourceMappingURL=SelectArrowRenderer.js.map
