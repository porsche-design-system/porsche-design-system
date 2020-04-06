(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47954455"],{"0f9e":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));function r(e,t,a,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,a,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(s=(n<3?o(s):n>3?o(t,a,s):o(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s}},"3c75":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Radio Button")]),e._m(0),e._m(1),a("h2",[e._v("Basic examples")]),a("Playground",{attrs:{childElementLayout:{spacing:"block"}},scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"label"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.label=t.target.multiple?a:a[0]}}},[a("option",{attrs:{selected:"",value:"show"}},[e._v("With label")]),a("option",{attrs:{value:"hide"}},[e._v("Without label")]),a("option",{attrs:{value:"responsive"}},[e._v("Responsive")])])]},proxy:!0}])},[[a("p-radio-button-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[a("input",{attrs:{type:"radio",name:"some-name-1"}})]),a("p-radio-button-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[a("input",{attrs:{type:"radio",name:"some-name-1"}})])]],2),a("hr"),a("h2",[e._v("Disabled")]),a("Playground",{attrs:{childElementLayout:{spacing:"block"}}},[a("p-radio-button-wrapper",{attrs:{label:"Some label"}},[a("input",{attrs:{type:"radio",name:"some-name-4",disabled:"disabled"}})]),a("p-radio-button-wrapper",{attrs:{label:"Some label"}},[a("input",{attrs:{type:"radio",name:"some-name-4",checked:"checked",disabled:"disabled"}})])],1),a("hr"),a("h2",[e._v("Validation states")]),e._m(2),a("Playground",{attrs:{childElementLayout:{spacing:"block"}},scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select a validation state")]),a("option",{attrs:{value:"error"}},[e._v("Error")]),a("option",{attrs:{value:"success"}},[e._v("Success")]),a("option",{attrs:{value:"none"}},[e._v("None")])])]},proxy:!0}])},[[a("p-radio-button-wrapper",{attrs:{label:"Some label",state:e.state}},[a("input",{attrs:{type:"radio",name:"some-name-5"}})]),a("p-radio-button-wrapper",{attrs:{label:"Some label",state:e.state,message:"none"!==e.state?"Some "+e.state+" validation message.":""}},[a("input",{attrs:{type:"radio","aria-invalid":"error"===e.state,name:"some-name-5"}})])]],2),a("hr"),a("h2",[e._v("Slots")]),e._m(3),a("Playground",{attrs:{childElementLayout:{spacing:"block"}}},[[a("p-radio-button-wrapper",{attrs:{state:"error"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("Some label with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),a("input",{attrs:{type:"radio","aria-invalid":"true",name:"some-name-6"}})]),a("p-radio-button-wrapper",{attrs:{state:"error"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("Some label with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),a("input",{attrs:{type:"radio","aria-invalid":"true",name:"some-name-6"}}),a("span",{attrs:{slot:"message"},slot:"message"},[e._v("Some error message with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")])])]],2)],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Radio Button Wrapper")]),e._v(" component supports input type "),a("code",[e._v("radio")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("A "),a("code",[e._v("label")]),e._v(" is a caption which informs the user what information a particular form field is asking for. The "),a("strong",[e._v("Radio Button Wrapper")]),e._v(" component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Radio Button Wrapper")]),e._v(" component supports the visualisation of inline validation. The "),a("code",[e._v("message")]),e._v(" and "),a("code",[e._v("radio")]),e._v(" is colored and visible/hidden depending on the defined "),a("code",[e._v("state")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Sometimes it's useful to be able to render markup (e.g. an anchor tag) for "),a("code",[e._v("label")]),e._v(" or "),a("code",[e._v("message")]),e._v(". Therefore a named slot can be used. Make sure "),a("strong",[e._v("not")]),e._v(" to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot). For named slots only "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content"}},[e._v("phrasing content")]),e._v(" is allowed.")])}],n=a("d4ec"),s=a("2caf"),l=a("262e"),i=a("0f9e"),p=a("60a3"),c=function(e){Object(l["a"])(a,e);var t=Object(s["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.state="error",e.label="show",e}return a}(p["c"]);c=Object(i["a"])([p["a"]],c);var u=c,d=u,v=a("2877"),m=Object(v["a"])(d,r,o,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-47954455.208c17ad.js.map