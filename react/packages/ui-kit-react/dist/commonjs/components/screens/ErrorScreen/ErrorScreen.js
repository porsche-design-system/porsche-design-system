Object.defineProperty(exports, "__esModule", { value: true })
var tslib_1 = require("tslib")
var React = tslib_1.__importStar(require("react"))
var lib_1 = require("../../../lib")
var index_1 = require("../../../index")
var _meta = {
    name: "ErrorScreen",
    type: lib_1.META.TYPES.SCREEN
}
var _ErrorScreen = function(props) {
    var title = props.title,
        text = props.text,
        children = props.children
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "header",
            null,
            React.createElement(index_1.ContentWrapper, null, React.createElement(index_1.Header, { sections: [] }))
        ),
        React.createElement(
            "main",
            null,
            React.createElement(
                index_1.ContentWrapper,
                null,
                React.createElement(
                    "div",
                    { className: lib_1.prefix("error-screen__content") },
                    React.createElement(
                        index_1.Text,
                        {
                            as: "h1",
                            color: "grey-darker",
                            align: "center",
                            className: lib_1.prefix("error-screen__title")
                        },
                        title
                    ),
                    React.createElement(
                        index_1.Text,
                        { as: "p", type: "4-regular", color: "grey-darker", align: "center" },
                        text &&
                            text.split("\n").map(function(item, key) {
                                return React.createElement("span", { key: key }, item, React.createElement("br", null))
                            })
                    ),
                    children
                )
            )
        )
    )
}
_ErrorScreen._meta = _meta
/**
 * A generic error screen with a title and a text.
 */
exports.ErrorScreen = _ErrorScreen
//# sourceMappingURL=ErrorScreen.js.map
