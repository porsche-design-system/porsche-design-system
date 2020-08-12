(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63cc9937"],{"75a4":function(e,t,a){var n=a("6b1d"),o=a("72df"),r=a("378c"),i=a("185a").f,s=a("d4cb"),u=o((function(){i(1)})),c=!s||u;n({target:"Object",stat:!0,forced:c,sham:!s},{getOwnPropertyDescriptor:function(e,t){return i(r(e),t)}})},e6b0:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Pagination")]),a("h2",[e._v("Basic usage")]),e._m(0),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1"}})]}}])}),a("h3",[e._v("Max Number of Page Links: 7 (desktop)")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1","max-number-of-page-links":"7"}})]}}])}),a("h3",[e._v("Max Number of Page Links: 5 (mobile)")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1","max-number-of-page-links":"5"}})]}}])}),a("h3",[e._v("Responsive")]),e._m(1),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1","max-number-of-page-links":"{ base: 5, s: 7 }"}})]}}])}),a("hr"),a("h2",[e._v("Behaviour playground")]),a("p",[e._v("By changing values for total amount of items, items to display per page and number of currently active page, the behaviour of the pagination component can be changed.")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(t){var n=t.theme;return[a("label",{staticStyle:{display:"inline-block","margin-right":"16px"}},[a("p-text",{attrs:{tag:"span",size:"x-small",theme:n}},[e._v("Total items count")]),a("input",{attrs:{type:"number"},domProps:{value:e.totalItemsCount},on:{input:function(t){e.totalItemsCount=t.target.value}}})],1),a("label",{staticStyle:{display:"inline-block","margin-right":"16px"}},[a("p-text",{attrs:{tag:"span",size:"x-small",theme:n}},[e._v("Items per page")]),a("input",{attrs:{type:"number"},domProps:{value:e.itemsPerPage},on:{input:function(t){e.itemsPerPage=t.target.value}}})],1),a("label",{staticStyle:{display:"inline-block"}},[a("p-text",{attrs:{tag:"span",size:"x-small",theme:n}},[e._v("Active page")]),a("input",{ref:"activePage",attrs:{type:"number"},domProps:{value:e.activePage},on:{input:function(t){e.activePage=t.target.value}}})],1)]}},{key:"default",fn:function(t){var n=t.theme;return[a("p-pagination",{ref:"paginationPlayground",attrs:{theme:n,"total-items-count":e.totalItemsCount,"items-per-page":e.itemsPerPage,"active-page":e.activePage}})]}}])})],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("To adapt the pagination to the specific viewport context, the amount of displayed page items varies between either "),a("code",[e._v("7")]),e._v(" (desktop/tablet) or "),a("code",[e._v("5")]),e._v(" (mobile). The components handles responsive viewport sizing by default.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The settings above can also be used on different major breakpoints "),a("code",[e._v("xs")]),e._v(", "),a("code",[e._v("s")]),e._v(", "),a("code",[e._v("m")]),e._v(", "),a("code",[e._v("l")]),e._v(" and "),a("code",[e._v("xl")]),e._v(".")])}],r=(a("75a4"),a("0122")),i=a("60a3"),s=function(){var e=function(t,a){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},e(t,a)};return function(t,a){function n(){this.constructor=t}e(t,a),t.prototype=null===a?Object.create(a):(n.prototype=a.prototype,new n)}}(),u=function(e,t,a,n){var o,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(r["a"])(Reflect))&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(s=(i<3?o(s):i>3?o(t,a,s):o(t,a))||s);return i>3&&s&&Object.defineProperty(t,a,s),s},c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.totalItemsCount=500,t.itemsPerPage=25,t.activePage=1,t}return s(t,e),t.prototype.mounted=function(){var e=this;this.$refs.paginationPlayground.addEventListener("pageChange",(function(t){e.activePage=t.detail.page}))},t=u([i["a"]],t),t}(i["c"]),p=c,l=p,f=a("2877"),m=Object(f["a"])(l,n,o,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-63cc9937.d3e32034.js.map