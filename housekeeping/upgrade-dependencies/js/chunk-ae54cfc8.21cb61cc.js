(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae54cfc8"],{"083f":function(e,t,r){var n=r("7526");e.exports=function(e,t){if(!n(e))return e;var r,o;if(t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;if("function"==typeof(r=e.valueOf)&&!n(o=r.call(e)))return o;if(!t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},"0e93":function(e,t){e.exports=!1},"157c":function(e,t,r){var n=r("7526");e.exports=function(e){if(!n(e))throw TypeError(String(e)+" is not an object");return e}},"185a":function(e,t,r){var n=r("d4cb"),o=r("e129"),a=r("9618"),i=r("378c"),s=r("083f"),c=r("f1a7"),l=r("7c3f"),u=Object.getOwnPropertyDescriptor;t.f=n?u:function(e,t){if(e=i(e),t=s(t,!0),l)try{return u(e,t)}catch(r){}if(c(e,t))return a(!o.f.call(e,t),e[t])}},"1d8a":function(e,t){var r=0,n=Math.random();e.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++r+n).toString(36)}},"1f5e":function(e,t,r){var n=r("378c"),o=r("b495"),a=r("9a0f"),i=function(e){return function(t,r,i){var s,c=n(t),l=o(c.length),u=a(i,l);if(e&&r!=r){while(l>u)if(s=c[u++],s!=s)return!0}else for(;l>u;u++)if((e||u in c)&&c[u]===r)return e||u||0;return!e&&-1}};e.exports={includes:i(!0),indexOf:i(!1)}},2402:function(e,t){t.f=Object.getOwnPropertySymbols},"332c":function(e,t,r){var n=r("4cdd"),o=r("1d8a"),a=n("keys");e.exports=function(e){return a[e]||(a[e]=o(e))}},"378c":function(e,t,r){var n=r("83a6"),o=r("730c");e.exports=function(e){return n(o(e))}},"3e34":function(e,t,r){var n=r("f498"),o=r("5b12");e.exports=function(e,t){try{o(n,e,t)}catch(r){n[e]=t}return t}},"3e36":function(e,t,r){var n=r("f498");e.exports=n},"4cdd":function(e,t,r){var n=r("0e93"),o=r("c607");(e.exports=function(e,t){return o[e]||(o[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:n?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},5428:function(e,t,r){var n=r("3e36"),o=r("f498"),a=function(e){return"function"==typeof e?e:void 0};e.exports=function(e,t){return arguments.length<2?a(n[e])||a(o[e]):n[e]&&n[e][t]||o[e]&&o[e][t]}},"5b12":function(e,t,r){var n=r("d4cb"),o=r("abdf"),a=r("9618");e.exports=n?function(e,t,r){return o.f(e,t,a(1,r))}:function(e,t,r){return e[t]=r,e}},"65d0":function(e,t,r){var n=r("c91c"),o=r("b17e"),a=o.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,a)}},"6a61":function(e,t){var r={}.toString;e.exports=function(e){return r.call(e).slice(8,-1)}},"6b1d":function(e,t,r){var n=r("f498"),o=r("185a").f,a=r("5b12"),i=r("b8ba"),s=r("3e34"),c=r("b634"),l=r("ebac");e.exports=function(e,t){var r,u,f,p,v,d,m=e.target,b=e.global,h=e.stat;if(u=b?n:h?n[m]||s(m,{}):(n[m]||{}).prototype,u)for(f in t){if(v=t[f],e.noTargetGet?(d=o(u,f),p=d&&d.value):p=u[f],r=l(b?f:m+(h?".":"#")+f,e.forced),!r&&void 0!==p){if(typeof v===typeof p)continue;c(v,p)}(e.sham||p&&p.sham)&&a(v,"sham",!0),i(u,f,v,e)}}},7297:function(e,t,r){var n=r("f498"),o=r("df6f"),a=n.WeakMap;e.exports="function"===typeof a&&/native code/.test(o(a))},"72df":function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},"730c":function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on "+e);return e}},7526:function(e,t){e.exports=function(e){return"object"===typeof e?null!==e:"function"===typeof e}},"75a4":function(e,t,r){var n=r("6b1d"),o=r("72df"),a=r("378c"),i=r("185a").f,s=r("d4cb"),c=o((function(){i(1)})),l=!s||c;n({target:"Object",stat:!0,forced:l,sham:!s},{getOwnPropertyDescriptor:function(e,t){return i(a(e),t)}})},"7c3f":function(e,t,r){var n=r("d4cb"),o=r("72df"),a=r("f2bf");e.exports=!n&&!o((function(){return 7!=Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a}))},"83a6":function(e,t,r){var n=r("72df"),o=r("6a61"),a="".split;e.exports=n((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==o(e)?a.call(e,""):Object(e)}:Object},"8bb2":function(e,t){var r=Math.ceil,n=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?n:r)(e)}},9618:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},"9a0f":function(e,t,r){var n=r("8bb2"),o=Math.max,a=Math.min;e.exports=function(e,t){var r=n(e);return r<0?o(r+t,0):a(r,t)}},a03e:function(e,t,r){var n=r("5428"),o=r("65d0"),a=r("2402"),i=r("157c");e.exports=n("Reflect","ownKeys")||function(e){var t=o.f(i(e)),r=a.f;return r?t.concat(r(e)):t}},aab8:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"vmark"},[r("h1",[e._v("Text Field")]),e._m(0),e._m(1),e._m(2),r("h2",[e._v("Basic example")]),r("Playground",{attrs:{childElementLayout:{spacing:"block"}},scopedSlots:e._u([{key:"configurator",fn:function(){return[r("select",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"label"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.label=t.target.multiple?r:r[0]}}},[r("option",{attrs:{disabled:""}},[e._v("Select a label mode")]),r("option",{attrs:{selected:"",value:"show"}},[e._v("With label")]),r("option",{attrs:{value:"hide"}},[e._v("Without label")]),r("option",{attrs:{value:"responsive"}},[e._v("Responsive")])])]},proxy:!0}])},[[r("p-text-field-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[r("input",{attrs:{type:"text",name:"some-name"}})]),r("p-text-field-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[r("input",{attrs:{type:"text",placeholder:"Some placeholder text",name:"some-name"}})])]],2),r("hr"),r("h2",[e._v("With description text")]),e._m(3),r("Playground",[r("p-text-field-wrapper",{attrs:{label:"Some label",description:"Some description"}},[r("input",{attrs:{type:"text",name:"some-name"}})])],1),r("hr"),r("h2",[e._v("Disabled")]),r("Playground",[r("p-text-field-wrapper",{attrs:{label:"Some label"}},[r("input",{attrs:{type:"text",name:"some-name",value:"Some value",disabled:""}})])],1),r("hr"),r("h2",[e._v("Read only")]),r("Playground",[r("p-text-field-wrapper",{attrs:{label:"Some label"}},[r("input",{attrs:{type:"text",name:"some-name",value:"Some value",readonly:""}})])],1),r("hr"),r("h2",[e._v("Types")]),e._m(4),r("h3",[e._v("Basic")]),r("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[r("select",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.type=t.target.multiple?r:r[0]}}},[r("option",{attrs:{disabled:""}},[e._v("Select a type")]),r("option",{attrs:{value:"text"}},[e._v("Text")]),r("option",{attrs:{value:"number"}},[e._v("Number")]),r("option",{attrs:{value:"email"}},[e._v("Email")]),r("option",{attrs:{value:"tel"}},[e._v("Tel")]),r("option",{attrs:{value:"search"}},[e._v("Search")]),r("option",{attrs:{value:"url"}},[e._v("Url")]),r("option",{attrs:{value:"date"}},[e._v("Date")]),r("option",{attrs:{value:"time"}},[e._v("Time")]),r("option",{attrs:{value:"month"}},[e._v("Month")]),r("option",{attrs:{value:"week"}},[e._v("Week")])])]},proxy:!0}])},[[r("p-text-field-wrapper",{attrs:{label:"Some label"}},[r("input",{attrs:{type:e.type,name:"some-name"}})])]],2),r("h3",[e._v("Password")]),r("Playground",[r("p-text-field-wrapper",{attrs:{label:"Some label"}},[r("input",{attrs:{type:"password",name:"some-name",value:"some password"}})])],1),r("h3",[e._v("Search")]),r("Playground",[r("form",{attrs:{action:"#",onsubmit:"alert('submit'); return false;"}},[r("p-text-field-wrapper",{attrs:{label:"Some label"}},[r("input",{attrs:{type:"search",name:"some-name"}})])],1)]),r("hr"),r("h2",[e._v("Validation states")]),e._m(5),r("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[r("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?r:r[0]}}},[r("option",{attrs:{disabled:""}},[e._v("Select a validation state")]),r("option",{attrs:{value:"error"}},[e._v("Error")]),r("option",{attrs:{value:"success"}},[e._v("Success")]),r("option",{attrs:{value:"none"}},[e._v("None")])])]},proxy:!0}])},[[r("p-text-field-wrapper",{attrs:{label:"Some label",state:e.state,message:"none"!==e.state?"Some "+e.state+" validation message.":""}},[r("input",{attrs:{type:"text",name:"some-name"}})])]],2),r("hr"),r("h2",[e._v("Slots")]),e._m(6),r("Playground",[[r("p-text-field-wrapper",{attrs:{state:"error"}},[r("span",{attrs:{slot:"label",id:"some-label-id"},slot:"label"},[e._v("Some label with a "),r("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),r("span",{attrs:{slot:"description"},slot:"description"},[e._v("Some description with a "),r("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),r("input",{attrs:{type:"text",name:"some-name","aria-labelledby":"some-label-id","aria-describedby":"some-message-id"}}),r("span",{attrs:{slot:"message",id:"some-message-id"},slot:"message"},[e._v("Some error message with a "),r("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")])])]],2)],1)},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("The "),r("strong",[e._v("Text Field")]),e._v(" component is a styling wrapper for the native HTML input types and is essential for mostly any form.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("A "),r("code",[e._v("label")]),e._v(" is a caption which informs the user what information a particular form field is asking for. The "),r("strong",[e._v("Text Field Wrapper")]),e._v(" component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("While a "),r("code",[e._v("placeholder")]),e._v(" is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement of the label text and is technically connected with the "),r("code",[e._v("hide-label")]),e._v(" property.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("The following types listed in the configurator below are supported. Browser specific UI helpers (e.g. calendar dropdown in Chrome) may occur inside the input field which are explicitly not reset by the "),r("strong",[e._v("Text Field Wrapper")]),e._v(" component. For better accessibility it's recommended to "),r("strong",[e._v("not")]),e._v(" reset these browser default UI helpers.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("The "),r("strong",[e._v("Text Field Wrapper")]),e._v(" component supports the visualisation of inline validation. The "),r("code",[e._v("message")]),e._v(" and "),r("code",[e._v("input")]),e._v(" is colored and visible/hidden depending on the defined "),r("code",[e._v("state")]),e._v(".")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("Sometimes it's useful to be able to render markup (e.g. an anchor tag) for "),r("code",[e._v("label")]),e._v(", "),r("code",[e._v("description")]),e._v(" or "),r("code",[e._v("message")]),e._v(". Therefore a named slot can be used. Make sure "),r("strong",[e._v("not")]),e._v(" to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot). For named slots only "),r("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content"}},[e._v("phrasing content")]),e._v(" is allowed. Please make sure to set the corresponding "),r("strong",[e._v("aria")]),e._v(" attributes.")])}],a=(r("75a4"),r("d4ec")),i=r("262e"),s=r("2caf"),c=r("53ca"),l=r("2b0e"),u=r("2fe1"),f=function(e,t,r,n){var o,a=arguments.length,i=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(a<3?o(i):a>3?o(t,r,i):o(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i},p=function(e){Object(i["a"])(r,e);var t=Object(s["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.label="show",e.type="text",e.state="error",e}return r}(l["a"]);p=f([u["b"]],p);var v=p,d=v,m=r("2877"),b=Object(m["a"])(d,n,o,!1,null,null,null);t["default"]=b.exports},abdf:function(e,t,r){var n=r("d4cb"),o=r("7c3f"),a=r("157c"),i=r("083f"),s=Object.defineProperty;t.f=n?s:function(e,t,r){if(a(e),t=i(t,!0),a(r),o)try{return s(e,t,r)}catch(n){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(e[t]=r.value),e}},b17e:function(e,t){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},b495:function(e,t,r){var n=r("8bb2"),o=Math.min;e.exports=function(e){return e>0?o(n(e),9007199254740991):0}},b634:function(e,t,r){var n=r("f1a7"),o=r("a03e"),a=r("185a"),i=r("abdf");e.exports=function(e,t){for(var r=o(t),s=i.f,c=a.f,l=0;l<r.length;l++){var u=r[l];n(e,u)||s(e,u,c(t,u))}}},b8ba:function(e,t,r){var n=r("f498"),o=r("5b12"),a=r("f1a7"),i=r("3e34"),s=r("df6f"),c=r("cdcd"),l=c.get,u=c.enforce,f=String(String).split("String");(e.exports=function(e,t,r,s){var c=!!s&&!!s.unsafe,l=!!s&&!!s.enumerable,p=!!s&&!!s.noTargetGet;"function"==typeof r&&("string"!=typeof t||a(r,"name")||o(r,"name",t),u(r).source=f.join("string"==typeof t?t:"")),e!==n?(c?!p&&e[t]&&(l=!0):delete e[t],l?e[t]=r:o(e,t,r)):l?e[t]=r:i(t,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&l(this).source||s(this)}))},c607:function(e,t,r){var n=r("f498"),o=r("3e34"),a="__core-js_shared__",i=n[a]||o(a,{});e.exports=i},c91c:function(e,t,r){var n=r("f1a7"),o=r("378c"),a=r("1f5e").indexOf,i=r("d687");e.exports=function(e,t){var r,s=o(e),c=0,l=[];for(r in s)!n(i,r)&&n(s,r)&&l.push(r);while(t.length>c)n(s,r=t[c++])&&(~a(l,r)||l.push(r));return l}},cdcd:function(e,t,r){var n,o,a,i=r("7297"),s=r("f498"),c=r("7526"),l=r("5b12"),u=r("f1a7"),f=r("332c"),p=r("d687"),v=s.WeakMap,d=function(e){return a(e)?o(e):n(e,{})},m=function(e){return function(t){var r;if(!c(t)||(r=o(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return r}};if(i){var b=new v,h=b.get,_=b.has,y=b.set;n=function(e,t){return y.call(b,e,t),t},o=function(e){return h.call(b,e)||{}},a=function(e){return _.call(b,e)}}else{var g=f("state");p[g]=!0,n=function(e,t){return l(e,g,t),t},o=function(e){return u(e,g)?e[g]:{}},a=function(e){return u(e,g)}}e.exports={set:n,get:o,has:a,enforce:d,getterFor:m}},d4cb:function(e,t,r){var n=r("72df");e.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},d687:function(e,t){e.exports={}},df6f:function(e,t,r){var n=r("c607"),o=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(e){return o.call(e)}),e.exports=n.inspectSource},e129:function(e,t,r){"use strict";var n={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,a=o&&!n.call({1:2},1);t.f=a?function(e){var t=o(this,e);return!!t&&t.enumerable}:n},ebac:function(e,t,r){var n=r("72df"),o=/#|\.prototype\./,a=function(e,t){var r=s[i(e)];return r==l||r!=c&&("function"==typeof t?n(t):!!t)},i=a.normalize=function(e){return String(e).replace(o,".").toLowerCase()},s=a.data={},c=a.NATIVE="N",l=a.POLYFILL="P";e.exports=a},f1a7:function(e,t){var r={}.hasOwnProperty;e.exports=function(e,t){return r.call(e,t)}},f2bf:function(e,t,r){var n=r("f498"),o=r("7526"),a=n.document,i=o(a)&&o(a.createElement);e.exports=function(e){return i?a.createElement(e):{}}},f498:function(e,t,r){(function(t){var r=function(e){return e&&e.Math==Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof t&&t)||Function("return this")()}).call(this,r("c8ba"))}}]);
//# sourceMappingURL=chunk-ae54cfc8.21cb61cc.js.map