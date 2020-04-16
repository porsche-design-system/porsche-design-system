(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2dff3ff0"],{"0a12":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Link")]),e._m(0),n("p",[e._v("It can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")]),n("h2",[e._v("Variants")]),n("p",[e._v("Choose between predefined styling variants.")]),n("h3",[e._v("Primary")]),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[n("p-link",{attrs:{variant:"primary",href:"https://www.porsche.com",theme:o}},[e._v("Some label")]),n("p-link",{attrs:{variant:"primary",href:"https://www.porsche.com","hide-label":"true",theme:o}},[e._v("Some label")])]}}])}),n("h3",[e._v("Secondary (default)")]),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[n("p-link",{attrs:{href:"https://www.porsche.com",theme:o}},[e._v("Some label")]),n("p-link",{attrs:{href:"https://www.porsche.com","hide-label":"true",theme:o}},[e._v("Some label")])]}}])}),n("h3",[e._v("Tertiary")]),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[n("p-link",{attrs:{variant:"tertiary",href:"https://www.porsche.com",theme:o}},[e._v("Some label")]),n("p-link",{attrs:{variant:"tertiary",href:"https://www.porsche.com","hide-label":"true",theme:o}},[e._v("Some label")])]}}])}),n("h3",[e._v("Responsive")]),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[n("p-link",{attrs:{variant:"primary",href:"https://www.porsche.com","hide-label":"{ base: true, s: false }",theme:o}},[e._v("Some label")]),n("p-link",{attrs:{variant:"secondary",href:"https://www.porsche.com","hide-label":"{ base: true, m: false }",theme:o}},[e._v("Some label")]),n("p-link",{attrs:{variant:"tertiary",href:"https://www.porsche.com","hide-label":"{ base: true, l: false }",theme:o}},[e._v("Some label")])]}}])}),n("hr"),n("h2",[e._v("Link wrapped with an anchor tag (e.g. for framework routing)")]),e._m(1),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[n("a",{staticClass:"example-link",attrs:{href:"https://www.porsche.com"}},[n("p-link",{attrs:{theme:o}},[e._v("Some label")])],1),n("a",{staticClass:"example-link",attrs:{href:"https://www.porsche.com"}},[n("p-link",{attrs:{"hide-label":"true",theme:o}},[e._v("Some label")])],1)]}}])}),n("hr"),n("h2",[e._v("Link with specific icon")]),e._m(2),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.theme;return[n("p-link",{attrs:{href:"https://www.porsche.com",icon:"phone",theme:a}},[e._v("Some label")]),n("p-link",{attrs:{href:"https://www.porsche.com","icon-source":o("d8ad"),"hide-label":"true",theme:a}},[e._v("Some label")])]}}])}),n("h2",[e._v("Bind events to the Link")]),e._m(3),n("Playground",{attrs:{themeable:!0,childElementLayout:{spacing:"inline"}},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[n("p-link",{attrs:{href:"https://www.porsche.com",onclick:"alert('click'); return false;",onfocus:"console.log('focus')",onfocusin:"console.log('focusin')",onblur:"console.log('blur')",onfocusout:"console.log('focusout')",theme:o}},[e._v("Some label")])]}}])})],1)},a=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The "),o("code",[e._v("<p-link>")]),e._v(" component is essential to perform changes in page routes.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("If the component is used within a JS framework, it might be applied within a framework specific router component. In this case the router component must be wrapped around "),o("code",[e._v("<p-link>")]),e._v(". Please take care of the correct styling of the rendered router "),o("code",[e._v("<a>")]),e._v(" tag like in the example below (in most cases "),o("code",[e._v("outline")]),e._v(" and "),o("code",[e._v("text-decoration")]),e._v(" must be set to "),o("code",[e._v("none")]),e._v(").")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the "),o("code",[e._v("icon")]),e._v(" property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the "),o("code",[e._v("iconSource")]),e._v(" prop.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("You can use native "),o("code",[e._v("click")]),e._v(", "),o("code",[e._v("focus")]),e._v(", "),o("code",[e._v("focusin")]),e._v(", "),o("code",[e._v("blur")]),e._v(" and "),o("code",[e._v("focusout")]),e._v(" events on the link.")])}],r=(o("d171"),o("2877")),l={},s=Object(r["a"])(l,n,a,!1,null,"34b28fb0",null);t["default"]=s.exports},d171:function(e,t,o){"use strict";var n=o("d8e9"),a=o.n(n);a.a},d8ad:function(e,t,o){e.exports=o.p+"img/icon-custom-kaixin.bbde6f67.svg"},d8e9:function(e,t,o){}}]);
//# sourceMappingURL=chunk-2dff3ff0.979bd93d.js.map