(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e2ab45de"],{2048:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.hasTabs?n("p-tabs-bar",{attrs:{"active-tab-index":e.activeTabIndex,size:"medium"}},e._l(e.tabs,(function(t,r){return n("router-link",{key:r,attrs:{to:e.createTabLink(t)}},[e._v(e._s(t))])})),1):e._e(),e.hasTabs?n("p-divider"):e._e(),n("Markdown",e._l(e.components,(function(e,t){return n(e,{key:t,tag:"component"})})),1)],1)},a=[],i=(n("c975"),n("b64b"),n("ac1f"),n("5319"),n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0"),n("06c5"));function c(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(i["a"])(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,o=!0,u=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return o=e.done,e},e:function(e){u=!0,c=e},f:function(){try{o||null==n["return"]||n["return"]()}finally{if(u)throw c}}}}n("96cf");var o=n("1da1"),u=n("d4ec"),s=n("bee2"),b=n("262e"),h=n("2caf"),f=n("9ab4"),p=n("2b0e"),l=n("2fe1"),d=n("60a3"),v=n("afc6"),y=n("e6e0"),g=n("963d"),m=n("16bd"),k=function(e){Object(b["a"])(n,e);var t=Object(h["a"])(n);function n(){var e;return Object(u["a"])(this,n),e=t.apply(this,arguments),e.components=[],e}return Object(s["a"])(n,[{key:"createTabLink",value:function(e){return"#".concat(Object(g["a"])(e))}},{key:"onRouteChange",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadComponents();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"mounted",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadComponents();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"loadComponents",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.components=[],e.next=3,this.$store.dispatch("toggleLoadingAsync",!0);case 3:e.prev=3,t=c(this.pages),e.prev=5,t.s();case 7:if((n=t.n()).done){e.next=16;break}return r=n.value,e.t0=this.components,e.next=12,r();case 12:e.t1=e.sent.default,e.t0.push.call(e.t0,e.t1);case 14:e.next=7;break;case 16:e.next=21;break;case 18:e.prev=18,e.t2=e["catch"](5),t.e(e.t2);case 21:return e.prev=21,t.f(),e.finish(21);case 24:e.next=30;break;case 26:return e.prev=26,e.t3=e["catch"](3),e.next=30,this.redirect();case 30:return e.next=32,this.$store.dispatch("toggleLoadingAsync",!1);case 32:case"end":return e.stop()}}),e,this,[[3,26],[5,18,21,24]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"redirect",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.hasTabs){e.next=5;break}return e.next=3,this.$router.replace(this.createTabLink(this.tabs[0]));case 3:e.next=7;break;case 5:return e.next=7,this.$router.replace({name:"404"});case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasTabs",get:function(){return this.tabs.length>0}},{key:"activeTabIndex",get:function(){return this.tabs.indexOf(this.tab)}},{key:"tabs",get:function(){var e,t=null===v["a"]||void 0===v["a"]||null===(e=v["a"][this.category])||void 0===e?void 0:e[this.page];return!t||Array.isArray(t)?[]:Object.keys(t)}},{key:"category",get:function(){return Object(m["a"])(this.$route.params.category)}},{key:"page",get:function(){return Object(m["a"])(this.$route.params.page)}},{key:"tab",get:function(){return Object(m["a"])(this.$route.hash.substring(1))}},{key:"pages",get:function(){var e,t=null===v["a"]||void 0===v["a"]||null===(e=v["a"][this.category])||void 0===e?void 0:e[this.page];return!t||Array.isArray(t)?t:t[this.tab]}}]),n}(p["a"]);Object(f["a"])([Object(d["b"])("$route")],k.prototype,"onRouteChange",null),k=Object(f["a"])([Object(l["b"])({components:{Markdown:y["a"]}})],k);var w=k,x=w,j=(n("d9c4"),n("2877")),O=Object(j["a"])(x,r,a,!1,null,"03ffcc2a",null);t["default"]=O.exports},"50a6":function(e,t,n){},d9c4:function(e,t,n){"use strict";var r=n("50a6"),a=n.n(r);a.a}}]);
//# sourceMappingURL=chunk-e2ab45de.b4dc9bcc.js.map