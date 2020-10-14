(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-222841f0"],{"10d6":function(e,t,n){"use strict";var r=n("e4cf"),a=n.n(r);a.a},"50c2":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Banner")]),e._m(0),n("h2",[e._v("Basic implementation")]),e._m(1),n("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(){return[n("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:""}},[e._v("Select a state")]),n("option",{attrs:{value:"neutral"}},[e._v("Neutral")]),n("option",{attrs:{value:"warning"}},[e._v("Warning")]),n("option",{attrs:{value:"error"}},[e._v("Error")])])]},proxy:!0},{key:"default",fn:function(t){var r=t.theme;return[n("p-banner",{attrs:{state:e.state,theme:r}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v("Some banner title")]),n("span",{attrs:{slot:"description"},slot:"description"},[e._v("Some banner description. You can also add inline "),n("a",{attrs:{href:"#"}},[e._v("links")]),e._v(" to route to another page.")])])]}}])}),n("h2",[e._v("Persistent")]),e._m(2),n("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.theme;return[n("p-banner",{attrs:{persistent:"true",theme:r}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v("Some banner title")]),n("span",{attrs:{slot:"description"},slot:"description"},[e._v("Some banner description.")])])]}}])}),n("h2",[e._v("Width")]),e._m(3),n("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(){return[n("select",{directives:[{name:"model",rawName:"v-model",value:e.width,expression:"width"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.width=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:""}},[e._v("Select a width")]),n("option",{attrs:{value:"basic"}},[e._v("Basic")]),n("option",{attrs:{value:"extended"}},[e._v("Extended")]),n("option",{attrs:{value:"fluid"}},[e._v("Fluid")])])]},proxy:!0},{key:"default",fn:function(t){var r=t.theme;return[n("p-banner",{attrs:{width:e.width,theme:r}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v("Some banner title")]),n("span",{attrs:{slot:"description"},slot:"description"},[e._v("Some banner description.")])])]}}])}),n("h2",[e._v("Example with user interaction")]),n("Playground",[n("p-button",{on:{click:e.openBanner}},[e._v("Open Banner")])],1),n("h2",[e._v("Custom styling")]),e._m(4),e._m(5)],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(" component are used to provide action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. Whenever you want to provide brief, temporary notifications stick to the "),n("strong",[e._v("Toast component")]),e._v(" (work in progress) instead. They are noticeable but do not disrupt the user experience and do not require an action to be taken.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(' component is positioned absolute above the page content by default. For personal adjustments, go to "Custom styling" section.')])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If the "),n("strong",[e._v("Banner")]),e._v(" shouldn't be removable by the user, add "),n("code",[e._v("persistent")]),e._v(" prop.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(" behaves the same as the "),n("strong",[e._v("ContentWrapper")]),e._v(" component and can be adapted to the same widths to match with your layout.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(" component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables):")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v("// default CSS variables\n--p-banner-position-type: fixed;\n--p-banner-position-top: p-px-to-rem(56px);\n--p-banner-position-bottom: p-px-to-rem(56px);\n\n// overwrite with CSS variables\np-banner {\n  --p-banner-position-top: 200px;\n}\n\n")])])}],o=(n("8f0b"),n("75a4"),n("fa8c5"),n("d4ec")),i=n("bee2"),s=n("262e"),l=n("2caf"),c=n("53ca"),p=n("2b0e"),u=n("2fe1"),v=function(e,t,n,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,n,i):a(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i},d=function(e){Object(s["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.state="neutral",e.width="basic",e.openBanner=function(){var e=document.createElement("div");e.innerHTML='\n    <p-banner>\n      <span slot="title">Some banner title</span>\n      <span slot="description">Some banner description.</span>\n    </p-banner>\n    ',document.getElementById("app").append(e)},e}return Object(i["a"])(n,[{key:"mounted",value:function(){var e=document.querySelectorAll("p-banner");e.forEach((function(e){return e.addEventListener("dismiss",(function(){return console.log("dismissed")}))}))}}]),n}(p["a"]);d=v([u["b"]],d);var f=d,m=f,_=(n("10d6"),n("2877")),h=Object(_["a"])(m,r,a,!1,null,null,null);t["default"]=h.exports},e4cf:function(e,t,n){}}]);
//# sourceMappingURL=chunk-222841f0.02cfef75.js.map