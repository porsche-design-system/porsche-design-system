!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.porscheDesignSystem=n():e.porscheDesignSystem=n()}(self,(function(){return function(){"use strict";var e={443:function(e,n,t){function r(e){document.head.appendChild(e)}function o(e){return document.createElement(e)}t.r(n),t.d(n,{PDS_CDN_KEY:function(){return m},load:function(){return v}});var i=[],s=!1;function l(){if(!s&&i.length>0){s=!0;var e=i.shift(),n=e.src,t=e.moduleSyntax,r=o("script");r.setAttribute("src",n),t?r.type="module":r.noModule=!0,r.onload=function(){s=!1,l()},document.body.appendChild(r)}}function u(e,n){var t="noModule"in HTMLScriptElement.prototype;(n&&t||!n&&!t)&&(i.push({src:e,moduleSyntax:n}),n&&function(e){var n=o("link");n.rel="preload",n.as="script",n.crossOrigin="",n.href=e,r(n)}(e),l())}var a="porscheWebComponentsManager";function c(){if(!document[a]){var e={_registered:{},_inProgress:new Map,_readyDeferred:null,_polyfills:{loaded:!1,preventLoading:!1}};document[a]=e}return document[a]}const d="https://cdn.ui.porsche.com/porsche-design-system/components/polyfills.min.663641c4.js";function f(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var p="global";function y(e){var n,t=e.name,i=e.scripts,s=e.stylesUrl,l=void 0===s?null:s,a=e.inlineStyles,y=void 0===a?null:a,m=e.version,v=void 0===m?p:m,g=e.prefix,b=void 0===g?null:g;null===b&&(v=p);var h,S,x,j,O=null!==(n=function(e,n){var t,r,o,i=c()._registered,s=i[e],l=(s=void 0===s?{}:s)[n];null===(void 0===l?null:l)&&(i[e]=Object.assign(Object.assign({},i[e]),(o={scriptsLoaded:!1,prefixes:[],registerCustomElements:null},(r=n)in(t={})?Object.defineProperty(t,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[r]=o,t)));return i[e][n]}(t,v))&&void 0!==n?n:{},_=O.scriptsLoaded,w=O.prefixes,C=O.registerCustomElements;_||(y&&(x=y,(j=o("style")).appendChild(document.createTextNode(x)),r(j)),l&&(h=l,(S=o("link")).rel="stylesheet",S.type="text/css",S.href=h,r(S)),function(e){var n=c()._polyfills;if(!n.loaded&&!("customElements"in window)&&!n.preventLoading)return n.loaded=!0,window.addEventListener("PorscheWebComponentsManagerPolyfillsLoaded",e,{once:!0}),u(d,!1),void u(d,!0);e()}((function(){return function(e){var n,t=function(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(e){if("string"==typeof e)return f(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?f(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,l=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return s=e.done,e},e:function(e){l=!0,i=e},f:function(){try{s||null==t.return||t.return()}finally{if(l)throw i}}}}(e);try{for(t.s();!(n=t.n()).done;){var r=n.value;u(r.url,r.module)}}catch(e){t.e(e)}finally{t.f()}}(i)})),O.scriptsLoaded=!0),null!==b&&w.indexOf(b)<0&&(w.push(b),C&&C(b))}const m="porscheDesignSystemCdn",v=({prefix:e=""}={})=>{y(Object.assign(Object.assign({},{name:"porscheDesignSystem",version:"2.0.0-alpha.6",scripts:[{module:!0,url:(typeof window!=='undefined'&&window['PORSCHE_DESIGN_SYSTEM_CDN']==='cn'?'https://cdn.ui.porsche.cn':'https://cdn.ui.porsche.com')+"/porsche-design-system/components/porsche-design-system.v2.0.0-alpha.6.dfe6fa5af14c409616ae.js"}],stylesUrl:null,inlineStyles:null}),{prefix:e}))}}},n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{}};return e[r](o,o.exports,t),o.exports}return t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(443)}()}));