(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217747"],{c796:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Tabs")]),a("p",[e._v("The Tabs component makes it easy to explore and switch between different views. You can organize and allow navigation between groups of content that are related and at the same level of hierarchy. The Tabs component handles the display of content according to the active tab and all accessibility attributes on your tab and tab content.")]),e._m(0),a("h2",[e._v("Basic example")]),e._m(1),e._m(2),a("Playground",[[a("p-tabs",[a("p-tabs-item",{attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{attrs:{label:"Item Two"}},[e._v("Tab Content Two")]),a("p-tabs-item",{attrs:{label:"Item Three"}},[e._v("Tab Content Three")])],1)]],2),a("h2",[e._v("Switch size")]),e._m(3),a("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.size,expression:"size"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.size=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select size")]),a("option",{attrs:{selected:"",value:"small"}},[e._v("Small")]),a("option",{attrs:{value:"medium"}},[e._v("Medium")])])]},proxy:!0}])},[[a("p-tabs",{attrs:{size:e.size}},[a("p-tabs-item",{attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{attrs:{label:"Item Two"}},[e._v("Tab Content Two")]),a("p-tabs-item",{attrs:{label:"Item Three"}},[e._v("Tab Content Three")])],1)]],2),a("h2",[e._v("Scrollable Tab buttons")]),e._m(4),a("Playground",[[a("p-tabs",[a("p-tabs-item",{attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{attrs:{label:"Item Two"}},[e._v("Tab Content Two")]),a("p-tabs-item",{attrs:{label:"Item Three"}},[e._v("Tab Content Three")]),a("p-tabs-item",{attrs:{label:"Item Four"}},[e._v("Tab Content Four")]),a("p-tabs-item",{attrs:{label:"Item Five"}},[e._v("Tab Content Five")]),a("p-tabs-item",{attrs:{label:"Long Label Six"}},[e._v("Tab Content Long Label Six")]),a("p-tabs-item",{attrs:{label:"Item Seven"}},[e._v("Tab Content Seven")]),a("p-tabs-item",{attrs:{label:"Item Eight"}},[e._v("Tab Content Eight")]),a("p-tabs-item",{attrs:{label:"Item Nine"}},[e._v("Tab Content Nine")])],1)]],2),a("h2",[e._v("Weight variants")]),e._m(5),a("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.weight,expression:"weight"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.weight=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select weight")]),a("option",{attrs:{selected:"",value:"regular"}},[e._v("Regular")]),a("option",{attrs:{value:"semibold"}},[e._v("SemiBold")])])]},proxy:!0}])},[[a("p-tabs",{attrs:{weight:e.weight}},[a("p-tabs-item",{attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{attrs:{label:"Item Two"}},[e._v("Tab Content Two")]),a("p-tabs-item",{attrs:{label:"Item Three"}},[e._v("Tab Content Three")])],1)]],2),a("h2",[e._v("Theme variants")]),e._m(6),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.theme;return[a("p-tabs",{attrs:{theme:o}},[a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Two"}},[e._v("Tab Content Two")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Three"}},[e._v("Tab Content Three")])],1)]}}])}),a("h2",[e._v("Gradient Color Scheme variants")]),a("p",[e._v("If the amount of tabs exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling. The background and gradient has to align to your chosen background.")]),e._m(7),a("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.gradientColorScheme,expression:"gradientColorScheme"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.gradientColorScheme=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select gradient-color-scheme")]),a("option",{attrs:{selected:"",value:"default"}},[e._v("Default")]),a("option",{attrs:{value:"surface"}},[e._v("Surface")])])]},proxy:!0},{key:"default",fn:function(t){var o=t.theme;return[a("p-tabs",{attrs:{theme:o,"gradient-color-scheme":e.gradientColorScheme}},[a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Two"}},[e._v("Tab Content Two")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Three"}},[e._v("Tab Content Three")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Four"}},[e._v("Tab Content Four")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Five"}},[e._v("Tab Content Five")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Long Label Six"}},[e._v("Tab Content Long Label Six")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Seven"}},[e._v("Tab Content Seven")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Eight"}},[e._v("Tab Content Eight")]),a("p-tabs-item",{style:["dark"===o?{color:"white"}:{color:"black"}],attrs:{label:"Item Nine"}},[e._v("Tab Content Nine")])],1)]}}])}),a("h2",[e._v("Set active Tab")]),e._m(8),a("Playground",[[a("p-tabs",[a("p-tabs-item",{attrs:{label:"Item One"}},[e._v("Tab Content One")]),a("p-tabs-item",{attrs:{label:"Item Two",selected:""}},[e._v("Tab Content Two")]),a("p-tabs-item",{attrs:{label:"Item Three"}},[e._v("Tab Content Three")])],1)]],2)],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("This variant does not support "),a("code",[e._v("a")]),e._v(" tags and should not be used for navigation. If you need to update your window location have a look at our "),a("a",{attrs:{href:"#/components/tabs-bar#code"}},[e._v("Tabs Bar")]),e._v(" component.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Basic implementation shows a tab list with buttons to switch between the content. For every "),a("code",[e._v("p-tabs-item")]),e._v(" inside of the "),a("code",[e._v("p-tabs")]),e._v(" component, a tab will be created. The assigned "),a("code",[e._v("label")]),e._v(" property defines also the name of the Button.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Every "),a("code",[e._v("p-tabs-item")]),e._v(" holds a "),a("code",[e._v("slot")]),e._v(" to display content which can be individually designed.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("You can choose between two tab sizes, "),a("code",[e._v("small")]),e._v(" or "),a("code",[e._v("medium")]),e._v(". It defaults to "),a("code",[e._v("small")]),e._v(" and can be set by selecting the property on the "),a("code",[e._v("p-tabs")]),e._v(" component.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("If the amount of "),a("code",[e._v("p-tabs-item")]),e._v(" exceed the viewport, the buttons become horizontal scrollable.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The tabs component comes with two text-weights "),a("code",[e._v("regular")]),e._v(" or "),a("code",[e._v("semibold")]),e._v(" where it defaults to "),a("code",[e._v("regular")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Choose between "),a("code",[e._v("light")]),e._v(" and "),a("code",[e._v("dark")]),e._v(" theme by using the "),a("code",[e._v("theme")]),e._v(" property. Default theme is "),a("code",[e._v("light")]),e._v(". The Theme changes the Background of the tabs.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("There are two different background types "),a("code",[e._v("default")]),e._v(" and "),a("code",[e._v("surface")]),e._v(", you can choose between them by using the "),a("code",[e._v("gradient-color-scheme")]),e._v(" property. It defaults to the value "),a("code",[e._v("default")]),e._v(". The "),a("code",[e._v("gradient-color-scheme")]),e._v(" has impact on "),a("code",[e._v("light")]),e._v(" and "),a("code",[e._v("dark")]),e._v(" theme.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("You may need to change the initial active tab. To do so, use the "),a("code",[e._v("selected")]),e._v(" property on the "),a("code",[e._v("p-tabs-item")]),e._v(" you want to select on first render. If you put the property on multiple "),a("code",[e._v("p-tabs-item")]),e._v(" it will select the first.")])}],r=a("d4ec"),l=a("262e"),s=a("2caf"),i=a("0f9e"),c=a("2b0e"),v=a("2fe1"),b=function(e){Object(l["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.theme="light",e.weight="regular",e.size="small",e.gradientColorScheme="default",e}return a}(c["a"]);b=Object(i["b"])([v["b"]],b);var m=b,_=m,h=a("2877"),u=Object(h["a"])(_,o,n,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d217747.3ed4aff6.js.map