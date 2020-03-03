(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217e8c"],{c977:function(e,t,a){"use strict";a.r(t),a.d(t,"p_textarea_wrapper",(function(){return r}));a("caad");var i=a("152c"),o=(a("8f1c"),a("18e4")),r=function(){function e(e){Object(i["g"])(this,e),this.label="",this.state="none",this.message="",this.hideLabel=!1}return e.prototype.componentDidLoad=function(){this.setTextarea(),this.setState(),this.bindStateListener(),this.addSlottedStyles()},e.prototype.render=function(){var e=this,t=Object(o["c"])(Object(o["f"])("textarea-wrapper__label")),a=Object(o["c"])(Object(o["f"])("textarea-wrapper__label-text"),Object(o["e"])("textarea-wrapper__label-text-",this.hideLabel,["hidden","visible"]),this.disabled&&Object(o["f"])("textarea-wrapper__label-text--disabled")),r=Object(o["c"])(Object(o["f"])("textarea-wrapper__fake-textarea"),Object(o["f"])("textarea-wrapper__fake-textarea--"+this.state),this.disabled&&Object(o["f"])("textarea-wrapper__fake-textarea--disabled"),this.readonly&&Object(o["f"])("textarea-wrapper__fake-textarea--readonly")),n=Object(o["c"])(Object(o["f"])("textarea-wrapper__message"),Object(o["f"])("textarea-wrapper__message--"+this.state));return Object(i["f"])(i["a"],null,Object(i["f"])("label",{class:t},this.isLabelVisible&&Object(i["f"])("p-text",{class:a,color:"inherit",tag:"span",onClick:function(){return e.labelClick()}},this.label?this.label:Object(i["f"])("span",null,Object(i["f"])("slot",{name:"label"}))),Object(i["f"])("span",{class:r},Object(i["f"])("slot",null))),this.isMessageVisible&&Object(i["f"])("p-text",{class:n,color:"inherit"},this.message?this.message:Object(i["f"])("span",null,Object(i["f"])("slot",{name:"message"}))))},Object.defineProperty(e.prototype,"isLabelVisible",{get:function(){return!!this.label||!!this.host.querySelector('[slot="label"]')},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isMessageDefined",{get:function(){return!!this.message||!!this.host.querySelector('[slot="message"]')},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isMessageVisible",{get:function(){return["success","error"].includes(this.state)&&this.isMessageDefined},enumerable:!0,configurable:!0}),e.prototype.setTextarea=function(){this.textarea=this.host.querySelector("textarea")},e.prototype.setState=function(){this.disabled=this.textarea.disabled,this.readonly=this.textarea.readOnly},e.prototype.labelClick=function(){this.textarea.focus()},e.prototype.bindStateListener=function(){var e=this;Object(o["g"])(this.textarea,"border-top-color",(function(){e.setState()}))},e.prototype.addSlottedStyles=function(){var e=this.host.tagName.toLowerCase(),t=e+" a {\n      outline: none transparent;\n      color: inherit;\n      text-decoration: underline;\n      -webkit-transition: outline-color .24s ease, color .24s ease;\n      transition: outline-color .24s ease, color .24s ease;\n    }\n\n    "+e+" a:hover {\n      color: #d5001c;\n    }\n\n    "+e+" a:focus {\n      outline: 2px solid #00d5b9;\n      outline-offset: 1px;\n    }\n    ";Object(o["d"])(this.host,t)},Object.defineProperty(e.prototype,"host",{get:function(){return Object(i["e"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{display:block}::slotted(textarea){position:relative!important;width:100%!important;min-height:11.75rem;display:block!important;padding:.625rem!important;margin:0!important;outline:none transparent!important;outline-offset:3px!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;-webkit-box-sizing:border-box!important;box-sizing:border-box!important;border-width:0!important;border-top-color:transparent!important;background-color:transparent!important;opacity:1!important;font-family:Porsche Next,Arial Narrow,Arial,sans-serif!important;font-weight:400!important;font-size:1rem!important;line-height:1.5!important;text-indent:0!important;color:#000!important;resize:vertical;-webkit-transition:outline-color .24s ease,color .24s ease,border-top-color 1ms linear!important;transition:outline-color .24s ease,color .24s ease,border-top-color 1ms linear!important}::slotted(textarea:focus){outline:2px solid #00d5b9!important}::slotted(textarea:-moz-read-only:focus){outline:none!important}::slotted(textarea:read-only:focus){outline:none!important}::slotted(textarea:not(:disabled):-moz-read-only){border-top-color:hsla(0,0%,100%,.01)!important;color:#626669!important}::slotted(textarea:not(:disabled):read-only){border-top-color:hsla(0,0%,100%,.01)!important;color:#626669!important}::slotted(textarea:disabled){border-top-color:hsla(0,0%,100%,.02)!important;color:#96989a!important;cursor:not-allowed!important}.p-textarea-wrapper__label{display:block}.p-textarea-wrapper__label-text{display:inline-block;color:#000;-webkit-transition:color .24s ease;transition:color .24s ease}.p-textarea-wrapper__label-text--disabled{color:#96989a}.p-textarea-wrapper__label-text--visible{position:static;width:auto;height:auto;margin:0 0 .25rem 0;padding:0;white-space:normal;overflow:visible;clip:auto;-webkit-clip-path:none;clip-path:none}.p-textarea-wrapper__label-text--hidden{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}@media (min-width:480px){.p-textarea-wrapper__label-text--visible-xs{position:static;width:auto;height:auto;margin:0 0 .25rem 0;padding:0;white-space:normal;overflow:visible;clip:auto;-webkit-clip-path:none;clip-path:none}.p-textarea-wrapper__label-text--hidden-xs{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}}@media (min-width:760px){.p-textarea-wrapper__label-text--visible-s{position:static;width:auto;height:auto;margin:0 0 .25rem 0;padding:0;white-space:normal;overflow:visible;clip:auto;-webkit-clip-path:none;clip-path:none}.p-textarea-wrapper__label-text--hidden-s{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}}@media (min-width:1000px){.p-textarea-wrapper__label-text--visible-m{position:static;width:auto;height:auto;margin:0 0 .25rem 0;padding:0;white-space:normal;overflow:visible;clip:auto;-webkit-clip-path:none;clip-path:none}.p-textarea-wrapper__label-text--hidden-m{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}}@media (min-width:1300px){.p-textarea-wrapper__label-text--visible-l{position:static;width:auto;height:auto;margin:0 0 .25rem 0;padding:0;white-space:normal;overflow:visible;clip:auto;-webkit-clip-path:none;clip-path:none}.p-textarea-wrapper__label-text--hidden-l{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}}@media (min-width:1760px){.p-textarea-wrapper__label-text--visible-xl{position:static;width:auto;height:auto;margin:0 0 .25rem 0;padding:0;white-space:normal;overflow:visible;clip:auto;-webkit-clip-path:none;clip-path:none}.p-textarea-wrapper__label-text--hidden-xl{position:absolute;width:1px;height:1px;margin:-1px;padding:0;white-space:nowrap;overflow:hidden;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%)}}.p-textarea-wrapper__fake-textarea{display:block;padding:.125rem;background-color:#fff;-webkit-box-shadow:inset 0 0 0 1px #626669;box-shadow:inset 0 0 0 1px #626669;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background-color .24s ease,-webkit-box-shadow .24s ease;transition:background-color .24s ease,-webkit-box-shadow .24s ease;transition:box-shadow .24s ease,background-color .24s ease;transition:box-shadow .24s ease,background-color .24s ease,-webkit-box-shadow .24s ease}.p-textarea-wrapper__fake-textarea--disabled{-webkit-box-shadow:inset 0 0 0 1px #96989a;box-shadow:inset 0 0 0 1px #96989a;background-color:#fff}.p-textarea-wrapper__fake-textarea--readonly{-webkit-box-shadow:inset 0 0 0 1px #f2f2f2;box-shadow:inset 0 0 0 1px #f2f2f2;background-color:#f2f2f2}.p-textarea-wrapper__fake-textarea--success{-webkit-box-shadow:inset 0 0 0 2px #13d246;box-shadow:inset 0 0 0 2px #13d246}.p-textarea-wrapper__fake-textarea--error{-webkit-box-shadow:inset 0 0 0 2px #e00000;box-shadow:inset 0 0 0 2px #e00000}.p-textarea-wrapper__message{margin-top:.25rem;color:#000;-webkit-transition:color .24s ease;transition:color .24s ease}.p-textarea-wrapper__message--success{color:#13d246}.p-textarea-wrapper__message--error{color:#e00000}.p-textarea-wrapper__message--none{color:#000}"},enumerable:!0,configurable:!0}),e}()}}]);
//# sourceMappingURL=chunk-2d217e8c.aad26675.js.map