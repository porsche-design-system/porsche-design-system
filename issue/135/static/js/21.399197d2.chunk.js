(window.webpackJsonp=window.webpackJsonp||[]).push([[21,20],{297:function(e,a,t){},298:function(e,a,t){"use strict";t.d(a,"a",function(){return S});var n=t(47),c=t(23),r=t(0),l=t.n(r),o=t(1),i=t.n(o),m=t(302),u=t(334),s=t(303),d=t.n(s),g=t(290),f=t(2),p=t(299),_=t.n(p),b=(t(297),t(304)),v=t.n(b);u.a.registerLanguage("xml",d.a);var S=function(e){var a=e.className,t=Object(r.useState)("default"),o=Object(c.a)(t,2),s=o[0],d=o[1],p=Object(r.useState)(!1),b=Object(c.a)(p,2),S=b[0],h=b[1],E=Object(r.useState)(!1),x=Object(c.a)(E,2),j=x[0],O=x[1],C=i()(_.a.render,Object(n.a)({},_.a.light,"default"===s),Object(n.a)({},_.a.dark,"inverted"===s),"sg-example-global",a),N=function(e){"html"===e?(h(!S),O(!1)):"scss"===e&&(O(!j),h(!1))},T=function(e){"default"===e?d("default"):"inverted"===e&&d("inverted")},w=[{menuItem:"Light",key:"Tab1",active:"default"===s,onClick:function(){return T("default")}},{menuItem:"Inverted",key:"Tab2",active:"inverted"===s,onClick:function(){return T("inverted")}}];return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.g,{marginTop:8},l.a.createElement("div",{className:_.a.container},!0!==e.noTheme&&l.a.createElement(g.a,{panes:w,alignment:"left",mini:!0,divider:!1}),l.a.createElement("div",{className:C},k(e.children,s)),(!e.noHTML||!e.noSCSS)&&l.a.createElement(l.a.Fragment,null,l.a.createElement(f.c,{className:_.a["toggle-container"],justifyContent:"end"},!e.noHTML&&l.a.createElement("button",{className:i()(_.a.toggle,Object(n.a)({},_.a.open,S)),onClick:function(){return N("html")}},S?"- HTML":"+ HTML"),!e.noSCSS&&l.a.createElement("button",{className:i()(_.a.toggle,Object(n.a)({},_.a.open,j)),onClick:function(){return N("scss")}},j?"- SCSS":"+ SCSS")),S&&l.a.createElement("div",{className:_.a.codeblock},l.a.createElement(u.a,{language:"xml",style:v.a},function(e,a){return function(e){var a="";e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3");var t=0;return e.split("\r\n").forEach(function(e,n){var c=0;e.match(/.+<\/\w[^>]*>$/)?c=0:e.match(/^<\/\w/)?0!==t&&(t-=1):c=e.match(/^<\w[^>]*[^\/]>.*$/)?1:0;for(var r="",l=0;l<t;l++)r+="  ";a+=r+e+"\r\n",t+=c}),a}(Object(m.renderToStaticMarkup)(k(e,a)))}(e.children,s))),j&&l.a.createElement("div",{className:_.a.codeblock},l.a.createElement(u.a,{language:"scss",style:v.a},"# SCSS paths coming soon..."))))))};function k(e,a){return"function"===typeof e?e(a):e}S.defaultProps={noTheme:!0}},299:function(e,a,t){e.exports={container:"example_container__8KWcy",codeblock:"example_codeblock__25lok",render:"example_render__1Zlxb",light:"example_light__3X9Nl",dark:"example_dark__2VX9v","toggle-container":"example_toggle-container__16PqW",toggle:"example_toggle__1FS9N",open:"example_open__10Jrv"}}}]);
//# sourceMappingURL=21.399197d2.chunk.js.map