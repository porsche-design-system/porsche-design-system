(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-640e25fe"],{"047a":function(e,t,n){},1483:function(e,t,n){"use strict";var a=n("047a"),r=n.n(a);r.a},"189b":function(e,t,n){var a=n("72df"),r=n("7d53"),l=n("4fed"),i=r("species");e.exports=function(e){return l>=51||!a((function(){var t=[],n=t.constructor={};return n[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"4fed":function(e,t,n){var a,r,l=n("f498"),i=n("64e4"),o=l.process,s=o&&o.versions,f=s&&s.v8;f?(a=f.split("."),r=a[0]+a[1]):i&&(a=i.match(/Edge\/(\d+)/),(!a||a[1]>=74)&&(a=i.match(/Chrome\/(\d+)/),a&&(r=a[1]))),e.exports=r&&+r},"64e4":function(e,t,n){var a=n("5428");e.exports=a("navigator","userAgent")||""},cfce:function(e,t,n){"use strict";var a=n("6b1d"),r=n("d054").map,l=n("189b"),i=n("ce71"),o=l("map"),s=i("map");a({target:"Array",proto:!0,forced:!o||!s},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},d86f:function(e,t,n){"use strict";var a=n("6b1d"),r=n("72df"),l=n("c6de"),i=n("7526"),o=n("37d1"),s=n("b495"),f=n("dac6"),c=n("6a86"),p=n("189b"),d=n("7d53"),h=n("4fed"),x=d("isConcatSpreadable"),v=9007199254740991,u="Maximum allowed index exceeded",m=h>=51||!r((function(){var e=[];return e[x]=!1,e.concat()[0]!==e})),_=p("concat"),g=function(e){if(!i(e))return!1;var t=e[x];return void 0!==t?!!t:l(e)},b=!m||!_;a({target:"Array",proto:!0,forced:b},{concat:function(e){var t,n,a,r,l,i=o(this),p=c(i,0),d=0;for(t=-1,a=arguments.length;t<a;t++)if(l=-1===t?i:arguments[t],g(l)){if(r=s(l.length),d+r>v)throw TypeError(u);for(n=0;n<r;n++,d++)n in l&&f(p,d,l[n])}else{if(d>=v)throw TypeError(u);f(p,d++,l)}return p.length=d,p}})},ef14:function(e,t,n){"use strict";var a=n("6b1d"),r=n("83a6"),l=n("378c"),i=n("7f8a"),o=[].join,s=r!=Object,f=i("join",",");a({target:"Array",proto:!0,forced:s||!f},{join:function(e){return o.call(l(this),void 0===e?",":e)}})},ffcd:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Flex")]),e._m(0),n("h3",[e._v("Flex")]),n("p",[e._v("Initialize standard Flexbox container to define Flex context.")]),n("Playground",{attrs:{markup:e.flexInline()}}),n("h3",[e._v("Inline")]),n("p",[e._v("Flex inline displays Flex containers in a row.")]),n("Playground",{attrs:{markup:e.flexInline("true")}}),n("h3",[e._v("Responsive")]),e._m(1),n("Playground",{attrs:{markup:e.flexInline("{ base: false, l: true }")}}),n("hr"),n("h3",[e._v("Flex direction")]),n("p",[e._v("Define or change direction of the Flex items to rows or columns and set order.")]),n("h4",[e._v("Row")]),n("Playground",{attrs:{markup:e.direction("row")}}),n("h4",[e._v("Row-reverse")]),n("Playground",{attrs:{markup:e.direction("row-reverse")}}),n("h4",[e._v("Column")]),n("Playground",{attrs:{markup:e.direction("column")}}),n("h4",[e._v("Column-reverse")]),n("Playground",{attrs:{markup:e.direction("column-reverse")}}),n("h4",[e._v("Responsiveness")]),e._m(2),n("Playground",{attrs:{markup:e.direction("{ base: 'column', l: 'row' }")}}),n("hr"),n("h3",[e._v("Flex wrap")]),n("p",[e._v("The flex wrap property is used to force Flex items to stay in line independently of the Flex container width, or to flow in multiple lines forced by the Flex container width.")]),n("h4",[e._v("Nowrap")]),n("Playground",{attrs:{markup:e.wrap()}}),n("h4",[e._v("Wrap")]),n("Playground",{attrs:{markup:e.wrap("wrap")}}),n("h4",[e._v("Wrap-reverse")]),n("Playground",{attrs:{markup:e.wrap("wrap-reverse")}}),n("h4",[e._v("Responsiveness")]),e._m(3),n("Playground",{attrs:{markup:e.wrap("{ base: 'wrap', l: 'nowrap' }")}}),n("hr"),n("h3",[e._v("Flex justify-content")]),n("p",[e._v("This property defines the alignment of Flex items on the main axis in conjunction to their siblings.")]),n("h4",[e._v("Flex-start")]),n("Playground",{attrs:{markup:e.justifyContent()}}),n("h4",[e._v("Flex-end")]),n("Playground",{attrs:{markup:e.justifyContent("flex-end")}}),n("h4",[e._v("Center")]),n("Playground",{attrs:{markup:e.justifyContent("center")}}),n("h4",[e._v("Space-between")]),n("Playground",{attrs:{markup:e.justifyContent("space-between")}}),n("h4",[e._v("Space-around")]),n("Playground",{attrs:{markup:e.justifyContent("space-around")}}),n("h4",[e._v("Space-evenly")]),n("Playground",{attrs:{markup:e.justifyContent("space-evenly")}}),n("h4",[e._v("Responsiveness")]),e._m(4),n("Playground",{attrs:{markup:e.justifyContent("{ base: 'flex-start', l: 'flex-end' }")}}),n("hr"),n("h3",[e._v("Flex align-items")]),n("p",[e._v("This property defines the alignment of Flex items on the cross axis in conjunction to their siblings.")]),n("h4",[e._v("Stretch")]),n("Playground",{attrs:{markup:e.alignItems(),config:{height:"fixed"}}}),n("h4",[e._v("Flex-start")]),n("Playground",{attrs:{markup:e.alignItems("flex-start"),config:{height:"fixed"}}}),n("h4",[e._v("Flex-end")]),n("Playground",{attrs:{markup:e.alignItems("flex-end"),config:{height:"fixed"}}}),n("h4",[e._v("Center")]),n("Playground",{attrs:{markup:e.alignItems("center"),config:{height:"fixed"}}}),n("h4",[e._v("Baseline")]),n("Playground",{attrs:{markup:e.alignItems("baseline"),config:{height:"fixed"}}}),n("h4",[e._v("Responsiveness")]),e._m(5),n("Playground",{attrs:{markup:e.alignItems("{ base: 'flex-start', l: 'flex-end' }"),config:{height:"fixed"}}}),n("hr"),n("h3",[e._v("Flex align-content")]),n("p",[e._v("This aligns Flex items on the cross axis of the Flex container when there is extra space available. This property has only effect when there is more than one line of Flex items.")]),n("h4",[e._v("Stretch")]),n("Playground",{attrs:{markup:e.alignContent(),config:{height:"fixed"}}}),n("h4",[e._v("Flex-start")]),n("Playground",{attrs:{markup:e.alignContent("flex-start"),config:{height:"fixed"}}}),n("h4",[e._v("Flex-end")]),n("Playground",{attrs:{markup:e.alignContent("flex-end"),config:{height:"fixed"}}}),n("h4",[e._v("Center")]),n("Playground",{attrs:{markup:e.alignContent("center"),config:{height:"fixed"}}}),n("h4",[e._v("Space-between")]),n("Playground",{attrs:{markup:e.alignContent("space-between"),config:{height:"fixed"}}}),n("h4",[e._v("Space-around")]),n("Playground",{attrs:{markup:e.alignContent("space-around"),config:{height:"fixed"}}}),n("h4",[e._v("Space-evenly")]),n("Playground",{attrs:{markup:e.alignContent("space-evenly"),config:{height:"fixed"}}}),n("h4",[e._v("Responsiveness")]),e._m(6),n("Playground",{attrs:{markup:e.alignContent("{ base: 'flex-start', l: 'flex-end' }"),config:{height:"fixed"}}}),n("hr"),n("h2",[e._v("Modifier for Flex items (children)")]),n("h3",[e._v("Flex-item width")]),n("p",[e._v("The widths of Flex items is normally defined through its contents by default. But it is also possible to define specific predefined widths.")]),n("h4",[e._v("Specific")]),n("Playground",{attrs:{markup:e.widthSpecific,config:{spacing:"block-small"}}}),n("h4",[e._v("Responsiveness")]),e._m(7),n("Playground",{attrs:{markup:e.widthWrap}}),n("hr"),n("h3",[e._v("Flex-item offset")]),n("p",[e._v("Items can have different offsets that work similar like column widths.")]),n("h4",[e._v("Widths")]),n("Playground",{attrs:{markup:e.offsetWidths,config:{spacing:"block-small"}}}),n("h4",[e._v("Responsive")]),e._m(8),n("Playground",{attrs:{markup:e.offsetReponsive,config:{spacing:"block-small"}}}),n("hr"),n("h3",[e._v("Flex-item align-self")]),n("p",[e._v("You can override the align-items properties of the Flex container for individual Flex items.")]),n("h4",[e._v("Auto")]),n("Playground",{attrs:{markup:e.alignSelf(),config:{height:"fixed"}}}),n("h4",[e._v("Stretch")]),n("Playground",{attrs:{markup:e.alignSelf("stretch","flex-start"),config:{height:"fixed"}}}),n("h4",[e._v("Flex-start")]),n("Playground",{attrs:{markup:e.alignSelf("flex-start"),config:{height:"fixed"}}}),n("h4",[e._v("Flex-end")]),n("Playground",{attrs:{markup:e.alignSelf("flex-end"),config:{height:"fixed"}}}),n("h4",[e._v("Center")]),n("Playground",{attrs:{markup:e.alignSelf("center"),config:{height:"fixed"}}}),n("h4",[e._v("Baseline")]),n("Playground",{attrs:{markup:e.alignSelf("baseline"),config:{height:"fixed"}}}),n("h4",[e._v("Responsiveness")]),e._m(9),n("Playground",{attrs:{markup:e.alignSelf("{ base: 'flex-start', l: 'flex-end' }"),config:{height:"fixed"}}}),n("hr"),n("h3",[e._v("Flex-item grow")]),n("p",[e._v("Flexbox default behaviours on how the item widths are rendered (stretched) can be overwritten with the following class names.")]),n("p",[e._v("It handles how to grow an item based on the space that is left to fulfill the parent's width.")]),n("h4",[e._v("Grow - 0")]),n("Playground",{attrs:{markup:e.grow()}}),n("h4",[e._v("Grow - 1")]),n("Playground",{attrs:{markup:e.grow("1")}}),n("h4",[e._v("Responsiveness")]),e._m(10),n("Playground",{attrs:{markup:e.grow("{ base: 0, l: 1 }")}}),n("hr"),n("h3",[e._v("Flex-item shrink")]),n("p",[e._v("Flexbox default behaviour on how the item widths are rendered (shrinked) can be overwritten with the following class names.")]),n("p",[e._v("It handles how to shrink an item based on the space that exceeds the parents width to fulfill it.")]),n("h4",[e._v("Shrink - 1")]),n("Playground",{attrs:{markup:e.shrink()}}),n("h4",[e._v("Shrink - 0")]),n("Playground",{attrs:{markup:e.shrink("0")}}),n("h4",[e._v("Responsiveness")]),e._m(11),n("Playground",{attrs:{markup:e.shrink("{ base: 0, l: 1 }")}}),n("hr"),n("h3",[e._v("Flex-item shorthand")]),n("p",[e._v("Setting shorthand properties for Flex grow, shrink and base:")]),n("h4",[e._v("Initial (grow:0, shrink:1 and base:auto)")]),n("Playground",{attrs:{markup:e.flexShorthand("initial")}}),n("h4",[e._v("Auto (grow:1, shrink:1 and base:auto)")]),n("Playground",{attrs:{markup:e.flexShorthand("auto")}}),n("h4",[e._v("Equal (grow:1, shrink:1 and base:0)")]),n("Playground",{attrs:{markup:e.flexShorthand("equal")}}),n("h4",[e._v("None (grow:0, shrink:0 and base:auto)")]),n("Playground",{attrs:{markup:e.flexShorthand("none")}}),n("h4",[e._v("Responsiveness")]),e._m(12),n("Playground",{attrs:{markup:e.flexShorthand("{base: 'initial', l: 'equal'}")}})],1)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The Porsche Design System flex layout system is based on standard CSS Flexbox browser behaviour and can be controlled by the properties of the Flex container and Flex item. It can be used to quickly layout standard content blocks or components. It does not replace the "),n("a",{attrs:{href:"#/components/grid"}},[e._v("Grid")]),e._v(" component which should be used to define basic page structures.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(", "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(" and "),n("code",[e._v("xl")]),e._v(".")])}],l=(n("d86f"),n("8423"),n("ef14"),n("cfce"),n("f3b8"),n("d4ec")),i=n("bee2"),o=n("262e"),s=n("2caf"),f=n("0f9e"),c=n("a026"),p=n("2fe1"),d=function(e){Object(o["a"])(n,e);var t=Object(s["a"])(n);function n(){var e;return Object(l["a"])(this,n),e=t.apply(this,arguments),e.widthSpecific='<p-flex class="example-flex">\n  <p-flex-item width="one-quarter">one-quarter</p-flex-item>\n  <p-flex-item width="one-quarter">one-quarter</p-flex-item>\n  <p-flex-item width="one-quarter">one-quarter</p-flex-item>\n  <p-flex-item width="one-quarter">one-quarter</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item width="one-third">one-third</p-flex-item>\n  <p-flex-item width="one-third">one-third</p-flex-item>\n  <p-flex-item width="one-third">one-third</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item width="half">half</p-flex-item>\n  <p-flex-item width="half">half</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item width="two-thirds">two-thirds</p-flex-item>\n  <p-flex-item width="one-third">one-third</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item width="three-quarters">three-quarters</p-flex-item>\n  <p-flex-item width="one-quarter">one-quarter</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item width="full">full</p-flex-item>\n</p-flex>',e.widthWrap="<p-flex wrap=\"wrap\" class=\"example-flex\">\n  <p-flex-item width=\"{ base: 'half', l: 'one-quarter' }\">1</p-flex-item>\n  <p-flex-item width=\"{ base: 'half', l: 'one-quarter' }\">2</p-flex-item>\n  <p-flex-item width=\"{ base: 'half', l: 'one-quarter' }\">3</p-flex-item>\n  <p-flex-item width=\"{ base: 'half', l: 'one-quarter' }\">4</p-flex-item>\n</p-flex>",e.offsetWidths='<p-flex class="example-flex">\n  <p-flex-item offset="one-quarter" width="three-quarters">Offset: quarter</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item offset="one-third" width="two-thirds">Offset: third</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item offset="half" width="half">Offset: half</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item offset="two-thirds" width="one-third">Offset: 2 thirds</p-flex-item>\n</p-flex>\n<p-flex class="example-flex">\n  <p-flex-item offset="three-quarters" width="one-quarter">Offset: 3 quarters</p-flex-item>\n</p-flex>',e.offsetReponsive="<p-flex class=\"example-flex\">\n  <p-flex-item offset=\"{ base: 'none', l: 'one-third' }\">Responsive offset</p-flex-item>\n</p-flex>",e}return Object(i["a"])(n,[{key:"flexInline",value:function(e){var t=e?' inline="'.concat(e,'"'):"";return"<p-flex".concat(t,' class="example-flex">\n  <p-flex-item>1</p-flex-item>\n  <p-flex-item>2</p-flex-item>\n</p-flex>\n<p-flex').concat(t,' class="example-flex">\n  <p-flex-item>1</p-flex-item>\n  <p-flex-item>2</p-flex-item>\n</p-flex>')}},{key:"direction",value:function(e){var t=e?' direction="'.concat(e,'"'):"";return"<p-flex".concat(t,' class="example-flex">\n  <p-flex-item>1</p-flex-item>\n  <p-flex-item>2</p-flex-item>\n  <p-flex-item>3</p-flex-item>\n</p-flex>')}},{key:"wrap",value:function(e){var t=e?' wrap="'.concat(e,'"'):"";return"<p-flex".concat(t,' class="example-flex">\n  ').concat(Array.from(Array(9)).map((function(e,t){return"<p-flex-item>".concat(t+1,"</p-flex-item>")})).join("\n  "),"\n</p-flex>")}},{key:"justifyContent",value:function(e){var t=e?' justify-content="'.concat(e,'"'):"";return"<p-flex".concat(t,' class="example-flex">\n  <p-flex-item>1</p-flex-item>\n  <p-flex-item>2</p-flex-item>\n  <p-flex-item>3</p-flex-item>\n</p-flex>')}},{key:"alignItems",value:function(e){var t=e?' align-items="'.concat(e,'"'):"";return"<p-flex".concat(t,' class="example-flex">\n  <p-flex-item>1</p-flex-item>\n  <p-flex-item>2</p-flex-item>\n  <p-flex-item>3</p-flex-item>\n</p-flex>')}},{key:"alignContent",value:function(e){var t=e?' align-content="'.concat(e,'"'):"";return'<p-flex wrap="wrap"'.concat(t,' class="example-flex">\n  ').concat(Array.from(Array(9)).map((function(e,t){return"<p-flex-item>".concat(t+1,"</p-flex-item>")})).join("\n  "),"\n</p-flex>")}},{key:"alignSelf",value:function(e,t){var n=e?' align-self="'.concat(e,'"'):"",a=t?' align-items="'.concat(t,'"'):"";return"<p-flex".concat(a,' class="example-flex">\n  <p-flex-item').concat("baseline"===e?n:"",">1</p-flex-item>\n  <p-flex-item>2</p-flex-item>\n  <p-flex-item").concat(n,">3</p-flex-item>\n  <p-flex-item>4</p-flex-item>\n</p-flex>")}},{key:"grow",value:function(e){var t=e?' grow="'.concat(e,'"'):"";return'<p-flex class="example-flex">\n  <p-flex-item>1</p-flex-item>\n  <p-flex-item'.concat(t,">2</p-flex-item>\n</p-flex>")}},{key:"shrink",value:function(e){var t=e?' shrink="'.concat(e,'"'):"";return'<p-flex class="example-flex">\n  <p-flex-item'.concat(t,' style="width: 80%">1</p-flex-item>\n  <p-flex-item style="width: 80%">2</p-flex-item>\n</p-flex>')}},{key:"flexShorthand",value:function(e){var t=e?' flex="'.concat(e,'"'):"";return'<p-flex class="example-flex">\n  <p-flex-item'.concat(t,">1 - short content</p-flex-item>\n  <p-flex-item").concat(t,">2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>\n  <p-flex-item").concat(t,">3 - short content</p-flex-item>\n</p-flex>")}}]),n}(c["a"]);d=Object(f["b"])([p["b"]],d);var h=d,x=h,v=(n("1483"),n("2877")),u=Object(v["a"])(x,a,r,!1,null,"9f06a70e",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-640e25fe.c1a80e16.js.map