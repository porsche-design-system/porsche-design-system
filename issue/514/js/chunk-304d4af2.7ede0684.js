(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-304d4af2"],{"02b2":function(t,e,n){"use strict";var r=n("3094"),a=n.n(r);a.a},"06c5":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("a630"),n("fb6a"),n("b0c0"),n("d3b7"),n("25f0"),n("3ca3");function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},2048:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.hasTabs?n("nav",{staticClass:"tabs"},t._l(t.tabs,(function(e,r){return n("p-text",{key:r,staticClass:"tab",attrs:{size:"inherit",tag:"div",weight:"thin"}},[n("router-link",{attrs:{to:t.createTabLink(e)}},[t._v(t._s(e))])],1)})),1):t._e(),n("Markdown",t._l(t.components,(function(t,e){return n(t,{key:e,tag:"component"})})),1)],1)},a=[],o=(n("b64b"),n("ac1f"),n("5319"),n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0"),n("06c5"));function i(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=Object(o["a"])(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){u=!0,i=t},f:function(){try{c||null==n["return"]||n["return"]()}finally{if(u)throw i}}}}n("96cf");var c=n("1da1"),u=n("d4ec"),s=n("bee2"),f=n("262e"),l=n("2caf"),h=n("9ab4"),b=n("60a3"),p=n("afc6"),d=n("e6e0"),v=n("0a0c"),y=n("16bd"),g=function(t){Object(f["a"])(n,t);var e=Object(l["a"])(n);function n(){var t;return Object(u["a"])(this,n),t=e.apply(this,arguments),t.components=[],t}return Object(s["a"])(n,[{key:"createTabLink",value:function(t){return"#".concat(Object(v["a"])(t))}},{key:"onRouteChange",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.loadComponents();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"mounted",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.loadComponents();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"loadComponents",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var e,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.components=[],t.next=3,this.$store.dispatch("toggleLoadingAsync",!0);case 3:t.prev=3,e=i(this.pages),t.prev=5,e.s();case 7:if((n=e.n()).done){t.next=16;break}return r=n.value,t.t0=this.components,t.next=12,r();case 12:t.t1=t.sent.default,t.t0.push.call(t.t0,t.t1);case 14:t.next=7;break;case 16:t.next=21;break;case 18:t.prev=18,t.t2=t["catch"](5),e.e(t.t2);case 21:return t.prev=21,e.f(),t.finish(21);case 24:t.next=30;break;case 26:return t.prev=26,t.t3=t["catch"](3),t.next=30,this.redirect();case 30:return t.next=32,this.$store.dispatch("toggleLoadingAsync",!1);case 32:case"end":return t.stop()}}),t,this,[[3,26],[5,18,21,24]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"redirect",value:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.hasTabs){t.next=5;break}return t.next=3,this.$router.replace(this.createTabLink(this.tabs[0]));case 3:t.next=7;break;case 5:return t.next=7,this.$router.replace({name:"404"});case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"hasTabs",get:function(){return this.tabs.length>0}},{key:"tabs",get:function(){var t,e=null===p["a"]||void 0===p["a"]||null===(t=p["a"][this.category])||void 0===t?void 0:t[this.page];return!e||Array.isArray(e)?[]:Object.keys(e)}},{key:"category",get:function(){return Object(y["a"])(this.$route.params.category)}},{key:"page",get:function(){return Object(y["a"])(this.$route.params.page)}},{key:"tab",get:function(){return Object(y["a"])(this.$route.hash.substring(1))}},{key:"pages",get:function(){var t,e=null===p["a"]||void 0===p["a"]||null===(t=p["a"][this.category])||void 0===t?void 0:t[this.page];return!e||Array.isArray(e)?e:e[this.tab]}}]),n}(b["c"]);Object(h["a"])([Object(b["d"])("$route")],g.prototype,"onRouteChange",null),g=Object(h["a"])([Object(b["a"])({components:{Markdown:d["a"]}})],g);var m=g,k=m,w=(n("02b2"),n("2877")),x=Object(w["a"])(k,r,a,!1,null,"66b8e507",null);e["default"]=x.exports},3094:function(t,e,n){},"4df4":function(t,e,n){"use strict";var r=n("0366"),a=n("7b0b"),o=n("9bdd"),i=n("e95a"),c=n("50c4"),u=n("8418"),s=n("35a1");t.exports=function(t){var e,n,f,l,h,b,p=a(t),d="function"==typeof this?this:Array,v=arguments.length,y=v>1?arguments[1]:void 0,g=void 0!==y,m=s(p),k=0;if(g&&(y=r(y,v>2?arguments[2]:void 0,2)),void 0==m||d==Array&&i(m))for(e=c(p.length),n=new d(e);e>k;k++)b=g?y(p[k],k):p[k],u(n,k,b);else for(l=m.call(p),h=l.next,n=new d;!(f=h.call(l)).done;k++)b=g?o(l,y,[f.value,k],!0):f.value,u(n,k,b);return n.length=k,n}},a630:function(t,e,n){var r=n("23e7"),a=n("4df4"),o=n("1c7e"),i=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:i},{from:a})},b0c0:function(t,e,n){var r=n("83ab"),a=n("9bf2").f,o=Function.prototype,i=o.toString,c=/^\s*function ([^ (]*)/,u="name";r&&!(u in o)&&a(o,u,{configurable:!0,get:function(){try{return i.call(this).match(c)[1]}catch(t){return""}}})},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),o=n("e8b5"),i=n("23cb"),c=n("50c4"),u=n("fc6a"),s=n("8418"),f=n("b622"),l=n("1dde"),h=n("ae40"),b=l("slice"),p=h("slice",{ACCESSORS:!0,0:0,1:2}),d=f("species"),v=[].slice,y=Math.max;r({target:"Array",proto:!0,forced:!b||!p},{slice:function(t,e){var n,r,f,l=u(this),h=c(l.length),b=i(t,h),p=i(void 0===e?h:e,h);if(o(l)&&(n=l.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?a(n)&&(n=n[d],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return v.call(l,b,p);for(r=new(void 0===n?Array:n)(y(p-b,0)),f=0;b<p;b++,f++)b in l&&s(r,f,l[b]);return r.length=f,r}})}}]);
//# sourceMappingURL=chunk-304d4af2.7ede0684.js.map