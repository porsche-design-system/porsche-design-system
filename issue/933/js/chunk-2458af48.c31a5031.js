(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2458af48"],{"2b94":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vmark"},[o("h1",[e._v("Button Pure")]),o("h2",[e._v("Introduction")]),e._m(0),o("p",[e._v("It can be used with or without a label. When hiding the label make sure to provide a descriptive label text for screen readers.")]),o("h2",[e._v("Basic example")]),o("h3",[e._v("With label")]),o("Playground",{attrs:{markup:e.withLabel,config:e.config}}),o("h3",[e._v("Without label")]),o("Playground",{attrs:{markup:e.withoutLabel,config:e.config}}),o("h3",[e._v("Responsive")]),o("Playground",{attrs:{markup:e.responsive,config:e.config}}),o("hr"),o("h2",[e._v("Size")]),e._m(1),e._m(2),o("Playground",{attrs:{markup:e.markupSize,config:e.config}},[o("select",{on:{change:function(t){e.size=t.target.value}}},[o("option",{attrs:{disabled:""}},[e._v("Select a size")]),o("option",[e._v("x-small")]),o("option",[e._v("small")]),o("option",{attrs:{selected:""}},[e._v("medium")]),o("option",[e._v("large")]),o("option",[e._v("x-large")]),o("option",[e._v("inherit")])])]),o("h3",[e._v("Responsive")]),e._m(3),o("Playground",{attrs:{markup:e.markupResponsive,config:e.config}}),o("hr"),o("h2",[e._v("Weight")]),e._m(4),o("Playground",{attrs:{markup:e.markupWeight,config:e.config}},[o("select",{on:{change:function(t){e.weight=t.target.value}}},[o("option",{attrs:{disabled:""}},[e._v("Select a weight")]),o("option",{attrs:{selected:""}},[e._v("thin")]),o("option",[e._v("regular")]),o("option",[e._v("bold")])])]),o("hr"),o("h2",[e._v("Button with specific icon")]),e._m(5),o("Playground",{attrs:{markup:e.icon,config:e.config}}),o("hr"),o("h2",[e._v("Button with custom clickable/focusable area")]),o("p",[e._v("Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines. Therefore a custom padding can be set on the host element.")]),o("Playground",{attrs:{markup:e.clickableArea,config:e.config}}),o("hr"),o("h2",[e._v("Bind events to the button")]),e._m(6),o("Playground",{attrs:{markup:e.events,config:e.config}}),o("hr"),o("h2",[e._v("Remove button from tab order")]),e._m(7),o("Playground",{attrs:{markup:e.taborder,config:e.config}}),o("hr"),o("h2",[e._v("Button with Subline")]),e._m(8),o("Playground",{attrs:{markup:e.subline,config:e.config}},[o("select",{on:{change:function(t){e.size=t.target.value}}},[o("option",{attrs:{disabled:""}},[e._v("Select a size")]),o("option",{attrs:{selected:""}},[e._v("small")]),o("option",[e._v("medium")]),o("option",[e._v("large")]),o("option",[e._v("x-large")])])])],1)},r=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The "),o("code",[e._v("<p-button-pure>")]),e._v(" component is essential to perform events for interactions.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("There are predefined text sizes for the component which should cover most use cases. If a specific text size is needed, the size can be set to "),o("code",[e._v("inherit")]),e._v(" to specify the text size from outside.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[o("strong",[e._v("Hint:")]),e._v(" If you are in "),o("code",[e._v("hideLabel")]),e._v("-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, e.g. setting a font-size of "),o("strong",[e._v('"44px"')]),e._v(" will not generate a box with a "),o("strong",[e._v('"44px"')]),e._v(" width/height but instead a box size generated out of Porsche type-scaling formula which will end in "),o("strong",[e._v('"52px"')]),e._v(" width/height.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The settings above can also be used on different major breakpoints "),o("code",[e._v("xs")]),e._v(", "),o("code",[e._v("s")]),e._v(", "),o("code",[e._v("m")]),e._v(", "),o("code",[e._v("l")]),e._v(" and "),o("code",[e._v("xl")]),e._v(".")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("There are predefined default text weights. Be aware of using the "),o("code",[e._v("thin")]),e._v(" variant only with larger text sizes.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the "),o("code",[e._v("icon")]),e._v(" property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the "),o("code",[e._v("iconSource")]),e._v(" prop.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("You can use native "),o("code",[e._v("click")]),e._v(", "),o("code",[e._v("focus")]),e._v(", "),o("code",[e._v("focusin")]),e._v(", "),o("code",[e._v("blur")]),e._v(" and "),o("code",[e._v("focusout")]),e._v(" events on the button.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("With setting the "),o("code",[e._v("tabbable")]),e._v(" property to "),o("code",[e._v("false")]),e._v(" you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual "),o("code",[e._v("tabindex")]),e._v(" attribute.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("If you need additional information on your button, we provide a "),o("code",[e._v('<p slot="subline" />')]),e._v(". The size of the "),o("em",[e._v("subline")]),e._v(" changes according to the size of the "),o("em",[e._v("label")]),e._v(". We do not support "),o("code",[e._v('size="inherit"')]),e._v(" in this pattern so far.")])}],i=(o("75a4"),o("53ca")),a=o("2b0e"),u=o("2fe1"),l=function(){var e=function(t,o){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])},e(t,o)};return function(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),s=function(e,t,o,n){var r,a=arguments.length,u=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"===("undefined"===typeof Reflect?"undefined":Object(i["a"])(Reflect))&&"function"===typeof Reflect.decorate)u=Reflect.decorate(e,t,o,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(u=(a<3?r(u):a>3?r(t,o,u):r(t,o))||u);return a>3&&u&&Object.defineProperty(t,o,u),u},c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.config={themeable:!0,spacing:"inline"},t.size="medium",t.weight="thin",t.withLabel='<p-button-pure>Some label</p-button-pure>\n<p-button-pure disabled="true">Some label</p-button-pure>\n<p-button-pure loading="true">Some label</p-button-pure>',t.withoutLabel='<p-button-pure hide-label="true">Some label</p-button-pure>\n<p-button-pure hide-label="true" disabled="true">Some label</p-button-pure>\n<p-button-pure hide-label="true" loading="true">Some label</p-button-pure>',t.responsive='<p-button-pure hide-label="{ base: true, l: false }">Some label</p-button-pure>',t.markupResponsive="<p-button-pure size=\"{ base: 'small', l: 'medium' }\">Some label</p-button-pure>",t.icon='<p-button-pure icon="delete">Some label</p-button-pure>\n<p-button-pure icon-source="'+o("8f19")+'" hide-label="true">Some label</p-button-pure>',t.clickableArea='<p-button-pure style="padding: 1rem;">Some label</p-button-pure>\n<p-button-pure hide-label="true" style="padding: 1rem;">Some label</p-button-pure>',t.events="<p-button-pure\n  onclick=\"alert('click')\"\n  onfocus=\"console.log('focus')\"\n  onfocusin=\"console.log('focusin')\"\n  onblur=\"console.log('blur')\"\n  onfocusout=\"console.log('focusout')\"\n>Some label</p-button-pure>",t.taborder='<p-button-pure tabbable="true">Some label</p-button-pure>\n<p-button-pure tabbable="false" hide-label="true">Some label</p-button-pure>',t}return l(t,e),Object.defineProperty(t.prototype,"markupSize",{get:function(){var e="inherit"===this.size?' style="font-size: 48px;"':"";return'<p-button-pure size="'+this.size+'"'+e+">Some label</p-button-pure>"},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"markupWeight",{get:function(){return'<p-button-pure size="medium" weight="'+this.weight+'">Some label</p-button-pure>'},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"subline",{get:function(){return'<p-button-pure size="'+this.size+'">\n  Some label\n  <p slot="subline">Some Subline</p>\n</p-button-pure>\n<p-button-pure size="'+this.size+'" weight="semibold">\n  Some label\n  <p slot="subline">Some Subline</p>\n</p-button-pure>'},enumerable:!1,configurable:!0}),t=s([u["b"]],t),t}(a["a"]),p=c,b=p,f=o("2877"),h=Object(f["a"])(b,n,r,!1,null,null,null);t["default"]=h.exports},"75a4":function(e,t,o){var n=o("6b1d"),r=o("72df"),i=o("378c"),a=o("185a").f,u=o("d4cb"),l=r((function(){a(1)})),s=!u||l;n({target:"Object",stat:!0,forced:s,sham:!u},{getOwnPropertyDescriptor:function(e,t){return a(i(e),t)}})},"8f19":function(e,t,o){e.exports=o.p+"img/icon-custom-kaixin.bbde6f67.svg"}}]);
//# sourceMappingURL=chunk-2458af48.c31a5031.js.map