(window.webpackJsonp=window.webpackJsonp||[]).push([[9,14],{272:function(e,a,t){},273:function(e,a,t){"use strict";t.d(a,"a",function(){return h});var n=t(42),r=t(20),c=t(0),l=t.n(c),o=t(1),m=t.n(o),i=t(275),u=t(303),s=t(276),d=t.n(s),g=t(263),p=t(3),f=t(277),_=t.n(f),v=t(274),b=t.n(v);t(272);u.a.registerLanguage("xml",d.a);var h=function(e){var a=e.className,t=Object(c.useState)("default"),o=Object(r.a)(t,2),s=o[0],d=o[1],f=Object(c.useState)(!1),v=Object(r.a)(f,2),h=v[0],S=v[1],j=Object(c.useState)(!1),k=Object(r.a)(j,2),T=k[0],x=k[1],O=m()(b.a.render,Object(n.a)({},b.a.light,"default"===s),Object(n.a)({},b.a.dark,"inverted"===s),"sg-example-global",a),w=function(e){"html"===e?(S(!h),x(!1)):"scss"===e&&(x(!T),S(!1))},C=function(e){"default"===e?d("default"):"inverted"===e&&d("inverted")},N=[{menuItem:"Light",key:"Tab1",active:"default"===s,onClick:function(){return C("default")}},{menuItem:"Inverted",key:"Tab2",active:"inverted"===s,onClick:function(){return C("inverted")}}];return l.a.createElement(l.a.Fragment,null,l.a.createElement(p.d,{marginTop:8},l.a.createElement("div",{className:b.a.container},!0!==e.noTheme&&l.a.createElement(g.a,{panes:N,alignment:"left",mini:!0,divider:!1}),l.a.createElement("div",{className:O},E(e.children,s)),(!e.noHTML||!e.noSCSS)&&l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{className:b.a["toggle-container"],justifyContent:"end"},!e.noHTML&&l.a.createElement("button",{className:m()(b.a.toggle,Object(n.a)({},b.a.open,h)),onClick:function(){return w("html")}},h?"- HTML":"+ HTML"),!e.noSCSS&&l.a.createElement("button",{className:m()(b.a.toggle,Object(n.a)({},b.a.open,T)),onClick:function(){return w("scss")}},T?"- SCSS":"+ SCSS")),h&&l.a.createElement("div",{className:b.a.codeblock},l.a.createElement(u.a,{language:"xml",style:_.a},function(e,a){return function(e){var a="";e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3");var t=0;return e.split("\r\n").forEach(function(e,n){var r=0;e.match(/.+<\/\w[^>]*>$/)?r=0:e.match(/^<\/\w/)?0!==t&&(t-=1):r=e.match(/^<\w[^>]*[^\/]>.*$/)?1:0;for(var c="",l=0;l<t;l++)c+="  ";a+=c+e+"\r\n",t+=r}),a}(Object(i.renderToStaticMarkup)(E(e,a)))}(e.children,s))),T&&l.a.createElement("div",{className:b.a.codeblock},l.a.createElement(u.a,{language:"scss",style:_.a},"# SCSS paths coming soon..."))))))};function E(e,a){return"function"===typeof e?e(a):e}h.defaultProps={noTheme:!0}},274:function(e,a,t){e.exports={container:"example_container__3zGOu",codeblock:"example_codeblock__3-_qV","hljs-tag":"example_hljs-tag__NY2w4",render:"example_render__mfsjh",light:"example_light__3OW-k",dark:"example_dark__Nsu00","toggle-container":"example_toggle-container__LmTsK",toggle:"example_toggle__1pB1a",open:"example_open__2AjqQ"}},292:function(e,a,t){"use strict";t.r(a);var n=t(269),r=t(0),c=t.n(r),l=t(268),o=t(273),m=t(3);a.default=function(e){var a=e.components;Object(n.a)(e,["components"]);return c.a.createElement(l.MDXTag,{name:"wrapper",components:a},c.a.createElement(l.MDXTag,{name:"h1",components:a},"Text"),c.a.createElement(o.a,{noTheme:!1},function(e){var a="inverted"===e;return c.a.createElement(c.a.Fragment,null,c.a.createElement(m.e,{type:"1-bold",as:"h1",inverted:a},"Headline 1"))}))}}}]);
//# sourceMappingURL=9.c3133205.chunk.js.map