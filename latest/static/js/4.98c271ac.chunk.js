(window.webpackJsonp=window.webpackJsonp||[]).push([[4,9],{306:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},n=m(a(0)),l=m(a(78)),c=m(a(4));function m(e){return e&&e.__esModule?e:{default:e}}var i=(0,l.default)({}),s=i.Provider,o=i.Consumer;t.withMDXComponents=function(e){return function(t){var a=t.components,l=function(e,t){var a={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(a[r]=e[r]);return a}(t,["components"]);return n.default.createElement(o,null,function(t){return n.default.createElement(e,r({components:a||t},l))})}};var p=function(e){var t=e.components,a=e.children;return n.default.createElement(s,{value:t},a)};p.propTypes={components:c.default.object.isRequired,children:c.default.element.isRequired},t.default=p},307:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(309);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return l(r).default}});var n=a(306);function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return l(n).default}})},308:function(e,t,a){"use strict";function r(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}a.d(t,"a",function(){return r})},309:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=a(0),c=s(l),m=s(a(310)),i=a(306);function s(e){return e&&e.__esModule?e:{default:e}}var o={inlineCode:"code",wrapper:"div"},p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),n(t,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.parentName,n=e.props,l=void 0===n?{}:n,i=e.children,s=e.components,p=void 0===s?{}:s,u=e.Layout,d=e.layoutProps,f=p[a+"."+t]||p[t]||o[t]||t;return u?((0,m.default)(this,u),c.default.createElement(u,r({components:p},d),c.default.createElement(f,l,i))):c.default.createElement(f,l,i)}}]),t}();t.default=(0,i.withMDXComponents)(p)},310:function(e,t,a){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},n={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l=Object.defineProperty,c=Object.getOwnPropertyNames,m=Object.getOwnPropertySymbols,i=Object.getOwnPropertyDescriptor,s=Object.getPrototypeOf,o=s&&s(Object);e.exports=function e(t,a,p){if("string"!==typeof a){if(o){var u=s(a);u&&u!==o&&e(t,u,p)}var d=c(a);m&&(d=d.concat(m(a)));for(var f=0;f<d.length;++f){var E=d[f];if(!r[E]&&!n[E]&&(!p||!p[E])){var g=i(a,E);try{l(t,E,g)}catch(h){}}}return t}return t}},311:function(e,t,a){},314:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var r=a(48),n=a(0),l=a.n(n),c=a(1),m=a.n(c),i=a(315),s=a.n(i);a(311),a(316);var o=function(e){var t=e.className,a=e.theme,n=m()("sg-vrt",s.a.vrt,Object(r.a)({},s.a.light,"default"===a),Object(r.a)({},s.a.dark,"inverted"===a),t);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:n},function(e,t){return"function"===typeof e?e(t):e}(e.children,e.theme)))};o.defaultProps={theme:"default"}},315:function(e,t,a){e.exports={vrt:"exampleVrt_vrt__1SaND",light:"exampleVrt_light__TdDsu",dark:"exampleVrt_dark__3o6br","sg-example-loader":"exampleVrt_sg-example-loader__jk66z","p-loader":"exampleVrt_p-loader__10bzb","p-loader__fg":"exampleVrt_p-loader__fg__FtfHN"}},316:function(e,t,a){},349:function(e,t,a){"use strict";a.r(t);var r=a(308),n=a(0),l=a.n(n),c=a(307),m=a(314),i=a(2);t.default=function(e){var t=e.components;Object(r.a)(e,["components"]);return l.a.createElement(c.MDXTag,{name:"wrapper",components:t},l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,null,l.a.createElement(i.d.Child,{size:12},l.a.createElement("p",{className:"sg-example-item"},"12"))),Array.apply(0,Array(11)).map(function(e,t){return l.a.createElement(i.d,{key:t},l.a.createElement(i.d.Child,{size:t+1},l.a.createElement("p",{className:"sg-example-item"},t+1)),l.a.createElement(i.d.Child,{size:11-t},l.a.createElement("p",{className:"sg-example-item"},11-t)))}))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,Array.apply(0,Array(11)).map(function(e,t){return l.a.createElement(i.d,{key:t},l.a.createElement(i.d.Child,{offset:t+1,size:11-t},l.a.createElement("p",{className:"sg-example-item"},t+1)))}))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,{direction:"row"},l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"2")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"3"))))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,{direction:"row-reverse"},l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"2")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"3"))))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,{direction:"column"},l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"2")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"3"))))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,{direction:"column-reverse"},l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"2")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"3"))))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,{gap:"normal"},l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"2")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"3"))))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,{gap:"zero"},l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"2")),l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"3"))))}),l.a.createElement(m.a,{className:"sg-example-grid"},function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(i.d,null,l.a.createElement(i.d.Child,{size:6},l.a.createElement("div",{className:"sg-example-item-outer"},l.a.createElement(i.d,null,l.a.createElement(i.d.Child,{size:6},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:6},l.a.createElement("p",{className:"sg-example-item"},"2"))))),l.a.createElement(i.d.Child,{size:6},l.a.createElement("div",{className:"sg-example-item-outer"},l.a.createElement(i.d,null,l.a.createElement(i.d.Child,{size:4},l.a.createElement("p",{className:"sg-example-item"},"1")),l.a.createElement(i.d.Child,{size:8},l.a.createElement("p",{className:"sg-example-item"},"2")))))))}))}}}]);
//# sourceMappingURL=4.98c271ac.chunk.js.map