Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lib_1 = require("../../../lib");
var index_1 = require("../../../index");
var _meta = {
    name: "ContentStructureScreen",
    type: lib_1.META.TYPES.SCREEN
};
/**
 * This is an example only screen and shows basic structuring of pages/views.
 */
var _ContentStructureScreen = function (props) {
    return (React.createElement(index_1.PageWrapper, { customAttributes: { style: { padding: "20px", backgroundColor: "#aaa" } } },
        "#PageWrapper",
        React.createElement(index_1.AreaWrapper, { as: "header", customAttributes: { style: { padding: "20px", marginTop: "20px", backgroundColor: "#bbb" } } },
            "#AreaWrapper (header)",
            React.createElement(index_1.ThemeWrapper, { customAttributes: { style: { padding: "20px", marginTop: "20px" } } },
                "#ThemeWrapper",
                React.createElement(index_1.ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#header organism",
                        React.createElement(index_1.Flex, { wrap: true, gap: "grid" },
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } }))))))),
        React.createElement(index_1.AreaWrapper, { as: "main", customAttributes: { style: { padding: "20px", backgroundColor: "#bbb" } } },
            "#AreaWrapper (main)",
            React.createElement(index_1.ThemeWrapper, { customAttributes: { style: { padding: "20px", marginTop: "20px" } } },
                "#ThemeWrapper",
                React.createElement(index_1.ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#content organism (section 1)",
                        React.createElement(index_1.Flex, { wrap: true, gap: "grid" },
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })))))),
            React.createElement(index_1.ThemeWrapper, { theme: "dark", customAttributes: { style: { padding: "20px" } } },
                "#ThemeWrapper",
                React.createElement(index_1.ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#content organism (section 2)",
                        React.createElement(index_1.Flex, { wrap: true, gap: "grid" },
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })))))),
            React.createElement(index_1.ThemeWrapper, { customAttributes: { style: { padding: "20px" } } },
                "#ThemeWrapper",
                React.createElement(index_1.ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#content organism (section 3)",
                        React.createElement(index_1.Flex, { wrap: true, gap: "grid" },
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } }))))))),
        React.createElement(index_1.AreaWrapper, { as: "footer", customAttributes: { style: { padding: "20px", backgroundColor: "#bbb" } } },
            "#AreaWrapper (footer)",
            React.createElement(index_1.ThemeWrapper, { theme: "dark", customAttributes: { style: { padding: "20px", marginTop: "20px" } } },
                "#ThemeWrapper",
                React.createElement(index_1.ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#footer organism",
                        React.createElement(index_1.Flex, { wrap: true, gap: "grid" },
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 6 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(index_1.Flex.Item, { width: { base: 12, l: 6 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })))))))));
};
_ContentStructureScreen._meta = _meta;
exports.ContentStructureScreen = _ContentStructureScreen;
//# sourceMappingURL=ContentStructureScreen.js.map