(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b38aa"],{"298e":function(e,t,i){"use strict";i.r(t),i.d(t,"p_icon",(function(){return p})),i.d(t,"p_text",(function(){return f}));i("c975"),i("b0c0"),i("4ec9"),i("d3b7"),i("3ca3"),i("ddb0");var o=i("ad12"),n=i("7a71"),r=function(e){return"string"===typeof e},s=function(e){if(e){var t=document.createElement("div");t.innerHTML=e;for(var i=t.childNodes.length-1;i>=0;i--)"svg"!==t.childNodes[i].nodeName.toLowerCase()&&t.removeChild(t.childNodes[i]);var o=t.firstElementChild;if(o&&"svg"===o.nodeName.toLowerCase()&&(o.setAttribute("focusable","false"),l(o)))return t.innerHTML}return""},l=function e(t){if(1===t.nodeType){if("script"===t.nodeName.toLowerCase())return!1;for(var i=0;i<t.attributes.length;i++){var o=t.attributes[i].value;if(r(o)&&0===o.toLowerCase().indexOf("on"))return!1}for(i=0;i<t.childNodes.length;i++)if(!e(t.childNodes[i]))return!1}return!0},c=new Map,a=new Map,h=function(e){var t=a.get(e);return t||(t=fetch(e).then((function(t){if(t.ok)return t.text().then((function(t){c.set(e,s(t))}));c.set(e,"")})),a.set(e,t)),t},p=function(){function e(e){Object(o["h"])(this,e),this.name="arrow-head-right",this.variant="outline",this.color="default",this.size="small",this.lazy=!1,this.theme="light",this.isVisible=!1}return e.prototype.connectedCallback=function(){var e=this;this.waitUntilVisible(this.el,"50px",(function(){e.isVisible=!0,e.loadIcon()}))},e.prototype.disconnectedCallback=function(){this.io&&(this.io.disconnect(),this.io=void 0)},e.prototype.loadIcon=function(){var e=this;if(this.isVisible){var t=this.getSource();c.has(t)?this.svgContent=c.get(t):h(t).then((function(){return e.svgContent=c.get(t)}))}},e.prototype.getSource=function(){return this.name&&!this.source?"https://cdn.ui.porsche.com/porsche-icons/icons/"+this.variant+"/"+this.name+".svg":this.source?this.source:(console.warn("Please provide either an name property or a source property!"),"")},e.prototype.render=function(){var e=Object(n["a"])(Object(n["c"])("icon"),Object(n["c"])("icon--size-"+this.size),Object(n["c"])("icon--color-"+this.color),"inherit"!==this.color&&Object(n["c"])("icon--theme-"+this.theme));return Object(o["g"])(o["a"],{role:"img"},this.svgContent?Object(o["g"])("i",{class:e,innerHTML:this.svgContent}):Object(o["g"])("i",{class:e}))},e.prototype.waitUntilVisible=function(e,t,i){var o=this;if(this.lazy&&"undefined"!==typeof window&&window.IntersectionObserver){var n=this.io=new window.IntersectionObserver((function(e){e[0].isIntersecting&&(n.disconnect(),o.io=void 0,i())}),{rootMargin:t});n.observe(e)}else i()},Object.defineProperty(e.prototype,"el",{get:function(){return Object(o["d"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{source:["loadIcon"],name:["loadIcon"]}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{display:-ms-inline-flexbox;display:inline-flex;vertical-align:top}.p-icon{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.p-icon,.p-icon--size-small{width:1.5rem;height:1.5rem}.p-icon--size-medium{width:2.25rem;height:2.25rem}.p-icon--size-large{width:3rem;height:3rem}.p-icon--size-inherit{width:inherit;height:inherit}.p-icon--color-brand.p-icon--theme-dark,.p-icon--color-brand.p-icon--theme-light{fill:#d5001c}.p-icon--color-default.p-icon--theme-light{fill:#000}.p-icon--color-default.p-icon--theme-dark{fill:#fff}.p-icon--color-neutral-1.p-icon--theme-light{fill:#323639}.p-icon--color-neutral-1.p-icon--theme-dark{fill:#e3e4e5}.p-icon--color-neutral-2.p-icon--theme-light{fill:#4a4e51}.p-icon--color-neutral-2.p-icon--theme-dark{fill:#c9cacb}.p-icon--color-neutral-3.p-icon--theme-light{fill:#626669}.p-icon--color-neutral-3.p-icon--theme-dark{fill:#b0b1b2}.p-icon--color-notification-success.p-icon--theme-dark,.p-icon--color-notification-success.p-icon--theme-light{fill:#13d246}.p-icon--color-notification-warning.p-icon--theme-dark,.p-icon--color-notification-warning.p-icon--theme-light{fill:#e2b236}.p-icon--color-notification-error.p-icon--theme-dark,.p-icon--color-notification-error.p-icon--theme-light{fill:#e00000}.p-icon--color-inherit{fill:currentColor}"},enumerable:!0,configurable:!0}),e}(),f=function(){function e(e){Object(o["h"])(this,e),this.tag="p",this.size="small",this.weight="regular",this.align="left",this.color="default",this.ellipsis=!1,this.theme="light"}return e.prototype.render=function(){var e=this.tag,t=Object(n["a"])(Object(n["c"])("text"),Object(n["b"])("text--size",this.size),Object(n["c"])("text--weight-"+this.weight),Object(n["c"])("text--align-"+this.align),Object(n["c"])("text--color-"+this.color),this.ellipsis&&Object(n["c"])("text--ellipsis"),"inherit"!==this.color&&Object(n["c"])("text--theme-"+this.theme));return Object(o["g"])(e,{class:t},Object(o["g"])("slot",null))},Object.defineProperty(e,"style",{get:function(){return":host{display:block}:host ::slotted(a){outline:none transparent;color:inherit;text-decoration:underline;-webkit-transition:outline-color .24s ease,color .24s ease;transition:outline-color .24s ease,color .24s ease}:host ::slotted(a:hover){color:#d5001c}:host ::slotted(a:focus){outline:2px solid #00d5b9;outline-offset:1px}:host ::slotted(b,strong){font-weight:600}:host ::slotted(span,cite,time){display:inline-block;vertical-align:top}.p-text{font-family:Porsche Next,Arial Narrow,Arial,sans-serif;font-weight:400;font-size:1rem;line-height:1.5;padding:0;margin:0;list-style-type:none}.p-text>b,.p-text>strong{font-weight:600}.p-text--size-x-small{font-size:.75rem}.p-text--size-small{font-size:1rem}.p-text--size-medium{font-size:1.5rem}.p-text--size-large{font-size:2.25rem}.p-text--size-x-large{font-size:3.25rem}.p-text--size-inherit{font-size:inherit}@media (min-width:480px){.p-text--size-x-small-xs{font-size:.75rem}.p-text--size-small-xs{font-size:1rem}.p-text--size-medium-xs{font-size:1.5rem}.p-text--size-large-xs{font-size:2.25rem}.p-text--size-x-large-xs{font-size:3.25rem}.p-text--size-inherit-xs{font-size:inherit}}@media (min-width:760px){.p-text--size-x-small-s{font-size:.75rem}.p-text--size-small-s{font-size:1rem}.p-text--size-medium-s{font-size:1.5rem}.p-text--size-large-s{font-size:2.25rem}.p-text--size-x-large-s{font-size:3.25rem}.p-text--size-inherit-s{font-size:inherit}}@media (min-width:1000px){.p-text--size-x-small-m{font-size:.75rem}.p-text--size-small-m{font-size:1rem}.p-text--size-medium-m{font-size:1.5rem}.p-text--size-large-m{font-size:2.25rem}.p-text--size-x-large-m{font-size:3.25rem}.p-text--size-inherit-m{font-size:inherit}}@media (min-width:1300px){.p-text--size-x-small-l{font-size:.75rem}.p-text--size-small-l{font-size:1rem}.p-text--size-medium-l{font-size:1.5rem}.p-text--size-large-l{font-size:2.25rem}.p-text--size-x-large-l{font-size:3.25rem}.p-text--size-inherit-l{font-size:inherit}}@media (min-width:1760px){.p-text--size-x-small-xl{font-size:.75rem}.p-text--size-small-xl{font-size:1rem}.p-text--size-medium-xl{font-size:1.5rem}.p-text--size-large-xl{font-size:2.25rem}.p-text--size-x-large-xl{font-size:3.25rem}.p-text--size-inherit-xl{font-size:inherit}}.p-text--weight-thin{font-weight:200}.p-text--weight-regular{font-weight:400}.p-text--weight-bold{font-weight:600}.p-text--align-left{text-align:left}.p-text--align-center{text-align:center}.p-text--align-right{text-align:right}.p-text--color-brand.p-text--theme-dark,.p-text--color-brand.p-text--theme-light{color:#d5001c}.p-text--color-default.p-text--theme-light{color:#000}.p-text--color-default.p-text--theme-dark{color:#fff}.p-text--color-neutral-1.p-text--theme-light{color:#323639}.p-text--color-neutral-1.p-text--theme-dark{color:#e3e4e5}.p-text--color-neutral-2.p-text--theme-light{color:#4a4e51}.p-text--color-neutral-2.p-text--theme-dark{color:#c9cacb}.p-text--color-neutral-3.p-text--theme-light{color:#626669}.p-text--color-neutral-3.p-text--theme-dark{color:#b0b1b2}.p-text--color-notification-success.p-text--theme-dark,.p-text--color-notification-success.p-text--theme-light{color:#13d246}.p-text--color-notification-warning.p-text--theme-dark,.p-text--color-notification-warning.p-text--theme-light{color:#e2b236}.p-text--color-notification-error.p-text--theme-dark,.p-text--color-notification-error.p-text--theme-light{color:#e00000}.p-text--color-inherit{color:inherit}.p-text--ellipsis{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"},enumerable:!0,configurable:!0}),e}()}}]);
//# sourceMappingURL=chunk-2d0b38aa.5e2ec818.js.map