(window.webpackJsonp=window.webpackJsonp||[]).push([[52,62],{311:function(e,a,n){},312:function(e,a,n){"use strict";n.d(a,"a",function(){return b});var t=n(48),r=n(24),c=n(0),o=n.n(c),l=n(1),m=n.n(l),i=n(317),s=n(392),p=n(318),g=n.n(p),u=n(300),d=n(2),h=n(313),E=n.n(h),f=(n(311),n(319)),T=n.n(f);s.a.registerLanguage("xml",g.a);var b=function(e){var a=e.className,n=Object(c.useState)("light"),l=Object(r.a)(n,2),p=l[0],g=l[1],h=Object(c.useState)(!1),f=Object(r.a)(h,2),b=f[0],M=f[1],_=m()(E.a.render,Object(t.a)({},E.a.light,"light"===p),Object(t.a)({},E.a.dark,"dark"===p),"sg-example-global",a),X=function(e){"light"===e?g("light"):"dark"===e&&g("dark")},k=[{menuItem:"Light theme",key:"Tab1",active:"light"===p,onClick:function(){return X("light")}},{menuItem:"Dark theme",key:"Tab2",active:"dark"===p,onClick:function(){return X("dark")}}];return o.a.createElement(o.a.Fragment,null,o.a.createElement(d.h,{marginTop:8},o.a.createElement("div",{className:E.a.container},!0!==e.noTheme&&o.a.createElement(u.a,{panes:k,alignment:"left",mini:!0,divider:!1}),o.a.createElement("div",{className:_},v(e.children,p)),!e.noHTML&&o.a.createElement(o.a.Fragment,null,o.a.createElement(d.c,{className:E.a["toggle-container"],justifyContent:"end"},!e.noHTML&&o.a.createElement("button",{className:m()(E.a.toggle,Object(t.a)({},E.a.open,b)),onClick:function(){"html"==="html"&&M(!b)}},b?"- JavaScript":"+ JavaScript")),b&&o.a.createElement("div",{className:E.a.codeblock},o.a.createElement(s.a,{language:"xml",style:T.a},function(e,a){return function(e){var a="";e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3");var n=0;return e.split("\r\n").forEach(function(e,t){var r=0;e.match(/.+<\/\w[^>]*>$/)?r=0:e.match(/^<\/\w/)?0!==n&&(n-=1):r=e.match(/^<\w[^>]*[^\/]>.*$/)?1:0;for(var c="",o=0;o<n;o++)c+="  ";a+=c+e+"\r\n",n+=r}),a}(Object(i.renderToStaticMarkup)(v(e,a)))}(e.children,p)))))))};function v(e,a){return"function"===typeof e?e(a):e}b.defaultProps={noTheme:!0}},313:function(e,a,n){e.exports={container:"example_container__8KWcy",codeblock:"example_codeblock__25lok",render:"example_render__1Zlxb",light:"example_light__3X9Nl",dark:"example_dark__2VX9v","toggle-container":"example_toggle-container__16PqW",toggle:"example_toggle__1FS9N",open:"example_open__10Jrv"}},378:function(e,a,n){"use strict";n.r(a);var t=n(304),r=n(0),c=n.n(r),o=n(303),l=n(312);a.default=function(e){var a=e.components;Object(t.a)(e,["components"]);return c.a.createElement(o.MDXTag,{name:"wrapper",components:a},c.a.createElement(o.MDXTag,{name:"h1",components:a},"Icon"),c.a.createElement(o.MDXTag,{name:"h2",components:a},"Introduction"),c.a.createElement(o.MDXTag,{name:"p",components:a},"Porsche UI Kit is using a SVG icon system to present an icon object visually."),c.a.createElement(o.MDXTag,{name:"h2",components:a},"Icons"),c.a.createElement(o.MDXTag,{name:"h3",components:a},"Sizes"),c.a.createElement(o.MDXTag,{name:"h4",components:a},"Small (default)"),c.a.createElement(l.a,null,c.a.createElement(c.a.Fragment,null,c.a.createElement("p-icon",{source:"car-next"}))),c.a.createElement(o.MDXTag,{name:"h4",components:a},"Medium"),c.a.createElement(l.a,null,c.a.createElement(c.a.Fragment,null,c.a.createElement("p-icon",{source:"car-next",size:"medium"}))),c.a.createElement(o.MDXTag,{name:"h4",components:a},"large"),c.a.createElement(l.a,null,c.a.createElement(c.a.Fragment,null,c.a.createElement("p-icon",{source:"car-next",size:"large"}))),c.a.createElement(o.MDXTag,{name:"hr",components:a}),c.a.createElement(o.MDXTag,{name:"h3",components:a},"Color Variants"),c.a.createElement(o.MDXTag,{name:"p",components:a},"The default icon color inherits from its parent(s). But also predefined colors can be set. @see properties for possible color variants."),c.a.createElement(l.a,null,c.a.createElement(c.a.Fragment,null,c.a.createElement("p-icon",{source:"car-next",size:"large",color:"porsche-red"}))),c.a.createElement(o.MDXTag,{name:"hr",components:a}),c.a.createElement(o.MDXTag,{name:"h3",components:a},"Accessibility"),c.a.createElement(o.MDXTag,{name:"p",components:a},"With using SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:"),c.a.createElement(o.MDXTag,{name:"ul",components:a},c.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"If icons stand alone, adding descriptive text with an ",c.a.createElement(o.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"aria-label")," attribute is a good practice:")),c.a.createElement(o.MDXTag,{name:"pre",components:a},c.a.createElement(o.MDXTag,{name:"code",components:a,parentName:"pre",props:{metaString:null}},'<p-icon aria-label="descriptive text, e.g: close the layer" />\n')))}}}]);
//# sourceMappingURL=52.eae75884.chunk.js.map