(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-280b08a9"],{"0b7e":function(e,n,t){var c={"./about/introduction.md":["62a1","chunk-2d0cf4a2"],"./accessibility/compliance.md":["79ec","chunk-2d0d83f6"],"./accessibility/guidelines.md":["43b2","chunk-2d0c0fc5"],"./accessibility/introduction.md":["0b3e","chunk-2d0ae93a"],"./basics/browser-compatibility.md":["8a54","chunk-2d0e887e"],"./basics/quality-criteria.md":["ffb4","chunk-2d2389c8"],"./chinese.md":["a141","chunk-2d207763"],"./cyril.md":["6e38","chunk-2d0dae8a"],"./general/blur-on-focus.md":["a48f","chunk-2d208357"],"./general/components-ready.md":["14e7","chunk-2d0ab6cb"],"./general/slotted-content.md":["ef2a","chunk-2d230fc6"],"./general/testing.md":["aec2","chunk-2d214049"],"./greek.md":["cea3","chunk-2d2228ca"],"./help/faq.md":["5e25","chunk-2d0d3a09"],"./help/support.md":["3f6e","chunk-2d0c55b8"],"./help/troubleshooting.md":["ab3a","chunk-2d212f65"],"./icons.md":["8b84","chunk-2d0e8c9c"],"./japanese.md":["0d7f","chunk-2d0af139"],"./korean.md":["df7a","chunk-2d229c02"],"./latin.md":["77f0","chunk-2d0d7c60"],"./license.md":["e883","chunk-2d2263a4"],"./markdown.md":["74da","chunk-7b855d42"],"./news/roadmap.md":["e5c3","chunk-2d225d96"],"./news/updates-design.md":["8c37","chunk-2d0e8fc5"],"./news/versioning.md":["452d","chunk-2d0c11a9"],"./patterns/forms/guidelines.md":["f1e7","chunk-c2dfb34c"],"./patterns/forms/resources.md":["ae42","chunk-2d213a98"],"./start-coding/angular.md":["b6be","chunk-2d21044d"],"./start-coding/gatsby.md":["5bda","chunk-2d0d3500"],"./start-coding/introduction.md":["f9fc","chunk-2d22e186"],"./start-coding/next-js.md":["112e","chunk-2d0aa589"],"./start-coding/react.md":["5e43","chunk-2d0d3a45"],"./start-designing/design-workflow.md":["7ead","chunk-0781b4fc"],"./start-designing/introduction.md":["5777","chunk-2d0c8df8"],"./start-designing/sketch-plugins.md":["6f8a","chunk-2d0db30f"],"./utilities/introduction.md":["7f32","chunk-2d0e26a4"],"./utilities/js/functions.md":["59cb","chunk-2d0c9af9"],"./utilities/js/helper.md":["ec6d","chunk-2d230502"],"./utilities/js/variables.md":["d7ad","chunk-2d21f0ac"],"./utilities/scss/functions.md":["1e71","chunk-2d0b6924"],"./utilities/scss/mixins.md":["0c4c","chunk-2d0aed18"],"./utilities/scss/variables.md":["7a10","chunk-2d0e139f"]};function r(e){if(!t.o(c,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=c[e],r=n[0];return t.e(n[1]).then((function(){return t(r)}))}r.keys=function(){return Object.keys(c)},r.id="0b7e",e.exports=r},"5e6f":function(e,n,t){"use strict";t.r(n);var c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("Markdown",[e.component?t(e.component,{tag:"component"}):e._e()],1)},r=[],a=(t("d3b7"),t("ac1f"),t("5319"),t("96cf"),t("1da1")),i=t("d4ec"),u=t("bee2"),d=t("262e"),s=t("2caf"),o=t("9ab4"),h=t("60a3"),m=t("e6e0"),l=t("0a0c"),f=function(e){Object(d["a"])(c,e);var n=Object(s["a"])(c);function c(){var e;return Object(i["a"])(this,c),e=n.apply(this,arguments),e.component=null,e}return Object(u["a"])(c,[{key:"onRouteChange",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadComponent();case 2:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()},{key:"mounted",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadComponent();case 2:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()},{key:"loadComponent",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.component=null,e.next=3,this.$store.dispatch("toggleLoadingAsync",!0);case 3:return e.prev=3,e.next=6,function(){return t("0b7e")("./".concat(n.page,".md"))}();case 6:this.component=e.sent.default,e.next=13;break;case 9:return e.prev=9,e.t0=e["catch"](3),e.next=13,this.redirect();case 13:return e.next=15,this.$store.dispatch("toggleLoadingAsync",!1);case 15:case"end":return e.stop()}}),e,this,[[3,9]])})));function n(){return e.apply(this,arguments)}return n}()},{key:"redirect",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$router.replace({name:"404"});case 2:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}()},{key:"page",get:function(){return Object(l["a"])(this.$route.params.page)}}]),c}(h["c"]);Object(o["a"])([Object(h["d"])("$route")],f.prototype,"onRouteChange",null),f=Object(o["a"])([Object(h["a"])({components:{Markdown:m["a"]}})],f);var p=f,k=p,b=t("2877"),g=Object(b["a"])(k,c,r,!1,null,null,null);n["default"]=g.exports}}]);
//# sourceMappingURL=chunk-280b08a9.d9447888.js.map