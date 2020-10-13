(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ce87c"],{"609e":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("p-content-wrapper",[t("p-grid",{staticClass:"form-top-spacing"},[t("p-grid-item",{attrs:{size:"{ base: 12, m: 8 }"}},[t("p-headline",{attrs:{variant:"headline-2",tag:"h1"}},[e._v("Create a new Porsche account")]),t("p-text",{staticClass:"spacing-mt-8",attrs:{size:"{ base: 'small', l: 'medium' }"}},[e._v(" Please enter your registration details in the following fields. "),t("br"),e._v("This text can be enhanced by some information on the benefits of a Porsche account registration. ")])],1)],1),t("p-grid",{staticClass:"form-section-spacing"},[t("p-grid-item",{attrs:{size:"{ base: 12, s: 10, m: 8, l: 6 }"}},[t("form",{attrs:{novalidate:""},on:{submit:function(a){return a.preventDefault(),e.onSubmit(a)}}},[t("p-flex",{staticClass:"form-grid-item-container",attrs:{direction:"{ base: 'column', m: 'row' }"}},[t("p-flex-item",{staticClass:"form-grid-item",attrs:{width:"{base: 'full', m: 'one-third'}"}},[t("p-select-wrapper",{attrs:{label:"Salutation",message:e.bag.errors.salutation,state:e.getState("salutation")}},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.salutation,expression:"bag.data.salutation"}],ref:e.validateFieldName("salutation"),attrs:{name:e.validateFieldName("salutation"),required:""},on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(e){return e.selected})).map((function(e){var a="_value"in e?e._value:e.value;return a}));e.$set(e.bag.data,"salutation",a.target.multiple?t:t[0])},e.onFieldBlur]}},[t("option",{attrs:{value:""}},[e._v("Choose an option")]),t("option",{attrs:{value:"Mr."}},[e._v("Mr.")]),t("option",{attrs:{value:"Mrs."}},[e._v("Mrs.")])])])],1),t("p-flex-item",{staticClass:"form-row-spacing form-row-spacing--zero-m form-grid-item",attrs:{width:"{base: 'full', m: 'one-third'}"}},[t("p-select-wrapper",{attrs:{label:"Title"}},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.title,expression:"bag.data.title"}],attrs:{name:e.validateFieldName("title")},on:{change:function(a){var t=Array.prototype.filter.call(a.target.options,(function(e){return e.selected})).map((function(e){var a="_value"in e?e._value:e.value;return a}));e.$set(e.bag.data,"title",a.target.multiple?t:t[0])}}},[t("option",[e._v("Choose an option")]),t("option",{attrs:{value:"option 1"}},[e._v("Dr.")]),t("option",{attrs:{value:"option 2"}},[e._v("Prof.")]),t("option",{attrs:{value:"option 3"}},[e._v("Prof. Dr.")])])])],1)],1),t("p-flex",{staticClass:"form-row-spacing form-grid-item-container",attrs:{direction:"{ base: 'column', m: 'row' }"}},[t("p-flex-item",{staticClass:"form-grid-item",attrs:{width:"{base: 'full', m: 'half'}"}},[t("p-text-field-wrapper",{attrs:{label:"First name",message:e.bag.errors.firstName,state:e.getState("firstName")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.firstName,expression:"bag.data.firstName"}],ref:e.validateFieldName("firstName"),attrs:{type:"text",name:e.validateFieldName("firstName"),required:""},domProps:{value:e.bag.data.firstName},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"firstName",a.target.value)}}})])],1),t("p-flex-item",{staticClass:"form-row-spacing form-row-spacing--zero-m form-grid-item",attrs:{width:"{base: 'full', m: 'half'}"}},[t("p-text-field-wrapper",{attrs:{label:"Last name",message:e.bag.errors.lastName,state:e.getState("lastName")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.lastName,expression:"bag.data.lastName"}],ref:e.validateFieldName("lastName"),attrs:{type:"text",name:e.validateFieldName("lastName"),required:""},domProps:{value:e.bag.data.lastName},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"lastName",a.target.value)}}})])],1)],1),t("p-text-field-wrapper",{staticClass:"form-row-spacing",attrs:{label:"Email address",message:e.bag.errors.email,state:e.getState("email")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.email,expression:"bag.data.email"}],ref:e.validateFieldName("email"),attrs:{type:"email",name:e.validateFieldName("email"),required:""},domProps:{value:e.bag.data.email},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"email",a.target.value)}}})]),t("p-text-field-wrapper",{staticClass:"form-row-spacing",attrs:{label:"Password",message:e.bag.errors.password,state:e.getState("password")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.password,expression:"bag.data.password"}],ref:e.validateFieldName("password"),attrs:{type:"password",name:e.validateFieldName("password"),required:""},domProps:{value:e.bag.data.password},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"password",a.target.value)}}})]),t("p-checkbox-wrapper",{staticClass:"form-section-spacing",attrs:{message:e.bag.errors.terms,state:e.getState("terms")}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" I have read the "),t("a",{attrs:{href:"#"}},[e._v("general terms ans conditions")]),e._v(" and I accept them. ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.terms,expression:"bag.data.terms"}],ref:e.validateFieldName("terms"),attrs:{type:"checkbox",name:e.validateFieldName("terms"),required:""},domProps:{checked:Array.isArray(e.bag.data.terms)?e._i(e.bag.data.terms,null)>-1:e.bag.data.terms},on:{change:[function(a){var t=e.bag.data.terms,r=a.target,s=!!r.checked;if(Array.isArray(t)){var i=null,o=e._i(t,i);r.checked?o<0&&e.$set(e.bag.data,"terms",t.concat([i])):o>-1&&e.$set(e.bag.data,"terms",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.bag.data,"terms",s)},e.onFieldBlur]}})]),t("p-checkbox-wrapper",{staticClass:"form-row-spacing",attrs:{message:e.bag.errors.privacy,state:e.getState("privacy")}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" I have read the "),t("a",{attrs:{href:"#"}},[e._v("Data Privacy Statement")]),e._v(". ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.privacy,expression:"bag.data.privacy"}],ref:e.validateFieldName("privacy"),attrs:{type:"checkbox",name:e.validateFieldName("privacy"),required:""},domProps:{checked:Array.isArray(e.bag.data.privacy)?e._i(e.bag.data.privacy,null)>-1:e.bag.data.privacy},on:{change:[function(a){var t=e.bag.data.privacy,r=a.target,s=!!r.checked;if(Array.isArray(t)){var i=null,o=e._i(t,i);r.checked?o<0&&e.$set(e.bag.data,"privacy",t.concat([i])):o>-1&&e.$set(e.bag.data,"privacy",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.bag.data,"privacy",s)},e.onFieldBlur]}})]),t("p-flex",{staticClass:"form-section-spacing form-bottom-spacing form-grid-item-container",attrs:{direction:"{ base: 'column', s: 'row' }"}},[t("p-flex-item",{staticClass:"form-grid-item",attrs:{width:"{base: 'full', s: 'auto'}"}},[t("p-button",{staticClass:"form-item-width--full form-item-width--auto-s",attrs:{type:"submit"}},[e._v("Create Porsche account")])],1),t("p-flex-item",{staticClass:"form-row-spacing form-row-spacing--zero-s form-grid-item",attrs:{width:"{base: 'full', s: 'auto'}"}},[t("p-button",{staticClass:"form-item-width--full form-item-width--auto-s",attrs:{variant:"tertiary",icon:"close"},on:{click:e.onReset}},[e._v("Cancel")])],1)],1)],1)])],1)],1)},s=[],i=(t("b0c0"),t("e439"),t("96cf"),t("1da1")),o=t("d4ec"),l=t("bee2"),n=t("262e"),c=t("2caf"),d=t("53ca"),m=t("2b0e"),u=t("2fe1"),p=t("2fb6"),g=t("d257"),b=function(e,a,t,r){var s,i=arguments.length,o=i<3?a:null===r?r=Object.getOwnPropertyDescriptor(a,t):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,a,t,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(a,t,o):s(a,t))||o);return i>3&&o&&Object.defineProperty(a,t,o),o},f={salutation:"",title:"",firstName:"",lastName:"",email:"",password:"",terms:!1,privacy:!1},v=function(e){Object(n["a"])(t,e);var a=Object(c["a"])(t);function t(){var e;return Object(o["a"])(this,t),e=a.apply(this,arguments),e.validateFieldName=g["f"],e.getState=function(a){return Object(g["c"])(a,e.bag)},e.bag={data:Object.assign({},f),errors:Object(g["b"])(f),schema:Object(p["d"])({salutation:Object(p["e"])().required("How can we address you?"),title:Object(p["e"])(),firstName:Object(p["e"])().required("Please enter your name"),lastName:Object(p["e"])().required("Please enter your last name"),email:Object(p["e"])().email("Email address seems invalid. Please check your entry").required("Please enter your email address"),password:Object(p["e"])().required("Please enter a password").min(6,"Your password must contain at least 6 characters"),terms:Object(p["a"])().required().oneOf([!0],"Please agree to our terms and conditions"),privacy:Object(p["a"])().required().oneOf([!0],"Please agree to our data privacy policy")})},e}return Object(l["a"])(t,[{key:"onFieldBlur",value:function(e){var a=e.target;Object(g["d"])(a.name,this.bag)}},{key:"onSubmit",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var a,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(g["e"])(this.bag);case 2:a=e.sent,console.log("isValid",a),a||(t=this.$refs[Object(g["a"])(this.bag)],t.focus(),t.parentElement.scrollIntoView(!0));case 5:case"end":return e.stop()}}),e,this)})));function a(){return e.apply(this,arguments)}return a}()},{key:"onReset",value:function(){this.bag.data=Object.assign({},f),this.bag.errors=Object(g["b"])(f)}}]),t}(m["a"]);v=b([u["b"]],v);var w=v,h=w,y=t("2877"),N=Object(y["a"])(h,r,s,!1,null,null,null);a["default"]=N.exports}}]);
//# sourceMappingURL=chunk-2d0ce87c.2ffb5691.js.map