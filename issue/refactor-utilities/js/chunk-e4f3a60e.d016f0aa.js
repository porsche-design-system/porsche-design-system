(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4f3a60e"],{"2cc1":function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));o("ef14");var i=o("53ca"),r=o("f51a"),n=Object(r["d"])((function(t){
/*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
(function(){var e={}.hasOwnProperty;function o(){for(var t=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var s=Object(i["a"])(n);if("string"===s||"number"===s)t.push(n);else if(Array.isArray(n)&&n.length){var a=o.apply(null,n);a&&t.push(a)}else if("object"===s)for(var l in n)e.call(n,l)&&n[l]&&t.push(l)}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):window.classNames=o})()}))},"7e67":function(t,e,o){"use strict";o.r(e),o.d(e,"p_text_list_item",(function(){return s}));var i=o("f51a"),r=o("2cc1"),n=':host{position:relative !important;display:list-item !important;color:inherit !important;list-style-type:none !important}:host(.p-text-list-item--unordered){padding-left:1.5rem !important}:host(.p-text-list-item--unordered)::before{content:"" !important;position:absolute !important;left:0 !important;top:calc(1.5em / 2 - 0.125em) !important;width:0.25rem !important;height:0.25rem !important;background-color:currentColor !important}:host(.p-text-list-item--unordered.p-text-list-item--nested)::before{height:1px !important;width:0.5rem !important;top:calc(1.5em / 2) !important}:host(.p-text-list-item--ordered){padding-left:2.5rem !important}:host(.p-text-list-item--ordered)::before{position:absolute !important;right:calc(100% - 24px) !important;top:0 !important;counter-increment:section !important;text-align:right !important;font-size:1rem;line-height:1.5;font-family:"Porsche Next", "Arial Narrow", Arial, sans-serif;font-weight:400}:host(.p-text-list-item--ordered-numbered)::before{content:counters(section, ".", decimal) "." !important}:host(.p-text-list-item--ordered-alphabetically)::before{content:counters(section, ".", lower-latin) "." !important}:host(.p-text-list-item--ordered-numbered.p-text-list-item--nested)::before{content:counters(section, ".", decimal) !important}:host(.p-text-list-item--ordered-alphabetically.p-text-list-item--nested)::before{content:counters(section, ".", lower-latin) !important}',s=function(){function t(t){Object(i["q"])(this,t)}return t.prototype.componentDidLoad=function(){this.addSlottedStyles()},t.prototype.render=function(){var t,e=Object(r["a"])(Object(i["e"])("text-list-item"),Object(i["e"])("text-list-item--"+this.typeOfList),(t={},t[Object(i["e"])("text-list-item--ordered-"+this.typeOfOrderedList)]="ordered"===this.typeOfList,t[Object(i["e"])("text-list-item--nested")]=this.isNestedList,t));return Object(i["i"])(i["a"],{role:"listitem",class:e},Object(i["i"])("slot",null))},Object.defineProperty(t.prototype,"typeOfList",{get:function(){var t=this.host.closest(Object(i["e"])("text-list"));return t.getAttribute("list-type")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"typeOfOrderedList",{get:function(){var t=this.host.closest(Object(i["e"])("text-list"));return t.getAttribute("order-type")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isNestedList",{get:function(){return!!this.host.closest(Object(i["e"])("text-list[nested]"))},enumerable:!0,configurable:!0}),t.prototype.addSlottedStyles=function(){var t=this.host.tagName.toLowerCase(),e=t+" a {\n      outline: none transparent;\n      color: inherit;\n      text-decoration: underline;\n      -webkit-transition: outline-color .24s ease, color .24s ease;\n      transition: outline-color .24s ease, color .24s ease;\n    }\n\n    "+t+" a:hover {\n      color: #d5001c;\n    }\n\n    "+t+" a:focus {\n      outline: 2px solid #00d5b9;\n      outline-offset: 1px;\n    }\n    ";Object(i["k"])(this.host,e)},Object.defineProperty(t.prototype,"host",{get:function(){return Object(i["h"])(this)},enumerable:!0,configurable:!0}),t}();s.style=n}}]);
//# sourceMappingURL=chunk-e4f3a60e.d016f0aa.js.map