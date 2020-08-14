(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51340d55"],{"14dd":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vmark"},[o("h1",[e._v("Checkbox")]),o("p",[e._v("Use a Checkbox for a list of options when you want to enable the user to select no, one or more options (This distinguishes the Checkbox from the radio button, where the user has only one choice). Checking one box doesn't uncheck other Checkboxes. By default Checkboxes are not selected.")]),o("hr"),o("h2",[e._v("States")]),o("p",[e._v("All Checkboxes are available in the following states:")]),e._m(0),o("p",[e._v("The indeterminate state is only a visual state and cannot be achieved by direct user interaction. The indeterminate state occurs if the checkbox contains a sublist of selections, some of which are selected, and some unselected.")]),e._m(1),e._m(2),o("hr"),o("h2",[e._v("Styling")]),o("h3",[e._v("Checkbox")]),o("p",[e._v("The squared box is used as a typical Checkbox indicator and can have different states, depending on whether it's checked or not.")]),o("h3",[e._v("Label")]),o("p",[e._v("The label text (always in copytext) gives the user an information about the option that can be selected. Try to keep the label short and descriptive (one word or two)")]),o("h3",[e._v("Validation and error")]),e._m(3),o("h3",[e._v("Spacing")]),e._m(4),o("hr"),o("h2",[e._v("Usage")]),o("h3",[e._v("A stand-alone Checkbox")]),o("p",[e._v("Is used for a single option that the user can turn on or off (e.g. in case of a confirmation of terms and conditions).")]),o("h3",[e._v("Disabled State")]),o("p",[e._v('All Checkboxes are available in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: "The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…)." (Donald A. Norman, 2002)')]),o("h2",[e._v("Interaction")]),o("p",[e._v("The whole Checkbox area is clickable.")]),o("div",{staticStyle:{background:"#F2F2F2",width:"100%","margin-top":"64px","padding-top":"32px","padding-left":"42px","padding-bottom":"42px"}},[o("p-headline",{staticStyle:{"margin-bottom":"24px"},attrs:{variant:"headline-3",tag:"h3"}},[e._v("Examples")]),o("img",{attrs:{src:n("478b"),alt:"Examples"}})],1),o("hr"),o("h2",[e._v("Don'ts")]),o("h3",[e._v("Mixing with Radio Buttons")]),o("p",[e._v("Never mix Radio Buttons and Checkboxes.")]),e._m(5),o("h3",[e._v("Alignment")]),o("p",[e._v("Preferably set checkboxes vertically left-aligned, as this supports scannability way better than a horizontal alignment.")]),e._m(6),e._m(7),o("hr"),o("h2",[e._v("Related Components")]),e._m(8)])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("default")]),n("li",[e._v("checked")]),n("li",[e._v("disabled")]),n("li",[e._v("hover")]),n("li",[e._v("focus")]),n("li",[e._v("indeterminate")])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[o("img",{attrs:{src:n("31c4"),alt:"Example of indeterminate checkbox"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("error")]),n("li",[e._v("success")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("Contrary to Radio Buttons, each Checkbox item can have its own validation message. Please find more information in the "),n("a",{attrs:{href:"#/patterns/forms"}},[e._v("Form pattern guideline")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v('According to the "law of proximity" in Gestalt psychology ('),n("a",{attrs:{href:"https://lawsofux.com/law-of-proximity"}},[e._v("Laws of UX")]),e._v(") objects that are near or proximate to each other tend to be grouped together. Please find more information in the "),n("a",{attrs:{href:"#/patterns/forms"}},[e._v("Form pattern guideline")]),e._v(".")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[o("img",{attrs:{src:n("379b"),alt:"Don't mix Checkboxes and Radio Buttons"}})])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[o("img",{attrs:{src:n("7492"),alt:"Don't set checkboxes vertically"}})])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[o("img",{attrs:{src:n("659b"),alt:"Example for alignment"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"#/components/radio-button"}},[e._v("Radio Button")])]),n("li",[n("a",{attrs:{href:"#/components/select"}},[e._v("Select")])])])}],r=(n("8f0b"),n("75a4"),n("fa8c"),n("276c")),i=n("e954"),c=n("920b"),s=n("92a6"),A=n("0122"),f=n("60a3"),l=function(e,t,n,o){var a,r=arguments.length,i=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"===("undefined"===typeof Reflect?"undefined":Object(A["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(i=(r<3?a(i):r>3?a(t,n,i):a(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},v=function(e){Object(c["a"])(n,e);var t=Object(s["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(i["a"])(n,[{key:"mounted",value:function(){this.$nextTick((function(){var e=document.querySelectorAll(".example-set-to-indeterminate");e.forEach((function(e){e.indeterminate=!0}))}))}}]),n}(f["c"]);v=l([f["a"]],v);var d=v,h=d,u=n("2877"),b=Object(u["a"])(h,o,a,!1,null,null,null);t["default"]=b.exports},"31c4":function(e,t,n){e.exports=n.p+"img/checkbox-indeterminate.51050940.png"},"379b":function(e,t){e.exports="data:image/png;base64,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"},"478b":function(e,t,n){e.exports=n.p+"img/checkbox-examples.22b66fee.png"},"659b":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACxCAMAAADplk+pAAACOlBMVEX///8yNjk/Q0bi4uKnqKo0ODvNzs7Cw8OztLTZ2dk7P0JMTEwAAADm5ubBwcH39/dra2uVlpbq6upHS03c3NzMzMxwcHAbGxv7+/ujo6OXl5d2eXvz8/NYW16NjY0iIiJsbGxYWFhdYGL19fVvcXSvr68rKysJCQmcnJwxMTHy8vL5+fk/Pz+kpKRtbW0NDQ0fHx9ISEgPDw8VFRVoaGj9/f0TExNVVVXs7O3e3t51dXVKTVCJi40DAwN9fX3Hx8d7e3vt7e2Hh4c1NTX8/PxLS0tFRUXJycn+/v6AgIBDQ0POzs6srKzExMTLy8tgYGA3Nze+vr4XFxefn588QEPa29wvLy+oqKjQ0NCKioo5OTmnp6dTU1PFxcaQkJBjY2N4eHg7Ozusra/X19d6enqTk5Pu7u6/v7/T09Pf39+Njo6Dg4O3t7fV1dUGBgZPT09rbnACAgKBgYFaWlq5ubleXl4oKChzc3Po6OgMDAybm5slJSX4+Pj29vbv7+9iZmngAAD+9/jfO1HVABzWBSH0ucH86ezcIzzZEiz51dr97vDdK0PXDCf3ytD98fPdMEfXCCP2xcz75OfaHTf52d7++PngQVbVAh7zsrv519zbIDn75un//f7jVGfwnqn2x87dLkXnanvshpTztb7gPlTrgpDobn7woazjUWXvmqbkWGv//v/sipfmZ3jyr7jhRFn/+vvocoLqfo71wsneM0r+8/XkW27hR1zZFzH63uL+9PbeNUz40Nbob3+3Xi6kAAADNUlEQVR4AezOMQEAEAAAMID+jZ0uN9gSLAAAAMBL4oKd3WSXcjl3V1uvg5l60I4YCKMAfKOzmrXtDWvbtm3bbt+9Se2jtrs39pdk5s9dnd5gfPtnTeQxZnwVC7F+Wn2KzfQHOrvDSb3Vudxuj9ftdvvwNv5AVnTBUPhTr4hE8TGxeDZ0iWSK+lqXzvAZPQRRgqzk5RfwhYXyE8lcVFxSWqauBgrLKyqBqqJib7XvD3Q1lbXU17qquvqGRr5JznjQ3NLqamvv6Oh80nV19/Tyfepqd78uMwAMFg35h0d+Tccy9KNodIylvtE1jwMonICurrdgEhh482endMB0o7raAcwUoIoYgOrZX9Nxug6O0pZzOu47XaxAFEV+Hlggi3ivQ2hioSRfXa0EOkhSR8ZF0bv0e3/WaFjWFuxjLflSZ+teUdMENJLVD7o1r8ffounWgX4S2iCb6plbv9junI5tiqp9rCVf63YGAewy2Cuw7+8BpQcvus4CAZjWdJtAugArhAH2dL/ZK8Khw8OnWvK1bvKor3OOd3QuHeNkqRPp8g7pWRet950STXcmh7rP0Hl+UXbZIvxqn01JUor6QYftq/39Zlzf3OKy+BpWj5c8V5SZ6P5Su6qrq+brFDPQcbNPuu9+t6Lcy8aGQBvFo0IClxlaUFpZBkLXyQDYtWMUCIEgiKJH39W+uKkgQmXVwnvhRD/sgXLfqVMHAAAAANzwe7GkLn9OqStQp645Vcnr8qlKoy6fqvTqClOVvK4wVcnrClOVvK4wVcnrClOVvK4wVcnrClOVoK44VQnqKlMVN4o6P8b9AAAA4L+ZOnUN6tQ9qAOAbzvOmbnaL4dECWAgiNbRvzG2bdu423SNcYFa5G3S3asXJ1/fj8WfXyv+/Qvoebxm4vPflwJBK4XCUCAS5UDFboV4wgrJFDRI/5lNJntJc/lPowAViiHTKQXOWZlyFehQTZpQ7R2kTrkGlGhSqZWzqM2o04UUPUr1gQFHcTiCGGPqTaZcgbM51OguqEe53x/oMVp+HlmtochmSznfDs5OYGYFdoU7UV5PY/2bTPQVsGfkXlD6r0/9l7v+r0f+x+hwCHAAv/B77dFkEgUAAAAASUVORK5CYII="},7492:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZQAAACJCAMAAAA8JD5jAAACJVBMVEX///8yNjk/Q0bh4eKmqKk2Oj3Ozs7Cw8M0ODuztLTZ2dk7P0JNTU0AAADn5+fBwcH29vZra2tMTEyUlpfq6upHS03c3NzMzMxwcHAbGxv7+/ujo6OXl5d3eHnz8/NYW16NjY0iIiJsbGxYWFhdYGL19fVvcXSvr68rKysJCQmcnJwxMTHy8/P6+vo/Pz+kpKRubm4NDQ0fHx/m5uZISEgPDw8VFRVoaGj9/f0TExNVVVXt7e3e3t51dXVKTVCJi40DAwN9fX3Hx8d7e3uHh4c1NTX8/PxLS0tFRUXJycn//v6BgYFDQ0OsrKzExMRgYGA3Nze/v78XFxefn5/a29wvLy+oqKjQ0NCKioo6Ojqnp6dTU1PJysvExcaQkJBjY2NkZGRtbW2sra+oqatqamrX19d6enqTk5OioqLT09Pf39+LjY+Dg4O3t7fV1dWWlpYGBgZPT0/i4uJrbnDFxcU8PDxaWlrx8fG5ubleXl75+flCQkIoKChzc3Po6OgMDAyampolJSX4+Pibm5vv7+/gAAD+9/jfO1HVABzWAx/0ucH86ezcIzzZEiz51tv97vDdK0PWCyb3ytD98fPdMEfXCCP2xs375ejaHTf52d7gQVbzsbrbIDnjUmbwnqndLkXnaHnshpTztb7gPlTrgpDobn7woazvmqbkWWz//v/sipfhRlv/+vvocoLqfo71wsneNEv+9Pb86u3ZFzH63uLXDSj40NZZBIQpAAADQ0lEQVR4AezRCQkAMAwEwf7+JVfB8ZdCmDFwIdteAgAAAAAAAAAAAAAAgB7YFkUUjxHFtseUjDLmysfZ/nLcPpcde2BsK4qjAH7uFO3WbZzUbVg7tu3Z3mq7/eB7qXVn7/6D53d+zxCJ2Tie/VtwEqmMnMHdpodVg6uqltZdaj2q+gae/aM2SmNTMzmLa5HLFUq5XK7C2VJrvh3Hs78Wp9XpL13wWttwsdo7vh3Hs78S19nVTa7G9fQaeiUwmsywWPv6BwyDg5Yj0dDwyOjYuNCqGZyYnAJswyNKu4qN49lfh3NMOcnVOJvL7fEapiy9Cvj8gZZgKByOHOGisVtxQ0JojclFvUkgNZxWZ7JsHM/+EtyN69cOQbLcDcLA+fIABgsQueIDRSB55jAuiYCyV2gNA5UB2KgUsN9h43j2l+DEortiUm3eE4lZuPYBk8lkuA88oFqcx0FXeDj6SGidAsK0S0TzJpOyzMbx7C/BEZn0cbXxRCojLNzT2DOhpgAvfX4B90LZ/9J/hJNTXZq+EsZ8zcbx7C/CkeamN4Q4m5oJE/c2BeDddbwf+DD9HhibOcFFBoxAuYp7BfQM4BmdBd6L2Die/WU4ojfPzZn1hI0ruhKReUNTZCGKxYUIeibCS8e4NrdqmVZxK6u6tRVE1jfGN/1GNo5nfyGOdC+ZuwkbJ/xtTU/7sL2zi82RPdQplHT1EIdK23Q5JOBcdoPLOgSEd6bpWp2A49nfe0vsdH7mbWlkUwVGLR01u3SHzX0dz/7Yrj2YyxWFYRj967t1Bd+1NY5t1JcxHsTJaK0Cjt7jvf0+N55i3Q6MKKKIIgoAAAAAAAAAAAAAAAC/jrsrhx9GQRREEQVRREEUURCFAgAAAOCvuHc/ye5eLdg/SHJ4VEvC8UmS07Oac36R5PKqlobrmySHtzV1r5Fkt1lLxNFhktZ1je2009eppeLqMkn3vEZ66XtQS8bD3SSP7tXA4/Q9qaXjafraO1X1LH3PXxTL9zJ9varmbpJXr2sV8CZ9b99dJnn/oVYCL56nb9Dk4GOtCF6/ytCnz7Uy+PA+fV++1poSBbcvD/r92g5eifHx6DcLfkj6dY9BLgwHmziBKUYAwDda4Nph4B6qFQAAAABJRU5ErkJggg=="},"75a4":function(e,t,n){var o=n("6b1d"),a=n("72df"),r=n("378c"),i=n("185a").f,c=n("d4cb"),s=a((function(){i(1)})),A=!c||s;o({target:"Object",stat:!0,forced:A,sham:!c},{getOwnPropertyDescriptor:function(e,t){return i(r(e),t)}})},"8f0b":function(e,t,n){"use strict";var o=n("6b1d"),a=n("e8e5");o({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},e8e5:function(e,t,n){"use strict";var o=n("d054").forEach,a=n("7f8a"),r=n("ce71"),i=a("forEach"),c=r("forEach");e.exports=i&&c?[].forEach:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}},fa8c:function(e,t,n){var o=n("f498"),a=n("130d"),r=n("e8e5"),i=n("5b12");for(var c in a){var s=o[c],A=s&&s.prototype;if(A&&A.forEach!==r)try{i(A,"forEach",r)}catch(f){A.forEach=r}}}}]);
//# sourceMappingURL=chunk-51340d55.1cffa557.js.map