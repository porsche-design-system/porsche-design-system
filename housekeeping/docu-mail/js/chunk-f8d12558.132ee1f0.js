(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8d12558"],{"0f9e":function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));function i(e,t,o,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(r<3?n(a):r>3?n(t,o,a):n(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a}},"195f":function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vmark"},[i("h1",[e._v("Icon")]),e._m(0),e._m(1),i("h2",[e._v("Size")]),e._m(2),i("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(){return[i("select",{on:{change:function(t){e.size=t.target.value}}},[i("option",{attrs:{disabled:""}},[e._v("Select a size")]),i("option",{attrs:{selected:""}},[e._v("small")]),i("option",[e._v("medium")]),i("option",[e._v("large")]),i("option",[e._v("inherit")])])]},proxy:!0},{key:"default",fn:function(t){var o=t.theme;return[i("p-icon",{style:e.isInheritSize,attrs:{theme:o,size:e.size,name:"highway","aria-label":"Highway icon"}})]}}])}),i("hr"),i("h2",[e._v("Color")]),i("p",[e._v("Predefined colors associated with its theme are available. Furthermore, inherit mode can be used to define a custom color.")]),i("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"configurator",fn:function(){return[i("select",{on:{change:function(t){e.color=t.target.value}}},[i("option",{attrs:{disabled:""}},[e._v("Select a color")]),i("option",{attrs:{value:"brand"}},[e._v("Brand")]),i("option",{attrs:{value:"default",selected:""}},[e._v("Default")]),i("option",{attrs:{value:"neutral-contrast-high"}},[e._v("Neutral Contrast High")]),i("option",{attrs:{value:"neutral-contrast-medium"}},[e._v("Neutral Contrast Medium")]),i("option",{attrs:{value:"neutral-contrast-low"}},[e._v("Neutral Contrast Low")]),i("option",{attrs:{value:"notification-success"}},[e._v("Notification Success")]),i("option",{attrs:{value:"notification-warning"}},[e._v("Notification Warning")]),i("option",{attrs:{value:"notification-error"}},[e._v("Notification Error")]),i("option",{attrs:{value:"inherit"}},[e._v("Inherit")])])]},proxy:!0},{key:"default",fn:function(t){var o=t.theme;return[i("p-icon",{style:e.isInheritColor,attrs:{theme:o,name:"highway",size:"large",color:e.color,"aria-label":"Highway icon"}})]}}])}),i("hr"),i("h2",[e._v("Custom icon")]),e._m(3),i("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[i("p-icon",{attrs:{theme:t,source:o("faac"),size:"large","aria-label":"Icon for social media platform Kaixin"}})]}}])}),i("hr"),i("h2",[e._v("Lazy loaded icon")]),i("p",[e._v("Icons can be lazy loaded, which means that they are being loaded (fetched) when they get visible in the viewport.")]),i("Playground",{attrs:{themeable:!0},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.theme;return[i("p-icon",{attrs:{theme:t,name:"info",size:"large",lazy:"true","aria-label":"Information icon"}})]}}])}),i("hr"),i("h2",[e._v("Accessibility")]),i("p",[e._v("With the use of SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:")]),e._m(4),e._m(5)],1)},n=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The Porsche Design System is using a "),o("strong",[e._v("SVG icon system")]),e._v(" to visually present an icon object. Each icon is hosted on the Porsche Design System CDN to be served and cached as fast as possible. To reference an icon just use the "),o("code",[e._v("icon")]),e._v(" property with a predefined icon id.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("For more information and a complete overview of all available Porsche icons, head over to Porsche Icons ("),o("a",{attrs:{href:"https://icons.porsche.com"}},[e._v("Porsche Icons")]),e._v(").")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("There are default sizes for the icon component which should cover most use cases. If a specific size is needed, the size can be set to "),o("code",[e._v("inherit")]),e._v(" in order to specify the size from outside.")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The whole Porsche icon set is hosted on the Porsche Design System CDN. If there is need to show a custom icon which doesn't exist yet, you can define a custom path (absolute or relative) to your SVG icon in the "),o("code",[e._v("source")]),e._v(" property. Be sure that the custom icon serves the specific needs like size and viewbox which are described in the "),o("a",{attrs:{href:"#/web/components/icon/icon#design"}},[e._v("design documentation")]),e._v(".")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[e._v("If icons stand alone, adding descriptive text with an "),o("code",[e._v("aria-label")]),e._v(" attribute is a good practice:")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("pre",[o("code",[e._v('<p-icon aria-label="descriptive text, e.g: close the layer" />\n')])])}],r=o("d4ec"),a=o("bee2"),s=o("99de"),c=o("7e84"),l=o("262e"),h=o("0f9e"),u=o("60a3"),d=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(s["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.size="small",e.color="default",e}return Object(l["a"])(t,e),Object(a["a"])(t,[{key:"isInheritSize",get:function(){return"inherit"===this.size?"width: 96px; height: 96px;":void 0}},{key:"isInheritColor",get:function(){return"inherit"===this.color?"color: deeppink":void 0}}]),t}(u["c"]);d=Object(h["a"])([u["a"]],d);var f=d,v=f,p=o("2877"),_=Object(p["a"])(v,i,n,!1,null,null,null);t["default"]=_.exports},faac:function(e,t,o){e.exports=o.p+"img/icon-custom-kaixin.bbde6f67.svg"}}]);
//# sourceMappingURL=chunk-f8d12558.132ee1f0.js.map