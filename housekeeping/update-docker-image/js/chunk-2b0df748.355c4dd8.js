(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b0df748"],{"189b":function(o,e,n){var t=n("72df"),a=n("7d53"),i=n("4fed"),r=a("species");o.exports=function(o){return i>=51||!t((function(){var e=[],n=e.constructor={};return n[r]=function(){return{foo:1}},1!==e[o](Boolean).foo}))}},"1a6f":function(o,e,n){o.exports=n.p+"img/icon-custom-kaixin.bbde6f67.svg"},"37d1":function(o,e,n){var t=n("730c");o.exports=function(o){return Object(t(o))}},"43ab":function(o,e,n){},"4fed":function(o,e,n){var t,a,i=n("f498"),r=n("64e4"),l=i.process,c=l&&l.versions,s=c&&c.v8;s?(t=s.split("."),a=t[0]+t[1]):r&&(t=r.match(/Edge\/(\d+)/),(!t||t[1]>=74)&&(t=r.match(/Chrome\/(\d+)/),t&&(a=t[1]))),o.exports=a&&+a},"64e4":function(o,e,n){var t=n("5428");o.exports=t("navigator","userAgent")||""},"6a86":function(o,e,n){var t=n("7526"),a=n("c6de"),i=n("7d53"),r=i("species");o.exports=function(o,e){var n;return a(o)&&(n=o.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?t(n)&&(n=n[r],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"79aa":function(o,e,n){"use strict";n("43ab")},"89e8":function(o,e,n){"use strict";n.r(e);var t=function(){var o=this,e=o.$createElement,n=o._self._c||e;return n("div",{staticClass:"vmark"},[n("h1",[o._v("Link Social")]),o._m(0),n("h2",[o._v("Variants")]),n("p",[o._v("Choose between a set of pre-defined social icons.")]),n("Playground",{attrs:{markup:o.variants,config:o.config}},[n("select",{directives:[{name:"model",rawName:"v-model",value:o.icon,expression:"icon"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(o){return o.selected})).map((function(o){var e="_value"in o?o._value:o.value;return e}));o.icon=e.target.multiple?n:n[0]},o.setLabel]}},[n("option",{attrs:{disabled:""}},[o._v("Select a social platform")]),n("option",{attrs:{value:"logo-facebook"}},[o._v("Facebook")]),n("option",{attrs:{value:"logo-google"}},[o._v("Google")]),n("option",{attrs:{value:"logo-instagram"}},[o._v("Instagram")]),n("option",{attrs:{value:"logo-linkedin"}},[o._v("LinkedIn")]),n("option",{attrs:{value:"logo-pinterest"}},[o._v("Pinterest")]),n("option",{attrs:{value:"logo-twitter"}},[o._v("Twitter")]),n("option",{attrs:{value:"logo-wechat"}},[o._v("WeChat")]),n("option",{attrs:{value:"logo-whatsapp"}},[o._v("WhatsApp")]),n("option",{attrs:{value:"logo-xing"}},[o._v("XING")]),n("option",{attrs:{value:"logo-youtube"}},[o._v("YouTube")])])]),n("h3",[o._v("Responsive")]),n("Playground",{attrs:{markup:o.responsive,config:o.config}}),n("hr"),n("h2",[o._v("Framework routing (anchor nesting)")]),o._m(1),n("Playground",{attrs:{markup:o.routing,config:o.config}}),n("hr"),n("h2",[o._v("Specific icon")]),o._m(2),n("Playground",{attrs:{markup:o.iconMarkup,config:o.config}}),n("hr"),n("h2",[o._v("Pattern of grouped components")]),n("Playground",{attrs:{markup:o.grouped,config:o.config}}),n("h3",[o._v("SCSS code example how to achieve a grouped pattern")]),o._m(3),n("hr"),n("h2",[o._v("Bind events to the Link")]),o._m(4),n("Playground",{attrs:{markup:o.events,config:o.config}})],1)},a=[function(){var o=this,e=o.$createElement,n=o._self._c||e;return n("p",[o._v("The "),n("code",[o._v("<p-link-social>")]),o._v(" component is a set of pre-defined social icons for various fields of application like linking to social media platforms or social sharing dialogs.")])},function(){var o=this,e=o.$createElement,n=o._self._c||e;return n("p",[o._v("To support custom anchor tags (e.g. framework specific routing) you can provide them as a "),n("strong",[o._v("slotted element")]),o._v(" of the component.")])},function(){var o=this,e=o.$createElement,n=o._self._c||e;return n("p",[o._v("If another icon needs to be implemented, just replace the default icon with another pre-defined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the "),n("code",[o._v("icon")]),o._v(" property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the "),n("code",[o._v("iconSource")]),o._v(" prop.")])},function(){var o=this,e=o.$createElement,n=o._self._c||e;return n("pre",[n("code",{staticClass:"language-scss"},[o._v('// With CSS Grid (The more elegant way but not suppoerted by IE11)\n.example-grouped {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, p-px-to-rem(48px));\n  grid-column-gap: $p-spacing-8;\n  grid-row-gap: $p-spacing-8;\n}\n\n// Fallback with IE11 support\n.example-grouped {\n  &::before {\n    content: "";\n    display: block;\n    margin-top: -$p-spacing-8;\n  }\n  > * {\n    margin-top: $p-spacing-8;\n    &:not(:last-child) {\n      margin-right: $p-spacing-8;\n    }\n  }\n}\n')])])},function(){var o=this,e=o.$createElement,n=o._self._c||e;return n("p",[o._v("You can use native "),n("code",[o._v("click")]),o._v(", "),n("code",[o._v("focus")]),o._v(", "),n("code",[o._v("focusin")]),o._v(", "),n("code",[o._v("blur")]),o._v(" and "),n("code",[o._v("focusout")]),o._v(" events on the link.")])}],i=(n("d86f"),n("d4ec")),r=n("bee2"),l=n("262e"),c=n("2caf"),s=n("0f9e"),p=n("2b0e"),u=n("2fe1"),f=function(o){Object(l["a"])(t,o);var e=Object(c["a"])(t);function t(){var o;return Object(i["a"])(this,t),o=e.apply(this,arguments),o.config={themeable:!0,spacing:"inline"},o.icon="logo-facebook",o.label="Facebook",o.responsive='<p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="{ base: true, l: false }" target="_blank" rel="nofollow noopener">Facebook</p-link-social>',o.routing='<p-link-social icon="logo-facebook">\n  <a href="https://www.facebook.com/" target="_blank" rel="nofollow noopener">Facebook</a>\n</p-link-social>',o.iconMarkup='<p-link-social href="#tumblr" icon="logo-tumblr" target="_blank" rel="nofollow noopener">Tumblr</p-link-social>\n<p-link-social href="#kaixin" icon-source="'.concat(n("1a6f"),'" hide-label="true" target="_blank" rel="nofollow noopener">Kaixin</p-link-social>'),o.grouped='<div class="example-grouped">\n<p-link-social href="https://www.facebook.com/" icon="logo-facebook" hide-label="true" target="_blank" rel="nofollow noopener">Facebook</p-link-social>\n<p-link-social href="https://www.google.com/" icon="logo-google" hide-label="true" target="_blank" rel="nofollow noopener">Google</p-link-social>\n<p-link-social href="https://www.instagram.com/" icon="logo-instagram" hide-label="true" target="_blank" rel="nofollow noopener">Instagram</p-link-social>\n<p-link-social href="https://www.linkedin.com/" icon="logo-linkedin" hide-label="true" target="_blank" rel="nofollow noopener">LinkedIn</p-link-social>\n<p-link-social href="https://www.pinterest.com/" icon="logo-pinterest" hide-label="true" target="_blank" rel="nofollow noopener">Pinterest</p-link-social>\n<p-link-social href="https://www.twitter.com/" icon="logo-twitter" hide-label="true" target="_blank" rel="nofollow noopener">Twitter</p-link-social>\n<p-link-social href="https://www.wechat.com/" icon="logo-wechat" hide-label="true" target="_blank" rel="nofollow noopener">Wechat</p-link-social>\n<p-link-social href="https://wa.me/491525557912" icon="logo-whatsapp" hide-label="true" target="_blank" rel="nofollow noopener">Whatsapp</p-link-social>\n<p-link-social href="https://www.xing.com" icon="logo-xing" hide-label="true" target="_blank" rel="nofollow noopener">XING</p-link-social>\n<p-link-social href="https://www.youtube.com" icon="logo-youtube" hide-label="true" target="_blank" rel="nofollow noopener">Youtube</p-link-social>\n</div>',o.events='<p-link-social\n  href="https://www.facebook.com/"\n  icon="logo-facebook"\n  onclick="alert(\'click\'); return false;"\n  onfocus="console.log(\'focus\')"\n  onfocusin="console.log(\'focusin\')"\n  onblur="console.log(\'blur\')"\n  onfocusout="console.log(\'focusout\')"\n  target="_blank" \n  rel="nofollow noopener"\n>Facebook</p-link-social>',o}return Object(r["a"])(t,[{key:"setLabel",value:function(o){var e=o.target.options;this.label=e[e.selectedIndex].textContent}},{key:"variants",get:function(){return'<p-link-social href="#linkToSocialMedia" icon="'.concat(this.icon,'" target="_blank" rel="nofollow noopener">').concat(this.label,'</p-link-social>\n<p-link-social href="#linkToSocialMedia" hide-label="true" icon="').concat(this.icon,'" target="_blank" rel="nofollow noopener">').concat(this.label,"</p-link-social>")}}]),t}(p["a"]);f=Object(s["b"])([u["b"]],f);var g=f,h=g,d=(n("79aa"),n("2877")),v=Object(d["a"])(h,t,a,!1,null,"ae9680c8",null);e["default"]=v.exports},c6de:function(o,e,n){var t=n("6a61");o.exports=Array.isArray||function(o){return"Array"==t(o)}},d86f:function(o,e,n){"use strict";var t=n("6b1d"),a=n("72df"),i=n("c6de"),r=n("7526"),l=n("37d1"),c=n("b495"),s=n("dac6"),p=n("6a86"),u=n("189b"),f=n("7d53"),g=n("4fed"),h=f("isConcatSpreadable"),d=9007199254740991,v="Maximum allowed index exceeded",k=g>=51||!a((function(){var o=[];return o[h]=!1,o.concat()[0]!==o})),b=u("concat"),w=function(o){if(!r(o))return!1;var e=o[h];return void 0!==e?!!e:i(o)},m=!k||!b;t({target:"Array",proto:!0,forced:m},{concat:function(o){var e,n,t,a,i,r=l(this),u=p(r,0),f=0;for(e=-1,t=arguments.length;e<t;e++)if(i=-1===e?r:arguments[e],w(i)){if(a=c(i.length),f+a>d)throw TypeError(v);for(n=0;n<a;n++,f++)n in i&&s(u,f,i[n])}else{if(f>=d)throw TypeError(v);s(u,f++,i)}return u.length=f,u}})},dac6:function(o,e,n){"use strict";var t=n("083f"),a=n("abdf"),i=n("9618");o.exports=function(o,e,n){var r=t(e);r in o?a.f(o,r,i(0,n)):o[r]=n}}}]);
//# sourceMappingURL=chunk-2b0df748.355c4dd8.js.map