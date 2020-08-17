(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-176b0791"],{"8f0b":function(e,t,a){"use strict";var r=a("6b1d"),o=a("e8e5");r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},e259:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Checkbox")]),e._m(0),e._m(1),a("h2",[e._v("Basic example")]),a("Playground",{attrs:{childElementLayout:{spacing:"block"}},scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"label"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.label=t.target.multiple?a:a[0]}}},[a("option",{attrs:{selected:"",value:"show"}},[e._v("With label")]),a("option",{attrs:{value:"hide"}},[e._v("Without label")]),a("option",{attrs:{value:"responsive"}},[e._v("Responsive")])])]},proxy:!0}])},[[a("p-checkbox-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[a("input",{attrs:{type:"checkbox",name:"some-name"}})]),a("p-checkbox-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[a("input",{attrs:{type:"checkbox",name:"some-name",checked:""}})])]],2),a("hr"),a("h2",[e._v("Indeterminate")]),e._m(2),e._m(3),a("Playground",{attrs:{childElementLayout:{spacing:"inline"}}},[a("p-checkbox-wrapper",{attrs:{label:"Some label"}},[a("input",{staticClass:"example-set-to-indeterminate",attrs:{type:"checkbox",name:"some-name"}})]),a("p-checkbox-wrapper",{attrs:{label:"Some label",indeterminate:"true"}},[a("input",{staticClass:"example-set-to-indeterminate",attrs:{type:"checkbox",name:"some-name",checked:""}})])],1),a("hr"),a("h2",[e._v("Disabled")]),a("Playground",{attrs:{childElementLayout:{spacing:"inline"}}},[a("p-checkbox-wrapper",{attrs:{label:"Some label"}},[a("input",{attrs:{type:"checkbox",name:"some-name",disabled:""}})]),a("p-checkbox-wrapper",{attrs:{label:"Some label"}},[a("input",{attrs:{type:"checkbox",name:"some-name",checked:"",disabled:""}})])],1),a("hr"),a("h2",[e._v("Validation states")]),e._m(4),a("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[a("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select a validation state")]),a("option",{attrs:{value:"error"}},[e._v("Error")]),a("option",{attrs:{value:"success"}},[e._v("Success")]),a("option",{attrs:{value:"none"}},[e._v("None")])])]},proxy:!0}])},[[a("p-checkbox-wrapper",{attrs:{label:"Some label",state:e.state,message:"none"!==e.state?"Some "+e.state+" validation message.":""}},[a("input",{attrs:{type:"checkbox",name:"some-name"}})])]],2),a("hr"),a("h2",[e._v("Slots")]),e._m(5),a("Playground",[[a("p-checkbox-wrapper",{attrs:{state:"error"}},[a("span",{attrs:{slot:"label",id:"some-label-id"},slot:"label"},[e._v("Some label with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),a("input",{attrs:{type:"checkbox",name:"some-name","aria-labelledby":"some-label-id","aria-describedby":"some-message-id"}}),a("span",{attrs:{slot:"message",id:"some-message-id"},slot:"message"},[e._v("Some error message with a "),a("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")])])]],2)],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Checkbox Wrapper")]),e._v(" component is a styling wrapper for the native HTML input type "),a("code",[e._v("checkbox")]),e._v(" form element.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("A "),a("code",[e._v("label")]),e._v(" is a caption which informs the user what information a particular form field is asking for. The "),a("strong",[e._v("Checkbox Wrapper")]),e._v(" component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Mask the visual appearance of a checkbox which has a state in-between checked and unchecked."),a("br"),e._v(" This is especially useful for a checkbox that is used to set the state of a group of checkboxes at once. However this group might have a mixed state. In this case we recommend to use "),a("code",[e._v("checked=false")]),e._v(" and "),a("code",[e._v("indeterminate=true")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[a("strong",[e._v("Note: The "),a("code",[e._v("indeterminate")]),e._v(" attribute can only be set through the DOM node. There is no HTML attribute to set it. Also it's worth to know, that the "),a("code",[e._v("indeterminate")]),e._v(" attribute only affects how the checkbox is shown. The current value is hidden from the user, but the checkbox still keeps it's "),a("code",[e._v("checked")]),e._v(" state. You can find more details in "),a("a",{attrs:{href:"https://www.w3.org/TR/html52/sec-forms.html#dom-htmlinputelement-indeterminate"}},[e._v("the specification")]),e._v(".")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Checkbox Wrapper")]),e._v(" component supports the visualisation of inline validation. The "),a("code",[e._v("message")]),e._v(" and "),a("code",[e._v("checkbox")]),e._v(" is colored and visible/hidden depending on the defined "),a("code",[e._v("state")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Sometimes it's useful to be able to render markup (e.g. an anchor tag) for "),a("code",[e._v("label")]),e._v(" or "),a("code",[e._v("message")]),e._v(". Therefore a named slot can be used. Make sure "),a("strong",[e._v("not")]),e._v(" to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot). For named slots only "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content"}},[e._v("phrasing content")]),e._v(" is allowed. Please make sure to set the corresponding "),a("strong",[e._v("aria")]),e._v(" attributes.")])}],s=(a("8f0b"),a("fa8c"),a("276c")),n=a("e954"),i=a("920b"),l=a("92a6"),c=a("0f9e"),h=a("60a3"),p=function(e){Object(i["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.state="error",e.label="show",e}return Object(n["a"])(a,[{key:"mounted",value:function(){this.$nextTick((function(){var e=document.querySelectorAll(".example-set-to-indeterminate");e.forEach((function(e){e.indeterminate=!0}))}))}}]),a}(h["c"]);p=Object(c["b"])([h["a"]],p);var u=p,d=u,m=a("2877"),v=Object(m["a"])(d,r,o,!1,null,null,null);t["default"]=v.exports},e8e5:function(e,t,a){"use strict";var r=a("d054").forEach,o=a("7f8a"),s=a("ce71"),n=o("forEach"),i=s("forEach");e.exports=n&&i?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},fa8c:function(e,t,a){var r=a("f498"),o=a("130d"),s=a("e8e5"),n=a("5b12");for(var i in o){var l=r[i],c=l&&l.prototype;if(c&&c.forEach!==s)try{n(c,"forEach",s)}catch(h){c.forEach=s}}}}]);
//# sourceMappingURL=chunk-176b0791.0869d6d5.js.map