(window.webpackJsonp=window.webpackJsonp||[]).push([[13,18,19],{299:function(e,a,n){},302:function(e,a,n){"use strict";n.d(a,"a",function(){return _});var t=n(47),r=n(23),c=n(0),l=n.n(c),o=n(1),m=n.n(o),i=n(304),u=n(336),s=n(305),d=n.n(s),g=n(294),p=n(2),f=n(303),v=n.n(f),E=(n(299),n(306)),b=n.n(E);u.a.registerLanguage("xml",d.a);var _=function(e){var a=e.className,n=Object(c.useState)("default"),o=Object(r.a)(n,2),s=o[0],d=o[1],f=Object(c.useState)(!1),E=Object(r.a)(f,2),_=E[0],T=E[1],k=Object(c.useState)(!1),S=Object(r.a)(k,2),j=S[0],O=S[1],x=m()(v.a.render,Object(t.a)({},v.a.light,"default"===s),Object(t.a)({},v.a.dark,"inverted"===s),"sg-example-global",a),C=function(e){"html"===e?(T(!_),O(!1)):"scss"===e&&(O(!j),T(!1))},M=function(e){"default"===e?d("default"):"inverted"===e&&d("inverted")},w=[{menuItem:"Light",key:"Tab1",active:"default"===s,onClick:function(){return M("default")}},{menuItem:"Inverted",key:"Tab2",active:"inverted"===s,onClick:function(){return M("inverted")}}];return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.g,{marginTop:8},l.a.createElement("div",{className:v.a.container},!0!==e.noTheme&&l.a.createElement(g.a,{panes:w,alignment:"left",mini:!0,divider:!1}),l.a.createElement("div",{className:x},h(e.children,s)),(!e.noHTML||!e.noSCSS)&&l.a.createElement(l.a.Fragment,null,l.a.createElement(p.c,{className:v.a["toggle-container"],justifyContent:"end"},!e.noHTML&&l.a.createElement("button",{className:m()(v.a.toggle,Object(t.a)({},v.a.open,_)),onClick:function(){return C("html")}},_?"- HTML":"+ HTML"),!e.noSCSS&&l.a.createElement("button",{className:m()(v.a.toggle,Object(t.a)({},v.a.open,j)),onClick:function(){return C("scss")}},j?"- SCSS":"+ SCSS")),_&&l.a.createElement("div",{className:v.a.codeblock},l.a.createElement(u.a,{language:"xml",style:b.a},function(e,a){return function(e){var a="";e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3");var n=0;return e.split("\r\n").forEach(function(e,t){var r=0;e.match(/.+<\/\w[^>]*>$/)?r=0:e.match(/^<\/\w/)?0!==n&&(n-=1):r=e.match(/^<\w[^>]*[^\/]>.*$/)?1:0;for(var c="",l=0;l<n;l++)c+="  ";a+=c+e+"\r\n",n+=r}),a}(Object(i.renderToStaticMarkup)(h(e,a)))}(e.children,s))),j&&l.a.createElement("div",{className:v.a.codeblock},l.a.createElement(u.a,{language:"scss",style:b.a},"# SCSS paths coming soon..."))))))};function h(e,a){return"function"===typeof e?e(a):e}_.defaultProps={noTheme:!0}},303:function(e,a,n){e.exports={container:"example_container__3zGOu",codeblock:"example_codeblock__3-_qV",render:"example_render__mfsjh",light:"example_light__3OW-k",dark:"example_dark__Nsu00","toggle-container":"example_toggle-container__LmTsK",toggle:"example_toggle__1pB1a",open:"example_open__2AjqQ"}},324:function(e,a,n){"use strict";n.r(a);var t=n(298),r=n(0),c=n.n(r),l=n(297),o=n(302),m=n(2);a.default=function(e){var a=e.components;Object(t.a)(e,["components"]);return c.a.createElement(l.MDXTag,{name:"wrapper",components:a},c.a.createElement(l.MDXTag,{name:"h1",components:a},"Button Regular"),c.a.createElement(l.MDXTag,{name:"h2",components:a},"Introduction"),c.a.createElement(l.MDXTag,{name:"p",components:a},"TBD"),c.a.createElement(l.MDXTag,{name:"h3",components:a},"Button regular standard"),c.a.createElement(o.a,{noTheme:!1},function(e){var a="inverted"===e;return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.b,{inverted:a},"Click Here!"))}),c.a.createElement(l.MDXTag,{name:"h3",components:a},"Button regular loader"),c.a.createElement(o.a,{noTheme:!1},function(e){var a="inverted"===e;return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.b,{loading:!0,inverted:a},"Click Here!"))}))}}}]);
//# sourceMappingURL=13.23fe31cd.chunk.js.map