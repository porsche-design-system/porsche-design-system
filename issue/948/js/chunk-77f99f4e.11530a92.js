(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77f99f4e"],{"189b":function(e,t,n){var r=n("72df"),o=n("7d53"),i=n("4fed"),a=o("species");e.exports=function(e){return i>=51||!r((function(){var t=[],n=t.constructor={};return n[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"37d1":function(e,t,n){var r=n("730c");e.exports=function(e){return Object(r(e))}},"4fed":function(e,t,n){var r,o,i=n("f498"),a=n("64e4"),s=i.process,c=s&&s.versions,u=c&&c.v8;u?(r=u.split("."),o=r[0]+r[1]):a&&(r=a.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/),r&&(o=r[1]))),e.exports=o&&+o},"64e4":function(e,t,n){var r=n("5428");e.exports=r("navigator","userAgent")||""},"6a86":function(e,t,n){var r=n("7526"),o=n("c6de"),i=n("7d53"),a=i("species");e.exports=function(e,t){var n;return o(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?r(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},c6de:function(e,t,n){var r=n("6a61");e.exports=Array.isArray||function(e){return"Array"==r(e)}},d86f:function(e,t,n){"use strict";var r=n("6b1d"),o=n("72df"),i=n("c6de"),a=n("7526"),s=n("37d1"),c=n("b495"),u=n("dac6"),d=n("6a86"),f=n("189b"),l=n("7d53"),p=n("4fed"),v=l("isConcatSpreadable"),h=9007199254740991,m="Maximum allowed index exceeded",b=p>=51||!o((function(){var e=[];return e[v]=!1,e.concat()[0]!==e})),_=f("concat"),g=function(e){if(!a(e))return!1;var t=e[v];return void 0!==t?!!t:i(e)},w=!b||!_;r({target:"Array",proto:!0,forced:w},{concat:function(e){var t,n,r,o,i,a=s(this),f=d(a,0),l=0;for(t=-1,r=arguments.length;t<r;t++)if(i=-1===t?a:arguments[t],g(i)){if(o=c(i.length),l+o>h)throw TypeError(m);for(n=0;n<o;n++,l++)n in i&&u(f,l,i[n])}else{if(l>=h)throw TypeError(m);u(f,l++,i)}return f.length=l,f}})},dac6:function(e,t,n){"use strict";var r=n("083f"),o=n("abdf"),i=n("9618");e.exports=function(e,t,n){var a=r(t);a in e?o.f(e,a,i(0,n)):e[a]=n}},e433:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Spinner")]),n("p",[e._v("There are unavoidable moments when the user has to wait for more than 1 second (for example due to technical processing of information or requests). These moments should be bridged with a good user feedback in order to not leave the user uncertain about what's currently happening - also to avoid a high bounce rate and to obtain a positive impression of your website or application.")]),e._m(0),n("h2",[e._v("Size")]),e._m(1),n("Playground",{attrs:{markup:e.sizeMarkup,config:e.config}},[n("select",{on:{change:function(t){e.size=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select a size")]),n("option",{attrs:{selected:""}},[e._v("small")]),n("option",[e._v("medium")]),n("option",[e._v("large")]),n("option",[e._v("inherit")])])]),n("h3",[e._v("Responsive")]),e._m(2),n("Playground",{attrs:{markup:e.responsive,config:e.config}}),n("hr"),n("h2",[e._v("Technical notes")]),n("p",[e._v("For automated visual regression tests the spinner animation can be disabled by setting a global css variable:")]),e._m(3)],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("For ongoing operations between 2-10 seconds, where the loading progress cannot be determined, use a "),n("strong",[e._v("Spinner")]),e._v(' (looped indicator) to inform the user about an ongoing operation. Use it either stand-alone (for example as page loader) or within components, such as in Buttons to indicate progress after clicking "save".')])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("There are predefined sizes for the component available which should cover most use cases. If a specific size is needed, the size can be set to "),n("code",[e._v("inherit")]),e._v(" to specify the text size from outside.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(", "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v(":root {\n  --p-animation-duration__spinner: 0s !important;\n}\n")])])}],i=(n("d86f"),n("d4ec")),a=n("bee2"),s=n("262e"),c=n("2caf"),u=n("0f9e"),d=n("2b0e"),f=n("2fe1"),l=function(e){Object(s["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(i["a"])(this,n),e=t.apply(this,arguments),e.config={themeable:!0},e.size="small",e.responsive="<p-spinner size=\"{ base: 'small', l: 'medium' }\" aria-label=\"Loading\" />",e}return Object(a["a"])(n,[{key:"sizeMarkup",get:function(){var e="inherit"===this.size?' style="width: 96px; height: 96px;"':"";return'<p-spinner size="'.concat(this.size,'"').concat(e,' aria-label="Loading" />')}}]),n}(d["a"]);l=Object(u["b"])([f["b"]],l);var p=l,v=p,h=n("2877"),m=Object(h["a"])(v,r,o,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-77f99f4e.11530a92.js.map