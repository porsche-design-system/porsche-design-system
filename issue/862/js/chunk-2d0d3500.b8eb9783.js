(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3500"],{"5bda":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Gatsby")]),n("h2",[e._v("Quick start")]),n("p",[e._v("To build your own "),n("strong",[e._v("Gatsby")]),e._v(" application with the "),n("strong",[e._v("React")]),e._v(" components of the Porsche Design System, follow these steps:")]),n("h3",[e._v("Requirement")]),n("ul",[n("li",[e._v("To get Gatsby up and running follow "),n("a",{attrs:{href:"https://www.gatsbyjs.com/docs/quick-start/"}},[e._v("official Gatsby guidlines")])]),n("li",[e._v("To support TypeScript follow "),n("a",{attrs:{href:"https://www.gatsbyjs.com/docs/typescript/"}},[e._v("Gatsby Typescript guidelines")])]),n("li",[e._v("Follow the instructions at "),n("a",{attrs:{href:"#/start-coding/introduction"}},[e._v("Introduction")]),e._v(" to get access to the required npm package of the Porsche Design System")]),n("li",[e._v("Install the Porsche Design System")])]),n("pre",[n("code",{staticClass:"language-shell"},[e._v("// install with yarn:\nyarn add @porsche-design-system/components-react\n\n// install with npm:\nnpm install @porsche-design-system/components-react\n")])]),n("p",[e._v("You are ready to start building your own application.")]),n("p",[e._v("The following project is the standard Gatsby site setup. Change your Index page to use at least one Porsche Design System Component, for example:")]),n("h3",[e._v("Index page")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v('// index.tsx\nimport * as React from "react"\nimport { Link } from "gatsby"\nimport { PHeadline, PText } from "@porsche-design-system/components-react"\nimport Layout from "../components/layout"\nimport Image from "../components/image"\nimport SEO from "../components/seo"\n   \nconst IndexPage = () => (\n <Layout>\n   <SEO title=\'Home\' />\n   <PHeadline>Hi people</PHeadline>\n   <PText>Welcome to your new Gatsby site.</PText>\n   <PText>Now go build something great.</PText>\n   <div>\n     <Image />\n   </div>\n   <Link to="/page-2/">Go to page 2</Link>\n </Layout>\n)\n   \nexport default IndexPage\n')])]),n("p",[e._v("Run "),n("code",[e._v("yarn start")]),e._v(" or "),n("code",[e._v("npm start")]),e._v(" and check if the components are displayed correctly.")]),n("h2",[e._v("Test the application")]),n("p",[e._v("To set up Jest testing in Gatsby you have to follow the instructions on how to set up jest for your project:")]),n("ul",[n("li",[e._v("Step 1: "),n("a",{attrs:{href:"https://www.gatsbyjs.org/docs/unit-testing/"}},[e._v("Set up Jest for Unit testing general")])]),n("li",[e._v("Step 2: "),n("a",{attrs:{href:"https://www.gatsbyjs.org/docs/testing-react-components/"}},[e._v("Set up to test react components")])])]),n("p",[n("strong",[e._v("Jest")]),e._v(" uses "),n("strong",[e._v("jsdom")]),e._v(".It is yet not possible to render the functionality of web components in "),n("strong",[e._v("jsdom")]),e._v(".")]),n("p",[e._v("To ensure your tests don't fail, we provide mocks for every Porsche Design System component. They are distributed in the "),n("code",[e._v("@porsche-design-system/components-react")]),e._v(" npm package.")]),n("p",[e._v("The mocks must only be used if the functionality of the web component is required within the test. As we test and ensure the functionality of our web components extensively, we recommend using the mocks only as a last option.")]),n("p",[e._v("To consume the mocks you can set them up via your "),n("strong",[e._v("setup-test-env.js")]),e._v(" file in your root folder and copy the following snippet into the setup file.")]),n("pre",[n("code",{staticClass:"language-js"},[e._v("// setup-test-env.js\njest.mock('@porsche-design-system/components-react', () => {\n  return require('@porsche-design-system/components-react/mocks');\n});\n")])]),n("p",[e._v("You have to access the mocks in the Mock-Factory of the "),n("code",[e._v("jest.mock()")]),e._v(" function.")]),n("p",[e._v("If you only need a single component mock you can also consume the mock directly in your test. All of our mocks are named like "),n("strong",[e._v("p-name-mock")]),e._v(" for example "),n("strong",[e._v("p-headline-mock")]),e._v(".")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("// SingleComponent.tsx\nexport function SingleComponent() {\n  return (\n    <PHeadline>Some headline</PHeadline>\n  )\n}\n")])]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("// SingleComponent.test.tsx\njest.mock('@porsche-design-system/components-react', () => {\n  return require('@porsche-design-system/components-react/mocks/p-headline-mock');\n});\n\ntest('renders a headline from Porsche Design System', async () => {\n  const {getByText} = render(<SingleComponent/>);\n  const headLineElement = getByText('Some headline');\n  expect(headLineElement).toBeInTheDocument();\n});\n")])]),n("p",[e._v("Use this solution until there is an upgrade to a newer "),n("strong",[e._v("jsdom")]),e._v(" version which provides support for "),n("strong",[e._v("Web Components")]),e._v(". In the meantime, we keep providing mocks.")]),n("p",[e._v("You find detailed information on how to use mock functions in "),n("strong",[e._v("Jest")]),e._v(" "),n("a",{attrs:{href:"https://jestjs.io/docs/en/mock-functions.html"}},[e._v("here")]),e._v(".")]),n("p",[e._v("We also provide test examples in our "),n("a",{attrs:{href:"https://github.com/porscheui/sample-integration-gatsby/blob/master/src/components/__tests__/applicationTest.test.tsx"}},[e._v("sample integration project")]),e._v(".")]),n("h2",[e._v("Sample integration")]),n("p",[e._v("We provide a public Github repository with a basic sample project setup to show how it is managed in real code. You can find the repository of the Gatsby example project here: "),n("a",{attrs:{href:"https://github.com/porscheui/sample-integration-gatsby"}},[e._v("Sample integration Gatsby")])]),n("h3",[e._v("Get the project up and running")]),n("ul",[n("li",[e._v("Clone the repository by executing"),n("br"),n("code",[e._v("git clone https://github.com/porscheui/sample-integration-gatsby.git")])]),n("li",[e._v("Follow the installation guidelines in the README.md file")])])])}],i=n("2877"),a={},r=Object(i["a"])(a,o,s,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0d3500.b8eb9783.js.map