(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-125799ad"],{"189b":function(t,e,n){var o=n("72df"),r=n("7d53"),a=n("4fed"),i=r("species");t.exports=function(t){return a>=51||!o((function(){var e=[],n=e.constructor={};return n[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"37d1":function(t,e,n){var o=n("730c");t.exports=function(t){return Object(o(t))}},"4fed":function(t,e,n){var o,r,a=n("f498"),i=n("64e4"),c=a.process,s=c&&c.versions,l=s&&s.v8;l?(o=l.split("."),r=o[0]+o[1]):i&&(o=i.match(/Edge\/(\d+)/),(!o||o[1]>=74)&&(o=i.match(/Chrome\/(\d+)/),o&&(r=o[1]))),t.exports=r&&+r},"64e4":function(t,e,n){var o=n("5428");t.exports=o("navigator","userAgent")||""},"6a86":function(t,e,n){var o=n("7526"),r=n("c6de"),a=n("7d53"),i=a("species");t.exports=function(t,e){var n;return r(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!r(n.prototype)?o(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"6beb":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vmark"},[n("h1",[t._v("Typography")]),n("h2",[t._v("Text")]),t._m(0),n("h2",[t._v("Default")]),t._m(1),n("Playground",{attrs:{markup:t.basic,config:t.config}}),n("hr"),n("h2",[t._v("Size")]),t._m(2),t._m(3),n("Playground",{attrs:{markup:t.sizeMarkup,config:t.config}},[n("select",{on:{change:function(e){t.size=e.target.value}}},[n("option",{attrs:{disabled:""}},[t._v("Select a size")]),n("option",[t._v("x-small")]),n("option",[t._v("small")]),n("option",{attrs:{selected:""}},[t._v("medium")]),n("option",[t._v("large")]),n("option",[t._v("x-large")]),n("option",[t._v("inherit")])])]),n("h3",[t._v("Responsive")]),t._m(4),n("Playground",{attrs:{markup:t.responsive,config:t.config}}),n("hr"),n("h2",[t._v("Semantics")]),t._m(5),n("Playground",{attrs:{markup:t.semantics,config:t.config}}),n("hr"),n("h2",[t._v("Color")]),n("p",[t._v("Predefined colors associated with its theme are available but also inherit mode can be used to define a custom color.")]),n("Playground",{attrs:{markup:t.colorMarkup,config:t.config}},[n("select",{on:{change:function(e){t.color=e.target.value}}},[n("option",{attrs:{disabled:""}},[t._v("Select a color")]),n("option",{attrs:{value:"brand"}},[t._v("Brand")]),n("option",{attrs:{value:"default",selected:""}},[t._v("Default")]),n("option",{attrs:{value:"neutral-contrast-high"}},[t._v("Neutral Contrast High")]),n("option",{attrs:{value:"neutral-contrast-medium"}},[t._v("Neutral Contrast Medium")]),n("option",{attrs:{value:"neutral-contrast-low"}},[t._v("Neutral Contrast Low")]),n("option",{attrs:{value:"notification-success"}},[t._v("Notification Success")]),n("option",{attrs:{value:"notification-warning"}},[t._v("Notification Warning")]),n("option",{attrs:{value:"notification-error"}},[t._v("Notification Error")]),n("option",{attrs:{value:"notification-neutral"}},[t._v("Notification Neutral")]),n("option",{attrs:{value:"inherit"}},[t._v("Inherit")])])]),n("hr"),n("h2",[t._v("Weight")]),t._m(6),n("Playground",{attrs:{markup:t.weightMarkup,config:t.config}},[n("select",{on:{change:function(e){t.weight=e.target.value}}},[n("option",{attrs:{disabled:""}},[t._v("Select a weight")]),n("option",{attrs:{value:"thin",selected:""}},[t._v("Thin")]),n("option",{attrs:{value:"regular"}},[t._v("Regular")]),n("option",{attrs:{value:"bold"}},[t._v("Bold")])])]),n("hr"),n("h2",[t._v("Alignment")]),n("Playground",{attrs:{markup:t.alignment,config:t.config}},[n("select",{on:{change:function(e){t.align=e.target.value}}},[n("option",{attrs:{disabled:""}},[t._v("Select an alignment")]),n("option",{attrs:{value:"left"}},[t._v("Left")]),n("option",{attrs:{value:"center",selected:""}},[t._v("Center")]),n("option",{attrs:{value:"right"}},[t._v("Right")])])]),n("hr"),n("h2",[t._v("Ellipsis mode")]),n("p",[t._v("This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the end are used to visualize it.")]),n("Playground",{attrs:{markup:t.ellipsis,config:t.config}}),n("hr"),n("h2",[t._v("Text with a link and bold text as children")]),n("Playground",{attrs:{markup:t.textWithLink,config:t.config}})],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("strong",[t._v("Text component")]),t._v(" for predefined copy text sizes which are either fixed or can respond to different viewports.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("The text component is the most flexible way to display text strings on your page."),n("br"),t._v(" Rendering defaults to variant "),n("code",[t._v("small")]),t._v(" and font weight "),n("code",[t._v("regular")]),t._v("."),n("br"),t._v(" The default semantic HTML element renders as a "),n("code",[t._v("p")]),t._v(' tag, but you can change it to your needs (see chapter "Semantics").')])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("There are predefined default text sizes for the text component which should cover most use cases. If a specific text size is needed, the size can be set to "),n("code",[t._v("inherit")]),t._v(" to specify the text size from outside.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("strong",[t._v("Hint:")]),t._v(" Be aware of that the line-height will be calculated based on the Porsche type-scaling formula automatically. This is the case for predefined text sizes as well as for "),n("code",[t._v("inherit")]),t._v(" mode.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("The settings above can also be used on different major breakpoints "),n("code",[t._v("xs")]),t._v(", "),n("code",[t._v("s")]),t._v(", "),n("code",[t._v("m")]),t._v(", "),n("code",[t._v("l")]),t._v(", "),n("code",[t._v("xl")]),t._v(".")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("To provide more contextual HTML semantics you can either pass them with the "),n("code",[t._v("tag")]),t._v(" property or directly inside a slot.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("There are predefined default text weights for copy text. Be aware of using the "),n("code",[t._v("thin")]),t._v(" variant only with larger text sizes.")])}],a=(n("d86f"),n("75a4"),n("d4ec")),i=n("bee2"),c=n("262e"),s=n("2caf"),l=n("53ca"),u=n("2b0e"),d=n("2fe1"),f=function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},v="The quick brown fox jumps over the lazy dog",p=function(t){Object(c["a"])(n,t);var e=Object(s["a"])(n);function n(){var t;return Object(a["a"])(this,n),t=e.apply(this,arguments),t.config={themeable:!0},t.size="medium",t.weight="thin",t.color="default",t.align="center",t.basic="<p-text>".concat(v,"</p-text>"),t.responsive="<p-text size=\"{ base: 'small', l: 'medium' }\">".concat(v,"</p-text>"),t.semantics='<p-text tag="blockquote">'.concat(v,"</p-text>\n<p-text><blockquote>").concat(v,"</blockquote></p-text>"),t.ellipsis='<p-text ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>',t.textWithLink='<p-text>Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> & <strong>strong text</strong></p-text>',t}return Object(i["a"])(n,[{key:"sizeMarkup",get:function(){var t="inherit"===this.size?' style="font-size: 48px;"':"";return'<p-text size="'.concat(this.size,'"').concat(t,">").concat(v,"</p-text>")}},{key:"colorMarkup",get:function(){var t="inherit"===this.color?' style="color: deeppink;"':"";return'<p-text color="'.concat(this.color,'"').concat(t,">").concat(v,"</p-text>")}},{key:"weightMarkup",get:function(){return'<p-text size="medium" weight="'.concat(this.weight,'">').concat(v,"</p-text>")}},{key:"alignment",get:function(){return'<p-text align="'.concat(this.align,'">').concat(v,"</p-text>")}}]),n}(u["a"]);p=f([d["b"]],p);var h=p,g=h,_=n("2877"),m=Object(_["a"])(g,o,r,!1,null,null,null);e["default"]=m.exports},"75a4":function(t,e,n){var o=n("6b1d"),r=n("72df"),a=n("378c"),i=n("185a").f,c=n("d4cb"),s=r((function(){i(1)})),l=!c||s;o({target:"Object",stat:!0,forced:l,sham:!c},{getOwnPropertyDescriptor:function(t,e){return i(a(t),e)}})},c6de:function(t,e,n){var o=n("6a61");t.exports=Array.isArray||function(t){return"Array"==o(t)}},d86f:function(t,e,n){"use strict";var o=n("6b1d"),r=n("72df"),a=n("c6de"),i=n("7526"),c=n("37d1"),s=n("b495"),l=n("dac6"),u=n("6a86"),d=n("189b"),f=n("7d53"),v=n("4fed"),p=f("isConcatSpreadable"),h=9007199254740991,g="Maximum allowed index exceeded",_=v>=51||!r((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),m=d("concat"),x=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:a(t)},b=!_||!m;o({target:"Array",proto:!0,forced:b},{concat:function(t){var e,n,o,r,a,i=c(this),d=u(i,0),f=0;for(e=-1,o=arguments.length;e<o;e++)if(a=-1===e?i:arguments[e],x(a)){if(r=s(a.length),f+r>h)throw TypeError(g);for(n=0;n<r;n++,f++)n in a&&l(d,f,a[n])}else{if(f>=h)throw TypeError(g);l(d,f++,a)}return d.length=f,d}})},dac6:function(t,e,n){"use strict";var o=n("083f"),r=n("abdf"),a=n("9618");t.exports=function(t,e,n){var i=o(e);i in t?r.f(t,i,a(0,n)):t[i]=n}}}]);
//# sourceMappingURL=chunk-125799ad.8def436a.js.map