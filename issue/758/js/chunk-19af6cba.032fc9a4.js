(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19af6cba"],{"0c47":function(e,t,n){var r=n("c91c"),a=n("b17e");e.exports=Object.keys||function(e){return r(e,a)}},"189b":function(e,t,n){var r=n("72df"),a=n("7d53"),o=n("4fed"),i=a("species");e.exports=function(e){return o>=51||!r((function(){var t=[],n=t.constructor={};return n[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},2117:function(e,t,n){var r=n("8697");e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,a){return e.call(t,n,r,a)}}return function(){return e.apply(t,arguments)}}},"254e":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Typography")]),n("h2",[e._v("Headline")]),e._m(0),n("h2",[e._v("Variant")]),n("p",[e._v("Variants for predefined headlines and automated responsive sizing to fit into all major breakpoints. There are multiple predefined styling variants available.")]),n("Playground",{attrs:{markup:e.variant,config:e.config}}),n("h3",[e._v("Default Tags")]),n("p",[e._v("Default rendered semantic tag hierarchy equals to headline variant.")]),e._m(1),e._m(2),n("h2",[e._v("Custom Variant")]),e._m(3),e._m(4),e._m(5),n("Playground",{attrs:{markup:e.customVariantMarkup,config:e.config}},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.customVariant,expression:"customVariant"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.customVariant=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:""}},[e._v("Select an custom variant")]),n("option",{attrs:{value:"{ base: 'small', l: 'medium' }",selected:""}},[e._v("Custom Breakpoints")]),n("option",{attrs:{value:"inherit"}},[e._v("Inherit")])])]),n("hr"),n("h2",[e._v("Custom tag hierarchy")]),e._m(6),n("Playground",{attrs:{markup:e.customTagHierarchy,config:e.config}}),n("hr"),n("h2",[e._v("Color")]),n("p",[e._v("A predefined default color associated with its theme is available but also inherit mode can be used to define a custom color.")]),n("Playground",{attrs:{markup:e.colorMarkup,config:e.config}},[n("select",{on:{change:function(t){e.color=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select a color")]),n("option",{attrs:{value:"default",selected:""}},[e._v("Default")]),n("option",{attrs:{value:"inherit"}},[e._v("Inherit")])])]),n("hr"),n("h2",[e._v("Alignment")]),n("Playground",{attrs:{markup:e.alignment,config:e.config}},[n("select",{on:{change:function(t){e.align=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select an alignment")]),n("option",{attrs:{value:"left"}},[e._v("Left")]),n("option",{attrs:{value:"center",selected:""}},[e._v("Center")]),n("option",{attrs:{value:"right"}},[e._v("Right")])])]),n("hr"),n("h2",[e._v("Ellipsis mode")]),n("p",[e._v("This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the end are used to visualize it.")]),n("Playground",{attrs:{markup:e.ellipsisMode,config:e.config}})],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Headline component")]),e._v(" to specify headline styling and hierarchy in documents.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Note")]),e._v(": You always have to take care of the "),n("strong",[e._v("semantic structure")]),e._v(" of your HTML tags. This is very important for "),n("strong",[e._v("SEO")]),e._v(" and "),n("strong",[e._v("Accessibility")]),e._v(". Regarding of your "),n("strong",[e._v("page structure")]),e._v(" you need to set a "),n("strong",[e._v("corresponding headline tag")]),e._v(" via the "),n("code",[e._v("tag")]),e._v(" property. This means, that a headline can look like an "),n("code",[e._v("h1")]),e._v(" but doesn't need to be an "),n("code",[e._v("h1")]),e._v(' in the document (see also section "'),n("strong",[e._v("Custom tag hierarchy")]),e._v('").')])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",[n("thead",[n("tr",[n("th",[e._v("Headline Variant")]),n("th",[e._v("Rendered HTML Tag")])])]),n("tbody",[n("tr",[n("td",[n("code",[e._v("large-title")])]),n("td",[n("code",[e._v("<h1>")])])]),n("tr",[n("td",[n("code",[e._v("headline-1")])]),n("td",[n("code",[e._v("<h1>")])])]),n("tr",[n("td",[n("code",[e._v("headline-2")])]),n("td",[n("code",[e._v("<h2>")])])]),n("tr",[n("td",[n("code",[e._v("headline-3")])]),n("td",[n("code",[e._v("<h3>")])])]),n("tr",[n("td",[n("code",[e._v("headline-4")])]),n("td",[n("code",[e._v("<h4>")])])]),n("tr",[n("td",[n("code",[e._v("headline-5")])]),n("td",[n("code",[e._v("<h5>")])])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If you need more control over sizing and responsiveness, you can use predefined text sizes on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(", "),n("code",[e._v("xl")]),e._v(" or "),n("code",[e._v("inherit")]),e._v(" mode.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Hint:")]),e._v(" When using "),n("code",[e._v("inherit")]),e._v(" you have to take the "),n("strong",[n("a",{attrs:{href:"#/components/typography#usage"}},[e._v("typeScale")])]),e._v(" values in account.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Note:")]),e._v(" If you choose a custom responsive size, you have to take care of your "),n("strong",[e._v("semantic tag hierarchy")]),e._v(". It defaults to "),n("code",[e._v("h1")]),e._v(" for every combination.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If a custom tag hierarchy is needed, "),n("strong",[e._v("individual headline tags")]),e._v(" can be set from "),n("code",[e._v("h1")]),e._v(" to "),n("code",[e._v("h6")]),e._v(" either by referencing the corresponding "),n("code",[e._v("tag")]),e._v(" property or setting the HTML headline tags directly as slots.")])}],o=(n("d86f"),n("ef14"),n("cfce"),n("d4ec")),i=n("bee2"),c=n("262e"),u=n("2caf"),s=n("0f9e"),l=n("2b0e"),d=n("2fe1"),v=(n("8d0d"),["large-title","headline-1","headline-2","headline-3","headline-4","headline-5"]),f="The quick brown fox jumps over the lazy dog",h=function(e){Object(c["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.config={themeable:!0},e.customVariant="{ base: 'small', l: 'medium' }",e.color="default",e.align="center",e.variant=v.map((function(e){return'<p-headline variant="'.concat(e,'">').concat(f,"</p-headline>")})).join("\n"),e.customTagHierarchy='<p-headline variant="headline-1" tag="h3">'.concat(f,'</p-headline>\n<p-headline variant="headline-3" tag="h1">').concat(f,'</p-headline>\n<p-headline variant="headline-1">\n  <h3>').concat(f,'</h3>\n</p-headline>\n<p-headline variant="headline-3">\n  <h1>').concat(f,"</h1>\n</p-headline>"),e.ellipsisMode='<p-headline variant="headline-3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>',e}return Object(i["a"])(n,[{key:"customVariantMarkup",get:function(){var e="inherit"===this.customVariant?' style="font-size: 3.75rem;"':"";return'<p-headline variant="'.concat(this.customVariant,'"').concat(e,">").concat(f,"</p-headline>")}},{key:"colorMarkup",get:function(){var e="inherit"===this.color?' style="color: deeppink;"':"";return'<p-headline variant="headline-3" color="'.concat(this.color,'"').concat(e,">").concat(f,"</p-headline>")}},{key:"alignment",get:function(){return'<p-headline variant="headline-3" align="'.concat(this.align,'">').concat(f,"</p-headline>")}}]),n}(l["a"]);h=Object(s["b"])([d["b"]],h);var p=h,_=p,m=n("2877"),g=Object(m["a"])(_,r,a,!1,null,null,null);t["default"]=g.exports},"37d1":function(e,t,n){var r=n("730c");e.exports=function(e){return Object(r(e))}},"4fed":function(e,t,n){var r,a,o=n("f498"),i=n("64e4"),c=o.process,u=c&&c.versions,s=u&&u.v8;s?(r=s.split("."),a=r[0]+r[1]):i&&(r=i.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=i.match(/Chrome\/(\d+)/),r&&(a=r[1]))),e.exports=a&&+a},"64e4":function(e,t,n){var r=n("5428");e.exports=r("navigator","userAgent")||""},"6a86":function(e,t,n){var r=n("7526"),a=n("c6de"),o=n("7d53"),i=o("species");e.exports=function(e,t){var n;return a(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},"7f8a":function(e,t,n){"use strict";var r=n("72df");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},"82e8":function(e,t,n){var r,a=n("157c"),o=n("b99b"),i=n("b17e"),c=n("d687"),u=n("9324"),s=n("f2bf"),l=n("332c"),d=">",v="<",f="prototype",h="script",p=l("IE_PROTO"),_=function(){},m=function(e){return v+h+d+e+v+"/"+h+d},g=function(e){e.write(m("")),e.close();var t=e.parentWindow.Object;return e=null,t},y=function(){var e,t=s("iframe"),n="java"+h+":";return t.style.display="none",u.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(m("document.F=Object")),e.close(),e.F},b=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}b=r?g(r):y();var e=i.length;while(e--)delete b[f][i[e]];return b()};c[p]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(_[f]=a(e),n=new _,_[f]=null,n[p]=e):n=b(),void 0===t?n:o(n,t)}},8697:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}},"8d0d":function(e,t,n){"use strict";var r=n("6b1d"),a=n("1f5e").includes,o=n("ed2b"),i=n("ce71"),c=i("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!c},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},9324:function(e,t,n){var r=n("5428");e.exports=r("document","documentElement")},b99b:function(e,t,n){var r=n("d4cb"),a=n("abdf"),o=n("157c"),i=n("0c47");e.exports=r?Object.defineProperties:function(e,t){o(e);var n,r=i(t),c=r.length,u=0;while(c>u)a.f(e,n=r[u++],t[n]);return e}},c6de:function(e,t,n){var r=n("6a61");e.exports=Array.isArray||function(e){return"Array"==r(e)}},ce71:function(e,t,n){var r=n("d4cb"),a=n("72df"),o=n("f1a7"),i=Object.defineProperty,c={},u=function(e){throw e};e.exports=function(e,t){if(o(c,e))return c[e];t||(t={});var n=[][e],s=!!o(t,"ACCESSORS")&&t.ACCESSORS,l=o(t,0)?t[0]:u,d=o(t,1)?t[1]:void 0;return c[e]=!!n&&!a((function(){if(s&&!r)return!0;var e={length:-1};s?i(e,1,{enumerable:!0,get:u}):e[1]=1,n.call(e,l,d)}))}},cfce:function(e,t,n){"use strict";var r=n("6b1d"),a=n("d054").map,o=n("189b"),i=n("ce71"),c=o("map"),u=i("map");r({target:"Array",proto:!0,forced:!c||!u},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},d054:function(e,t,n){var r=n("2117"),a=n("83a6"),o=n("37d1"),i=n("b495"),c=n("6a86"),u=[].push,s=function(e){var t=1==e,n=2==e,s=3==e,l=4==e,d=6==e,v=7==e,f=5==e||d;return function(h,p,_,m){for(var g,y,b=o(h),w=a(b),x=r(p,_,3),k=i(w.length),j=0,O=m||c,A=t?O(h,k):n||v?O(h,0):void 0;k>j;j++)if((f||j in w)&&(g=w[j],y=x(g,j,b),e))if(t)A[j]=y;else if(y)switch(e){case 3:return!0;case 5:return g;case 6:return j;case 2:u.call(A,g)}else switch(e){case 4:return!1;case 7:u.call(A,g)}return d?-1:s||l?l:A}};e.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6),filterOut:s(7)}},d86f:function(e,t,n){"use strict";var r=n("6b1d"),a=n("72df"),o=n("c6de"),i=n("7526"),c=n("37d1"),u=n("b495"),s=n("dac6"),l=n("6a86"),d=n("189b"),v=n("7d53"),f=n("4fed"),h=v("isConcatSpreadable"),p=9007199254740991,_="Maximum allowed index exceeded",m=f>=51||!a((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),g=d("concat"),y=function(e){if(!i(e))return!1;var t=e[h];return void 0!==t?!!t:o(e)},b=!m||!g;r({target:"Array",proto:!0,forced:b},{concat:function(e){var t,n,r,a,o,i=c(this),d=l(i,0),v=0;for(t=-1,r=arguments.length;t<r;t++)if(o=-1===t?i:arguments[t],y(o)){if(a=u(o.length),v+a>p)throw TypeError(_);for(n=0;n<a;n++,v++)n in o&&s(d,v,o[n])}else{if(v>=p)throw TypeError(_);s(d,v++,o)}return d.length=v,d}})},dac6:function(e,t,n){"use strict";var r=n("083f"),a=n("abdf"),o=n("9618");e.exports=function(e,t,n){var i=r(t);i in e?a.f(e,i,o(0,n)):e[i]=n}},ed2b:function(e,t,n){var r=n("7d53"),a=n("82e8"),o=n("abdf"),i=r("unscopables"),c=Array.prototype;void 0==c[i]&&o.f(c,i,{configurable:!0,value:a(null)}),e.exports=function(e){c[i][e]=!0}},ef14:function(e,t,n){"use strict";var r=n("6b1d"),a=n("83a6"),o=n("378c"),i=n("7f8a"),c=[].join,u=a!=Object,s=i("join",",");r({target:"Array",proto:!0,forced:u||!s},{join:function(e){return c.call(o(this),void 0===e?",":e)}})}}]);
//# sourceMappingURL=chunk-19af6cba.032fc9a4.js.map