(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3a45"],{"5e43":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("React")]),n("h2",[e._v("Quick start")]),n("p",[e._v("To build your own application with the "),n("strong",[e._v("React")]),e._v(" components of Porsche Design System, follow these steps:")]),n("ul",[n("li",[e._v("Follow the instructions at "),n("a",{attrs:{href:"#/start-coding/introduction"}},[e._v("Introduction")]),e._v(" to get the required npm package")]),n("li",[e._v("Run "),n("code",[e._v("yarn create react-app my-app --template typescript")]),e._v(" or "),n("code",[e._v("npx create-react-app my-app --template typescript")]),e._v(" to create a directory inside the current folder with the initial project structure called "),n("code",[e._v("my-app")])]),n("li",[e._v("To add TypeScript to your "),n("strong",[e._v("Create React App")]),e._v(", you have to install it:")])]),n("pre",[n("code",{staticClass:"language-shell"},[e._v("// install with yarn:\nyarn add typescript @types/node @types/react @types/react-dom @types/jest\n\n// install with npm:\nnpm install typescript @types/node @types/react @types/react-dom @types/jest\n")])]),n("ul",[n("li",[e._v("Install the Porsche Design System")])]),n("pre",[n("code",{staticClass:"language-shell"},[e._v("// install with yarn:\nyarn add @porsche-design-system/components-react\n\n// install with npm:\nnpm install @porsche-design-system/components-react\n")])]),n("p",[e._v("You are ready to start building your own application.")]),n("p",[e._v("The following project is a standard React (Create React App) setup:")]),n("h3",[e._v("Index file")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\nimport App from './App';\nimport * as serviceWorker from './serviceWorker';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);\n\nserviceWorker.unregister();\n")])]),n("h3",[e._v("App file")]),n("p",[e._v("Change your App file to use at least one Porsche Design System Component, for example:")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("import React from 'react';\nimport { PHeadline } from '@porsche-design-system/components-react';\n\nexport const App = (): JSX.Element => (\n  <div className=\"App\">\n    <PHeadline variant=\"headline-1\">Headline from Porsche Design System</PHeadline>\n  </div>\n);\n")])]),n("p",[e._v("Run "),n("code",[e._v("yarn start")]),e._v(" or "),n("code",[e._v("npm start")]),e._v(" and check if the components are displayed correctly.")]),n("h2",[e._v("Test the application")]),n("p",[n("strong",[e._v("Jest")]),e._v(" uses "),n("strong",[e._v("jsdom")]),e._v(" and supports ShadowDOM since Version 12.2.0."),n("br"),e._v(" However, it doesn't support JavaScript modules as described in this "),n("a",{attrs:{href:"https://github.com/jsdom/jsdom/issues/2475"}},[e._v("issue")]),e._v("."),n("br"),e._v(" Also, it doesn't support "),n("code",[e._v("CSSStyleSheet.replace()")]),e._v(", "),n("code",[e._v("Intersection Observer")]),e._v(", "),n("code",[e._v("Element.prototype.scrollTo")]),e._v(" and others.")]),n("p",[e._v("As a workaround we provide a polyfill as part of the "),n("code",[e._v("@porsche-design-system/components-react")]),e._v(" package.")]),n("p",[e._v("To apply the polyfill, simply import it in your "),n("strong",[e._v("setupTest.{js|ts}")]),e._v(" file.")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("// setupTest.{js|ts}\n\nimport '@porsche-design-system/components-react/jsdom-polyfill';\n")])]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v('// SingleComponent.tsx\n\nimport React, { useState } from \'react\';\nimport { PTabsBar } from \'@porsche-design-system/components-react\';\n\nexport const SingleComponent = (): JSX.Element => {\n  const [activeTab, setActiveTab] = useState(0);\n  \n  return (\n    <>\n      <PTabsBar\n        activeTabIndex={activeTab}\n        onTabChange={(e) => {\n          setActiveTab(e.detail.activeTabIndex);\n        }}\n        data-testid="host"\n      >\n        <button data-testid="button1">Some label</button>\n        <button data-testid="button2">Some label</button>\n        <button data-testid="button3">Some label</button>\n      </PTabsBar>\n      <div data-testid="debug">{`Active Tab: ${activeTab + 1}`}</div>\n    </>\n  );\n}\n')])]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("// SingleComponent.test.tsx\n\nimport { componentsReady } from '@porsche-design-system/components-react';\nimport { render } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\ntest('renders Tabs Bar from Porsche Design System and uses its events', async () => {\n  const { getByTestId } = render(<SingleComponent />);\n\n  await componentsReady(); // we need to make sure Design System components have initialized\n\n  const debug = getByTestId('debug');\n  const button1 = getByTestId('button1');\n  const button2 = getByTestId('button2');\n  const button3 = getByTestId('button3');\n\n  expect(debug.innerHTML).toBe('Active Tab: 1');\n\n  userEvent.click(button2);\n  expect(debug.innerHTML).toBe('Active Tab: 2');\n\n  userEvent.click(button3);\n  expect(debug.innerHTML).toBe('Active Tab: 3');\n\n  userEvent.click(button1);\n  expect(debug.innerHTML).toBe('Active Tab: 1');\n});\n")])]),n("h3",[e._v("Additional information when using react-testing-library")]),n("p",[e._v("If you try to submit a form via button click you will encounter issues with "),n("code",[e._v("react-testing-library")]),e._v(" and "),n("code",[e._v("jsdom")]),e._v(". It is simply not provided (see "),n("a",{attrs:{href:"https://github.com/testing-library/react-testing-library/issues/755"}},[e._v("Github Issue 755")]),e._v(" and "),n("a",{attrs:{href:"https://github.com/jsdom/jsdom/issues/1937"}},[e._v("Github Issue 1937")]),e._v(").")]),n("p",[e._v("If you have to test a form submit use "),n("code",[e._v("Simulate")]),e._v(".")]),n("pre",[n("code",[e._v("import { Simulate } from 'react-dom/test-utils';\n\nconst button = getByText('PDSButton');\n\nSimulate.submit('button');\n")])]),n("p",[e._v("You are not able to use "),n("code",[e._v("getByRole")]),e._v(" to query Porsche-Design-System components when using testing-library. Testing-library is taking default "),n("code",[e._v("roles")]),e._v(" in consideration. For example a "),n("code",[e._v("<button>")]),e._v(" gets the role "),n("code",[e._v("button")]),e._v(" without explicitly setting the attribute. To achieve this it uses the (Accessibility Tree)[https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree], see (documentation) [https://testing-library.com/docs/guide-which-query/].")]),n("p",[e._v("We also provide test examples in our "),n("a",{attrs:{href:"https://github.com/porscheui/sample-integration-react/blob/master/src/tests/App.test.tsx"}},[e._v("sample integration project")]),e._v(".")]),n("h2",[e._v("Advanced usage")]),n("h3",[e._v("Prefixing")]),n("p",[e._v("A way of preventing conflicts is by using a unique custom prefix for the components."),n("br"),e._v(" You can create components with your prefix with the provided "),n("code",[e._v("getPrefixedComponents")]),e._v(" function. Just provide the desired prefix as first parameter as a string."),n("br"),e._v(" It will return an object with components that will render with the provided prefix. The object keys are the component names in upper camel-case, without the prefix."),n("br"),e._v(" Keep in mind. that prefixed versions only work with components that use shadow root. This means, that if you do use prefixes, you can't use "),n("code",[e._v("p-grid")]),e._v(", "),n("code",[e._v("p-grid-item")]),e._v(", "),n("code",[e._v("p-flex")]),e._v(" or "),n("code",[e._v("p-flex-item")]),e._v(".")]),n("p",[e._v("Caution: "),n("code",[e._v("getPrefixedComponents")]),e._v(" needs to be deep imported. For usage of the unprefixed components the web components will be defined without a prefix automatically. That would also happen, if we would provide "),n("code",[e._v("getPrefixedComponents")]),e._v(" components also within the same barrel export. This way we can ensure, that only the prefixed web components are getting defined.")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("import React from 'react';\nimport { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';\n\nconst { PHeadline } = getPrefixedComponents({ prefix: 'sample-prefix' });\n\nexport const App = (): JSX.Element => (\n  <div className=\"App\">\n    <PHeadline variant=\"headline-1\">Headline from Porsche Design System</PHeadline>\n  </div>\n);\n")])]),n("p",[e._v("In the example the "),n("code",[e._v("PHeadline")]),e._v(" component will render as "),n("code",[e._v("<sample-prefix-p-headline>")]),e._v(". We recommend to call "),n("code",[e._v("getPrefixedComponents")]),e._v(" only once in your app and import it from there, that you can change the prefix in a single place.")]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("// PorscheDesignSystem.ts\nimport { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';\nexport const PorscheDesignComponents = getPrefixedComponents({ prefix: 'sample-prefix' });\n")])]),n("pre",[n("code",{staticClass:"language-tsx"},[e._v("// SingleComponent.tsx\nimport { PorscheDesignComponents } from './PorscheDesignSystem';\nconst { PHeadline } = PorscheDesignComponents;\n\nexport const SingleComponent = (): JSX.Element => (\n  <PHeadline>Some headline</PHeadline>\n)\n")])]),n("h2",[e._v("Sample integration")]),n("p",[e._v("We provide a public Github repository with a basic sample project setup to show how it is managed in real code. You can find the repository of the React example project here: "),n("a",{attrs:{href:"https://github.com/porscheui/sample-integration-react"}},[e._v("Sample integration React")])]),n("h3",[e._v("Get the project up and running")]),n("ul",[n("li",[e._v("Clone the repository by executing"),n("br"),n("code",[e._v("git clone https://github.com/porscheui/sample-integration-react.git")])]),n("li",[e._v("Follow the installation guidelines in the README.md file")])])])}],i=n("2877"),r={},a=Object(i["a"])(r,o,s,!1,null,null,null);t["default"]=a.exports}}]);
//# sourceMappingURL=chunk-2d0d3a45.3365ac6e.js.map