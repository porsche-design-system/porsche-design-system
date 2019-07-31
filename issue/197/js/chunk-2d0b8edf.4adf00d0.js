(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b8edf"],{"317b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Pagination")]),a("h2",[e._v("Introduction")]),a("p",[e._v("The pagination is the component of choice primarily to navigate through listed content (e.g. search results, archives etc.).")]),a("h2",[e._v("Basic usage")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1"}})]}}])}),a("h2",[e._v("Differences in mobile and Tablet/Desktop viewports")]),e._m(0),a("h3",[e._v("Page range: auto (default)")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1"}})]}}])}),a("h3",[e._v("Page range: large (desktop)")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1","page-range":"large"}})]}}])}),a("h3",[e._v("Page range: small (mobile)")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[a("p-pagination",{attrs:{theme:t,"total-items-count":"500","items-per-page":"25","active-page":"1","page-range":"small"}})]}}])}),a("hr"),a("h2",[e._v("Playground")]),a("p",[e._v("Test pagination behaviour by changing values for total amount of items, items to display per page and number of currently active page.")]),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(t){var n=t.theme;return[a("label",{staticClass:"p-spacing-mr-16",staticStyle:{display:"inline-block"}},[a("p-text",{attrs:{tag:"span",variant:"small",color:"dark"===n?"porsche-light":"porsche-black"}},[e._v("Total items count")]),a("input",{attrs:{type:"number"},domProps:{value:e.totalItemsCount},on:{input:function(t){e.totalItemsCount=t.target.value}}})],1),a("label",{staticClass:"p-spacing-mr-16",staticStyle:{display:"inline-block"}},[a("p-text",{attrs:{tag:"span",variant:"small",color:"dark"===n?"porsche-light":"porsche-black"}},[e._v("Items per page")]),a("input",{attrs:{type:"number"},domProps:{value:e.itemsPerPage},on:{input:function(t){e.itemsPerPage=t.target.value}}})],1),a("label",{staticStyle:{display:"inline-block"}},[a("p-text",{attrs:{tag:"span",variant:"small",color:"dark"===n?"porsche-light":"porsche-black"}},[e._v("Active page")]),a("input",{ref:"activePage",attrs:{type:"number"},domProps:{value:e.activePage},on:{input:function(t){e.activePage=t.target.value}}})],1)]}},{key:"default",fn:function(t){var n=t.theme;return[a("p-pagination",{ref:"paginationPlayground",attrs:{theme:n,"total-items-count":e.totalItemsCount,"items-per-page":e.itemsPerPage,"active-page":e.activePage}})]}}])})],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("To correctly display the pagination in different viewport sizes, the maximum amount of page links displayed is meant to be reduced for lower resolutions.\nCurrently the maximum number is either "),a("code",[e._v("7")]),e._v(" (desktop/tablet) or "),a("code",[e._v("5")]),e._v(" (mobile). The components handles viewport sizing internally by default.\nTo adapt the maximum number of page links for smaller screens for individual breakpoints, the "),a("code",[e._v("page-range")]),e._v(" property can be changed to "),a("code",[e._v("1")]),e._v(" (desktop default) or "),a("code",[e._v("0")]),e._v(" (mobile).")])}],r=a("87bb"),o=a("b52d"),s=a("fd71"),l=a("ced0"),c=a("15ac"),p=a("0f9e"),u=a("fc36"),g=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(s["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.totalItemsCount=500,e.itemsPerPage=25,e.activePage=1,e}return Object(c["a"])(t,e),Object(o["a"])(t,[{key:"mounted",value:function(){var e=this;this.$refs.paginationPlayground.addEventListener("pClick",function(t,a){e.activePage=t.detail.page})}}]),t}(u["c"]);g=p["a"]([u["a"]],g);var m=g,v=m,d=a("2be6"),h=Object(d["a"])(v,n,i,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0b8edf.4adf00d0.js.map