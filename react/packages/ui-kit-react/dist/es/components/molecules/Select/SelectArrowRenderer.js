import * as tslib_1 from "tslib"
import * as React from "react"
import cx from "classnames"
import { Icon } from "../../../index"
import { prefix } from "../../../lib"
export var SelectArrowRenderer = function(props) {
    return React.createElement(
        Icon,
        tslib_1.__assign(
            {
                name: props.isOpen ? "arrow_up_hair" : "arrow_down_hair",
                className: cx(prefix("Select-icon"), ((_a = {}), (_a[prefix("Select-icon--open")] = props.isOpen), _a))
            },
            {
                onMouseDown: props.onMouseDown
            }
        )
    )
    var _a
}
//# sourceMappingURL=SelectArrowRenderer.js.map
