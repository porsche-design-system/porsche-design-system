(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{306:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.withMDXComponents=void 0;var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},r=l(t(0)),o=l(t(78)),m=l(t(4));function l(e){return e&&e.__esModule?e:{default:e}}var p=(0,o.default)({}),c=p.Provider,s=p.Consumer;n.withMDXComponents=function(e){return function(n){var t=n.components,o=function(e,n){var t={};for(var a in e)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}(n,["components"]);return r.default.createElement(s,null,function(n){return r.default.createElement(e,a({components:t||n},o))})}};var i=function(e){var n=e.components,t=e.children;return r.default.createElement(c,{value:n},t)};i.propTypes={components:m.default.object.isRequired,children:m.default.element.isRequired},n.default=i},307:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(309);Object.defineProperty(n,"MDXTag",{enumerable:!0,get:function(){return o(a).default}});var r=t(306);function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"MDXProvider",{enumerable:!0,get:function(){return o(r).default}})},308:function(e,n,t){"use strict";function a(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}t.d(n,"a",function(){return a})},309:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},r=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),o=t(0),m=c(o),l=c(t(310)),p=t(306);function c(e){return e&&e.__esModule?e:{default:e}}var s={inlineCode:"code",wrapper:"div"},i=function(e){function n(){return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,o.Component),r(n,[{key:"render",value:function(){var e=this.props,n=e.name,t=e.parentName,r=e.props,o=void 0===r?{}:r,p=e.children,c=e.components,i=void 0===c?{}:c,d=e.Layout,g=e.layoutProps,u=i[t+"."+n]||i[n]||s[n]||n;return d?((0,l.default)(this,d),m.default.createElement(d,a({components:i},g),m.default.createElement(u,o,p))):m.default.createElement(u,o,p)}}]),n}();n.default=(0,p.withMDXComponents)(i)},310:function(e,n,t){"use strict";var a={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},r={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},o=Object.defineProperty,m=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,p=Object.getOwnPropertyDescriptor,c=Object.getPrototypeOf,s=c&&c(Object);e.exports=function e(n,t,i){if("string"!==typeof t){if(s){var d=c(t);d&&d!==s&&e(n,d,i)}var g=m(t);l&&(g=g.concat(l(t)));for(var u=0;u<g.length;++u){var E=g[u];if(!a[E]&&!r[E]&&(!i||!i[E])){var D=p(t,E);try{o(n,E,D)}catch(T){}}}return n}return n}},339:function(e,n,t){"use strict";t.r(n);var a=t(308),r=t(0),o=t.n(r),m=t(307);n.default=function(e){var n=e.components;Object(a.a)(e,["components"]);return o.a.createElement(m.MDXTag,{name:"wrapper",components:n},o.a.createElement(m.MDXTag,{name:"h1",components:n},"p-button-regular"),o.a.createElement(m.MDXTag,{name:"h2",components:n},"Properties"),o.a.createElement(m.MDXTag,{name:"table",components:n},o.a.createElement(m.MDXTag,{name:"thead",components:n,parentName:"table"},o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"thead"},o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Property"),o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Attribute"),o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Description"),o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Type"),o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Default"))),o.a.createElement(m.MDXTag,{name:"tbody",components:n,parentName:"table"},o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"disabled")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"disabled")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Disables the button. No events will be triggered while disabled state is active."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"boolean")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"false"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"href")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"href")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"When providing an url then the component will be rendered as ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"<a>")," instead of ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"<button>")," tag."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"string")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"undefined"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"icon")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"icon")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"The icon shown next to the label."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"string")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"icon_arrow-right-hair.min.svg"'))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"iconPath")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"icon-path")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Overrides the default icon resource path."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"string")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"undefined"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"loading")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"loading")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Disables the button and shows a loading indicator. No events will be triggered while loading state is active."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"boolean")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"false"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"small")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"small")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Displays the button smaller."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"boolean")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"false"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"theme")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"theme")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Adapts the button color when used on dark background."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"dark" | "light"')),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"light"'))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"type")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"type")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Specifies the type of the button when no href prop is defined."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"button" | "reset" | "submit"')),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"button"'))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"variant")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"variant")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"The style variant of the button."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"default" | "ghost" | "highlight"')),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},'"default"'))))),o.a.createElement(m.MDXTag,{name:"h2",components:n},"Events"),o.a.createElement(m.MDXTag,{name:"table",components:n},o.a.createElement(m.MDXTag,{name:"thead",components:n,parentName:"table"},o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"thead"},o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Event"),o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Description"),o.a.createElement(m.MDXTag,{name:"th",components:n,parentName:"tr",props:{align:null}},"Type"))),o.a.createElement(m.MDXTag,{name:"tbody",components:n,parentName:"table"},o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"pBlur")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Emitted when the button loses focus."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"CustomEvent<void>"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"pClick")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Emitted when the button is clicked."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"CustomEvent<void>"))),o.a.createElement(m.MDXTag,{name:"tr",components:n,parentName:"tbody"},o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"pFocus")),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},"Emitted when the button has focus."),o.a.createElement(m.MDXTag,{name:"td",components:n,parentName:"tr",props:{align:null}},o.a.createElement(m.MDXTag,{name:"inlineCode",components:n,parentName:"td"},"CustomEvent<void>"))))),o.a.createElement(m.MDXTag,{name:"h2",components:n},"Dependencies"),o.a.createElement(m.MDXTag,{name:"h3",components:n},"Depends on"),o.a.createElement(m.MDXTag,{name:"ul",components:n},o.a.createElement(m.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(m.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"../../feedback/loader"}},"p-loader")),o.a.createElement(m.MDXTag,{name:"li",components:n,parentName:"ul"},o.a.createElement(m.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"../../icon/icon"}},"p-icon"))),o.a.createElement(m.MDXTag,{name:"h3",components:n},"Graph"),o.a.createElement(m.MDXTag,{name:"pre",components:n},o.a.createElement(m.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-mermaid",metaString:""}},"graph TD;\n  p-button-regular --\x3e p-loader\n  p-button-regular --\x3e p-icon\n  style p-button-regular fill:#f9f,stroke:#333,stroke-width:4px\n")),o.a.createElement(m.MDXTag,{name:"hr",components:n}),o.a.createElement(m.MDXTag,{name:"p",components:n},o.a.createElement(m.MDXTag,{name:"em",components:n,parentName:"p"},"Built with ",o.a.createElement(m.MDXTag,{name:"a",components:n,parentName:"em",props:{href:"https://stenciljs.com/"}},"StencilJS"))))}}}]);
//# sourceMappingURL=18.cb8c05b4.chunk.js.map