Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var _meta = {
    name: "ErrorScreen",
    type: lib_1.META.TYPES.SCREEN
};
var _ErrorScreen = function (props) {
    var title = props.title, text = props.text;
    return (React.createElement(index_1.PageWrapper, null,
        React.createElement(index_1.AreaWrapper, { as: "header" },
            React.createElement(index_1.ThemeWrapper, { as: "div" },
                React.createElement(index_1.ContentWrapper, null,
                    React.createElement(index_1.Navigation, { sections: [] })))),
        React.createElement(index_1.AreaWrapper, { as: "main" },
            React.createElement(index_1.ThemeWrapper, null,
                React.createElement(index_1.Text, { as: "h1", type: "1-regular", color: "grey-darker", align: "center", className: "pui-error-title" }, title),
                React.createElement(index_1.Text, { as: "p", type: "4-regular", color: "grey-darker", align: "center", className: "pui-error-text" }, text && text.split("\n").map(function (item, key) {
                    return (React.createElement("span", { key: key },
                        item,
                        React.createElement("br", null)));
                })))),
        React.createElement(index_1.AreaWrapper, { as: "footer" },
            React.createElement(index_1.ThemeWrapper, { as: "div" },
                React.createElement(index_1.ContentWrapper, null, "Footer")))));
};
_ErrorScreen._meta = _meta;
/**
 * A generic error screen with a title and a text.
 */
exports.ErrorScreen = _ErrorScreen;
//# sourceMappingURL=ErrorScreen.js.map