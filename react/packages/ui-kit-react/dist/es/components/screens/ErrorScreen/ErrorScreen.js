import * as React from "react"
import { META, prefix } from "../../../lib"
import { ContentWrapper, Text, Header } from "../../../index"
var _meta = {
    name: "ErrorScreen",
    type: META.TYPES.SCREEN
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
            React.createElement(ContentWrapper, null, React.createElement(Header, { sections: [] }))
        ),
        React.createElement(
            "main",
            null,
            React.createElement(
                ContentWrapper,
                null,
                React.createElement(
                    "div",
                    { className: prefix("error-screen__content") },
                    React.createElement(
                        Text,
                        { as: "h1", color: "grey-darker", align: "center", className: prefix("error-screen__title") },
                        title
                    ),
                    React.createElement(
                        Text,
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
export var ErrorScreen = _ErrorScreen
//# sourceMappingURL=ErrorScreen.js.map
