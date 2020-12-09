(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e1784"],{"7b25":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Vanilla Js")]),n("h2",[e._v("Quick start")]),n("p",[e._v("To build your own (non framework specific) application with "),n("strong",[e._v("Native Web Components")]),e._v(" of the Porsche Design System, follow these steps:")]),n("ul",[n("li",[e._v("Follow the instructions at "),n("a",{attrs:{href:"#/start-coding/introduction"}},[e._v("Introduction")]),e._v(" to get the required npm package")]),n("li",[e._v("Install the Porsche Design System")])]),n("pre",[n("code",{staticClass:"language-shell"},[e._v("// install with npm:\nnpm install @porsche-design-system/components-js\n\n// install with yarn:\nyarn add @porsche-design-system/components-js\n")])]),n("p",[e._v("After adding the "),n("code",[e._v("@porsche-design-system/components-js")]),e._v(" package to your project, the following page setup is recommended (assuming a web server is running).")]),n("pre",[n("code",{staticClass:"language-html"},[e._v('<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1.0">\n    <title>Porsche Design System</title>\n    <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"><\/script>\n  </head>\n  <body>\n    <script type="text/javascript">\n      porscheDesignSystem.load();\n    <\/script>\n    <p-headline variant="headline-1">Some text</p-headline>\n  </body>\n</html>\n')])]),n("h2",[e._v("Advanced usage")]),n("h3",[e._v("When are Porsche Design System Components initialized?")]),n("p",[e._v("See "),n("a",{attrs:{href:"#/helpers/components-ready"}},[e._v("componentsReady()")]),e._v(" for further information.")]),n("h3",[e._v("Prefixing")]),n("p",[e._v("You can load the Porsche Design System with a custom unique prefix to prevent conflicts. Just pass the prefix as a parameter to the "),n("code",[e._v("load")]),e._v(" method. Keep in mind that prefixed versions only work with components that use shadow root. This means, that if you do use prefixes, you can't use "),n("code",[e._v("p-grid")]),e._v(", "),n("code",[e._v("p-grid-item")]),e._v(", "),n("code",[e._v("p-flex")]),e._v(" or "),n("code",[e._v("p-flex-item")]),e._v(".")]),n("pre",[n("code",{staticClass:"language-html"},[e._v('<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1.0">\n    <title>Porsche Design System</title>\n    <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"><\/script>\n  </head>\n  <body>\n    <script type="text/javascript">\n      porscheDesignSystem.load({ prefix: \'sample-prefix\' });\n    <\/script>\n    <sample-prefix-p-headline variant="headline-1">Some text</sample-prefix-p-headline>\n  </body>\n</html>\n')])]),n("h2",[e._v("Sample integration")]),n("p",[e._v("We provide a public Github repository with a basic sample project setup to show how it is managed in real code. You can find the repository of the Vanilla-JS example project here: "),n("a",{attrs:{href:"https://github.com/porscheui/sample-integration-vanillajs"}},[e._v("Sample integration Vanilla-JS")])]),n("h3",[e._v("Get the project up and running")]),n("ul",[n("li",[e._v("Clone the repository by executing"),n("br"),n("code",[e._v("git clone https://github.com/porscheui/sample-integration-vanillajs.git")])]),n("li",[e._v("Follow the installation guidelines in the README.md file")])])])}],a=n("2877"),o={},r=Object(a["a"])(o,i,s,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0e1784.feb5e69d.js.map