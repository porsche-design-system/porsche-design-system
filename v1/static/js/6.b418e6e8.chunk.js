(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{267:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=c(n(0)),a=c(n(63)),u=c(n(6));function c(e){return e&&e.__esModule?e:{default:e}}var i=(0,a.default)({}),l=i.Provider,f=i.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["components"]);return o.default.createElement(f,null,function(t){return o.default.createElement(e,r({components:n||t},a))})}};var p=function(e){var t=e.components,n=e.children;return o.default.createElement(l,{value:t},n)};p.propTypes={components:u.default.object.isRequired,children:u.default.element.isRequired},t.default=p},268:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(270);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return a(r).default}});var o=n(267);function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return a(o).default}})},269:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,"a",function(){return r})},270:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),u=l(a),c=l(n(271)),i=n(267);function l(e){return e&&e.__esModule?e:{default:e}}var f={inlineCode:"code",wrapper:"div"},p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,o=e.props,a=void 0===o?{}:o,i=e.children,l=e.components,p=void 0===l?{}:l,s=e.Layout,d=e.layoutProps,y=p[n+"."+t]||p[t]||f[t]||t;return s?((0,c.default)(this,s),u.default.createElement(s,r({components:p},d),u.default.createElement(y,a,i))):u.default.createElement(y,a,i)}}]),t}();t.default=(0,i.withMDXComponents)(p)},271:function(e,t,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a=Object.defineProperty,u=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,i=Object.getOwnPropertyDescriptor,l=Object.getPrototypeOf,f=l&&l(Object);e.exports=function e(t,n,p){if("string"!==typeof n){if(f){var s=l(n);s&&s!==f&&e(t,s,p)}var d=u(n);c&&(d=d.concat(c(n)));for(var y=0;y<d.length;++y){var m=d[y];if(!r[m]&&!o[m]&&(!p||!p[m])){var b=i(n,m);try{a(t,m,b)}catch(v){}}}return t}return t}},293:function(e,t,n){"use strict";n.r(t);var r=n(269),o=n(0),a=n.n(o),u=n(268);t.default=function(e){var t=e.components;Object(r.a)(e,["components"]);return a.a.createElement(u.MDXTag,{name:"wrapper",components:t},a.a.createElement(u.MDXTag,{name:"h1",components:t},"Icon"),a.a.createElement(u.MDXTag,{name:"h2",components:t},"Recommendation of use"))}}}]);
//# sourceMappingURL=6.b418e6e8.chunk.js.map