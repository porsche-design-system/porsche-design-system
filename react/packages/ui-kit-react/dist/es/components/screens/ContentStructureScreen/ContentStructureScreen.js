import * as React from "react";
import { META } from "../../../lib";
import { PageWrapper, AreaWrapper, ThemeWrapper, ContentWrapper, Flex } from "../../../index";
var _meta = {
    name: "ContentStructureScreen",
    type: META.TYPES.SCREEN
};
/**
 * This is an example only screen and shows basic structuring of pages/views.
 */
var _ContentStructureScreen = function (props) {
    return (React.createElement(PageWrapper, { customAttributes: { style: { padding: "20px", backgroundColor: "#aaa" } } },
        "#PageWrapper",
        React.createElement(AreaWrapper, { as: "header", customAttributes: { style: { padding: "20px", marginTop: "20px", backgroundColor: "#bbb" } } },
            "#AreaWrapper (header)",
            React.createElement(ThemeWrapper, { customAttributes: { style: { padding: "20px", marginTop: "20px" } } },
                "#ThemeWrapper",
                React.createElement(ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#header organism",
                        React.createElement(Flex, { wrap: true, gap: "grid" },
                            React.createElement(Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } }))))))),
        React.createElement(AreaWrapper, { as: "main", customAttributes: { style: { padding: "20px", backgroundColor: "#bbb" } } },
            "#AreaWrapper (main)",
            React.createElement(ThemeWrapper, { customAttributes: { style: { padding: "20px", marginTop: "20px" } } },
                "#ThemeWrapper",
                React.createElement(ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#content organism (section 1)",
                        React.createElement(Flex, { wrap: true, gap: "grid" },
                            React.createElement(Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })))))),
            React.createElement(ThemeWrapper, { theme: "dark", customAttributes: { style: { padding: "20px" } } },
                "#ThemeWrapper",
                React.createElement(ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#content organism (section 2)",
                        React.createElement(Flex, { wrap: true, gap: "grid" },
                            React.createElement(Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })))))),
            React.createElement(ThemeWrapper, { customAttributes: { style: { padding: "20px" } } },
                "#ThemeWrapper",
                React.createElement(ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#content organism (section 3)",
                        React.createElement(Flex, { wrap: true, gap: "grid" },
                            React.createElement(Flex.Item, { width: { base: 12, l: 4 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(Flex.Item, { width: { base: 12, l: 8 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } }))))))),
        React.createElement(AreaWrapper, { as: "footer", customAttributes: { style: { padding: "20px", backgroundColor: "#bbb" } } },
            "#AreaWrapper (footer)",
            React.createElement(ThemeWrapper, { theme: "dark", customAttributes: { style: { padding: "20px", marginTop: "20px" } } },
                "#ThemeWrapper",
                React.createElement(ContentWrapper, { as: "div", customAttributes: { style: { marginTop: "20px", backgroundColor: "#f7e2d5" } } },
                    React.createElement("span", { style: {
                            display: "block",
                            backgroundColor: "#eee"
                        } }, "#ContentWrapper (max-width: 1600px)"),
                    React.createElement("div", { style: { padding: "20px 0", backgroundColor: "#eee" } },
                        "#footer organism",
                        React.createElement(Flex, { wrap: true, gap: "grid" },
                            React.createElement(Flex.Item, { width: { base: 12, l: 6 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })),
                            React.createElement(Flex.Item, { width: { base: 12, l: 6 } },
                                React.createElement("div", { style: { padding: "20px", backgroundColor: "#196a99" } })))))))));
};
_ContentStructureScreen._meta = _meta;
export var ContentStructureScreen = _ContentStructureScreen;
//# sourceMappingURL=ContentStructureScreen.js.map