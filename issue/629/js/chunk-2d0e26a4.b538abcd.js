(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e26a4"],{"7f32":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"vmark"},[s("h1",[e._v("Introduction")]),s("h2",[e._v("Porsche Design System utilities")]),s("p",[e._v("This package contains helpful SCSS functions, mixins and variables. Additionally we provide all scss content as JavaScript variables, functions and helpers.")]),s("p",[s("strong",[e._v("Note!")]),e._v(" The JavaScript utilities are especially made for styled-components which allow the usage of media-queries. Therefore the usage examples are made for styled-components. You can still use all variables, helper and functions without media-queries to custom style components tho.")]),s("h3",[e._v("Install")]),s("p",[e._v("It's necessary to have access to the Porsche Design System private NPM registry to be able to install the "),s("code",[e._v("@porsche-design-system/utilities")]),e._v(" NPM package. If you don't have an account yet, please first "),s("a",{attrs:{href:"#/start-coding/introduction"}},[e._v("read more about getting started as developer")]),e._v(".")]),s("pre",[s("code",[e._v("// install with npm:\nnpm install @porsche-design-system/utilities --save-dev\n\n// install with yarn:\nyarn add @porsche-design-system/utilities --dev\n")])]),s("h3",[e._v("Usage SCSS")]),s("p",[e._v("Assuming a proper SCSS compiler is setup within your project: Simply import the following file at the place where you want to make use of the Porsche Design System SCSS utils.")]),s("pre",[s("code",[e._v("@import '~@porsche-design-system/utilities/scss';\n")])]),s("p",[e._v("If your SCSS compiler does not support '~' (tilde)) imports, you can of course also import it via a path from your node_modules.")]),s("pre",[s("code",[e._v("@import 'node_modules/@porsche-design-system/utilities/scss';\n")])]),s("p",[e._v("A sample usage might look like as follows:")]),s("pre",[s("code",[e._v("@import '~@porsche-design-system/utilities/scss';\n\n#app {\n  color: $p-color-theme-light-default;\n  \n  @include p-breakpoint('s') {\n    color: $p-color-theme-light-brand;\n  }\n}\n")])]),s("h3",[e._v("Usage JavaScript variables")]),s("pre",[s("code",[e._v("import { headline, color, font } from '@porsche-design-system/utilities';\n\nconst StyledHeadline = styled.h1`\n    ${headline[1]}\n`\n\nconst StyledP = styled.p`\n    color: ${color.brand}\n    font-size: ${font.size.small} \n`\n\nrender (\n    <StyledHeadline>\n        Iam Styled\n    </StyledHeadline>\n    <StyledP>\n        Iam Styled\n    </StyledP>\n)\n\n")])])])}],i=s("2877"),a={},l=Object(i["a"])(a,n,o,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0e26a4.b538abcd.js.map