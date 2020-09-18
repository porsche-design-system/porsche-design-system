(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d230fc6"],{ef2a:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Slotted Content")]),n("p",[e._v("Some of our components use slots to provide text/html content with predefined styling (e.g. "),n("code",[e._v("p-text")]),e._v(" or "),n("code",[e._v("p-link-pure")]),e._v(").")]),n("pre",[n("code",{staticClass:"language-html"},[e._v('<p-text>\n  The quick brown fox <a href="#">jumps over</a> the lazy dog\n</p-text>\n')])]),n("h2",[e._v("Problem")]),n("p",[e._v("In some circumstances it is common to provide such content with the help of innerHTML or innerText (which breaks in browser not supporting Shadow DOM):")]),n("h3",[e._v("Angular")]),n("pre",[n("code",{staticClass:"language-angular"},[e._v('<p-text [innerHTML]="theHTMLString"></p-text>\n')])]),n("h3",[e._v("React")]),n("pre",[n("code",{staticClass:"language-react"},[e._v("<PText dangerouslySetInnerHTML={theHTMLString()}></PText>\n")])]),n("p",[e._v("The above examples break in the case that the component is rendered in polyfill mode without a Shadow DOM (e.g. in IE11). That's because the innerHTML will strip out all the contents of the component.")]),n("h2",[e._v("Solution")]),n("p",[e._v("As a workaround, you have to provide the contents like this:")]),n("h3",[e._v("Angular")]),n("pre",[n("code",{staticClass:"language-angular"},[e._v('<p-text>\n  <span [innerHTML]="theHTMLString"></span>\n</p-text>\n')])]),n("h3",[e._v("React")]),n("pre",[n("code",{staticClass:"language-react"},[e._v("<PText>\n  <span dangerouslySetInnerHTML={theHTMLString()}></span>\n</PText>\n")])])])}],r=n("2877"),s={},i=Object(r["a"])(s,a,o,!1,null,null,null);t["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d230fc6.816ade6a.js.map