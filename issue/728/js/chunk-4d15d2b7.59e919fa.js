(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d15d2b7"],{"130d":function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},2117:function(e,t,n){var r=n("8697");e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,a){return e.call(t,n,r,a)}}return function(){return e.apply(t,arguments)}}},"37d1":function(e,t,n){var r=n("730c");e.exports=function(e){return Object(r(e))}},"50c2":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Banner")]),e._m(0),n("h2",[e._v("Basic implementation")]),e._m(1),n("Playground",{attrs:{markup:e.basic,config:e.config}},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.state,expression:"state"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.state=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:""}},[e._v("Select a state")]),n("option",{attrs:{value:"neutral"}},[e._v("Neutral")]),n("option",{attrs:{value:"warning"}},[e._v("Warning")]),n("option",{attrs:{value:"error"}},[e._v("Error")])])]),n("h2",[e._v("Persistent")]),e._m(2),n("Playground",{attrs:{markup:e.persistent,config:e.config}}),n("h2",[e._v("Width")]),e._m(3),n("Playground",{attrs:{markup:e.markupWidth,config:e.config}},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.width,expression:"width"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.width=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:""}},[e._v("Select a width")]),n("option",{attrs:{value:"basic"}},[e._v("Basic")]),n("option",{attrs:{value:"extended"}},[e._v("Extended")]),n("option",{attrs:{value:"fluid"}},[e._v("Fluid")])])]),n("h2",[e._v("Example with user interaction")]),n("p",[n("p-button",{on:{click:e.openBanner}},[e._v("Open Banner")])],1),n("h2",[e._v("Custom styling")]),e._m(4),e._m(5)],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(" component are used to provide action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. Whenever you want to provide brief, temporary notifications stick to the "),n("strong",[e._v("Toast component")]),e._v(" (work in progress) instead. They are noticeable but do not disrupt the user experience and do not require an action to be taken.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(' component is positioned absolute above the page content by default. For personal adjustments, go to "Custom styling" section.')])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If the "),n("strong",[e._v("Banner")]),e._v(" shouldn't be removable by the user, add "),n("code",[e._v("persistent")]),e._v(" prop.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(" behaves the same as the "),n("strong",[e._v("ContentWrapper")]),e._v(" component and can be adapted to the same widths to match with your layout.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("strong",[e._v("Banner")]),e._v(" component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables):")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v("// default CSS variables\n--p-banner-position-type: fixed;\n--p-banner-position-top: p-px-to-rem(56px);\n--p-banner-position-bottom: p-px-to-rem(56px);\n\n// overwrite with CSS variables\np-banner {\n  --p-banner-position-top: 200px;\n}\n")])])}],o=(n("8f0b"),n("75a4"),n("fa8c5"),n("d4ec")),i=n("bee2"),s=n("262e"),c=n("2caf"),u=n("53ca"),l=n("2b0e"),p=n("2fe1"),f=function(e,t,n,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(u["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(i=(o<3?a(i):o>3?a(t,n,i):a(t,n))||i);return o>3&&i&&Object.defineProperty(t,n,i),i},d=function(e){Object(s["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.config={themeable:!0},e.state="neutral",e.width="basic",e.persistent='<p-banner persistent="true">\n  <span slot="title">Some banner title</span>\n  <span slot="description">Some banner description.</span>\n</p-banner>',e.openBanner=function(){var e=document.createElement("div");e.innerHTML='\n      <p-banner>\n        <span slot="title">Some banner title</span>\n        <span slot="description">Some banner description.</span>\n      </p-banner>\n      ',document.getElementById("app").append(e)},e}return Object(i["a"])(n,[{key:"mounted",value:function(){var e=document.querySelectorAll("p-banner");e.forEach((function(e){return e.addEventListener("dismiss",(function(){return console.log("dismissed")}))}))}},{key:"basic",get:function(){return'<p-banner state="'.concat(this.state,'">\n  <span slot="title">Some banner title</span>\n  <span slot="description">Some banner description. You can also add inline <a href="#">links</a> to route to another page.</span>\n</p-banner>')}},{key:"markupWidth",get:function(){return'<p-banner width="'.concat(this.width,'">\n  <span slot="title">Some banner title</span>\n  <span slot="description">Some banner description.</span>\n</p-banner>')}}]),n}(l["a"]);d=f([p["b"]],d);var v=d,h=v,m=(n("9423"),n("2877")),b=Object(m["a"])(h,r,a,!1,null,"44efcc94",null);t["default"]=b.exports},"6a86":function(e,t,n){var r=n("7526"),a=n("c6de"),o=n("7d53"),i=o("species");e.exports=function(e,t){var n;return a(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},"75a4":function(e,t,n){var r=n("6b1d"),a=n("72df"),o=n("378c"),i=n("185a").f,s=n("d4cb"),c=a((function(){i(1)})),u=!s||c;r({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(e,t){return i(o(e),t)}})},"7f8a":function(e,t,n){"use strict";var r=n("72df");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},8697:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}},"8f0b":function(e,t,n){"use strict";var r=n("6b1d"),a=n("e8e5");r({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},9423:function(e,t,n){"use strict";n("e0d1")},c6de:function(e,t,n){var r=n("6a61");e.exports=Array.isArray||function(e){return"Array"==r(e)}},ce71:function(e,t,n){var r=n("d4cb"),a=n("72df"),o=n("f1a7"),i=Object.defineProperty,s={},c=function(e){throw e};e.exports=function(e,t){if(o(s,e))return s[e];t||(t={});var n=[][e],u=!!o(t,"ACCESSORS")&&t.ACCESSORS,l=o(t,0)?t[0]:c,p=o(t,1)?t[1]:void 0;return s[e]=!!n&&!a((function(){if(u&&!r)return!0;var e={length:-1};u?i(e,1,{enumerable:!0,get:c}):e[1]=1,n.call(e,l,p)}))}},d054:function(e,t,n){var r=n("2117"),a=n("83a6"),o=n("37d1"),i=n("b495"),s=n("6a86"),c=[].push,u=function(e){var t=1==e,n=2==e,u=3==e,l=4==e,p=6==e,f=5==e||p;return function(d,v,h,m){for(var b,_,g=o(d),y=a(g),S=r(v,h,3),w=i(y.length),E=0,L=m||s,x=t?L(d,w):n?L(d,0):void 0;w>E;E++)if((f||E in y)&&(b=y[E],_=S(b,E,g),e))if(t)x[E]=_;else if(_)switch(e){case 3:return!0;case 5:return b;case 6:return E;case 2:c.call(x,b)}else if(l)return!1;return p?-1:u||l?l:x}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},e0d1:function(e,t,n){},e8e5:function(e,t,n){"use strict";var r=n("d054").forEach,a=n("7f8a"),o=n("ce71"),i=a("forEach"),s=o("forEach");e.exports=i&&s?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},fa8c5:function(e,t,n){var r=n("f498"),a=n("130d"),o=n("e8e5"),i=n("5b12");for(var s in a){var c=r[s],u=c&&c.prototype;if(u&&u.forEach!==o)try{i(u,"forEach",o)}catch(l){u.forEach=o}}}}]);
//# sourceMappingURL=chunk-4d15d2b7.59e919fa.js.map