(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20ef2b"],{b216:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Textarea")]),e._m(0),e._m(1),e._m(2),a("h2",[e._v("Basic example")]),a("Playground",{attrs:{childElementLayout:{spacing:"block"}},scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"label"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.label=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select a label mode")]),a("option",{attrs:{selected:"",value:"show"}},[e._v("With label")]),a("option",{attrs:{value:"hide"}},[e._v("Without label")]),a("option",{attrs:{value:"responsive"}},[e._v("Responsive")])])]},proxy:!0}])},[[a("p-textarea-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[a("textarea",{attrs:{name:"some-name"}})]),a("p-textarea-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[a("textarea",{attrs:{name:"some-name",placeholder:"Some placeholder text"}})])]],2),a("hr"),a("h2",[e._v("With description text")]),e._m(3),a("Playground",[a("p-textarea-wrapper",{attrs:{label:"Some label",description:"Some description"}},[a("textarea",{attrs:{name:"some-name"}})])],1),a("hr"),a("h2",[e._v("Disabled")]),a("Playground",[a("p-textarea-wrapper",{attrs:{label:"Some label"}},[a("textarea",{attrs:{name:"some-name",disabled:"disabled"}},[e._v("Some value")])])],1),a("hr"),a("h2",[e._v("Read only")]),a("Playground",[a("p-textarea-wrapper",{attrs:{label:"Some label"}},[a("textarea",{attrs:{name:"some-name",readonly:"readonly"}},[e._v("Some value")])])],1),a("hr"),a("h2",[e._v("Validation states")]),e._m(4),a("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select a validation state")]),a("option",{attrs:{value:"error"}},[e._v("Error")]),a("option",{attrs:{value:"success"}},[e._v("Success")]),a("option",{attrs:{value:"none"}},[e._v("None")])])]},proxy:!0}])},[[a("p-textarea-wrapper",{attrs:{label:"Some label",state:e.state,message:"none"!==e.state?"Some "+e.state+" validation message.":""}},[a("textarea",{attrs:{"aria-invalid":"error"===e.state,name:"some-name"}},[e._v("Some value")])])]],2),a("hr"),a("h2",[e._v("Slots")]),e._m(5),a("Playground",[[a("p-textarea-wrapper",{attrs:{state:"error"}},[a("span",{attrs:{slot:"label",id:"some-label-id"},slot:"label"},[e._v("Some label with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),a("span",{attrs:{slot:"description"},slot:"description"},[e._v("Some description with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),a("textarea",{attrs:{name:"some-name","aria-labelledby":"some-label-id","aria-describedby":"some-message-id"}}),a("span",{attrs:{slot:"message",id:"some-message-id"},slot:"message"},[e._v("Some error message with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")])])]],2)],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Textarea Wrapper")]),e._v(" component is a styling wrapper for the native HTML "),a("code",[e._v("<textarea>")]),e._v(" form element.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("A "),a("code",[e._v("label")]),e._v(" is a caption which informs the user what information a particular form field is asking for. The "),a("strong",[e._v("Textarea Wrapper")]),e._v(" component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("While a "),a("code",[e._v("placeholder")]),e._v(" is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement of the label text and is technically connected with the "),a("code",[e._v("hide-label")]),e._v(" property.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Textarea Wrapper")]),e._v(" component supports the visualisation of inline validation.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Sometimes it's useful to be able to render markup (e.g. an anchor tag) for "),a("code",[e._v("label")]),e._v(" or "),a("code",[e._v("message")]),e._v(". Therefore a named slot can be used. Make sure "),a("strong",[e._v("not")]),e._v(" to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot). For named slots only "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content"}},[e._v("phrasing content")]),e._v(" is allowed. Please make sure to set the corresponding "),a("strong",[e._v("aria")]),e._v(" attributes.")])}],o=a("d4ec"),l=a("262e"),n=a("2caf"),i=a("0f9e"),c=a("60a3"),p=function(e){Object(l["a"])(a,e);var t=Object(n["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.label="show",e.state="error",e}return a}(c["c"]);p=Object(i["b"])([c["a"]],p);var v=p,m=v,d=a("2877"),u=Object(d["a"])(m,r,s,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d20ef2b.6afab75b.js.map