import * as React from "react";
import { META } from "../../../lib";
import { PageWrapper, AreaWrapper, ThemeWrapper, ContentWrapper, Text, Navigation } from "../../../index";
var _meta = {
    name: "ErrorScreen",
    type: META.TYPES.SCREEN
};
var _ErrorScreen = function (props) {
    var title = props.title, text = props.text;
    return (React.createElement(PageWrapper, null,
        React.createElement(AreaWrapper, { as: "header" },
            React.createElement(ThemeWrapper, { as: "div" },
                React.createElement(ContentWrapper, null,
                    React.createElement(Navigation, { sections: [] })))),
        React.createElement(AreaWrapper, { as: "main" },
            React.createElement(ThemeWrapper, null,
                React.createElement(Text, { as: "h1", type: "1-regular", color: "grey-darker", align: "center", className: "pui-error-title" }, title),
                React.createElement(Text, { as: "p", type: "4-regular", color: "grey-darker", align: "center", className: "pui-error-text" }, text && text.split("\n").map(function (item, key) {
                    return (React.createElement("span", { key: key },
                        item,
                        React.createElement("br", null)));
                })))),
        React.createElement(AreaWrapper, { as: "footer" },
            React.createElement(ThemeWrapper, { as: "div" },
                React.createElement(ContentWrapper, null, "Footer")))));
};
_ErrorScreen._meta = _meta;
/**
 * A generic error screen with a title and a text.
 */
export var ErrorScreen = _ErrorScreen;
//# sourceMappingURL=ErrorScreen.js.map