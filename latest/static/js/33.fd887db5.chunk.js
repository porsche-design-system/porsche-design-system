(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=s(n(0)),r=s(n(307)),i=s(n(3));function s(e){return e&&e.__esModule?e:{default:e}}var c=(0,r.default)({}),l=c.Provider,p=c.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,r=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(t,["components"]);return o.default.createElement(p,null,function(t){return o.default.createElement(e,a({components:n||t},r))})}};var u=function(e){var t=e.components,n=e.children;return o.default.createElement(l,{value:t},n)};u.propTypes={components:i.default.object.isRequired,children:i.default.element.isRequired},t.default=u},303:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(305);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return r(a).default}});var o=n(302);function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return r(o).default}})},304:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,"a",function(){return a})},305:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),i=l(r),s=l(n(306)),c=n(302);function l(e){return e&&e.__esModule?e:{default:e}}var p={inlineCode:"code",wrapper:"div"},u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),o(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,o=e.props,r=void 0===o?{}:o,c=e.children,l=e.components,u=void 0===l?{}:l,m=e.Layout,d=e.layoutProps,h=u[n+"."+t]||u[t]||p[t]||t;return m?((0,s.default)(this,m),i.default.createElement(m,a({components:u},d),i.default.createElement(h,r,c))):i.default.createElement(h,r,c)}}]),t}();t.default=(0,c.withMDXComponents)(u)},306:function(e,t,n){"use strict";var a={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},r=Object.defineProperty,i=Object.getOwnPropertyNames,s=Object.getOwnPropertySymbols,c=Object.getOwnPropertyDescriptor,l=Object.getPrototypeOf,p=l&&l(Object);e.exports=function e(t,n,u){if("string"!==typeof n){if(p){var m=l(n);m&&m!==p&&e(t,m,u)}var d=i(n);s&&(d=d.concat(s(n)));for(var h=0;h<d.length;++h){var f=d[h];if(!a[f]&&!o[f]&&(!u||!u[f])){var g=c(n,f);try{r(t,f,g)}catch(y){}}}return t}return t}},307:function(e,t,n){"use strict";t.__esModule=!0;var a=r(n(0)),o=r(n(308));function r(e){return e&&e.__esModule?e:{default:e}}t.default=a.default.createContext||o.default,e.exports=t.default},308:function(e,t,n){"use strict";t.__esModule=!0;var a=n(0),o=(i(a),i(n(3))),r=i(n(80));i(n(309));function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var p=1073741823;t.default=function(e,t){var n,i,u="__create-react-context-"+(0,r.default)()+"__",m=function(e){function n(){var t,a;s(this,n);for(var o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];return t=a=c(this,e.call.apply(e,[this].concat(r))),a.emitter=function(e){var t=[];return{on:function(e){t.push(e)},off:function(e){t=t.filter(function(t){return t!==e})},get:function(){return e},set:function(n,a){e=n,t.forEach(function(t){return t(e,a)})}}}(a.props.value),c(a,t)}return l(n,e),n.prototype.getChildContext=function(){var e;return(e={})[u]=this.emitter,e},n.prototype.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var n=this.props.value,a=e.value,o=void 0;((r=n)===(i=a)?0!==r||1/r===1/i:r!==r&&i!==i)?o=0:(o="function"===typeof t?t(n,a):p,0!==(o|=0)&&this.emitter.set(e.value,o))}var r,i},n.prototype.render=function(){return this.props.children},n}(a.Component);m.childContextTypes=((n={})[u]=o.default.object.isRequired,n);var d=function(t){function n(){var e,a;s(this,n);for(var o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];return e=a=c(this,t.call.apply(t,[this].concat(r))),a.state={value:a.getValue()},a.onUpdate=function(e,t){0!==((0|a.observedBits)&t)&&a.setState({value:a.getValue()})},c(a,e)}return l(n,t),n.prototype.componentWillReceiveProps=function(e){var t=e.observedBits;this.observedBits=void 0===t||null===t?p:t},n.prototype.componentDidMount=function(){this.context[u]&&this.context[u].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=void 0===e||null===e?p:e},n.prototype.componentWillUnmount=function(){this.context[u]&&this.context[u].off(this.onUpdate)},n.prototype.getValue=function(){return this.context[u]?this.context[u].get():e},n.prototype.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},n}(a.Component);return d.contextTypes=((i={})[u]=o.default.object,i),{Provider:m,Consumer:d}},e.exports=t.default},309:function(e,t,n){"use strict";var a=n(310);e.exports=a},310:function(e,t,n){"use strict";function a(e){return function(){return e}}var o=function(){};o.thatReturns=a,o.thatReturnsFalse=a(!1),o.thatReturnsTrue=a(!0),o.thatReturnsNull=a(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},373:function(e,t,n){"use strict";n.r(t);var a=n(304),o=n(0),r=n.n(o),i=n(303);t.default=function(e){var t=e.components;Object(a.a)(e,["components"]);return r.a.createElement(i.MDXTag,{name:"wrapper",components:t},r.a.createElement(i.MDXTag,{name:"h2",components:t},"General information"),r.a.createElement(i.MDXTag,{name:"p",components:t},"It's important for a good UX to give the user feedback about what's happening.\nEspecially when it comes to unavoidable moments when the user has to wait,\nfor example due to technical processing of information or requests, you should\nnever leave the user uncertain about what's happening. "),r.a.createElement(i.MDXTag,{name:"p",components:t},"Always remember that the user's wait time begins with initiating an action,\nclicking on a button for example. Whenever this causes delays of more than 1 second,\nyou should bridge it with a good user feedback in order not to leave the user\nuncertain about what's happening, to avoid a high bounce rate and to obtain a positive\nimpression of your website or application."),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Spinner"),r.a.createElement(i.MDXTag,{name:"p",components:t},"A looped indicator (spinner) is used to inform the user about an ongoing operation\nwhere the loading progress cannot be determined. Usually, spinners are recommended\nto be used for delays of 2-10 seconds."),r.a.createElement(i.MDXTag,{name:"p",components:t},'The Porsche UI Kit provides a spinner that can be used either stand-alone\n(for example as page loaders) or within components, such as in buttons to\nindicate progress after clicking "save".'),r.a.createElement(i.MDXTag,{name:"hr",components:t}),r.a.createElement(i.MDXTag,{name:"h2",components:t},"Style variations"),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Spinner sizes"),r.a.createElement(i.MDXTag,{name:"p",components:t},"Depending on your need you can choose betwenn different spinner sizes and versions\nfor Light Theme and Dark Theme."),r.a.createElement(i.MDXTag,{name:"table",components:t},r.a.createElement(i.MDXTag,{name:"thead",components:t,parentName:"table"},r.a.createElement(i.MDXTag,{name:"tr",components:t,parentName:"thead"},r.a.createElement(i.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Type"),r.a.createElement(i.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Example"),r.a.createElement(i.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Recommendation"))),r.a.createElement(i.MDXTag,{name:"tbody",components:t,parentName:"table"},r.a.createElement(i.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(i.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},"Spinner X-Small"),r.a.createElement(i.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},"\u274c @DEV: BITTE SPINNER EINF\xdcGEN"),r.a.createElement(i.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},"Only for in-component loaders, such as in buttons or input fields.")),r.a.createElement(i.MDXTag,{name:"tr",components:t,parentName:"tbody"},r.a.createElement(i.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},"Spinner Small - Large"),r.a.createElement(i.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},"\u274c @DEV: BITTE 3 SPINNER EINF\xdcGEN"),r.a.createElement(i.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},"For module or page loading, optionally accompanied by a text label.")))),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Additional text label"),r.a.createElement(i.MDXTag,{name:"p",components:t},"It can be helpful to include text to improve clarity. Keep it simple by only explaining\n",r.a.createElement(i.MDXTag,{name:"strong",components:t,parentName:"p"},"why"),' the user is waiting. Never use texts such as "Don\'t click again", for example to prevent\nthe user from clicking twice on a shopping button in order not to create an extra order.\nA loading animation should always be a user-friendly helper, not a threat.'),r.a.createElement(i.MDXTag,{name:"ul",components:t},r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"For X-Small size, you should use copytext."),r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"For larger spinner sizes, you can use any additional size, depending on your needs and the available space."),r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"Text must always be placed beneath or on the right side of the loader, keeping a minimum spacing of 16 px between spinner and text.")),r.a.createElement(i.MDXTag,{name:"p",components:t},"\u274c BEISPIELABBILDUNGEN"),r.a.createElement(i.MDXTag,{name:"hr",components:t}),r.a.createElement(i.MDXTag,{name:"h2",components:t},"Layout"),r.a.createElement(i.MDXTag,{name:"p",components:t},"Whenever used as an independent item within a page or module, the spinner should always\nbe placed vertically and horizontally centered within the referring area.\nWithin a dedicated component, the placement of the spinner is determined by the\nrespective element it replaces or accompanies."),r.a.createElement(i.MDXTag,{name:"p",components:t},"\u274c BEISPIELE"),r.a.createElement(i.MDXTag,{name:"hr",components:t}),r.a.createElement(i.MDXTag,{name:"h2",components:t},"Interaction"),r.a.createElement(i.MDXTag,{name:"p",components:t},"A spinner itself is never clickable, but it is the spinner that determines\nthe clickability of the surrounding elements."),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Component blocking"),r.a.createElement(i.MDXTag,{name:"p",components:t},"If a spinner is triggered by an interaction with a component, it is recommended to disable\nthe component while the spinner is visible."),r.a.createElement(i.MDXTag,{name:"p",components:t},"\u274c EXAMPLE: LOADING BUTTON"),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Screen blocking"),r.a.createElement(i.MDXTag,{name:"p",components:t},"Using a loading spinner for parts of a screen or within dedicated components usually means\nthat the user is able to cancel the operation, for example by clicking somewhere else.\nIf the user is not supposed to start another activity, you should block the screen.\nThis can be done by using a full size block overlay for the whole screen and placing\nthe loader on top:"),r.a.createElement(i.MDXTag,{name:"ul",components:t},r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"Light Theme: Blocking layer in Porsche Light, 90% opacity"),r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"Dark Theme: Blocking layer in Porsche Dark, 90% opacity")),r.a.createElement(i.MDXTag,{name:"p",components:t},"\u274c EXAMPLES BLOCKING LAYER "),r.a.createElement(i.MDXTag,{name:"hr",components:t}),r.a.createElement(i.MDXTag,{name:"h2",components:t},"Recommendations"),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Bridging delays of more than 10 seconds"),r.a.createElement(i.MDXTag,{name:"p",components:t},"A spinner offers feedback that the system is working, but not on how long it will take.\nFostering the user to stare at a spinning wheel for more than 10 seconds will most likely\nmake the users get impatient, wandering around on your website, abandon their current task,\nor, worst case, close your application. So, if the result takes more than 10 seconds to\nappear, you should better provide a progress bar, showing the estimated waiting time."),r.a.createElement(i.MDXTag,{name:"h3",components:t},"Avoid spinner overload"),r.a.createElement(i.MDXTag,{name:"p",components:t},"Using too much spinners at a time or within a page or application in general\ncan also create user frustration. This should be avoided by carefully considering\nwhere a loader makes sense and which loader type is best suited. "),r.a.createElement(i.MDXTag,{name:"hr",components:t}),r.a.createElement(i.MDXTag,{name:"h2",components:t},"Related components"),r.a.createElement(i.MDXTag,{name:"ul",components:t},r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},r.a.createElement(i.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"#/components/action/button-regular"}},"Button Regular")),r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},r.a.createElement(i.MDXTag,{name:"a",components:t,parentName:"li",props:{href:"#/components/actions/button-icon"}},"Button Icon"))),r.a.createElement(i.MDXTag,{name:"hr",components:t}),r.a.createElement(i.MDXTag,{name:"h2",components:t},"Accessibility"),r.a.createElement(i.MDXTag,{name:"ul",components:t},r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},'The aria-label "loading" should be used to indicate the loading state.'),r.a.createElement(i.MDXTag,{name:"li",components:t,parentName:"ul"},"Tabindex should be used to ensure that the loading spinner is found with the keyboard.")))}}}]);
//# sourceMappingURL=33.fd887db5.chunk.js.map