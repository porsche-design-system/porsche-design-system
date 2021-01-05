(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd83c618"],{"189b":function(e,t,o){var n=o("72df"),r=o("7d53"),i=o("4fed"),a=r("species");e.exports=function(e){return i>=51||!n((function(){var t=[],o=t.constructor={};return o[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"37d1":function(e,t,o){var n=o("730c");e.exports=function(e){return Object(n(e))}},"4fed":function(e,t,o){var n,r,i=o("f498"),a=o("64e4"),u=i.process,s=u&&u.versions,c=s&&s.v8;c?(n=c.split("."),r=n[0]+n[1]):a&&(n=a.match(/Edge\/(\d+)/),(!n||n[1]>=74)&&(n=a.match(/Chrome\/(\d+)/),n&&(r=n[1]))),e.exports=r&&+r},"64e4":function(e,t,o){var n=o("5428");e.exports=n("navigator","userAgent")||""},"6a71":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vmark"},[o("h1",[e._v("Button Pure")]),e._m(0),o("h2",[e._v("Basic example")]),o("h3",[e._v("With label")]),o("Playground",{attrs:{markup:e.withLabel,config:e.config}}),o("h3",[e._v("Without label")]),o("Playground",{attrs:{markup:e.withoutLabel,config:e.config}}),o("h3",[e._v("Responsive")]),o("Playground",{attrs:{markup:e.responsive,config:e.config}}),o("hr"),o("h2",[e._v("Size")]),e._m(1),e._m(2),o("Playground",{attrs:{markup:e.markupSize,config:e.config}},[o("select",{on:{change:function(t){e.size=t.target.value}}},[o("option",{attrs:{disabled:""}},[e._v("Select a size")]),o("option",[e._v("x-small")]),o("option",[e._v("small")]),o("option",{attrs:{selected:""}},[e._v("medium")]),o("option",[e._v("large")]),o("option",[e._v("x-large")]),o("option",[e._v("inherit")])])]),o("h3",[e._v("Responsive")]),e._m(3),o("Playground",{attrs:{markup:e.markupResponsive,config:e.config}}),o("hr"),o("h2",[e._v("Weight")]),e._m(4),o("Playground",{attrs:{markup:e.markupWeight,config:e.config}},[o("select",{on:{change:function(t){e.weight=t.target.value}}},[o("option",{attrs:{disabled:""}},[e._v("Select a weight")]),o("option",{attrs:{selected:""}},[e._v("thin")]),o("option",[e._v("regular")]),o("option",[e._v("bold")])])]),o("hr"),o("h2",[e._v("Button with specific icon")]),e._m(5),o("Playground",{attrs:{markup:e.icon,config:e.config}}),o("hr"),o("h2",[e._v("Button with custom clickable/focusable area")]),o("p",[e._v("Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines. Therefore a custom padding can be set on the host element.")]),o("Playground",{attrs:{markup:e.clickableArea,config:e.config}}),o("hr"),o("h2",[e._v("Bind events to the button")]),e._m(6),o("Playground",{attrs:{markup:e.events,config:e.config}}),o("hr"),o("h2",[e._v("Remove button from tab order")]),e._m(7),o("Playground",{attrs:{markup:e.taborder,config:e.config}}),o("hr"),o("h2",[e._v("Button with Subline")]),e._m(8),o("Playground",{attrs:{markup:e.subline,config:e.config}},[o("select",{on:{change:function(t){e.size=t.target.value}}},[o("option",{attrs:{disabled:""}},[e._v("Select a size")]),o("option",{attrs:{selected:""}},[e._v("small")]),o("option",[e._v("medium")]),o("option",[e._v("large")]),o("option",[e._v("x-large")])])])],1)},r=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The "),o("code",[e._v("<p-button-pure>")]),e._v(" component is essential to perform events for interactions. It can be used with or without a label. When hiding the label make sure to provide a descriptive label text for screen readers. Whenever you want to provide navigational elements, stick to the "),o("a",{attrs:{href:"#/components/link"}},[e._v("Link")]),e._v(" or "),o("a",{attrs:{href:"#/components/link-pure"}},[e._v("Link Pure")]),e._v(" component instead.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("There are predefined text sizes for the component which should cover most use cases. If a specific text size is needed, the size can be set to "),o("code",[e._v("inherit")]),e._v(" to specify the text size from outside.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[o("strong",[e._v("Hint:")]),e._v(" If you are in "),o("code",[e._v("hideLabel")]),e._v("-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, e.g. setting a font-size of "),o("strong",[e._v('"44px"')]),e._v(" will not generate a box with a "),o("strong",[e._v('"44px"')]),e._v(" width/height but instead a box size generated out of Porsche type-scaling formula which will end in "),o("strong",[e._v('"52px"')]),e._v(" width/height.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The settings above can also be used on different major breakpoints "),o("code",[e._v("xs")]),e._v(", "),o("code",[e._v("s")]),e._v(", "),o("code",[e._v("m")]),e._v(", "),o("code",[e._v("l")]),e._v(" and "),o("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("There are predefined default text weights. Be aware of using the "),o("code",[e._v("thin")]),e._v(" variant only with larger text sizes.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the "),o("code",[e._v("icon")]),e._v(" property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the "),o("code",[e._v("iconSource")]),e._v(" prop.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("You can use native "),o("code",[e._v("click")]),e._v(", "),o("code",[e._v("focus")]),e._v(", "),o("code",[e._v("focusin")]),e._v(", "),o("code",[e._v("blur")]),e._v(" and "),o("code",[e._v("focusout")]),e._v(" events on the button.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("With setting the "),o("code",[e._v("tabbable")]),e._v(" property to "),o("code",[e._v("false")]),e._v(" you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual "),o("code",[e._v("tabindex")]),e._v(" attribute.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("If you need additional information on your button, we provide a "),o("code",[e._v('<p slot="subline" />')]),e._v(". The size of the "),o("em",[e._v("subline")]),e._v(" changes according to the size of the "),o("em",[e._v("label")]),e._v(". We do not support "),o("code",[e._v('size="inherit"')]),e._v(" in this pattern so far.")])}],i=(o("d86f"),o("d4ec")),a=o("bee2"),u=o("262e"),s=o("2caf"),c=o("0f9e"),l=o("2b0e"),p=o("2fe1"),v=function(e){Object(u["a"])(n,e);var t=Object(s["a"])(n);function n(){var e;return Object(i["a"])(this,n),e=t.apply(this,arguments),e.config={themeable:!0,spacing:"inline"},e.size="medium",e.weight="thin",e.withLabel='<p-button-pure>Some label</p-button-pure>\n<p-button-pure disabled="true">Some label</p-button-pure>\n<p-button-pure loading="true">Some label</p-button-pure>',e.withoutLabel='<p-button-pure hide-label="true">Some label</p-button-pure>\n<p-button-pure hide-label="true" disabled="true">Some label</p-button-pure>\n<p-button-pure hide-label="true" loading="true">Some label</p-button-pure>',e.responsive='<p-button-pure hide-label="{ base: true, l: false }">Some label</p-button-pure>',e.markupResponsive="<p-button-pure size=\"{ base: 'small', l: 'medium' }\">Some label</p-button-pure>",e.icon='<p-button-pure icon="delete">Some label</p-button-pure>\n<p-button-pure icon-source="'.concat(o("8f19"),'" hide-label="true">Some label</p-button-pure>'),e.clickableArea='<p-button-pure style="padding: 1rem;">Some label</p-button-pure>\n<p-button-pure hide-label="true" style="padding: 1rem;">Some label</p-button-pure>',e.events="<p-button-pure\n  onclick=\"alert('click')\"\n  onfocus=\"console.log('focus')\"\n  onfocusin=\"console.log('focusin')\"\n  onblur=\"console.log('blur')\"\n  onfocusout=\"console.log('focusout')\"\n>Some label</p-button-pure>",e.taborder='<p-button-pure tabbable="true">Some label</p-button-pure>\n<p-button-pure tabbable="false" hide-label="true">Some label</p-button-pure>',e}return Object(a["a"])(n,[{key:"markupSize",get:function(){var e="inherit"===this.size?' style="font-size: 48px;"':"";return'<p-button-pure size="'.concat(this.size,'"').concat(e,">Some label</p-button-pure>")}},{key:"markupWeight",get:function(){return'<p-button-pure size="medium" weight="'.concat(this.weight,'">Some label</p-button-pure>')}},{key:"subline",get:function(){return'<p-button-pure size="'.concat(this.size,'">\n  Some label\n  <p slot="subline">Some Subline</p>\n</p-button-pure>\n<p-button-pure size="').concat(this.size,'" weight="semibold">\n  Some label\n  <p slot="subline">Some Subline</p>\n</p-button-pure>')}}]),n}(l["a"]);v=Object(c["b"])([p["b"]],v);var b=v,d=b,f=o("2877"),h=Object(f["a"])(d,n,r,!1,null,null,null);t["default"]=h.exports},"6a86":function(e,t,o){var n=o("7526"),r=o("c6de"),i=o("7d53"),a=i("species");e.exports=function(e,t){var o;return r(e)&&(o=e.constructor,"function"!=typeof o||o!==Array&&!r(o.prototype)?n(o)&&(o=o[a],null===o&&(o=void 0)):o=void 0),new(void 0===o?Array:o)(0===t?0:t)}},"8f19":function(e,t,o){e.exports=o.p+"img/icon-custom-kaixin.bbde6f67.svg"},c6de:function(e,t,o){var n=o("6a61");e.exports=Array.isArray||function(e){return"Array"==n(e)}},d86f:function(e,t,o){"use strict";var n=o("6b1d"),r=o("72df"),i=o("c6de"),a=o("7526"),u=o("37d1"),s=o("b495"),c=o("dac6"),l=o("6a86"),p=o("189b"),v=o("7d53"),b=o("4fed"),d=v("isConcatSpreadable"),f=9007199254740991,h="Maximum allowed index exceeded",_=b>=51||!r((function(){var e=[];return e[d]=!1,e.concat()[0]!==e})),m=p("concat"),g=function(e){if(!a(e))return!1;var t=e[d];return void 0!==t?!!t:i(e)},w=!_||!m;n({target:"Array",proto:!0,forced:w},{concat:function(e){var t,o,n,r,i,a=u(this),p=l(a,0),v=0;for(t=-1,n=arguments.length;t<n;t++)if(i=-1===t?a:arguments[t],g(i)){if(r=s(i.length),v+r>f)throw TypeError(h);for(o=0;o<r;o++,v++)o in i&&c(p,v,i[o])}else{if(v>=f)throw TypeError(h);c(p,v++,i)}return p.length=v,p}})},dac6:function(e,t,o){"use strict";var n=o("083f"),r=o("abdf"),i=o("9618");e.exports=function(e,t,o){var a=n(t);a in e?r.f(e,a,i(0,o)):e[a]=o}}}]);
//# sourceMappingURL=chunk-fd83c618.dd96b58c.js.map