(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["stencil-p-icon_2-entry-js"],{5577:function(e,t,i){"use strict";i.r(t),i.d(t,"p_icon",(function(){return f})),i.d(t,"p_text",(function(){return g}));i("b0c0"),i("4ec9"),i("d3b7"),i("3ca3"),i("2ca0"),i("ddb0");var n=i("54b6"),o=i("4d97"),r=function(e){return"string"===typeof e},l=function(e){if(e){var t=document.createElement("div");t.innerHTML=e;for(var i=t.childNodes.length-1;i>=0;i--)"svg"!==t.childNodes[i].nodeName.toLowerCase()&&t.removeChild(t.childNodes[i]);var n=t.firstElementChild;if(n&&"svg"===n.nodeName.toLowerCase()&&(n.setAttribute("focusable","false"),s(n)))return t.innerHTML}return""},s=function e(t){if(1===t.nodeType){if("script"===t.nodeName.toLowerCase())return!1;for(var i=0;i<t.attributes.length;i++){var n=t.attributes[i].value;if(r(n)&&n.toLowerCase().startsWith("on"))return!1}for(i=0;i<t.childNodes.length;i++)if(!e(t.childNodes[i]))return!1}return!0},h=new Map,c=new Map,a=function(e){var t=c.get(e);return void 0===t&&(t=fetch(e).then((function(t){if(t.ok)return t.text().then((function(t){h.set(e,l(t))}));h.set(e,"")})),c.set(e,t)),t},p=":host{display:-ms-inline-flexbox;display:inline-flex;vertical-align:top}.p-icon{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:1.5rem;height:1.5rem}.p-icon--size-small{width:1.5rem;height:1.5rem}.p-icon--size-medium{width:2.25rem;height:2.25rem}.p-icon--size-large{width:3rem;height:3rem}.p-icon--size-inherit{width:inherit;height:inherit}.p-icon--color-brand.p-icon--theme-light{fill:#d5001c}.p-icon--color-brand.p-icon--theme-dark{fill:#d5001c}.p-icon--color-default.p-icon--theme-light{fill:#000}.p-icon--color-default.p-icon--theme-dark{fill:#fff}.p-icon--color-neutral-contrast-high.p-icon--theme-light{fill:#323639}.p-icon--color-neutral-contrast-high.p-icon--theme-dark{fill:#e3e4e5}.p-icon--color-neutral-contrast-medium.p-icon--theme-light{fill:#626669}.p-icon--color-neutral-contrast-medium.p-icon--theme-dark{fill:#b0b1b2}.p-icon--color-neutral-contrast-low.p-icon--theme-light{fill:#c9cacb}.p-icon--color-neutral-contrast-low.p-icon--theme-dark{fill:#4a4e51}.p-icon--color-notification-success.p-icon--theme-light{fill:#018a16}.p-icon--color-notification-success.p-icon--theme-dark{fill:#01ba1d}.p-icon--color-notification-warning.p-icon--theme-light{fill:#ff9b00}.p-icon--color-notification-warning.p-icon--theme-dark{fill:#ff9b00}.p-icon--color-notification-error.p-icon--theme-light{fill:#e00000}.p-icon--color-notification-error.p-icon--theme-dark{fill:#fc1717}.p-icon--color-inherit{fill:currentColor}",f=function(){function e(e){Object(n["g"])(this,e),this.name="arrow-head-right",this.variant="outline",this.color="default",this.size="small",this.lazy=!1,this.theme="light",this.isVisible=!1}return e.prototype.connectedCallback=function(){var e=this;this.waitUntilVisible(this.el,"50px",(function(){e.isVisible=!0,e.loadIcon()}))},e.prototype.disconnectedCallback=function(){this.io&&(this.io.disconnect(),this.io=void 0)},e.prototype.loadIcon=function(){var e=this;if(this.isVisible){var t=this.getSource();h.has(t)?this.svgContent=h.get(t):a(t).then((function(){return e.svgContent=h.get(t)}))}},e.prototype.getSource=function(){return this.name&&!this.source?"https://cdn.ui.porsche.com/porsche-icons/v2/"+this.variant+"/"+this.name+".svg":this.source?this.source:(console.warn("Please provide either an name property or a source property!"),"")},e.prototype.render=function(){var e=Object(o["c"])(Object(o["f"])("icon"),Object(o["f"])("icon--size-"+this.size),Object(o["f"])("icon--color-"+this.color),"inherit"!==this.color&&Object(o["f"])("icon--theme-"+this.theme));return Object(n["f"])(n["a"],null,this.svgContent?Object(n["f"])("i",{class:e,innerHTML:this.svgContent}):Object(n["f"])("i",{class:e}))},e.prototype.waitUntilVisible=function(e,t,i){var n=this;if(this.lazy&&"undefined"!==typeof window&&window.IntersectionObserver){var o=this.io=new window.IntersectionObserver((function(e){e[0].isIntersecting&&(o.disconnect(),n.io=void 0,i())}),{rootMargin:t});o.observe(e)}else i()},Object.defineProperty(e.prototype,"el",{get:function(){return Object(n["e"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{source:["loadIcon"],name:["loadIcon"]}},enumerable:!0,configurable:!0}),e}();f.style=p;var m=':host{display:block}.p-text{font-size:1rem;line-height:1.5;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:400;padding:0;margin:0;list-style-type:none;display:inherit;-webkit-transition:font-size 1ms linear;transition:font-size 1ms linear}.p-text--size-x-small{font-size:0.75rem;line-height:1.6666666667}.p-text--size-small{font-size:1rem;line-height:1.5}.p-text--size-medium{font-size:1.5rem;line-height:1.5}.p-text--size-large{font-size:2.25rem;line-height:1.3333333333}.p-text--size-x-large{font-size:3.25rem;line-height:1.2307692308}.p-text--size-inherit{font-size:inherit;line-height:inherit}@media (min-width: 480px){.p-text--size-x-small-xs{font-size:0.75rem;line-height:1.6666666667}.p-text--size-small-xs{font-size:1rem;line-height:1.5}.p-text--size-medium-xs{font-size:1.5rem;line-height:1.5}.p-text--size-large-xs{font-size:2.25rem;line-height:1.3333333333}.p-text--size-x-large-xs{font-size:3.25rem;line-height:1.2307692308}.p-text--size-inherit-xs{font-size:inherit;line-height:inherit}}@media (min-width: 760px){.p-text--size-x-small-s{font-size:0.75rem;line-height:1.6666666667}.p-text--size-small-s{font-size:1rem;line-height:1.5}.p-text--size-medium-s{font-size:1.5rem;line-height:1.5}.p-text--size-large-s{font-size:2.25rem;line-height:1.3333333333}.p-text--size-x-large-s{font-size:3.25rem;line-height:1.2307692308}.p-text--size-inherit-s{font-size:inherit;line-height:inherit}}@media (min-width: 1000px){.p-text--size-x-small-m{font-size:0.75rem;line-height:1.6666666667}.p-text--size-small-m{font-size:1rem;line-height:1.5}.p-text--size-medium-m{font-size:1.5rem;line-height:1.5}.p-text--size-large-m{font-size:2.25rem;line-height:1.3333333333}.p-text--size-x-large-m{font-size:3.25rem;line-height:1.2307692308}.p-text--size-inherit-m{font-size:inherit;line-height:inherit}}@media (min-width: 1300px){.p-text--size-x-small-l{font-size:0.75rem;line-height:1.6666666667}.p-text--size-small-l{font-size:1rem;line-height:1.5}.p-text--size-medium-l{font-size:1.5rem;line-height:1.5}.p-text--size-large-l{font-size:2.25rem;line-height:1.3333333333}.p-text--size-x-large-l{font-size:3.25rem;line-height:1.2307692308}.p-text--size-inherit-l{font-size:inherit;line-height:inherit}}@media (min-width: 1760px){.p-text--size-x-small-xl{font-size:0.75rem;line-height:1.6666666667}.p-text--size-small-xl{font-size:1rem;line-height:1.5}.p-text--size-medium-xl{font-size:1.5rem;line-height:1.5}.p-text--size-large-xl{font-size:2.25rem;line-height:1.3333333333}.p-text--size-x-large-xl{font-size:3.25rem;line-height:1.2307692308}.p-text--size-inherit-xl{font-size:inherit;line-height:inherit}}.p-text--weight-thin{font-weight:100}.p-text--weight-regular{font-weight:400}.p-text--weight-bold{font-weight:700}.p-text--align-left{text-align:left}.p-text--align-center{text-align:center}.p-text--align-right{text-align:right}.p-text--color-brand.p-text--theme-light{color:#d5001c}.p-text--color-brand.p-text--theme-dark{color:#d5001c}.p-text--color-default.p-text--theme-light{color:#000}.p-text--color-default.p-text--theme-dark{color:#fff}.p-text--color-neutral-contrast-high.p-text--theme-light{color:#323639}.p-text--color-neutral-contrast-high.p-text--theme-dark{color:#e3e4e5}.p-text--color-neutral-contrast-medium.p-text--theme-light{color:#626669}.p-text--color-neutral-contrast-medium.p-text--theme-dark{color:#b0b1b2}.p-text--color-neutral-contrast-low.p-text--theme-light{color:#c9cacb}.p-text--color-neutral-contrast-low.p-text--theme-dark{color:#4a4e51}.p-text--color-notification-success.p-text--theme-light{color:#018a16}.p-text--color-notification-success.p-text--theme-dark{color:#01ba1d}.p-text--color-notification-warning.p-text--theme-light{color:#ff9b00}.p-text--color-notification-warning.p-text--theme-dark{color:#ff9b00}.p-text--color-notification-error.p-text--theme-light{color:#e00000}.p-text--color-notification-error.p-text--theme-dark{color:#fc1717}.p-text--color-inherit{color:inherit}.p-text--ellipsis{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',g=function(){function e(e){Object(n["g"])(this,e),this.tag="p",this.size="small",this.weight="regular",this.align="left",this.color="default",this.ellipsis=!1,this.theme="light"}return e.prototype.componentDidLoad=function(){var e=this,t=this.element.tagName.toLowerCase(),i=t+" a {\n      outline: none transparent;\n      color: inherit;\n      text-decoration: underline;\n      -webkit-transition: outline-color .24s ease, color .24s ease;\n      transition: outline-color .24s ease, color .24s ease;\n    }\n    \n    "+t+" a:hover {\n      color: #d5001c;\n    }\n    \n    "+t+" a:focus {\n      outline: 2px solid #00d5b9;\n      outline-offset: 1px;\n    }";Object(o["d"])(this.element,i),Object(o["h"])(this.textTag,"font-size",(function(){e.textTag.style.lineHeight=""+Object(o["a"])(e.textTag)}))},e.prototype.render=function(){var e=this,t=this.tag,i=Object(o["c"])(Object(o["f"])("text"),Object(o["e"])("text--size",this.size),Object(o["f"])("text--weight-"+this.weight),Object(o["f"])("text--align-"+this.align),Object(o["f"])("text--color-"+this.color),this.ellipsis&&Object(o["f"])("text--ellipsis"),"inherit"!==this.color&&Object(o["f"])("text--theme-"+this.theme));return Object(n["f"])(t,{class:i,ref:function(t){return e.textTag=t}},Object(n["f"])("slot",null))},Object.defineProperty(e.prototype,"element",{get:function(){return Object(n["e"])(this)},enumerable:!0,configurable:!0}),e}();g.style=m}}]);
//# sourceMappingURL=stencil-p-icon_2-entry-js.90759156.js.map