(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-126af9db"],{"189b":function(e,t,n){var r=n("72df"),o=n("7d53"),i=n("4fed"),a=o("species");e.exports=function(e){return i>=51||!r((function(){var t=[],n=t.constructor={};return n[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"37d1":function(e,t,n){var r=n("730c");e.exports=function(e){return Object(r(e))}},"4fed":function(e,t,n){var r,o,i=n("f498"),a=n("64e4"),c=i.process,s=c&&c.versions,f=s&&s.v8;f?(r=f.split("."),o=r[0]+r[1]):a&&(r=a.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/),r&&(o=r[1]))),e.exports=o&&+o},"64e4":function(e,t,n){var r=n("5428");e.exports=r("navigator","userAgent")||""},"6a86":function(e,t,n){var r=n("7526"),o=n("c6de"),i=n("7d53"),a=i("species");e.exports=function(e,t){var n;return o(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?r(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},"75a4":function(e,t,n){var r=n("6b1d"),o=n("72df"),i=n("378c"),a=n("185a").f,c=n("d4cb"),s=o((function(){a(1)})),f=!c||s;r({target:"Object",stat:!0,forced:f,sham:!c},{getOwnPropertyDescriptor:function(e,t){return a(i(e),t)}})},b933:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Spinner")]),n("p",[e._v("Basic animated spinner to visualize loading states, e.g. page loading, form validation, etc.")]),n("h2",[e._v("Size")]),e._m(0),n("Playground",{attrs:{markup:e.sizeMarkup,config:e.config}},[n("select",{on:{change:function(t){e.size=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select a size")]),n("option",{attrs:{selected:""}},[e._v("small")]),n("option",[e._v("medium")]),n("option",[e._v("large")]),n("option",[e._v("inherit")])])]),n("h3",[e._v("Responsive")]),e._m(1),n("Playground",{attrs:{markup:e.responsive,config:e.config}}),n("hr"),n("h2",[e._v("Technical notes")]),n("p",[e._v("For automated visual regression tests the spinner animation can be disabled by setting a global css variable:")]),e._m(2)],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("There are predefined sizes for the component available which should cover most use cases. If a specific size is needed, the size can be set to "),n("code",[e._v("inherit")]),e._v(" to specify the text size from outside.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(", "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v(":root {\n  --p-animation-duration__spinner: 0s !important;\n}\n")])])}],i=(n("d86f"),n("75a4"),n("d4ec")),a=n("bee2"),c=n("262e"),s=n("2caf"),f=n("53ca"),u=n("2b0e"),d=n("2fe1"),l=function(e,t,n,r){var o,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a},v=function(e){Object(c["a"])(n,e);var t=Object(s["a"])(n);function n(){var e;return Object(i["a"])(this,n),e=t.apply(this,arguments),e.config={themeable:!0},e.size="small",e.responsive="<p-spinner size=\"{ base: 'small', l: 'medium' }\" aria-label=\"Loading\" />",e}return Object(a["a"])(n,[{key:"sizeMarkup",get:function(){var e="inherit"===this.size?' style="width: 96px; height: 96px;"':"";return'<p-spinner size="'.concat(this.size,'"').concat(e,' aria-label="Loading" />')}}]),n}(u["a"]);v=l([d["b"]],v);var p=v,h=p,b=n("2877"),_=Object(b["a"])(h,r,o,!1,null,null,null);t["default"]=_.exports},c6de:function(e,t,n){var r=n("6a61");e.exports=Array.isArray||function(e){return"Array"==r(e)}},d86f:function(e,t,n){"use strict";var r=n("6b1d"),o=n("72df"),i=n("c6de"),a=n("7526"),c=n("37d1"),s=n("b495"),f=n("dac6"),u=n("6a86"),d=n("189b"),l=n("7d53"),v=n("4fed"),p=l("isConcatSpreadable"),h=9007199254740991,b="Maximum allowed index exceeded",_=v>=51||!o((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),m=d("concat"),g=function(e){if(!a(e))return!1;var t=e[p];return void 0!==t?!!t:i(e)},y=!_||!m;r({target:"Array",proto:!0,forced:y},{concat:function(e){var t,n,r,o,i,a=c(this),d=u(a,0),l=0;for(t=-1,r=arguments.length;t<r;t++)if(i=-1===t?a:arguments[t],g(i)){if(o=s(i.length),l+o>h)throw TypeError(b);for(n=0;n<o;n++,l++)n in i&&f(d,l,i[n])}else{if(l>=h)throw TypeError(b);f(d,l++,i)}return d.length=l,d}})},dac6:function(e,t,n){"use strict";var r=n("083f"),o=n("abdf"),i=n("9618");e.exports=function(e,t,n){var a=r(t);a in e?o.f(e,a,i(0,n)):e[a]=n}}}]);
//# sourceMappingURL=chunk-126af9db.011eb88f.js.map