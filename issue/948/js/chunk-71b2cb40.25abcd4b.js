(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71b2cb40"],{"189b":function(e,t,n){var o=n("72df"),r=n("7d53"),i=n("4fed"),a=r("species");e.exports=function(e){return i>=51||!o((function(){var t=[],n=t.constructor={};return n[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"37d1":function(e,t,n){var o=n("730c");e.exports=function(e){return Object(o(e))}},"4fed":function(e,t,n){var o,r,i=n("f498"),a=n("64e4"),c=i.process,s=c&&c.versions,l=s&&s.v8;l?(o=l.split("."),r=o[0]+o[1]):a&&(o=a.match(/Edge\/(\d+)/),(!o||o[1]>=74)&&(o=a.match(/Chrome\/(\d+)/),o&&(r=o[1]))),e.exports=r&&+r},"64e4":function(e,t,n){var o=n("5428");e.exports=o("navigator","userAgent")||""},"6a86":function(e,t,n){var o=n("7526"),r=n("c6de"),i=n("7d53"),a=i("species");e.exports=function(e,t){var n;return r(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!r(n.prototype)?o(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},"6c05":function(e,t,n){e.exports=n.p+"img/icon-custom-kaixin.bbde6f67.svg"},c549:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Link Pure")]),e._m(0),n("h2",[e._v("Basic example")]),n("h3",[e._v("With label")]),n("Playground",{attrs:{markup:e.withLabel,config:e.config}}),n("h3",[e._v("Without label")]),n("Playground",{attrs:{markup:e.withoutLabel,config:e.config}}),n("h3",[e._v("Responsive")]),n("Playground",{attrs:{markup:e.responsive,config:e.config}}),n("hr"),n("h2",[e._v("Size")]),e._m(1),e._m(2),n("Playground",{attrs:{markup:e.sizeMarkup,config:e.config}},[n("select",{on:{change:function(t){e.size=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select a style variant")]),n("option",[e._v("x-small")]),n("option",[e._v("small")]),n("option",{attrs:{selected:""}},[e._v("medium")]),n("option",[e._v("large")]),n("option",[e._v("x-large")]),n("option",[e._v("inherit")])])]),n("h3",[e._v("Responsive")]),e._m(3),n("Playground",{attrs:{markup:e.sizeResponsive,config:e.config}}),n("hr"),n("h2",[e._v("Weight")]),e._m(4),n("Playground",{attrs:{markup:e.weightMarkup,config:e.config}},[n("select",{on:{change:function(t){e.weight=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select a weight")]),n("option",{attrs:{selected:""}},[e._v("thin")]),n("option",[e._v("regular")]),n("option",[e._v("bold")])])]),n("hr"),n("h2",[e._v("Framework routing (anchor nesting)")]),e._m(5),n("Playground",{attrs:{markup:e.routing,config:e.config}}),n("hr"),n("h2",[e._v("Active state")]),e._m(6),n("Playground",{attrs:{markup:e.activeHref,config:e.config}}),e._m(7),n("Playground",{attrs:{markup:e.activeWithoutHref,config:e.config}}),n("hr"),n("h2",[e._v('Examples how to use with Framework specific router and "active state" support')]),n("h3",[e._v("Angular")]),e._m(8),n("h3",[e._v("React")]),e._m(9),n("h3",[e._v("VueJs")]),e._m(10),n("h2",[e._v("Link with specific icon")]),e._m(11),n("Playground",{attrs:{markup:e.icon,config:e.config}}),n("hr"),n("h2",[e._v("Link with custom clickable/focusable area")]),n("p",[e._v("Sometimes it might be useful to enlarge the clickable/focusable area of a link to fulfill accessibility guidelines. Therefore a custom padding can be set on the host element.")]),n("Playground",{attrs:{markup:e.clickableArea,config:e.config}}),n("hr"),n("h2",[e._v("Bind events to the link")]),e._m(12),n("Playground",{attrs:{markup:e.events,config:e.config}}),n("hr"),n("h2",[e._v("Link Pure with Subline")]),e._m(13),e._m(14),n("Playground",{attrs:{markup:e.subline,config:e.config}},[n("select",{on:{change:function(t){e.size=t.target.value}}},[n("option",{attrs:{disabled:""}},[e._v("Select a size")]),n("option",{attrs:{selected:""}},[e._v("small")]),n("option",[e._v("medium")]),n("option",[e._v("large")]),n("option",[e._v("x-large")])])])],1)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The "),n("code",[e._v("<p-link-pure>")]),e._v(" component is essential for performing changes in page routes. It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. When used without a label it's best practice to provide a descriptive label text for screen readers. In case you want the user to execute an action, you should select the "),n("a",{attrs:{href:"#/components/button"}},[e._v("Button")]),e._v(" or "),n("a",{attrs:{href:"#/components/button-pure"}},[e._v("Button Pure")]),e._v(" component instead.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("There are predefined text sizes for the component which should cover most use cases. If a specific text size is needed, the size can be set to "),n("code",[e._v("inherit")]),e._v(" to specify the text size from outside.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Hint:")]),e._v(" If you are in "),n("code",[e._v("hideLabel")]),e._v("-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, e.g. setting a font-size of "),n("strong",[e._v('"44px"')]),e._v(" will not generate a box with a "),n("strong",[e._v('"44px"')]),e._v(" width/height but instead a box size generated out of Porsche type-scaling formula which will end in "),n("strong",[e._v('"52px"')]),e._v(" width/height.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("The settings above can also be used on different major breakpoints "),n("code",[e._v("xs")]),e._v(", "),n("code",[e._v("s")]),e._v(", "),n("code",[e._v("m")]),e._v(", "),n("code",[e._v("l")]),e._v(", "),n("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("There are predefined default text weights. Be aware of using the "),n("code",[e._v("thin")]),e._v(" variant only with larger text sizes.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("To support custom anchor tags (e.g. framework specific routing) you can provide them as a "),n("strong",[e._v("slotted element")]),e._v(" (recommended) of the component.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("Providing visually differences if a link changes its state can be achieved by setting the "),n("code",[e._v("active")]),e._v(" property.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If the active state should not render a clickable anchor tag, just remove the "),n("code",[e._v("href")]),e._v(" property.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v('<p-link-pure [active]="rla.isActive">\n  <a routerLink="/path/to/heaven" routerLinkActive #rla="routerLinkActive"></a>\n</p-link-pure>\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v('<PLinkPure active={isActive}>\n  <Link to="/path/to/heaven">Some label</Link>\n</PLinkPure>\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v('<router-link :to="/path/to/heaven" v-slot="{ href, navigate, isActive }">\n  <p-link-pure :href="href" @click="navigate" :active="isActive">Some label</p-link-pure>\n</router-link>\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the "),n("code",[e._v("icon")]),e._v(" property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the "),n("code",[e._v("iconSource")]),e._v(" prop.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("You can use native "),n("code",[e._v("click")]),e._v(", "),n("code",[e._v("focus")]),e._v(", "),n("code",[e._v("focusin")]),e._v(", "),n("code",[e._v("blur")]),e._v(" and "),n("code",[e._v("focusout")]),e._v(" events on the link.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If you need additional information on your link, we provide a "),n("code",[e._v('<p slot="subline" />')]),e._v(". The size of the "),n("em",[e._v("subline")]),e._v(" changes according to the size of the "),n("em",[e._v("label")]),e._v(". We do not support "),n("code",[e._v('size="inherit"')]),e._v(" in this pattern so far.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Note")]),e._v(" If you intend to use a "),n("code",[e._v("<a>")]),e._v(" tag inside of the "),n("code",[e._v("<p-link-pure")]),e._v(" component, keep in mind that the slot needs to be "),n("em",[e._v("outside")]),e._v(" of the anchor tag to function properly!")])}],i=(n("d86f"),n("d4ec")),a=n("bee2"),c=n("262e"),s=n("2caf"),l=n("0f9e"),u=n("2b0e"),p=n("2fe1"),h=function(e){Object(c["a"])(o,e);var t=Object(s["a"])(o);function o(){var e;return Object(i["a"])(this,o),e=t.apply(this,arguments),e.config={themeable:!0,spacing:"inline"},e.size="medium",e.weight="thin",e.withLabel='<p-link-pure href="https://www.porsche.com">Some label</p-link-pure>',e.withoutLabel='<p-link-pure href="https://www.porsche.com" hide-label="true">Some label</p-link-pure>',e.responsive='<p-link-pure href="https://www.porsche.com" hide-label="{ base: true, l: false }">Some label</p-link-pure>',e.sizeResponsive="<p-link-pure href=\"https://www.porsche.com\" size=\"{ base: 'small', l: 'medium' }\">Some label</p-link-pure>",e.routing='<p-link-pure>\n  <a href="https://www.porsche.com">Some label</a>\n</p-link-pure>',e.activeHref='<p-link-pure active="true" href="https://www.porsche.com">Some label</p-link-pure>',e.activeWithoutHref='<p-link-pure active="true">Some label</p-link-pure>',e.icon='<p-link-pure href="https://www.porsche.com" icon="phone">Some label</p-link-pure>\n<p-link-pure icon-source="'.concat(n("6c05"),'" hide-label="true" href="https://www.porsche.com">Some label</p-link-pure>'),e.clickableArea='<p-link-pure href="https://www.porsche.com" style="padding: 1rem;">Some label</p-link-pure>\n<p-link-pure href="https://www.porsche.com" hide-label="true" style="padding: 1rem;">Some label</p-link-pure>\n<a href="https://www.porsche.com" class="example-link">\n  <p-link-pure style="padding: 1rem;">Some label</p-link-pure>\n</a>\n<a href="https://www.porsche.com" class="example-link">\n  <p-link-pure hide-label="true" style="padding: 1rem;">Some label</p-link-pure>\n</a>',e.events='<p-link-pure\n  href="https://www.porsche.com"\n  onclick="alert(\'click\'); return false;"\n  onfocus="console.log(\'focus\')"\n  onfocusin="console.log(\'focusin\')"\n  onblur="console.log(\'blur\')"\n  onfocusout="console.log(\'focusout\')"\n>Some label</p-link-pure>',e}return Object(a["a"])(o,[{key:"sizeMarkup",get:function(){var e="inherit"===this.size?' style="font-size: 48px;"':"";return'<p-link-pure href="https://www.porsche.com" size="'.concat(this.size,'"').concat(e,">Some label</p-link-pure>")}},{key:"weightMarkup",get:function(){return'<p-link-pure href="https://www.porsche.com" size="medium" weight="'.concat(this.weight,'">Some label</p-link-pure>')}},{key:"subline",get:function(){return'<p-link-pure size="'.concat(this.size,'" href="https://www.porsche.com">\n  Some label\n  <p slot="subline">Some Subline</p>\n</p-link-pure>\n<p-link-pure size="').concat(this.size,'" weight="semibold">\n  <a href="https://www.porsche.com">Some label</a>\n  <p slot="subline">Some Subline</p>\n</p-link-pure>')}}]),o}(u["a"]);h=Object(l["b"])([p["b"]],h);var v=h,f=v,d=(n("c751"),n("2877")),_=Object(d["a"])(f,o,r,!1,null,"e9887010",null);t["default"]=_.exports},c6de:function(e,t,n){var o=n("6a61");e.exports=Array.isArray||function(e){return"Array"==o(e)}},c751:function(e,t,n){"use strict";n("e4a5")},d86f:function(e,t,n){"use strict";var o=n("6b1d"),r=n("72df"),i=n("c6de"),a=n("7526"),c=n("37d1"),s=n("b495"),l=n("dac6"),u=n("6a86"),p=n("189b"),h=n("7d53"),v=n("4fed"),f=h("isConcatSpreadable"),d=9007199254740991,_="Maximum allowed index exceeded",m=v>=51||!r((function(){var e=[];return e[f]=!1,e.concat()[0]!==e})),g=p("concat"),b=function(e){if(!a(e))return!1;var t=e[f];return void 0!==t?!!t:i(e)},k=!m||!g;o({target:"Array",proto:!0,forced:k},{concat:function(e){var t,n,o,r,i,a=c(this),p=u(a,0),h=0;for(t=-1,o=arguments.length;t<o;t++)if(i=-1===t?a:arguments[t],b(i)){if(r=s(i.length),h+r>d)throw TypeError(_);for(n=0;n<r;n++,h++)n in i&&l(p,h,i[n])}else{if(h>=d)throw TypeError(_);l(p,h++,i)}return p.length=h,p}})},dac6:function(e,t,n){"use strict";var o=n("083f"),r=n("abdf"),i=n("9618");e.exports=function(e,t,n){var a=o(t);a in e?r.f(e,a,i(0,n)):e[a]=n}},e4a5:function(e,t,n){}}]);
//# sourceMappingURL=chunk-71b2cb40.25abcd4b.js.map