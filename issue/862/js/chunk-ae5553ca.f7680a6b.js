(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae5553ca"],{"083f":function(e,t,r){var n=r("7526");e.exports=function(e,t){if(!n(e))return e;var r,o;if(t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;if("function"==typeof(r=e.valueOf)&&!n(o=r.call(e)))return o;if(!t&&"function"==typeof(r=e.toString)&&!n(o=r.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},"0e93":function(e,t){e.exports=!1},"157c":function(e,t,r){var n=r("7526");e.exports=function(e){if(!n(e))throw TypeError(String(e)+" is not an object");return e}},"185a":function(e,t,r){var n=r("d4cb"),o=r("e129"),a=r("9618"),i=r("378c"),c=r("083f"),s=r("f1a7"),u=r("7c3f"),l=Object.getOwnPropertyDescriptor;t.f=n?l:function(e,t){if(e=i(e),t=c(t,!0),u)try{return l(e,t)}catch(r){}if(s(e,t))return a(!o.f.call(e,t),e[t])}},"1d8a":function(e,t){var r=0,n=Math.random();e.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++r+n).toString(36)}},"1f5e":function(e,t,r){var n=r("378c"),o=r("b495"),a=r("9a0f"),i=function(e){return function(t,r,i){var c,s=n(t),u=o(s.length),l=a(i,u);if(e&&r!=r){while(u>l)if(c=s[l++],c!=c)return!0}else for(;u>l;l++)if((e||l in s)&&s[l]===r)return e||l||0;return!e&&-1}};e.exports={includes:i(!0),indexOf:i(!1)}},2402:function(e,t){t.f=Object.getOwnPropertySymbols},"332c":function(e,t,r){var n=r("4cdd"),o=r("1d8a"),a=n("keys");e.exports=function(e){return a[e]||(a[e]=o(e))}},"378c":function(e,t,r){var n=r("83a6"),o=r("730c");e.exports=function(e){return n(o(e))}},"3e34":function(e,t,r){var n=r("f498"),o=r("5b12");e.exports=function(e,t){try{o(n,e,t)}catch(r){n[e]=t}return t}},"3e36":function(e,t,r){var n=r("f498");e.exports=n},"4cdd":function(e,t,r){var n=r("0e93"),o=r("c607");(e.exports=function(e,t){return o[e]||(o[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:n?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},5428:function(e,t,r){var n=r("3e36"),o=r("f498"),a=function(e){return"function"==typeof e?e:void 0};e.exports=function(e,t){return arguments.length<2?a(n[e])||a(o[e]):n[e]&&n[e][t]||o[e]&&o[e][t]}},"5b12":function(e,t,r){var n=r("d4cb"),o=r("abdf"),a=r("9618");e.exports=n?function(e,t,r){return o.f(e,t,a(1,r))}:function(e,t,r){return e[t]=r,e}},"65d0":function(e,t,r){var n=r("c91c"),o=r("b17e"),a=o.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,a)}},"6a61":function(e,t){var r={}.toString;e.exports=function(e){return r.call(e).slice(8,-1)}},"6b1d":function(e,t,r){var n=r("f498"),o=r("185a").f,a=r("5b12"),i=r("b8ba"),c=r("3e34"),s=r("b634"),u=r("ebac");e.exports=function(e,t){var r,l,f,p,v,d,b=e.target,h=e.global,m=e.stat;if(l=h?n:m?n[b]||c(b,{}):(n[b]||{}).prototype,l)for(f in t){if(v=t[f],e.noTargetGet?(d=o(l,f),p=d&&d.value):p=l[f],r=u(h?f:b+(m?".":"#")+f,e.forced),!r&&void 0!==p){if(typeof v===typeof p)continue;s(v,p)}(e.sham||p&&p.sham)&&a(v,"sham",!0),i(l,f,v,e)}}},7297:function(e,t,r){var n=r("f498"),o=r("df6f"),a=n.WeakMap;e.exports="function"===typeof a&&/native code/.test(o(a))},"72df":function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},"730c":function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on "+e);return e}},7526:function(e,t){e.exports=function(e){return"object"===typeof e?null!==e:"function"===typeof e}},"75a4":function(e,t,r){var n=r("6b1d"),o=r("72df"),a=r("378c"),i=r("185a").f,c=r("d4cb"),s=o((function(){i(1)})),u=!c||s;n({target:"Object",stat:!0,forced:u,sham:!c},{getOwnPropertyDescriptor:function(e,t){return i(a(e),t)}})},"7c3f":function(e,t,r){var n=r("d4cb"),o=r("72df"),a=r("f2bf");e.exports=!n&&!o((function(){return 7!=Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a}))},"83a6":function(e,t,r){var n=r("72df"),o=r("6a61"),a="".split;e.exports=n((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==o(e)?a.call(e,""):Object(e)}:Object},"8bb2":function(e,t){var r=Math.ceil,n=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?n:r)(e)}},9618:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},"9a0f":function(e,t,r){var n=r("8bb2"),o=Math.max,a=Math.min;e.exports=function(e,t){var r=n(e);return r<0?o(r+t,0):a(r,t)}},a03e:function(e,t,r){var n=r("5428"),o=r("65d0"),a=r("2402"),i=r("157c");e.exports=n("Reflect","ownKeys")||function(e){var t=o.f(i(e)),r=a.f;return r?t.concat(r(e)):t}},abdf:function(e,t,r){var n=r("d4cb"),o=r("7c3f"),a=r("157c"),i=r("083f"),c=Object.defineProperty;t.f=n?c:function(e,t,r){if(a(e),t=i(t,!0),a(r),o)try{return c(e,t,r)}catch(n){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(e[t]=r.value),e}},b17e:function(e,t){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},b216:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"vmark"},[r("h1",[e._v("Textarea")]),e._m(0),e._m(1),e._m(2),r("h2",[e._v("Basic example")]),r("Playground",{attrs:{childElementLayout:{spacing:"block"}},scopedSlots:e._u([{key:"configurator",fn:function(){return[r("select",{directives:[{name:"model",rawName:"v-model",value:e.label,expression:"label"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.label=t.target.multiple?r:r[0]}}},[r("option",{attrs:{disabled:""}},[e._v("Select a label mode")]),r("option",{attrs:{selected:"",value:"show"}},[e._v("With label")]),r("option",{attrs:{value:"hide"}},[e._v("Without label")]),r("option",{attrs:{value:"responsive"}},[e._v("Responsive")])])]},proxy:!0}])},[[r("p-textarea-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[r("textarea",{attrs:{name:"some-name"}})]),r("p-textarea-wrapper",{attrs:{label:"Some label","hide-label":"hide"===e.label?"true":"responsive"===e.label?"{ base: true, l: false }":"false"}},[r("textarea",{attrs:{name:"some-name",placeholder:"Some placeholder text"}})])]],2),r("hr"),r("h2",[e._v("With description text")]),e._m(3),r("Playground",[r("p-textarea-wrapper",{attrs:{label:"Some label",description:"Some description"}},[r("textarea",{attrs:{name:"some-name"}})])],1),r("hr"),r("h2",[e._v("Disabled")]),r("Playground",[r("p-textarea-wrapper",{attrs:{label:"Some label"}},[r("textarea",{attrs:{name:"some-name",disabled:""}},[e._v("Some value")])])],1),r("hr"),r("h2",[e._v("Read only")]),r("Playground",[r("p-textarea-wrapper",{attrs:{label:"Some label"}},[r("textarea",{attrs:{name:"some-name",readonly:""}},[e._v("Some value")])])],1),r("hr"),r("h2",[e._v("Validation states")]),e._m(4),r("Playground",{scopedSlots:e._u([{key:"configurator",fn:function(){return[r("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?r:r[0]}}},[r("option",{attrs:{disabled:""}},[e._v("Select a validation state")]),r("option",{attrs:{value:"error"}},[e._v("Error")]),r("option",{attrs:{value:"success"}},[e._v("Success")]),r("option",{attrs:{value:"none"}},[e._v("None")])])]},proxy:!0}])},[[r("p-textarea-wrapper",{attrs:{label:"Some label",state:e.state,message:"none"!==e.state?"Some "+e.state+" validation message.":""}},[r("textarea",{attrs:{"aria-invalid":"error"===e.state,name:"some-name"}},[e._v("Some value")])])]],2),r("hr"),r("h2",[e._v("Slots")]),e._m(5),r("Playground",[[r("p-textarea-wrapper",{attrs:{state:"error"}},[r("span",{attrs:{slot:"label",id:"some-label-id"},slot:"label"},[e._v("Some label with a "),r("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),r("span",{attrs:{slot:"description"},slot:"description"},[e._v("Some description with a "),r("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")]),r("textarea",{attrs:{name:"some-name","aria-labelledby":"some-label-id","aria-describedby":"some-message-id"}}),r("span",{attrs:{slot:"message",id:"some-message-id"},slot:"message"},[e._v("Some error message with a "),r("a",{attrs:{href:"https://designsystem.porsche.com"}},[e._v("link")]),e._v(".")])])]],2)],1)},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("The "),r("strong",[e._v("Textarea Wrapper")]),e._v(" component is a styling wrapper for the native HTML "),r("code",[e._v("<textarea>")]),e._v(" form element.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("A "),r("code",[e._v("label")]),e._v(" is a caption which informs the user what information a particular form field is asking for. The "),r("strong",[e._v("Textarea Wrapper")]),e._v(" component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("While a "),r("code",[e._v("placeholder")]),e._v(" is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement of the label text and is technically connected with the "),r("code",[e._v("hide-label")]),e._v(" property.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("The "),r("strong",[e._v("Textarea Wrapper")]),e._v(" component supports the visualisation of inline validation.")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("Sometimes it's useful to be able to render markup (e.g. an anchor tag) for "),r("code",[e._v("label")]),e._v(" or "),r("code",[e._v("message")]),e._v(". Therefore a named slot can be used. Make sure "),r("strong",[e._v("not")]),e._v(" to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot). For named slots only "),r("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content"}},[e._v("phrasing content")]),e._v(" is allowed. Please make sure to set the corresponding "),r("strong",[e._v("aria")]),e._v(" attributes.")])}],a=(r("75a4"),r("d4ec")),i=r("262e"),c=r("2caf"),s=r("53ca"),u=r("2b0e"),l=r("2fe1"),f=function(e,t,r,n){var o,a=arguments.length,i=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(s["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(i=(a<3?o(i):a>3?o(t,r,i):o(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i},p=function(e){Object(i["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.label="show",e.state="error",e}return r}(u["a"]);p=f([l["b"]],p);var v=p,d=v,b=r("2877"),h=Object(b["a"])(d,n,o,!1,null,null,null);t["default"]=h.exports},b495:function(e,t,r){var n=r("8bb2"),o=Math.min;e.exports=function(e){return e>0?o(n(e),9007199254740991):0}},b634:function(e,t,r){var n=r("f1a7"),o=r("a03e"),a=r("185a"),i=r("abdf");e.exports=function(e,t){for(var r=o(t),c=i.f,s=a.f,u=0;u<r.length;u++){var l=r[u];n(e,l)||c(e,l,s(t,l))}}},b8ba:function(e,t,r){var n=r("f498"),o=r("5b12"),a=r("f1a7"),i=r("3e34"),c=r("df6f"),s=r("cdcd"),u=s.get,l=s.enforce,f=String(String).split("String");(e.exports=function(e,t,r,c){var s=!!c&&!!c.unsafe,u=!!c&&!!c.enumerable,p=!!c&&!!c.noTargetGet;"function"==typeof r&&("string"!=typeof t||a(r,"name")||o(r,"name",t),l(r).source=f.join("string"==typeof t?t:"")),e!==n?(s?!p&&e[t]&&(u=!0):delete e[t],u?e[t]=r:o(e,t,r)):u?e[t]=r:i(t,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||c(this)}))},c607:function(e,t,r){var n=r("f498"),o=r("3e34"),a="__core-js_shared__",i=n[a]||o(a,{});e.exports=i},c91c:function(e,t,r){var n=r("f1a7"),o=r("378c"),a=r("1f5e").indexOf,i=r("d687");e.exports=function(e,t){var r,c=o(e),s=0,u=[];for(r in c)!n(i,r)&&n(c,r)&&u.push(r);while(t.length>s)n(c,r=t[s++])&&(~a(u,r)||u.push(r));return u}},cdcd:function(e,t,r){var n,o,a,i=r("7297"),c=r("f498"),s=r("7526"),u=r("5b12"),l=r("f1a7"),f=r("332c"),p=r("d687"),v=c.WeakMap,d=function(e){return a(e)?o(e):n(e,{})},b=function(e){return function(t){var r;if(!s(t)||(r=o(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return r}};if(i){var h=new v,m=h.get,_=h.has,g=h.set;n=function(e,t){return g.call(h,e,t),t},o=function(e){return m.call(h,e)||{}},a=function(e){return _.call(h,e)}}else{var y=f("state");p[y]=!0,n=function(e,t){return u(e,y,t),t},o=function(e){return l(e,y)?e[y]:{}},a=function(e){return l(e,y)}}e.exports={set:n,get:o,has:a,enforce:d,getterFor:b}},d4cb:function(e,t,r){var n=r("72df");e.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},d687:function(e,t){e.exports={}},df6f:function(e,t,r){var n=r("c607"),o=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(e){return o.call(e)}),e.exports=n.inspectSource},e129:function(e,t,r){"use strict";var n={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,a=o&&!n.call({1:2},1);t.f=a?function(e){var t=o(this,e);return!!t&&t.enumerable}:n},ebac:function(e,t,r){var n=r("72df"),o=/#|\.prototype\./,a=function(e,t){var r=c[i(e)];return r==u||r!=s&&("function"==typeof t?n(t):!!t)},i=a.normalize=function(e){return String(e).replace(o,".").toLowerCase()},c=a.data={},s=a.NATIVE="N",u=a.POLYFILL="P";e.exports=a},f1a7:function(e,t){var r={}.hasOwnProperty;e.exports=function(e,t){return r.call(e,t)}},f2bf:function(e,t,r){var n=r("f498"),o=r("7526"),a=n.document,i=o(a)&&o(a.createElement);e.exports=function(e){return i?a.createElement(e):{}}},f498:function(e,t,r){(function(t){var r=function(e){return e&&e.Math==Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof t&&t)||Function("return this")()}).call(this,r("c8ba"))}}]);
//# sourceMappingURL=chunk-ae5553ca.f7680a6b.js.map