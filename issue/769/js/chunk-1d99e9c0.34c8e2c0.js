(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d99e9c0"],{6579:function(e,i,t){"use strict";t.d(i,"a",(function(){return l}));t("9bd2"),t("ef1f"),t("2aa5"),t("f3b8"),t("32f5"),t("918c");var n=new Map,a=function(e){var i=e.tagName,t=n.get(i);if(void 0!==t)return t;var a=new Map;return n.set(i,a),a},h=function(e){return e===document?e.head:e},l=function(e,i){var t=e.getRootNode(),n=a(e);if(void 0===n.get(t)){n.set(t,!0);var l=document.createElement("style");l.appendChild(document.createTextNode(r(i)));var d=h(t),o=d.querySelector("meta[charset]");null!==o?d.insertBefore(l,o.nextSibling):d.childNodes.length>0?d.insertBefore(l,d.firstChild):d.appendChild(l)}},r=function(e){return e.replace(/\s{2,}|(\/\*.*\*\/)/g,"").replace(/(:|;)\s/g,"$1").replace(/[\s;]({|})\s?/g,"$1")}},"6bff":function(e,i,t){"use strict";t.r(i),t.d(i,"p_headline",(function(){return r}));var n=t("cb97"),a=t("6579"),h=t("c206"),l=':host{display:block}::slotted(h1),::slotted(h2),::slotted(h3),::slotted(h4),::slotted(h5),::slotted(h6){margin:0 !important;font-weight:600 !important;font-size:inherit !important}.p-headline{padding:0;margin:0}.p-headline--variant-large-title{font-size:2rem;line-height:1.375;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:600}@media (min-width: 760px) and (max-width: 999px){.p-headline--variant-large-title{font-size:2.625rem;line-height:1.2380952381}}@media (min-width: 1000px) and (max-width: 1299px){.p-headline--variant-large-title{font-size:3.25rem;line-height:1.2307692308}}@media (min-width: 1300px) and (max-width: 1759px){.p-headline--variant-large-title{font-size:3.875rem;line-height:1.2258064516}}@media (min-width: 1760px){.p-headline--variant-large-title{font-size:4.5rem;line-height:1.2222222222}}.p-headline--variant-headline-1{font-size:1.75rem;line-height:1.4285714286;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:600}@media (min-width: 760px) and (max-width: 999px){.p-headline--variant-headline-1{font-size:2.25rem;line-height:1.3333333333}}@media (min-width: 1000px) and (max-width: 1299px){.p-headline--variant-headline-1{font-size:2.75rem;line-height:1.1818181818}}@media (min-width: 1300px) and (max-width: 1759px){.p-headline--variant-headline-1{font-size:3.25rem;line-height:1.2307692308}}@media (min-width: 1760px){.p-headline--variant-headline-1{font-size:3.75rem;line-height:1.2}}.p-headline--variant-headline-2{font-size:1.5rem;line-height:1.5;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:600}@media (min-width: 760px) and (max-width: 999px){.p-headline--variant-headline-2{font-size:1.875rem;line-height:1.3333333333}}@media (min-width: 1000px) and (max-width: 1299px){.p-headline--variant-headline-2{font-size:2.25rem;line-height:1.3333333333}}@media (min-width: 1300px) and (max-width: 1759px){.p-headline--variant-headline-2{font-size:2.625rem;line-height:1.2380952381}}@media (min-width: 1760px){.p-headline--variant-headline-2{font-size:3rem;line-height:1.25}}.p-headline--variant-headline-3{font-size:1.25rem;line-height:1.4;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:600}@media (min-width: 760px) and (max-width: 999px){.p-headline--variant-headline-3{font-size:1.5rem;line-height:1.5}}@media (min-width: 1000px) and (max-width: 1299px){.p-headline--variant-headline-3{font-size:1.75rem;line-height:1.4285714286}}@media (min-width: 1300px) and (max-width: 1759px){.p-headline--variant-headline-3{font-size:2rem;line-height:1.375}}@media (min-width: 1760px){.p-headline--variant-headline-3{font-size:2.25rem;line-height:1.3333333333}}.p-headline--variant-headline-4{font-size:1rem;line-height:1.5;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:600}@media (min-width: 760px) and (max-width: 999px){.p-headline--variant-headline-4{font-size:1.125rem;line-height:1.5555555556}}@media (min-width: 1000px) and (max-width: 1299px){.p-headline--variant-headline-4{font-size:1.25rem;line-height:1.4}}@media (min-width: 1300px) and (max-width: 1759px){.p-headline--variant-headline-4{font-size:1.375rem;line-height:1.4545454545}}@media (min-width: 1760px){.p-headline--variant-headline-4{font-size:1.5rem;line-height:1.5}}.p-headline--variant-headline-5{font-size:1rem;line-height:1.5;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:600}.p-headline--align-left{text-align:left}.p-headline--align-center{text-align:center}.p-headline--align-right{text-align:right}.p-headline--color-default.p-headline--theme-light{color:#000}.p-headline--color-default.p-headline--theme-dark{color:#fff}.p-headline--color-inherit{color:inherit}.p-headline--ellipsis{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',r=function(){function e(e){Object(n["m"])(this,e),this.variant="headline-1",this.tag=void 0,this.align="left",this.color="default",this.ellipsis=!1,this.theme="light"}return e.prototype.componentWillLoad=function(){this.addSlottedStyles()},e.prototype.render=function(){var e={"large-title":"h1","headline-1":"h1","headline-2":"h2","headline-3":"h3","headline-4":"h4","headline-5":"h5"},i=this.hasSlottedHeadlineTag?"div":this.tag||e[this.variant],t=Object(h["a"])(Object(n["f"])("headline"),Object(n["f"])("headline--variant-"+this.variant),Object(n["f"])("headline--align-"+this.align),Object(n["f"])("headline--color-"+this.color),this.ellipsis&&Object(n["f"])("headline--ellipsis"),"inherit"!==this.color&&Object(n["f"])("headline--theme-"+this.theme));return Object(n["k"])(i,{class:t},Object(n["k"])("slot",null))},Object.defineProperty(e.prototype,"hasSlottedHeadlineTag",{get:function(){var e=this.host.querySelector(":first-child");return null===e||void 0===e?void 0:e.matches("h1, h2, h3, h4, h5, h6")},enumerable:!1,configurable:!0}),e.prototype.addSlottedStyles=function(){var e=this.host.tagName.toLowerCase(),i=e+" a {\n      color: inherit;\n      text-decoration: none;\n    }";Object(a["a"])(this.host,i)},Object.defineProperty(e.prototype,"host",{get:function(){return Object(n["j"])(this)},enumerable:!1,configurable:!0}),e}();r.style=l},c206:function(e,i,t){"use strict";t.d(i,"a",(function(){return h}));t("ef14");var n=t("53ca"),a=t("cb97"),h=Object(a["g"])((function(e){
/*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
(function(){var i={}.hasOwnProperty;function t(){for(var e=[],a=0;a<arguments.length;a++){var h=arguments[a];if(h){var l=Object(n["a"])(h);if("string"===l||"number"===l)e.push(h);else if(Array.isArray(h)&&h.length){var r=t.apply(null,h);r&&e.push(r)}else if("object"===l)for(var d in h)i.call(h,d)&&h[d]&&e.push(d)}}return e.join(" ")}e.exports?(t.default=t,e.exports=t):window.classNames=t})()}))}}]);
//# sourceMappingURL=chunk-1d99e9c0.34c8e2c0.js.map