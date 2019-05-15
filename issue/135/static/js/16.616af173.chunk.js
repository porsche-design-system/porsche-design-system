(window.webpackJsonp=window.webpackJsonp||[]).push([[16,20,21],{297:function(e,a,t){},298:function(e,a,t){"use strict";t.d(a,"a",function(){return b});var n=t(47),l=t(23),m=t(0),r=t.n(m),c=t(1),s=t.n(c),i=t(302),o=t(334),p=t(303),d=t.n(p),g=t(290),u=t(2),E=t(299),h=t.n(E),f=(t(297),t(304)),N=t.n(f);o.a.registerLanguage("xml",d.a);var b=function(e){var a=e.className,t=Object(m.useState)("default"),c=Object(l.a)(t,2),p=c[0],d=c[1],E=Object(m.useState)(!1),f=Object(l.a)(E,2),b=f[0],T=f[1],M=Object(m.useState)(!1),D=Object(l.a)(M,2),X=D[0],C=D[1],z=s()(h.a.render,Object(n.a)({},h.a.light,"default"===p),Object(n.a)({},h.a.dark,"inverted"===p),"sg-example-global",a),v=function(e){"html"===e?(T(!b),C(!1)):"scss"===e&&(C(!X),T(!1))},_=function(e){"default"===e?d("default"):"inverted"===e&&d("inverted")},w=[{menuItem:"Light",key:"Tab1",active:"default"===p,onClick:function(){return _("default")}},{menuItem:"Inverted",key:"Tab2",active:"inverted"===p,onClick:function(){return _("inverted")}}];return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.g,{marginTop:8},r.a.createElement("div",{className:h.a.container},!0!==e.noTheme&&r.a.createElement(g.a,{panes:w,alignment:"left",mini:!0,divider:!1}),r.a.createElement("div",{className:z},x(e.children,p)),(!e.noHTML||!e.noSCSS)&&r.a.createElement(r.a.Fragment,null,r.a.createElement(u.c,{className:h.a["toggle-container"],justifyContent:"end"},!e.noHTML&&r.a.createElement("button",{className:s()(h.a.toggle,Object(n.a)({},h.a.open,b)),onClick:function(){return v("html")}},b?"- HTML":"+ HTML"),!e.noSCSS&&r.a.createElement("button",{className:s()(h.a.toggle,Object(n.a)({},h.a.open,X)),onClick:function(){return v("scss")}},X?"- SCSS":"+ SCSS")),b&&r.a.createElement("div",{className:h.a.codeblock},r.a.createElement(o.a,{language:"xml",style:N.a},function(e,a){return function(e){var a="";e=e.replace(/(>)(<)(\/*)/g,"$1\r\n$2$3");var t=0;return e.split("\r\n").forEach(function(e,n){var l=0;e.match(/.+<\/\w[^>]*>$/)?l=0:e.match(/^<\/\w/)?0!==t&&(t-=1):l=e.match(/^<\w[^>]*[^\/]>.*$/)?1:0;for(var m="",r=0;r<t;r++)m+="  ";a+=m+e+"\r\n",t+=l}),a}(Object(i.renderToStaticMarkup)(x(e,a)))}(e.children,p))),X&&r.a.createElement("div",{className:h.a.codeblock},r.a.createElement(o.a,{language:"scss",style:N.a},"# SCSS paths coming soon..."))))))};function x(e,a){return"function"===typeof e?e(a):e}b.defaultProps={noTheme:!0}},299:function(e,a,t){e.exports={container:"example_container__8KWcy",codeblock:"example_codeblock__25lok",render:"example_render__1Zlxb",light:"example_light__3X9Nl",dark:"example_dark__2VX9v","toggle-container":"example_toggle-container__16PqW",toggle:"example_toggle__1FS9N",open:"example_open__10Jrv"}},335:function(e,a,t){"use strict";function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}t.r(a);var l=t(294),m=t(0),r=t.n(m),c=t(293),s=t(298),i=t(2);a.default=function(e){var a=e.components;Object(l.a)(e,["components"]);return r.a.createElement(c.MDXTag,{name:"wrapper",components:a},r.a.createElement(c.MDXTag,{name:"h1",components:a},"Grid"),r.a.createElement(c.MDXTag,{name:"h2",components:a},"Introduction"),r.a.createElement(c.MDXTag,{name:"p",components:a},"The Porsche UI Kit grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It is not ment to function as a toolkit for layouting content blocks or components. Therefore the ",r.a.createElement(c.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"#/layout/flex"}},"Flex")," component is the right choice."),r.a.createElement(c.MDXTag,{name:"h3",components:a},"Grid standard"),r.a.createElement(c.MDXTag,{name:"p",components:a},"For standard grid implementation, it is recommended to use this pattern. The class ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"grid")," on the parent and ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"grid__child")," on the children are mandatory. With ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"grid__child--size-(1-12)")," it is possible to define column widths."),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,null,r.a.createElement(i.d.Child,{size:12},r.a.createElement("p",{className:"sg-example-item"},"12"))),Array.apply(0,Array(11)).map(function(e,a){return r.a.createElement(i.d,{key:a},r.a.createElement(i.d.Child,{size:a+1},r.a.createElement("p",{className:"sg-example-item"},a+1)),r.a.createElement(i.d.Child,{size:11-a},r.a.createElement("p",{className:"sg-example-item"},11-a)))}))}),r.a.createElement(c.MDXTag,{name:"hr",components:a}),r.a.createElement(c.MDXTag,{name:"h3",components:a},"Grid offset"),r.a.createElement(c.MDXTag,{name:"p",components:a},"In some cases it can be neccessary to indent columns. The grid gives basic indentions based on grid sizings. The child column has an offset of 1 column on the left and due to its length of 10 columns an offset of 1 column to the right. With ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"grid__child--offset-(0-11)")," it is possible to define offsets."),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,Array.apply(0,Array(11)).map(function(e,a){return r.a.createElement(i.d,{key:a},r.a.createElement(i.d.Child,{offset:a+1,size:11-a},r.a.createElement("p",{className:"sg-example-item"},a+1)))}))}),r.a.createElement(c.MDXTag,{name:"hr",components:a}),r.a.createElement(c.MDXTag,{name:"h3",components:a},"Grid direction"),r.a.createElement(c.MDXTag,{name:"p",components:a},"In some cases it might be neccessary to define or change direction of the columns/rows. Default is ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"row"),". But ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"column")," is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"reverse"),"."),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Row (default)"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{direction:"row"},r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"2")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"3"))))}),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Row reverse"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{direction:"row-reverse"},r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"2")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"3"))))}),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Column"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{direction:"column"},r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"2")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"3"))))}),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Column reverse"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{direction:"column-reverse"},r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"2")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"3"))))}),r.a.createElement(c.MDXTag,{name:"hr",components:a}),r.a.createElement(c.MDXTag,{name:"h3",components:a},"Grid gap"),r.a.createElement(c.MDXTag,{name:"p",components:a},"In some cases it might be useful to adapt the gap of the grid. Default is ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"normal"),". But ",r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"zero")," is also possible to place elements besides each other without spacings."),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Normal (default)"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{gap:"normal"},r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"2")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"3"))))}),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Zero"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{gap:"zero"},r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"2")),r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"3"))))}),r.a.createElement(c.MDXTag,{name:"hr",components:a}),r.a.createElement(c.MDXTag,{name:"h3",components:a},"Grid nesting"),r.a.createElement(c.MDXTag,{name:"p",components:a},'Basic nesting of grids is supported. "Basic" because of percentage value of width and gaps which couldn\'t be calculated for each column width. Here are some examples of "dos" and "don\'ts":'),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,null,r.a.createElement(i.d.Child,{size:6},r.a.createElement("div",{className:"sg-example-item-outer"},r.a.createElement(i.d,null,r.a.createElement(i.d.Child,{size:6},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:6},r.a.createElement("p",{className:"sg-example-item"},"2"))))),r.a.createElement(i.d.Child,{size:6},r.a.createElement("div",{className:"sg-example-item-outer"},r.a.createElement(i.d,null,r.a.createElement(i.d.Child,{size:4},r.a.createElement("p",{className:"sg-example-item"},"1")),r.a.createElement(i.d.Child,{size:8},r.a.createElement("p",{className:"sg-example-item"},"2")))))))}),r.a.createElement(c.MDXTag,{name:"h4",components:a},'Possible nesting by keeping columns in "the grid"'),r.a.createElement(c.MDXTag,{name:"p",components:a},"Only columns with the following widths could be nested:"),r.a.createElement(c.MDXTag,{name:"ul",components:a},r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 8"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 6"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 4")),r.a.createElement(c.MDXTag,{name:"h4",components:a},"Forbidden nesting"),r.a.createElement(c.MDXTag,{name:"p",components:a},'Nesting inside columns with the following widths should be prevented, because all children widths won\'t be in "the grid" anymore:'),r.a.createElement(c.MDXTag,{name:"ul",components:a},r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 11"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 10"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 9"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 7"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 5"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},"total width of 3")),r.a.createElement(c.MDXTag,{name:"hr",components:a}),r.a.createElement(c.MDXTag,{name:"h3",components:a},"Grid responsive"),r.a.createElement(c.MDXTag,{name:"p",components:a},"The grid system is fluid/responsive by itself by using percentages for every value (widths, gaps, offsets). But it can also provide breakpoint specific values to fit the needs of certain viewports:"),r.a.createElement(s.a,{className:"sg-example-grid"},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.d,{gap:{base:"normal",s:"zero",m:"normal"}},r.a.createElement(i.d.Child,{className:"pui-flex",size:{base:12,m:4,l:3},offset:{base:0,m:2,l:0}},r.a.createElement("div",n({className:"pui-flex__child pui-flex__child--auto"},"className","sg-example-item"),r.a.createElement("p",{type:"4-thin"},"Column 1"),r.a.createElement("p",null,"xxs -- size: 12 ",r.a.createElement("br",null),"s -- gap: zero ",r.a.createElement("br",null),"m -- gap: normal, size: 4, offset: 2",r.a.createElement("br",null),"l -- size: 3, offset: 0"))),r.a.createElement(i.d.Child,{className:"pui-flex",size:{base:12,s:6,m:4,l:3},offset:{base:0,s:3,m:0}},r.a.createElement("div",n({className:"pui-flex__child pui-flex__child--auto"},"className","sg-example-item"),r.a.createElement("p",{type:"4-thin"},"Column 2"),r.a.createElement("p",null,"xxs -- size: 12 ",r.a.createElement("br",null),"s -- gap: zero, size: 6, offset: 3",r.a.createElement("br",null),"m -- gap: normal, size: 4, offset: 0",r.a.createElement("br",null),"l -- size: 3"))),r.a.createElement(i.d.Child,{className:"pui-flex",size:{base:12,s:6,l:3}},r.a.createElement("div",n({className:"pui-flex__child pui-flex__child--auto"},"className","sg-example-item"),r.a.createElement("p",{type:"4-thin"},"Column 3"),r.a.createElement("p",null,"xxs -- size: 12 ",r.a.createElement("br",null),"s -- gap: zero, size: 6",r.a.createElement("br",null),"m -- gap: normal",r.a.createElement("br",null),"l -- size: 3"))),r.a.createElement(i.d.Child,{className:"pui-flex",size:{base:12,s:6,l:3}},r.a.createElement("div",n({className:"pui-flex__child pui-flex__child--auto"},"className","sg-example-item"),r.a.createElement("p",{type:"4-thin"},"Column 4"),r.a.createElement("p",null,"xxs -- size: 12 ",r.a.createElement("br",null),"s -- gap: zero, size: 6",r.a.createElement("br",null),"m -- gap: normal",r.a.createElement("br",null),"l -- size: 3")))))}),r.a.createElement(c.MDXTag,{name:"p",components:a},r.a.createElement(c.MDXTag,{name:"strong",components:a,parentName:"p"},"Possible class names on the grid parent container (where {p} is the prefix and {bp} the breakpoint value):")),r.a.createElement(c.MDXTag,{name:"ul",components:a},r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"{p}-grid--direction-{direction}-{bp}")," => direction of columns"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"{p}-grid--gap-{gap}-{bp}")," => use of gaps between columns"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"{p}-grid__child--size-{size}-{bp}")," => size based on amount of columns"),r.a.createElement(c.MDXTag,{name:"li",components:a,parentName:"ul"},r.a.createElement(c.MDXTag,{name:"inlineCode",components:a,parentName:"li"},"{p}-grid__child--size-{offset}-{bp}")," => offset based on amount of columns")))}}}]);
//# sourceMappingURL=16.616af173.chunk.js.map