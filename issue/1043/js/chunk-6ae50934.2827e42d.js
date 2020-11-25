(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ae50934"],{"07ac":function(e,a,t){var r=t("23e7"),c=t("6f53").values;r({target:"Object",stat:!0},{values:function(e){return c(e)}})},"33fb":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("p-content-wrapper",[t("p-headline",{attrs:{variant:"headline-1"}},[e._v("Various patterns and examples")]),t("p-grid",{staticClass:"form-top-spacing"},[t("p-grid-item",{attrs:{size:"{ base: 12, m: 8 }"}},[t("p-headline",{attrs:{variant:"headline-2",tag:"h1"}},[e._v("Validation of grouped form elements")]),t("p-text",{staticClass:"spacing-mt-8",attrs:{size:"{ base: 'small', l: 'medium' }"}},[e._v("How to implement validation messages to grouped form elements like checkbox- and radio groups.")])],1)],1),t("p-grid",{staticClass:"form-section-spacing"},[t("p-grid-item",{attrs:{size:"{ base: 12, s: 10, m: 8, l: 6 }"}},[t("form",{staticClass:"form-bottom-spacing",attrs:{novalidate:""},on:{submit:function(a){return a.preventDefault(),e.onSubmit(a)}}},[t("p-fieldset-wrapper",{staticClass:"form-section-spacing",attrs:{label:"Grouped list of checkboxes"}},[t("p-checkbox-wrapper",{attrs:{label:"Some checkbox label 1",state:e.getState("check")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.check.check1,expression:"bag.data.check.check1"}],attrs:{type:"checkbox",name:e.validateFieldName("check")},domProps:{checked:Array.isArray(e.bag.data.check.check1)?e._i(e.bag.data.check.check1,null)>-1:e.bag.data.check.check1},on:{change:[function(a){var t=e.bag.data.check.check1,r=a.target,c=!!r.checked;if(Array.isArray(t)){var o=null,i=e._i(t,o);r.checked?i<0&&e.$set(e.bag.data.check,"check1",t.concat([o])):i>-1&&e.$set(e.bag.data.check,"check1",t.slice(0,i).concat(t.slice(i+1)))}else e.$set(e.bag.data.check,"check1",c)},e.onFieldBlur]}})]),t("p-checkbox-wrapper",{staticClass:"form-row-spacing",attrs:{label:"Some checkbox label 2",state:e.getState("check")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.check.check2,expression:"bag.data.check.check2"}],attrs:{type:"checkbox",name:e.validateFieldName("check")},domProps:{checked:Array.isArray(e.bag.data.check.check2)?e._i(e.bag.data.check.check2,null)>-1:e.bag.data.check.check2},on:{change:[function(a){var t=e.bag.data.check.check2,r=a.target,c=!!r.checked;if(Array.isArray(t)){var o=null,i=e._i(t,o);r.checked?i<0&&e.$set(e.bag.data.check,"check2",t.concat([o])):i>-1&&e.$set(e.bag.data.check,"check2",t.slice(0,i).concat(t.slice(i+1)))}else e.$set(e.bag.data.check,"check2",c)},e.onFieldBlur]}})]),t("p-checkbox-wrapper",{staticClass:"form-row-spacing",attrs:{label:"Some checkbox label 3",state:e.getState("check")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.check.check3,expression:"bag.data.check.check3"}],attrs:{type:"checkbox",name:e.validateFieldName("check")},domProps:{checked:Array.isArray(e.bag.data.check.check3)?e._i(e.bag.data.check.check3,null)>-1:e.bag.data.check.check3},on:{change:[function(a){var t=e.bag.data.check.check3,r=a.target,c=!!r.checked;if(Array.isArray(t)){var o=null,i=e._i(t,o);r.checked?i<0&&e.$set(e.bag.data.check,"check3",t.concat([o])):i>-1&&e.$set(e.bag.data.check,"check3",t.slice(0,i).concat(t.slice(i+1)))}else e.$set(e.bag.data.check,"check3",c)},e.onFieldBlur]}})]),e.bag.errors.check?t("p-text",{staticClass:"form-row-spacing",attrs:{color:"notification-error"}},[e._v(e._s(e.bag.errors.check))]):e._e()],1),t("p-fieldset-wrapper",{staticClass:"form-section-spacing",attrs:{label:"Grouped list of radio buttons"}},[t("p-radio-button-wrapper",{attrs:{label:"Some radio label 1",state:e.getState("radio")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.radio,expression:"bag.data.radio"}],attrs:{type:"radio",value:"radio1",name:e.validateFieldName("radio")},domProps:{checked:e._q(e.bag.data.radio,"radio1")},on:{change:[function(a){return e.$set(e.bag.data,"radio","radio1")},e.onFieldBlur]}})]),t("p-radio-button-wrapper",{staticClass:"form-row-spacing",attrs:{label:"Some radio label 2",state:e.getState("radio")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.radio,expression:"bag.data.radio"}],attrs:{type:"radio",value:"radio2",name:e.validateFieldName("radio")},domProps:{checked:e._q(e.bag.data.radio,"radio2")},on:{change:[function(a){return e.$set(e.bag.data,"radio","radio2")},e.onFieldBlur]}})]),t("p-radio-button-wrapper",{staticClass:"form-row-spacing",attrs:{label:"Some radio label 3",state:e.getState("radio")}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.radio,expression:"bag.data.radio"}],attrs:{type:"radio",value:"radio3",name:e.validateFieldName("radio")},domProps:{checked:e._q(e.bag.data.radio,"radio3")},on:{change:[function(a){return e.$set(e.bag.data,"radio","radio3")},e.onFieldBlur]}})]),e.bag.errors.radio?t("p-text",{staticClass:"form-row-spacing",attrs:{color:"notification-error"}},[e._v(" "+e._s(e.bag.errors.radio)+" ")]):e._e()],1),t("p-fieldset-wrapper",{staticClass:"form-section-spacing",attrs:{label:"Grouped short input"}},[t("p-grid",[t("p-grid-item",{attrs:{size:"{ base: 12, s: 10, m: 8, l: 6 }"}},[t("p-flex",{staticClass:"form-grid-item-container"},[t("p-flex-item",{staticClass:"form-grid-item",attrs:{width:"one-quarter"}},[t("p-text-field-wrapper",{attrs:{state:e.getState("day"),label:"Day"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.day,expression:"bag.data.day"}],attrs:{type:"number",placeholder:"DD",name:e.validateFieldName("day"),required:"","aria-describedby":"error-message-1"},domProps:{value:e.bag.data.day},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"day",a.target.value)}}})])],1),t("p-flex-item",{staticClass:"form-grid-item",attrs:{width:"one-quarter"}},[t("p-text-field-wrapper",{attrs:{state:e.getState("month"),label:"Month"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.month,expression:"bag.data.month"}],attrs:{type:"number",placeholder:"MM",name:e.validateFieldName("month"),required:"","aria-describedby":"error-message-2"},domProps:{value:e.bag.data.month},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"month",a.target.value)}}})])],1),t("p-flex-item",{staticClass:"form-grid-item",attrs:{width:"one-third"}},[t("p-text-field-wrapper",{attrs:{state:e.getState("year"),label:"Year"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.bag.data.year,expression:"bag.data.year"}],attrs:{type:"number",placeholder:"YYYY",name:e.validateFieldName("year"),"aria-describedby":"error-message-3"},domProps:{value:e.bag.data.year},on:{blur:e.onFieldBlur,input:function(a){a.target.composing||e.$set(e.bag.data,"year",a.target.value)}}})])],1)],1),e.bag.errors.day?t("p-text",{staticClass:"form-row-spacing",attrs:{color:"notification-error",id:"error-message-1"}},[e._v(e._s(e.bag.errors.day))]):e._e(),e.bag.errors.month?t("p-text",{attrs:{color:"notification-error",id:"error-message-2"}},[e._v(" "+e._s(e.bag.errors.month)+" ")]):e._e(),e.bag.errors.year?t("p-text",{attrs:{color:"notification-error",id:"error-message-3"}},[e._v(" "+e._s(e.bag.errors.year)+" ")]):e._e()],1)],1)],1)],1)])],1)],1)},c=[],o=(t("45fc"),t("b0c0"),t("e439"),t("07ac"),t("96cf"),t("1da1")),i=t("d4ec"),s=t("bee2"),n=t("262e"),d=t("2caf"),l=t("53ca"),b=t("2b0e"),m=t("2fe1"),u=t("2fb6"),p=t("d257"),h=function(e,a,t,r){var c,o=arguments.length,i=o<3?a:null===r?r=Object.getOwnPropertyDescriptor(a,t):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(l["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,a,t,r);else for(var s=e.length-1;s>=0;s--)(c=e[s])&&(i=(o<3?c(i):o>3?c(a,t,i):c(a,t))||i);return o>3&&i&&Object.defineProperty(a,t,i),i},g={check:{check1:!1,check2:!1,check3:!1},radio:"",day:"",month:"",year:1998},f=function(e){Object(n["a"])(t,e);var a=Object(d["a"])(t);function t(){var e;return Object(i["a"])(this,t),e=a.apply(this,arguments),e.validateFieldName=p["j"],e.getState=function(a){return Object(p["f"])(a,e.bag)},e.bag={data:Object.assign({},g),errors:Object(p["e"])(g),schema:Object(u["d"])({check:Object(u["d"])({check1:Object(u["a"])(),check2:Object(u["a"])(),check3:Object(u["a"])()}).required().test("customTest","Please select at least one option",(function(e){return!!e&&Object.values(e).some((function(e){return e}))})),radio:Object(u["e"])().required("Please select one option"),day:Object(u["c"])().required().min(1,"Please enter valid day 01-31").max(31,"Please enter valid day 01-31").typeError("Please enter a day"),month:Object(u["c"])().required().min(1,"Please enter valid month 01-12").max(12,"Please enter valid month 01-12").typeError("Please enter a month"),year:Object(u["c"])()})},e}return Object(s["a"])(t,[{key:"created",value:function(){this.onSubmit()}},{key:"onFieldBlur",value:function(e){var a=e.target;Object(p["h"])(a.name,this.bag)}},{key:"onSubmit",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(p["i"])(this.bag);case 2:a=e.sent,console.log("isValid",a);case 4:case"end":return e.stop()}}),e,this)})));function a(){return e.apply(this,arguments)}return a}()},{key:"onReset",value:function(){this.bag.data=Object.assign({},g),this.bag.errors=Object(p["e"])(g)}}]),t}(b["a"]);f=h([m["b"]],f);var k=f,v=k,y=t("2877"),w=Object(y["a"])(v,r,c,!1,null,null,null);a["default"]=w.exports},"45fc":function(e,a,t){"use strict";var r=t("23e7"),c=t("b727").some,o=t("a640"),i=t("ae40"),s=o("some"),n=i("some");r({target:"Array",proto:!0,forced:!s||!n},{some:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})},"6f53":function(e,a,t){var r=t("83ab"),c=t("df75"),o=t("fc6a"),i=t("d1e7").f,s=function(e){return function(a){var t,s=o(a),n=c(s),d=n.length,l=0,b=[];while(d>l)t=n[l++],r&&!i.call(s,t)||b.push(e?[t,s[t]]:s[t]);return b}};e.exports={entries:s(!0),values:s(!1)}}}]);
//# sourceMappingURL=chunk-6ae50934.2827e42d.js.map