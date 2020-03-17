(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ade25652"],{c257:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vmark"},[o("h1",[e._v("Text Field")]),o("p",[e._v("Use Text Fields in forms to help user enter text. Text Fields should always be accompanied by labels, helping the user to understand the type of input that is required.")]),o("hr"),o("h2",[e._v("Variants")]),o("h3",[e._v("Placeholder")]),e._m(0),o("p",[o("p-text-field-wrapper",{attrs:{label:"Some label"}},[o("input",{attrs:{type:"text",name:"some-name",placeholder:"Some placeholder text"}})])],1),o("h3",[e._v("Password")]),o("p",[e._v("Password fields have the ability to hide/show the typed password.")]),o("p",[o("p-text-field-wrapper",{attrs:{label:"Some label"}},[o("input",{attrs:{type:"password",name:"some-name",value:"some password"}})])],1),o("h3",[e._v("Pure (without label)")]),o("p",[e._v("The component Pure (without label) is only used if the context clearly describes what the component Pure is to be used for and no further explanation is required.")]),o("p",[o("p-text-field-wrapper",{attrs:{label:"Some label","hide-label":"true"}},[o("input",{attrs:{type:"text",name:"some-name"}})])],1),o("hr"),o("h2",[e._v("States")]),o("p",[e._v("All Text Fields types are available in the following states:")]),e._m(1),o("hr"),o("h2",[e._v("Styling")]),o("h3",[e._v("Label")]),o("p",[e._v("The label text (always in copytext) gives the user an information about the option that can be selected. Try to keep the label short and descriptive (a word or two).")]),o("h3",[e._v("Input area")]),o("p",[e._v("Enables users to enter a single line text.")]),o("h3",[e._v("Width")]),e._m(2),o("h3",[e._v("Help text")]),e._m(3),o("h3",[e._v("Validation and error")]),e._m(4),o("h3",[e._v("Spacing")]),e._m(5),o("hr"),o("h2",[e._v("Usage")]),o("h3",[e._v("Mandatory and optional fields")]),o("p",[e._v("Generally, it’s recommended to avoid optional fields in forms due to the fact that we should not give the user the feeling of having to give information that is not absolutely necessary. That being said, we would then have to label almost every (mandatory) form field with the well-known asterisk accompanied by a global explanation (“All fields marked with * ...“). In order to give the Porsche forms a more positive connotation and for the reason that users are more likely to provide voluntary information, we recommend to mark only optional fields by adding “(optional)” next to the input label.")]),o("p",[e._v("By doing so…")]),e._m(6),o("p",[o("p-text-field-wrapper",{attrs:{label:"Some label (optional)"}},[o("input",{attrs:{type:"text",name:"some-name"}})])],1),o("h3",[e._v("Disabled state")]),o("p",[e._v("All types of Text Field are available as disabled state. However, disabled states (e.g. read only) should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the use cannot make errors in the first place (…).” (Donald A. Norman, 2002)")]),o("div",{staticStyle:{background:"#F2F2F2",width:"100%","margin-top":"64px","padding-top":"32px","padding-left":"42px","padding-bottom":"42px"}},[o("p-headline",{staticStyle:{"margin-bottom":"24px"},attrs:{variant:"headline-3",tag:"h3"}},[e._v("Examples")]),o("img",{attrs:{src:a("c61a"),alt:"Examples for button usage"}})],1),o("h2",[e._v("Don'ts")]),o("h3",[e._v("Long text inputs")]),o("p",[e._v("Don't use the Text Field component if you need to allow users to enter longer text. In this case, you should use the Textarea component.")]),o("hr"),o("h2",[e._v("Related Components")]),e._m(7)])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Placeholder text disappears when a user types in the input. If a user doesn’t enter a value and moves to another part of a form, the placeholder text reappears in the former text box. However, using placeholder text is not recommended since users can misinterpret it as already filled in content. For further information we recommend to read the general form guideline. "),a("a",{attrs:{href:"#/patterns/forms"}},[e._v("Forms Guideline")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("default")]),a("li",[e._v("disabled")]),a("li",[e._v("read only")]),a("li",[e._v("focus")]),a("li",[e._v("error")]),a("li",[e._v("success")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Text fields have no specific width. Depending on the layout you can set the width either depending on the length of the text or by adjusting it to the grid. Baymard Institute usability study showed that: “If a field was too long or too short, the test subjects started to wonder if they had misunderstood the label (…).” "),a("a",{attrs:{href:"https://baymard.com/blog/form-field-usability-matching-user-expectations"}},[e._v("Baymard Institute")]),e._v(" The initial width of the sketch symbol is set to 272 px (corresponds to the grid width on viewport XS). For further information we recommend to read the general form guideline. "),a("a",{attrs:{href:"#/patterns/forms"}},[e._v("Forms Guideline")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Help text should be displayed openly and directly, also in order not to expect the user to make additional clicks. For further information we recommend to read the general form guideline. "),a("a",{attrs:{href:"#/patterns/forms"}},[e._v("Forms Guideline")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Validation text for a field is placed right below the field box in order to make it clear for the user which text field the validation belongs to. For further information we recommend to read the general form guideline. "),a("a",{attrs:{href:"#/patterns/forms"}},[e._v("Forms Guideline")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v('According to the "law of proximity" in Gestalt psychology ('),a("a",{attrs:{href:"https://lawsofux.com/law-of-proximity"}},[e._v("Laws of UX")]),e._v(") objects that are near or proximate to each other tend to be grouped together. For further information we recommend to read the general form guideline. "),a("a",{attrs:{href:"#/patterns/forms"}},[e._v("Forms Guideline")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("user feel less overwhelmed, as there are way less “(optional)” labels than there would be asterisks.")]),a("li",[e._v("users do not have to read a global explanation (“All fields marked with * ...“).")]),a("li",[e._v("the asterisk is obsolete or freely available for other purposes, e.g. footnotes.")]),a("li",[e._v("forms not only seem to be more positive, but also look more cleaned up in general.")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("a",{attrs:{href:"#/components/form/textarea"}},[e._v("Textarea")])])])}],n=a("2877"),i={},s=Object(n["a"])(i,o,r,!1,null,null,null);t["default"]=s.exports},c61a:function(e,t,a){e.exports=a.p+"img/form-text-field-examples.35155f3b.png"}}]);
//# sourceMappingURL=chunk-ade25652.e86b704a.js.map