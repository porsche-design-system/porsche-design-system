(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ace0525"],{"083f":function(t,e,n){var r=n("7526");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"0e93":function(t,e){t.exports=!1},"157c":function(t,e,n){var r=n("7526");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},"185a":function(t,e,n){var r=n("d4cb"),o=n("e129"),a=n("9618"),i=n("378c"),c=n("083f"),u=n("f1a7"),f=n("7c3f"),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=i(t),e=c(e,!0),f)try{return l(t,e)}catch(n){}if(u(t,e))return a(!o.f.call(t,e),t[e])}},"189b":function(t,e,n){var r=n("72df"),o=n("7d53"),a=n("4fed"),i=o("species");t.exports=function(t){return a>=51||!r((function(){var e=[],n=e.constructor={};return n[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"1d8a":function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},"1f5e":function(t,e,n){var r=n("378c"),o=n("b495"),a=n("9a0f"),i=function(t){return function(e,n,i){var c,u=r(e),f=o(u.length),l=a(i,f);if(t&&n!=n){while(f>l)if(c=u[l++],c!=c)return!0}else for(;f>l;l++)if((t||l in u)&&u[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:i(!0),indexOf:i(!1)}},2402:function(t,e){e.f=Object.getOwnPropertySymbols},"254e":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vmark"},[n("h1",[t._v("Typography")]),n("h2",[t._v("Headline")]),t._m(0),n("h2",[t._v("Variant")]),t._m(1),n("Playground",{attrs:{markup:t.variant,config:t.config}}),n("hr"),n("h2",[t._v("Custom tag hierarchy")]),t._m(2),n("Playground",{attrs:{markup:t.customTagHierarchy,config:t.config}}),n("hr"),n("h2",[t._v("Color")]),n("p",[t._v("A predefined default color associated with its theme is available but also inherit mode can be used to define a custom color.")]),n("Playground",{attrs:{markup:t.colorMarkup,config:t.config},scopedSlots:t._u([{key:"configurator",fn:function(){return[n("select",{on:{change:function(e){t.color=e.target.value}}},[n("option",{attrs:{disabled:""}},[t._v("Select a color")]),n("option",{attrs:{value:"default",selected:""}},[t._v("Default")]),n("option",{attrs:{value:"inherit"}},[t._v("Inherit")])])]},proxy:!0}])}),n("hr"),n("h2",[t._v("Alignment")]),n("Playground",{attrs:{markup:t.alignment,config:t.config},scopedSlots:t._u([{key:"configurator",fn:function(){return[n("select",{on:{change:function(e){t.align=e.target.value}}},[n("option",{attrs:{disabled:""}},[t._v("Select an alignment")]),n("option",{attrs:{value:"left"}},[t._v("Left")]),n("option",{attrs:{value:"center",selected:""}},[t._v("Center")]),n("option",{attrs:{value:"right"}},[t._v("Right")])])]},proxy:!0}])}),n("hr"),n("h2",[t._v("Ellipsis mode")]),n("p",[t._v("This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the end are used to visualize it.")]),n("Playground",{attrs:{markup:t.ellipsisMode,config:t.config}})],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("strong",[t._v("Headline component")]),t._v(" for predefined headlines with automated responsive sizing to fit into all major breakpoints.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("There are multiple predefined styling variants available. Default semantic tag hierarchy equals to headline type (e.g. "),n("code",[t._v("headline-1")]),t._v(" or "),n("code",[t._v("large-title")]),t._v(" is compiled to "),n("code",[t._v("<h1>")]),t._v(" and "),n("code",[t._v("headline-3")]),t._v(" is compiled to "),n("code",[t._v("<h3>")]),t._v(").")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("If a custom tag hierarchy is needed, individual headline tags can be set from "),n("code",[t._v("h1")]),t._v(" to "),n("code",[t._v("h6")]),t._v(" either by referencing the corresponding "),n("code",[t._v("tag")]),t._v(" property or setting the HTML headline tags directly as slots.")])}],a=(n("d86f"),n("d4ec")),i=n("bee2"),c=n("262e"),u=n("2caf"),f=n("0f9e"),l=n("2b0e"),s=n("2fe1"),p="The quick brown fox jumps over the lazy dog",d=function(t){Object(c["a"])(n,t);var e=Object(u["a"])(n);function n(){var t;return Object(a["a"])(this,n),t=e.apply(this,arguments),t.config={themeable:!0},t.color="default",t.align="center",t.variant='<p-headline variant="large-title">'.concat(p,'</p-headline>\n<p-headline variant="headline-1">').concat(p,'</p-headline>\n<p-headline variant="headline-2">').concat(p,'</p-headline>\n<p-headline variant="headline-3">').concat(p,'</p-headline>\n<p-headline variant="headline-4">').concat(p,'</p-headline>\n<p-headline variant="headline-5">').concat(p,"</p-headline>"),t.customTagHierarchy='<p-headline variant="headline-1" tag="h3">'.concat(p,'</p-headline>\n<p-headline variant="headline-3" tag="h1">').concat(p,'</p-headline>\n<p-headline variant="headline-1">\n  <h3>').concat(p,'</h3>\n</p-headline>\n<p-headline variant="headline-3">\n  <h1>').concat(p,"</h1>\n</p-headline>"),t.ellipsisMode='<p-headline variant="headline-3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>',t}return Object(i["a"])(n,[{key:"colorMarkup",get:function(){var t="inherit"===this.color?' style="color: deeppink;"':"";return'<p-headline variant="headline-3" color="'.concat(this.color,'"').concat(t,">").concat(p,"</p-headline>")}},{key:"alignment",get:function(){return'<p-headline variant="headline-3" align="'.concat(this.align,'">').concat(p,"</p-headline>")}}]),n}(l["a"]);d=Object(f["b"])([s["b"]],d);var v=d,h=v,g=n("2877"),b=Object(g["a"])(h,r,o,!1,null,null,null);e["default"]=b.exports},"332c":function(t,e,n){var r=n("4cdd"),o=n("1d8a"),a=r("keys");t.exports=function(t){return a[t]||(a[t]=o(t))}},"378c":function(t,e,n){var r=n("83a6"),o=n("730c");t.exports=function(t){return r(o(t))}},"37d1":function(t,e,n){var r=n("730c");t.exports=function(t){return Object(r(t))}},"3e34":function(t,e,n){var r=n("f498"),o=n("5b12");t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},"3e36":function(t,e,n){var r=n("f498");t.exports=r},"4cdd":function(t,e,n){var r=n("0e93"),o=n("c607");(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:r?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},"4db4":function(t,e,n){var r=n("e7a0");t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},"4fed":function(t,e,n){var r,o,a=n("f498"),i=n("64e4"),c=a.process,u=c&&c.versions,f=u&&u.v8;f?(r=f.split("."),o=r[0]+r[1]):i&&(r=i.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=i.match(/Chrome\/(\d+)/),r&&(o=r[1]))),t.exports=o&&+o},5428:function(t,e,n){var r=n("3e36"),o=n("f498"),a=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?a(r[t])||a(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},"5b12":function(t,e,n){var r=n("d4cb"),o=n("abdf"),a=n("9618");t.exports=r?function(t,e,n){return o.f(t,e,a(1,n))}:function(t,e,n){return t[e]=n,t}},"64e4":function(t,e,n){var r=n("5428");t.exports=r("navigator","userAgent")||""},"65d0":function(t,e,n){var r=n("c91c"),o=n("b17e"),a=o.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,a)}},"6a61":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"6a86":function(t,e,n){var r=n("7526"),o=n("c6de"),a=n("7d53"),i=a("species");t.exports=function(t,e){var n;return o(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?r(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"6b1d":function(t,e,n){var r=n("f498"),o=n("185a").f,a=n("5b12"),i=n("b8ba"),c=n("3e34"),u=n("b634"),f=n("ebac");t.exports=function(t,e){var n,l,s,p,d,v,h=t.target,g=t.global,b=t.stat;if(l=g?r:b?r[h]||c(h,{}):(r[h]||{}).prototype,l)for(s in e){if(d=e[s],t.noTargetGet?(v=o(l,s),p=v&&v.value):p=l[s],n=f(g?s:h+(b?".":"#")+s,t.forced),!n&&void 0!==p){if(typeof d===typeof p)continue;u(d,p)}(t.sham||p&&p.sham)&&a(d,"sham",!0),i(l,s,d,t)}}},7297:function(t,e,n){var r=n("f498"),o=n("df6f"),a=r.WeakMap;t.exports="function"===typeof a&&/native code/.test(o(a))},"72df":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"730c":function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t}},7526:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},"7c3f":function(t,e,n){var r=n("d4cb"),o=n("72df"),a=n("f2bf");t.exports=!r&&!o((function(){return 7!=Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a}))},"7d53":function(t,e,n){var r=n("f498"),o=n("4cdd"),a=n("f1a7"),i=n("1d8a"),c=n("e7a0"),u=n("4db4"),f=o("wks"),l=r.Symbol,s=u?l:l&&l.withoutSetter||i;t.exports=function(t){return a(f,t)||(c&&a(l,t)?f[t]=l[t]:f[t]=s("Symbol."+t)),f[t]}},"83a6":function(t,e,n){var r=n("72df"),o=n("6a61"),a="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?a.call(t,""):Object(t)}:Object},"8bb2":function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},9618:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"9a0f":function(t,e,n){var r=n("8bb2"),o=Math.max,a=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):a(n,e)}},a03e:function(t,e,n){var r=n("5428"),o=n("65d0"),a=n("2402"),i=n("157c");t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(i(t)),n=a.f;return n?e.concat(n(t)):e}},abdf:function(t,e,n){var r=n("d4cb"),o=n("7c3f"),a=n("157c"),i=n("083f"),c=Object.defineProperty;e.f=r?c:function(t,e,n){if(a(t),e=i(e,!0),a(n),o)try{return c(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},b17e:function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},b495:function(t,e,n){var r=n("8bb2"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},b634:function(t,e,n){var r=n("f1a7"),o=n("a03e"),a=n("185a"),i=n("abdf");t.exports=function(t,e){for(var n=o(e),c=i.f,u=a.f,f=0;f<n.length;f++){var l=n[f];r(t,l)||c(t,l,u(e,l))}}},b8ba:function(t,e,n){var r=n("f498"),o=n("5b12"),a=n("f1a7"),i=n("3e34"),c=n("df6f"),u=n("cdcd"),f=u.get,l=u.enforce,s=String(String).split("String");(t.exports=function(t,e,n,c){var u=!!c&&!!c.unsafe,f=!!c&&!!c.enumerable,p=!!c&&!!c.noTargetGet;"function"==typeof n&&("string"!=typeof e||a(n,"name")||o(n,"name",e),l(n).source=s.join("string"==typeof e?e:"")),t!==r?(u?!p&&t[e]&&(f=!0):delete t[e],f?t[e]=n:o(t,e,n)):f?t[e]=n:i(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&f(this).source||c(this)}))},c607:function(t,e,n){var r=n("f498"),o=n("3e34"),a="__core-js_shared__",i=r[a]||o(a,{});t.exports=i},c6de:function(t,e,n){var r=n("6a61");t.exports=Array.isArray||function(t){return"Array"==r(t)}},c91c:function(t,e,n){var r=n("f1a7"),o=n("378c"),a=n("1f5e").indexOf,i=n("d687");t.exports=function(t,e){var n,c=o(t),u=0,f=[];for(n in c)!r(i,n)&&r(c,n)&&f.push(n);while(e.length>u)r(c,n=e[u++])&&(~a(f,n)||f.push(n));return f}},cdcd:function(t,e,n){var r,o,a,i=n("7297"),c=n("f498"),u=n("7526"),f=n("5b12"),l=n("f1a7"),s=n("332c"),p=n("d687"),d=c.WeakMap,v=function(t){return a(t)?o(t):r(t,{})},h=function(t){return function(e){var n;if(!u(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}};if(i){var g=new d,b=g.get,y=g.has,m=g.set;r=function(t,e){return m.call(g,t,e),e},o=function(t){return b.call(g,t)||{}},a=function(t){return y.call(g,t)}}else{var x=s("state");p[x]=!0,r=function(t,e){return f(t,x,e),e},o=function(t){return l(t,x)?t[x]:{}},a=function(t){return l(t,x)}}t.exports={set:r,get:o,has:a,enforce:v,getterFor:h}},d4cb:function(t,e,n){var r=n("72df");t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},d687:function(t,e){t.exports={}},d86f:function(t,e,n){"use strict";var r=n("6b1d"),o=n("72df"),a=n("c6de"),i=n("7526"),c=n("37d1"),u=n("b495"),f=n("dac6"),l=n("6a86"),s=n("189b"),p=n("7d53"),d=n("4fed"),v=p("isConcatSpreadable"),h=9007199254740991,g="Maximum allowed index exceeded",b=d>=51||!o((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),y=s("concat"),m=function(t){if(!i(t))return!1;var e=t[v];return void 0!==e?!!e:a(t)},x=!b||!y;r({target:"Array",proto:!0,forced:x},{concat:function(t){var e,n,r,o,a,i=c(this),s=l(i,0),p=0;for(e=-1,r=arguments.length;e<r;e++)if(a=-1===e?i:arguments[e],m(a)){if(o=u(a.length),p+o>h)throw TypeError(g);for(n=0;n<o;n++,p++)n in a&&f(s,p,a[n])}else{if(p>=h)throw TypeError(g);f(s,p++,a)}return s.length=p,s}})},dac6:function(t,e,n){"use strict";var r=n("083f"),o=n("abdf"),a=n("9618");t.exports=function(t,e,n){var i=r(e);i in t?o.f(t,i,a(0,n)):t[i]=n}},df6f:function(t,e,n){var r=n("c607"),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},e129:function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,a=o&&!r.call({1:2},1);e.f=a?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},e7a0:function(t,e,n){var r=n("72df");t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},ebac:function(t,e,n){var r=n("72df"),o=/#|\.prototype\./,a=function(t,e){var n=c[i(t)];return n==f||n!=u&&("function"==typeof e?r(e):!!e)},i=a.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=a.data={},u=a.NATIVE="N",f=a.POLYFILL="P";t.exports=a},f1a7:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},f2bf:function(t,e,n){var r=n("f498"),o=n("7526"),a=r.document,i=o(a)&&o(a.createElement);t.exports=function(t){return i?a.createElement(t):{}}},f498:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n("c8ba"))}}]);
//# sourceMappingURL=chunk-5ace0525.aaba3ebb.js.map