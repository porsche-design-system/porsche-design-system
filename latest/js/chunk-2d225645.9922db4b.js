(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225645"],{e3cd:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Start Coding")]),n("p",[e._v("Porsche UI Kit provides developers with a collection of presentational web components and corresponding wrappers for React and Angular to build clean and high-quality front-ends that innately come with the latest design definitions.")]),n("h2",[e._v("Requirements")]),n("ul",[n("li",[n("a",{attrs:{href:"https://nodejs.org"}},[e._v("Node.js")])]),n("li",[e._v("NPM")])]),n("h2",[e._v("Installation")]),n("p",[e._v("All releases of the Porsche UI Kit are available as a versioned npm package called "),n("code",[e._v("@porsche-ui/ui-kit-js")]),e._v(", "),n("code",[e._v("@porsche-ui/ui-kit-react")]),e._v(" and "),n("code",[e._v("@porsche-ui/ui-kit-angular")]),e._v(" in the private npm registry ("),n("a",{attrs:{href:"https://porscheui.jfrog.io"}},[e._v("https://porscheui.jfrog.io")]),e._v(").")]),n("ol",[n("li",[n("a",{attrs:{href:"http://eepurl.com/gnOIXD"}},[e._v("request a Porsche UI npm registry account")])]),n("li",[e._v("Follow the instructions sent by e-mail")]),n("li",[e._v("Execute "),n("code",[e._v("npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/")])]),n("li",[e._v("Enter username, password (Artifactory API Key "),n("strong",[e._v("not")]),e._v(" Artifactory password!) and e-mail address when asked in terminal")]),n("li",[e._v("Add local "),n("code",[e._v(".npmrc")]),e._v(" at the root of your project and add following lines of code:")])]),n("pre",[n("code",[e._v("always-auth = true\nregistry = https://porscheui.jfrog.io/porscheui/api/npm/npm/\n")])]),n("h4",[e._v("Web components:")]),n("pre",[n("code",[e._v("// install with npm:\nnpm install @porsche-ui/ui-kit-js\n\n// install with yarn:\nyarn add @porsche-ui/ui-kit-js\n")])]),n("h4",[e._v("React:")]),n("pre",[n("code",[e._v("// install with npm:\nnpm install @porsche-ui/ui-kit-react\n\n// install with yarn:\nyarn add @porsche-ui/ui-kit-react\n")])]),n("h4",[e._v("Angular:")]),n("pre",[n("code",[e._v("// install with npm:\nnpm install @porsche-ui/ui-kit-angular\n\n// install with yarn:\nyarn add @porsche-ui/ui-kit-angular\n")])]),n("h4",[e._v("SCSS utils (optional):")]),n("pre",[n("code",[e._v("// install with npm:\nnpm install @porsche-ui/ui-kit-scss-utils --save-dev\n\n// install with yarn:\nyarn add @porsche-ui/ui-kit-scss-utils --dev\n")])]),n("h2",[e._v("Usage")]),n("h3",[e._v("Web components in static environment")]),n("p",[e._v("If using native web components in a static website (with no specific framework dependencies), the following page setup is recommended:")]),n("pre",[n("code",[e._v('<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1.0">\n    <title>p-button-icon</title>\n    <link rel="stylesheet" href="PATH/TO/PACKAGE/@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css">\n    <script type="module" src="PATH/TO/PACKAGE/@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.esm.js"><\/script>\n    <script nomodule src="PATH/TO/PACKAGE/@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.js"><\/script>\n  </head>\n  <body>\n    <p-headline variant="headline-1">Lorem ipsum</p-headline>\n  </body>\n</html>\n')])]),n("hr"),n("h3",[e._v("React components")]),n("p",[e._v("The React wrapper of web components can be used like every other React component (even with Typescript support).")]),n("p",[e._v("After adding the React components package to your project, import component(s) and (S)CSS.\nThe following setup is a standard React Scripts (Create React App) setup with SCSS support:")]),n("h4",[e._v("Index file")]),n("pre",[n("code",[e._v("import 'react-app-polyfill/ie11';\nimport 'react-app-polyfill/stable';\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.scss';\nimport App from './App';\n\nReactDOM.render(<App />, document.getElementById('root'));\n\n")])]),n("h4",[e._v("App file")]),n("pre",[n("code",[e._v("import React from 'react';\nimport { PHeadline } from '@porsche-ui/ui-kit-react';\n\nconst App: React.FC = () => {\n  return (\n    <div className=\"App\">\n      <PHeadline variant=\"headline-1\">Headline</PHeadline>\n    </div>\n  )\n}\n\nexport default App;\n")])]),n("h4",[e._v("Load CSS and SCSS utils")]),n("p",[e._v("In your "),n("code",[e._v("index.scss")]),e._v(" import mandatory Porsche UI Kit stylesheet and optional SCSS utilities:")]),n("pre",[n("code",[e._v("@import \"~@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css\";\n@import '~@porsche-ui/ui-kit-scss-utils/index';\n")])]),n("hr"),n("h3",[e._v("Angular components")]),n("p",[e._v("The Angular wrapper of web components can be used like every other Angular component (even with Typescript support).")]),n("p",[e._v("After adding the Angular components package to your project, set declarations and import (S)CSS.\nThe following setup is a standard Angular setup with SCSS support:")]),n("h4",[e._v("App module")]),n("pre",[n("code",[e._v("import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { ComponentLibraryModule } from '@porsche-ui/ui-kit-angular';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    ComponentLibraryModule\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }\n\n")])]),n("h4",[e._v("App component")]),n("pre",[n("code",[e._v("import {Component} from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  template: `\n    <div id=\"app\">\n      <p-headline variant=\"headline-1\">Headline</p-headline>\n    </div>\n  `,\n  styles: []\n})\nexport class AppComponent {}\n")])]),n("h4",[e._v("Load CSS and SCSS utils")]),n("p",[e._v("In your "),n("code",[e._v("styles.scss")]),e._v(" import mandatory Porsche UI Kit stylesheet and optional SCSS utilities:")]),n("pre",[n("code",[e._v("@import \"~@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css\";\n@import '~@porsche-ui/ui-kit-scss-utils/index';\n")])]),n("hr"),n("h3",[e._v("SCSS utils")]),n("p",[e._v("SCSS utils can be used for easier SCSS/SASS development. See "),n("a",{attrs:{href:"#/web/scss-utils/introduction"}},[e._v("SCSS utils section")]),e._v(" for further informations.")]),n("hr"),n("h3",[e._v("Web components used with non supported framework")]),n("p",[e._v("AToW we only provide wrappers for React and Angular. But this doesn't mean, that web components can't be used with other frameworks like Vue or Ember. Just follow these guidelines to make web components work in other frameworks:")]),n("ul",[n("li",[n("a",{attrs:{href:"https://stenciljs.com/docs/vue"}},[e._v("Guidelines for Vue")])]),n("li",[n("a",{attrs:{href:"https://stenciljs.com/docs/ember"}},[e._v("Guidelines for Ember")])])])])}],r=n("2be6"),s={},p=Object(r["a"])(s,i,o,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d225645.9922db4b.js.map