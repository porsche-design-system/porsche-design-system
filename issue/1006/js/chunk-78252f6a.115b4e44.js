(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78252f6a"],{"189b":function(e,t,a){var r=a("72df"),o=a("7d53"),n=a("4fed"),i=o("species");e.exports=function(e){return n>=51||!r((function(){var t=[],a=t.constructor={};return a[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"37d1":function(e,t,a){var r=a("730c");e.exports=function(e){return Object(r(e))}},"4fed":function(e,t,a){var r,o,n=a("f498"),i=a("64e4"),s=n.process,l=s&&s.versions,c=l&&l.v8;c?(r=c.split("."),o=r[0]+r[1]):i&&(r=i.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=i.match(/Chrome\/(\d+)/),r&&(o=r[1]))),e.exports=o&&+o},"55cd":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Radio Button")]),e._m(0),e._m(1),a("h2",[e._v("Basic examples")]),a("Playground",{attrs:{markup:e.basic,config:e.config}},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"label"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.label=t.target.multiple?a:a[0]}}},[a("option",{attrs:{selected:"",value:"show"}},[e._v("With label")]),a("option",{attrs:{value:"hide"}},[e._v("Without label")]),a("option",{attrs:{value:"responsive"}},[e._v("Responsive")])])]),a("hr"),a("h2",[e._v("Disabled")]),a("Playground",{attrs:{markup:e.disabled,config:e.config}}),a("hr"),a("h2",[e._v("Validation states")]),e._m(2),a("Playground",{attrs:{markup:e.validation,config:e.config}},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?a:a[0]}}},[a("option",{attrs:{disabled:""}},[e._v("Select a validation state")]),a("option",{attrs:{value:"error"}},[e._v("Error")]),a("option",{attrs:{value:"success"}},[e._v("Success")]),a("option",{attrs:{value:"none"}},[e._v("None")])])]),a("hr"),a("h2",[e._v("Slots")]),e._m(3),a("Playground",{attrs:{markup:e.slots,config:e.config}})],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Radio Button")]),e._v(" component is a styling wrapper for the native HTML input type "),a("code",[e._v("radio")]),e._v(" form element. The singular property of a Radio Button makes it distinct from a checkbox, which allows more than one (or no) item to be selected and for the unselected state to be restored.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("A "),a("code",[e._v("label")]),e._v(" is a caption which informs the user what information a particular form field is asking for. The "),a("strong",[e._v("Radio Button Wrapper")]),e._v(" component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The "),a("strong",[e._v("Radio Button Wrapper")]),e._v(" component supports the visualisation of inline validation. The "),a("code",[e._v("message")]),e._v(" and "),a("code",[e._v("radio")]),e._v(" is colored and visible/hidden depending on the defined "),a("code",[e._v("state")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Sometimes it's useful to be able to render markup (e.g. an anchor tag) for "),a("code",[e._v("label")]),e._v(" or "),a("code",[e._v("message")]),e._v(". Therefore a named slot can be used. Make sure "),a("strong",[e._v("not")]),e._v(" to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot). For named slots only "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content"}},[e._v("phrasing content")]),e._v(" is allowed. Please make sure to set the corresponding "),a("strong",[e._v("aria")]),e._v(" attributes.")])}],n=(a("d86f"),a("d4ec")),i=a("bee2"),s=a("262e"),l=a("2caf"),c=a("0f9e"),p=a("2b0e"),d=a("2fe1"),u=function(e){Object(s["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.config={spacing:"block"},e.state="error",e.label="show",e.disabled='<p-radio-button-wrapper label="Some label">\n  <input type="radio" name="some-name-4" disabled/>\n</p-radio-button-wrapper>\n<p-radio-button-wrapper label="Some label">\n  <input type="radio" name="some-name-4" checked disabled/>\n</p-radio-button-wrapper>',e.slots='<p-radio-button-wrapper state="error">\n  <span slot="label" id="some-label-id-1">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>\n  <input type="radio" name="some-name-6" aria-labelledby="some-label-id-1" />\n</p-radio-button-wrapper>\n<p-radio-button-wrapper state="error">\n  <span slot="label" id="some-label-id-2">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>\n  <input type="radio" name="some-name-6" aria-labelledby="some-label-id-2" aria-describedby="some-message-id" />\n  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>\n</p-radio-button-wrapper>',e}return Object(i["a"])(a,[{key:"basic",get:function(){var e='hide-label="'.concat("hide"===this.label?"true":"responsive"===this.label?"{ base: true, l: false }":"false",'"');return'<p-radio-button-wrapper label="Some label" '.concat(e,'>\n  <input type="radio" name="some-name-1" />\n</p-radio-button-wrapper>\n<p-radio-button-wrapper label="Some label" ').concat(e,'>\n  <input type="radio" name="some-name-1" />\n</p-radio-button-wrapper>')}},{key:"validation",get:function(){var e=' message="'.concat("none"!==this.state?"Some ".concat(this.state," validation message."):"",'"');return'<p-radio-button-wrapper label="Some label" state="'.concat(this.state,'">\n  <input type="radio" name="some-name-5" />\n</p-radio-button-wrapper>\n<p-radio-button-wrapper label="Some label" state="').concat(this.state,'"').concat(e,'>\n  <input type="radio" name="some-name-5" />\n</p-radio-button-wrapper>')}}]),a}(p["a"]);u=Object(c["b"])([d["b"]],u);var v=u,m=v,b=a("2877"),f=Object(b["a"])(m,r,o,!1,null,null,null);t["default"]=f.exports},"64e4":function(e,t,a){var r=a("5428");e.exports=r("navigator","userAgent")||""},"6a86":function(e,t,a){var r=a("7526"),o=a("c6de"),n=a("7d53"),i=n("species");e.exports=function(e,t){var a;return o(e)&&(a=e.constructor,"function"!=typeof a||a!==Array&&!o(a.prototype)?r(a)&&(a=a[i],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===t?0:t)}},c6de:function(e,t,a){var r=a("6a61");e.exports=Array.isArray||function(e){return"Array"==r(e)}},d86f:function(e,t,a){"use strict";var r=a("6b1d"),o=a("72df"),n=a("c6de"),i=a("7526"),s=a("37d1"),l=a("b495"),c=a("dac6"),p=a("6a86"),d=a("189b"),u=a("7d53"),v=a("4fed"),m=u("isConcatSpreadable"),b=9007199254740991,f="Maximum allowed index exceeded",h=v>=51||!o((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),_=d("concat"),g=function(e){if(!i(e))return!1;var t=e[m];return void 0!==t?!!t:n(e)},w=!h||!_;r({target:"Array",proto:!0,forced:w},{concat:function(e){var t,a,r,o,n,i=s(this),d=p(i,0),u=0;for(t=-1,r=arguments.length;t<r;t++)if(n=-1===t?i:arguments[t],g(n)){if(o=l(n.length),u+o>b)throw TypeError(f);for(a=0;a<o;a++,u++)a in n&&c(d,u,n[a])}else{if(u>=b)throw TypeError(f);c(d,u++,n)}return d.length=u,d}})},dac6:function(e,t,a){"use strict";var r=a("083f"),o=a("abdf"),n=a("9618");e.exports=function(e,t,a){var i=r(t);i in e?o.f(e,i,n(0,a)):e[i]=a}}}]);
//# sourceMappingURL=chunk-78252f6a.115b4e44.js.map