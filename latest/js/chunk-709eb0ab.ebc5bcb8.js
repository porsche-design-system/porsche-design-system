(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-709eb0ab"],{"4cb0":function(t,e,i){"use strict";var n=i("a124");t.exports=function(t,e){return!!t&&n(function(){e?t.call(null,function(){},1):t.call(null)})}},5326:function(t,e,i){"use strict";i.r(e),i.d(e,"p_link",function(){return r});var n=i("b88c"),o=i("06a8"),a=i("a981"),r=function(){function t(t){Object(n["g"])(this,t),this.nativeTabindex=-1,this.tabbable=!0,this.variant="secondary",this.icon="arrow-right-hair",this.iconSource=void 0,this.href=void 0,this.theme="light",this.target="_self",this.download=void 0,this.rel=void 0,this.hideLabel=!1}return t.prototype.componentDidLoad=function(){Object(a["a"])(this.element)},t.prototype.render=function(){Object(a["b"])(this);var t=void 0===this.href?"span":"a",e=Object(o["b"])(Object(o["e"])("link"),Object(o["e"])("link--"+this.variant),Object(o["d"])("link-",this.hideLabel,["without-label","with-label"]),Object(o["e"])("link--theme-"+this.theme)),i=Object(o["e"])("link__icon"),r=Object(o["e"])("link__label");return Object(n["f"])(t,Object.assign({class:e,href:this.href},"a"===t?{href:this.href,target:""+this.target,download:this.download,rel:this.rel}:null,"a"===t&&this.tabbable?{tabindex:0}:{tabindex:-1}),Object(n["f"])("p-icon",{class:i,size:"inherit",name:this.icon,source:this.iconSource}),Object(n["f"])("p-text",{tag:"span",color:"inherit",class:r},Object(n["f"])("slot",null)))},t.prototype.fixEventTarget=function(t){t.target!==this.element&&(t.stopPropagation(),t.preventDefault(),this.element.click())},Object.defineProperty(t.prototype,"element",{get:function(){return Object(n["e"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return'@charset "UTF-8";:host{display:-ms-inline-flexbox;display:inline-flex;vertical-align:top}.p-link{display:-ms-flexbox;display:flex;width:100%;min-width:3rem;min-height:3rem;position:relative;margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;text-decoration:none;border-style:solid;border-width:1px;-webkit-transition:background-color .24s ease,border-color .24s ease,outline-color .24s ease,color .24s ease;transition:background-color .24s ease,border-color .24s ease,outline-color .24s ease,color .24s ease}.p-link::-moz-focus-inner{border:0}.p-link:focus{outline:2px solid #00d5b9;outline-offset:1px}.p-link--theme-light{outline-color:#fff}.p-link--theme-dark{outline-color:#000}.p-link--primary,.p-link--primary.p-link--theme-dark{color:#fff;background-color:#d5001c;border-color:#d5001c}.p-link--primary:active,.p-link--primary:active.p-link--theme-dark,.p-link--primary:hover,.p-link--primary:hover.p-link--theme-dark{color:#fff;background-color:#960014;border-color:#960014}.p-link--secondary{color:#fff;background-color:#323639;border-color:#323639}.p-link--secondary.p-link--theme-dark{color:#000;background-color:#fff;border-color:#fff}.p-link--secondary:active,.p-link--secondary:hover{color:#fff;background-color:#1a2023;border-color:#1a2023}.p-link--secondary:active.p-link--theme-dark,.p-link--secondary:hover.p-link--theme-dark{color:#000;background-color:#e3e4e5;border-color:#e3e4e5}.p-link--tertiary{color:#000;background-color:transparent;border-color:#323639}.p-link--tertiary.p-link--theme-dark{color:#fff;background-color:transparent;border-color:#fff}.p-link--tertiary:active,.p-link--tertiary:hover{color:#fff;background-color:#1a2023;border-color:#1a2023}.p-link--tertiary:active.p-link--theme-dark,.p-link--tertiary:hover.p-link--theme-dark{color:#000;background-color:#fff;border-color:#fff}.p-link--with-label{padding:.6875rem .9375rem .6875rem 2.4375rem}.p-link--with-label .p-link__label{position:static;width:100%;height:auto;margin:0;padding:0;white-space:normal;overflow:visible;border:0;clip:auto;-webkit-clip-path:none;clip-path:none}.p-link--with-label .p-link__icon{position:absolute;left:.6875rem;top:.6875rem;width:1.5rem;height:1.5rem;-webkit-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}.p-link--without-label{padding:0}.p-link--without-label .p-link__label{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.p-link--without-label .p-link__icon{position:absolute;left:50%;top:50%;width:2.25rem;height:2.25rem;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}@media (min-width:480px){.p-link--with-label-xs{padding:.6875rem .9375rem .6875rem 2.4375rem}.p-link--with-label-xs .p-link__label{position:static;width:100%;height:auto;margin:0;padding:0;white-space:normal;overflow:visible;border:0;clip:auto;-webkit-clip-path:none;clip-path:none}.p-link--with-label-xs .p-link__icon{position:absolute;left:.6875rem;top:.6875rem;width:1.5rem;height:1.5rem;-webkit-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}.p-link--without-label-xs{padding:0}.p-link--without-label-xs .p-link__label{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.p-link--without-label-xs .p-link__icon{position:absolute;left:50%;top:50%;width:2.25rem;height:2.25rem;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}}@media (min-width:760px){.p-link--with-label-s{padding:.6875rem .9375rem .6875rem 2.4375rem}.p-link--with-label-s .p-link__label{position:static;width:100%;height:auto;margin:0;padding:0;white-space:normal;overflow:visible;border:0;clip:auto;-webkit-clip-path:none;clip-path:none}.p-link--with-label-s .p-link__icon{position:absolute;left:.6875rem;top:.6875rem;width:1.5rem;height:1.5rem;-webkit-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}.p-link--without-label-s{padding:0}.p-link--without-label-s .p-link__label{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.p-link--without-label-s .p-link__icon{position:absolute;left:50%;top:50%;width:2.25rem;height:2.25rem;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}}@media (min-width:1000px){.p-link--with-label-m{padding:.6875rem .9375rem .6875rem 2.4375rem}.p-link--with-label-m .p-link__label{position:static;width:100%;height:auto;margin:0;padding:0;white-space:normal;overflow:visible;border:0;clip:auto;-webkit-clip-path:none;clip-path:none}.p-link--with-label-m .p-link__icon{position:absolute;left:.6875rem;top:.6875rem;width:1.5rem;height:1.5rem;-webkit-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}.p-link--without-label-m{padding:0}.p-link--without-label-m .p-link__label{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.p-link--without-label-m .p-link__icon{position:absolute;left:50%;top:50%;width:2.25rem;height:2.25rem;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}}@media (min-width:1300px){.p-link--with-label-l{padding:.6875rem .9375rem .6875rem 2.4375rem}.p-link--with-label-l .p-link__label{position:static;width:100%;height:auto;margin:0;padding:0;white-space:normal;overflow:visible;border:0;clip:auto;-webkit-clip-path:none;clip-path:none}.p-link--with-label-l .p-link__icon{position:absolute;left:.6875rem;top:.6875rem;width:1.5rem;height:1.5rem;-webkit-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}.p-link--without-label-l{padding:0}.p-link--without-label-l .p-link__label{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.p-link--without-label-l .p-link__icon{position:absolute;left:50%;top:50%;width:2.25rem;height:2.25rem;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}}@media (min-width:1760px){.p-link--with-label-xl{padding:.6875rem .9375rem .6875rem 2.4375rem}.p-link--with-label-xl .p-link__label{position:static;width:100%;height:auto;margin:0;padding:0;white-space:normal;overflow:visible;border:0;clip:auto;-webkit-clip-path:none;clip-path:none}.p-link--with-label-xl .p-link__icon{position:absolute;left:.6875rem;top:.6875rem;width:1.5rem;height:1.5rem;-webkit-transform:translateX(0) translateY(0);transform:translateX(0) translateY(0)}.p-link--without-label-xl{padding:0}.p-link--without-label-xl .p-link__label{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.p-link--without-label-xl .p-link__icon´{position:absolute;left:50%;top:50%;width:2.25rem;height:2.25rem;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}}.p-link__label{display:block;-webkit-box-sizing:border-box;box-sizing:border-box}'},enumerable:!0,configurable:!0}),t}()},"632c":function(t,e,i){"use strict";var n=i("ef37"),o=i("d3d5"),a=i("79c1"),r=i("a124"),l=[].sort,p=[1,2,3];n(n.P+n.F*(r(function(){p.sort(void 0)})||!r(function(){p.sort(null)})||!i("4cb0")(l)),"Array",{sort:function(t){return void 0===t?l.call(a(this)):l.call(a(this),o(t))}})},a981:function(t,e,i){"use strict";i.d(e,"a",function(){return r}),i.d(e,"b",function(){return l});i("632c");function n(t){void 0===t&&(t=document);var e='\n    button:not([tabindex="-1"]):not([disabled]),\n    [contenteditable]:not([tabindex="-1"]),\n    video[controls]:not([tabindex="-1"]),\n    audio[controls]:not([tabindex="-1"]),\n    [href]:not([tabindex="-1"]),\n    input:not([tabindex="-1"]):not([disabled]),\n    select:not([tabindex="-1"]):not([disabled]),\n    textarea:not([tabindex="-1"]):not([disabled]),\n    [tabindex="0"]\n  ',i=t.querySelectorAll(e),n=[].slice.call(i);return n.sort(function(t,e){return t.tabIndex-e.tabIndex}),n}function o(t,e){if("function"===typeof FocusEvent)return new FocusEvent(t,{bubbles:e});var i=document.createEvent("FocusEvent");return i.initEvent(t,e,!1),i}function a(t){if(t.shadowRoot&&t.shadowRoot.host)return t.shadowRoot.activeElement;var e=t.getRootNode();return e.activeElement}function r(t){var e=t.shadowRoot?t.shadowRoot:t;if(t.focus=function(){var t=n(e)[0];t&&t.focus()},t.blur=function(){var i=a(t);i&&e.contains(i)&&i.blur()},!t.shadowRoot||!t.shadowRoot.host){var i=t.children.item(0);i&&(i.addEventListener("focusin",function(e){var i=t.contains(e.relatedTarget);i||(t.dispatchEvent(o("focus",!1)),t.dispatchEvent(o("focusin",!0))),e.stopPropagation()}),i.addEventListener("focusout",function(e){var i=t.contains(e.relatedTarget);i||(t.dispatchEvent(o("blur",!1)),t.dispatchEvent(o("focusout",!0))),e.stopPropagation()}))}}function l(t){t.nativeTabindex>-1&&(console.warn("You can not set the tabindex on the host element of Porsche UI-Kit components. Please use `tabbable` instead."),t.element.tabIndex=-1,t.element.removeAttribute("tabindex"),t.nativeTabindex=-1)}}}]);
//# sourceMappingURL=chunk-709eb0ab.ebc5bcb8.js.map