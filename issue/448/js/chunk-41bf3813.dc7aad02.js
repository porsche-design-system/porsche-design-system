(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41bf3813"],{"1b6c":function(e,t,a){e.exports=a.p+"img/typography-uppercase.da1cae6f.png"},"2aa5":function(e,t,a){"use strict";var s=a("6b1d"),n=a("42c5");s({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},"2e89":function(e,t,a){e.exports=a.p+"img/typography-donts.bd7f4092.png"},"2f6a":function(e,t,a){"use strict";var s=a("72df");function n(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=s((function(){var e=n("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=s((function(){var e=n("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},"42c5":function(e,t,a){"use strict";var s=a("abfd"),n=a("2f6a"),r=RegExp.prototype.exec,i=String.prototype.replace,o=r,l=function(){var e=/a/,t=/b*/g;return r.call(e,"a"),r.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=n.UNSUPPORTED_Y||n.BROKEN_CARET,p=void 0!==/()??/.exec("")[1],h=l||p||c;h&&(o=function(e){var t,a,n,o,h=this,d=c&&h.sticky,u=s.call(h),f=h.source,v=0,_=e;return d&&(u=u.replace("y",""),-1===u.indexOf("g")&&(u+="g"),_=String(e).slice(h.lastIndex),h.lastIndex>0&&(!h.multiline||h.multiline&&"\n"!==e[h.lastIndex-1])&&(f="(?: "+f+")",_=" "+_,v++),a=new RegExp("^(?:"+f+")",u)),p&&(a=new RegExp("^"+f+"$(?!\\s)",u)),l&&(t=h.lastIndex),n=r.call(d?a:h,_),d?n?(n.input=n.input.slice(v),n[0]=n[0].slice(v),n.index=h.lastIndex,h.lastIndex+=n[0].length):h.lastIndex=0:l&&n&&(h.lastIndex=h.global?n.index+n[0].length:t),p&&n&&n.length>1&&i.call(n[0],a,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(n[o]=void 0)})),n}),e.exports=o},4360:function(e,t,a){"use strict";var s=a("e8b7"),n=a.n(s);n.a},"58d3":function(e,t,a){"use strict";var s=a("95b2"),n=a("157c"),r=a("b495"),i=a("730c"),o=a("e3f6"),l=a("df8c");s("match",1,(function(e,t,a){return[function(t){var a=i(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,a):new RegExp(t)[e](String(a))},function(e){var s=a(t,e,this);if(s.done)return s.value;var i=n(e),c=String(this);if(!i.global)return l(i,c);var p=i.unicode;i.lastIndex=0;var h,d=[],u=0;while(null!==(h=l(i,c))){var f=String(h[0]);d[u]=f,""===f&&(i.lastIndex=o(c,r(i.lastIndex),p)),u++}return 0===u?null:d}]}))},"5a5e":function(e,t,a){e.exports=a.p+"img/typography-headlines.e85dd1d2.png"},"5f4a":function(e,t,a){e.exports=a.p+"img/typography-font-weights.128373cc.png"},"75a4":function(e,t,a){var s=a("6b1d"),n=a("72df"),r=a("378c"),i=a("185a").f,o=a("d4cb"),l=n((function(){i(1)})),c=!o||l;s({target:"Object",stat:!0,forced:c,sham:!o},{getOwnPropertyDescriptor:function(e,t){return i(r(e),t)}})},"95b2":function(e,t,a){"use strict";a("2aa5");var s=a("b8ba"),n=a("72df"),r=a("7d53"),i=a("42c5"),o=a("5b12"),l=r("species"),c=!n((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),p=function(){return"$0"==="a".replace(/./,"$0")}(),h=r("replace"),d=function(){return!!/./[h]&&""===/./[h]("a","$0")}(),u=!n((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));e.exports=function(e,t,a,h){var f=r(e),v=!n((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),_=v&&!n((function(){var t=!1,a=/a/;return"split"===e&&(a={},a.constructor={},a.constructor[l]=function(){return a},a.flags="",a[f]=/./[f]),a.exec=function(){return t=!0,null},a[f](""),!t}));if(!v||!_||"replace"===e&&(!c||!p||d)||"split"===e&&!u){var g=/./[f],m=a(f,""[e],(function(e,t,a,s,n){return t.exec===i?v&&!n?{done:!0,value:g.call(t,a,s)}:{done:!0,value:e.call(a,t,s)}:{done:!1}}),{REPLACE_KEEPS_$0:p,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),x=m[0],y=m[1];s(String.prototype,e,x),s(RegExp.prototype,f,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}h&&o(RegExp.prototype[f],"sham",!0)}},a696:function(e,t,a){e.exports=a.p+"img/typography-copytext-states.a3c40ff3.png"},daa1:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vmark"},[a("h1",[e._v("Typography")]),e._m(0),a("hr"),a("h2",[e._v("Typeface: Porsche Next")]),a("p",[e._v("The special Porsche feeling and the high recognisability across different touchpoints is decisively shaped by the use of the corporate typeface Porsche Next, which has been exclusively designed for Porsche. Therefore it is the only typeface allowed to be used for Porsche in both print and digital media.")]),a("p",[e._v('Formally, the impression of the Porsche Next is largely determined by the visual character of the "squircle", a combination of square and circle, which is reflected in the curves and circular shapes of the typeface.')]),e._m(1),a("h3",[e._v("Download")]),e._m(2),a("h3",[e._v("Fallback fonts")]),e._m(3),a("h3",[e._v("Language versions")]),a("p",[e._v("The Porsche Next contains all typeface characters required for European, Greek and Cyrillic languages. Arabic, Pashtu, Persian and Urdu are not yet supported by the Porsche Design System but available as separate typeface packages on request.")]),a("h4",[e._v("Chinese / Japanese / Korean")]),e._m(4),a("hr"),a("h2",[e._v("Headline styles")]),a("p",[e._v("The Porsche headline styles should only be used for first-level headlines whose function is to lead a page, section or content area. For Porsche headlines styles, only semibold weight is used to provide a good readability and making it as easy as possible to focus on the content sections of a page. The headline styles span from large title, that can be used optionally and only once per page, to headlines 1 to 5 that can be used multiple times.")]),e._m(5),e._m(6),a("h3",[e._v("Applying headline styles")]),e._m(7),a("h3",[e._v("Headline-subline combinations")]),a("p",[e._v('A first-level headline can be supplemented by a corresponding subline. Sublines must be set in Regular using an "additional sizes" class with minimum 16px size.')]),e._m(8),a("p",[e._v("Examples:")]),e._m(9),a("h2",[e._v("Copy styles")]),e._m(10),e._m(11),e._m(12),a("h2",[e._v("Additional styles")]),e._m(13),e._m(14),a("p",[e._v("Depending on the information level of the respective text you can either chose between regular or thin weight. In both cases legibility should be ensured.")]),e._m(15),a("h3",[e._v("Porsche type scale")]),a("p",[e._v("Additional text sizes can be defined based on the Porsche type scale system.")]),a("p",[a("p-text",{staticClass:"type-scale highlight",attrs:{size:"x-small",tag:"span",color:"inherit"}},[e._v("12")]),a("p-text",{staticClass:"type-scale highlight",attrs:{tag:"span",color:"inherit"}},[e._v("16")]),a("p-text",{staticClass:"type-scale f-18",attrs:{size:"inherit",tag:"span"}},[e._v("18")]),a("p-text",{staticClass:"type-scale f-20",attrs:{size:"inherit",tag:"span"}},[e._v("20")]),a("p-text",{staticClass:"type-scale f-22",attrs:{size:"inherit",tag:"span"}},[e._v("22")]),a("p-text",{staticClass:"type-scale highlight",attrs:{size:"medium",tag:"span",color:"inherit"}},[e._v("24")]),a("p-text",{staticClass:"type-scale f-28",attrs:{size:"inherit",tag:"span"}},[e._v("28")]),a("p-text",{staticClass:"type-scale f-30",attrs:{size:"inherit",tag:"span"}},[e._v("30")]),a("p-text",{staticClass:"type-scale f-32",attrs:{size:"inherit",tag:"span"}},[e._v("32")]),a("p-text",{staticClass:"type-scale highlight",attrs:{size:"large",tag:"span",color:"inherit"}},[e._v("36")]),a("p-text",{staticClass:"type-scale f-42",attrs:{size:"inherit",tag:"span"}},[e._v("42")]),a("p-text",{staticClass:"type-scale f-44",attrs:{size:"inherit",tag:"span"}},[e._v("44")]),a("p-text",{staticClass:"type-scale f-48",attrs:{size:"inherit",tag:"span"}},[e._v("48")]),a("p-text",{staticClass:"type-scale highlight",attrs:{size:"x-large",tag:"span",color:"inherit"}},[e._v("52")]),a("p-text",{staticClass:"type-scale f-60",attrs:{size:"inherit",tag:"span"}},[e._v("60")]),a("p-text",{staticClass:"type-scale f-62",attrs:{size:"inherit",tag:"span"}},[e._v("62")]),a("p-text",{staticClass:"type-scale f-72",attrs:{size:"inherit",tag:"span"}},[e._v("72")]),a("p-text",{staticClass:"type-scale f-84",attrs:{size:"inherit",tag:"span"}},[e._v("84")])],1),a("h3",[e._v("Line height")]),e._m(16),a("h3",[e._v("Type Scale Calculator")]),a("p",[e._v("Enter a font-size in px unit based on Porsche Type Scale."),a("br"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.size,expression:"size"}],attrs:{type:"number"},domProps:{value:e.size},on:{input:function(t){t.target.composing||(e.size=t.target.value)}}})]),a("pre",[a("code",[e._v(e._s(this.typeScale(e.size+"px"))+"\n")])]),a("p",[a("strong",[e._v("Example Text")]),a("p-text",{style:e.typeScale(e.size+"px",!1),attrs:{size:"inherit"}},[e._v("The quick brown fox jumps over the lazy dog")])],1),a("hr"),a("h2",[e._v("Font styling")]),a("h3",[e._v("Text color")]),e._m(17),a("h3",[e._v("Font weights")]),a("p",[e._v("The Porsche Next is available in different font weights that enable to add emphasis and create a visual content hierarchy. For digital applications, we recommend only to use semibold, regular and thin:")]),e._m(18),e._m(19),a("h3",[e._v("Text alignment")]),a("p",[e._v("Per default, the Porsche Next is always used left-aligned. In individual cases or certain components it can also be used centered, but keep in mind to not exceed 3 text lines, as it is much harder to read. Right-aligned text is also possible in exceptional cases, for example in tables where right-aligned numbers should support readability.")]),a("p",[e._v("Please avoid…")]),e._m(20),a("h3",[e._v("Line length")]),a("p",[e._v("The longer a text line gets, the harder it is for the user to jump from the end of the current line to the beginning of the next line. Therefore we should always aim at a line length that supports good readability.")]),e._m(21),e._m(22),a("h3",[e._v("Multi-column text")]),a("p",[e._v('Generally, text paragraphs should be set as single column. Multi-column text should never exceed 3 columns and is only allowed when it can be ensured that all text columns are in the visible viewport range ("above the fold"). The user should not have to scroll before being able to read the full content.')]),a("h3",[e._v("Paragraph spacing")]),a("p",[e._v("The vertical spacing between copytext paragraphs should be at least 24px, which equals the space of one line of text in-between.")]),e._m(23),a("h3",[e._v("Upper case")]),a("p",[e._v("The usage of upper case text is possible, but should be handled with care, as upper case text is always a matter of readability. Upper case text should only be used for:")]),e._m(24),e._m(25),a("h2",[e._v("Typography principles")]),a("p",[e._v("For Porsche web applications, good typography is…")]),a("h3",[e._v("… functional.")]),a("p",[e._v("Use typography to provide clear hierarchy, to organize content and to guide the user through the digital product journey.")]),a("h3",[e._v("… clear.")]),a("p",[e._v("Use typography to provide both efficiency and, from a more visual point of view, support for a clear and modern look and feel of the Porsche application.")]),a("h3",[e._v("… readable.")]),a("p",[e._v('Never use typography by the sake of itself or as "eye candy". It should always support the usability of a website by making text readable due to a good text color contrast and sufficient text sizes.')]),a("h3",[e._v("… purposeful.")]),a("p",[e._v("Use typography wisely and always keep an eye on the user's needs and the purpose of the content you want to communicate.")]),a("h3",[e._v("… a matter of course.")]),a("p",[e._v("Always use typography in a professional manner in order to support the exclusiveness and high-quality-standard of the brand. This not only means to make use of the pre-defined type styles provided in the Porsche Design System, but also to follow the general rules of good (micro) typography, such as using the right kind of apostrophes in the respective language.")]),a("hr"),a("h2",[e._v("Accessibility")]),e._m(26),a("p",[e._v("Also, you should not rely on color only to convey information. When communicating element states with text (for example a password validation information in forms), make sure to always use additional text stylings to make it easy for visually impaired people to recognise status information even if they can’t see the color – this is of even higher importance the more critical the information is.")]),a("hr"),a("h2",[e._v("Don'ts")]),a("h3",[e._v("Text modifications")]),a("p",[e._v("Please avoid to transform the Porsche Next manually (e.g. within Sketch or via CSS), as this would have a big and undesirable impact on the origin character of the company typeface. This includes:")]),e._m(27),e._m(28)])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Typography plays an important role for the general brand impression and is indispensable for the use in digital applications, not to say: Typography "),a("strong",[e._v("is")]),e._v(" the interface. Typography enables meaningful information with well structured hierarchy and is therefore one of the most important elements to provide user guidance.")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("eb0f"),alt:"Porsche Next Squircles"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("You can download the "),a("a",{attrs:{href:"https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip"}},[e._v("Porsche Next font here")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("If in some cases the Porsche Next webfont can't be rendered by the browser (e.g. due to download errors) yo have to provide fallback fonts which should be stacked like this: "),a("code",[e._v('font-family: "Porsche Next", "Arial Narrow", Arial, sans-serif;')])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("For Chinese, Japanese and Korean language the "),a("code",[e._v("sans-serif")]),e._v(" system fonts are to be used, sticking to the default Porsche font scaling system.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("table",[a("thead",[a("tr",[a("th"),a("th",[e._v("320 - 759 px (XS)")]),a("th",[e._v("760 - 999 px (S)")]),a("th",[e._v("1000 - 1299 px (M)")]),a("th",[e._v("1300 - 1759 px (L)")]),a("th",[e._v("1760 px or larger (XL)")])])]),a("tbody",[a("tr",[a("td",[e._v("Large Title")]),a("td",[e._v("32 px")]),a("td",[e._v("42 px")]),a("td",[e._v("52 px")]),a("td",[e._v("62 px")]),a("td",[e._v("72 px")])]),a("tr",[a("td",[e._v("Headline-1")]),a("td",[e._v("28 px")]),a("td",[e._v("36 px")]),a("td",[e._v("44 px")]),a("td",[e._v("52 px")]),a("td",[e._v("60 px")])]),a("tr",[a("td",[e._v("Headline-2")]),a("td",[e._v("24 px")]),a("td",[e._v("30 px")]),a("td",[e._v("36 px")]),a("td",[e._v("42 px")]),a("td",[e._v("48 px")])]),a("tr",[a("td",[e._v("Headline-3")]),a("td",[e._v("20 px")]),a("td",[e._v("24 px")]),a("td",[e._v("28 px")]),a("td",[e._v("32 px")]),a("td",[e._v("36 px")])]),a("tr",[a("td",[e._v("Headline-4")]),a("td",[e._v("16 px")]),a("td",[e._v("18 px")]),a("td",[e._v("20 px")]),a("td",[e._v("22 px")]),a("td",[e._v("24 px")])]),a("tr",[a("td",[e._v("Headline-5")]),a("td",[e._v("16 px")]),a("td",[e._v("16 px")]),a("td",[e._v("16 px")]),a("td",[e._v("16 px")]),a("td",[e._v("16 px")])])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("5a5e"),alt:"Headline example"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Depending on your layout, you don't necessarily have to start with headline 1. Also, it is possible to skip headline sizes whenever it serves the information structure. It is much more important to keep an eye on a homogeneous use of text sizes within one application. Also, please note that the headline class namings don't necessarily refer to the HTML font tags. For example the style headline 1 can also technically be implemented as "),a("code",[e._v("<h2>")]),e._v(".")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("table",[a("thead",[a("tr",[a("th",[e._v("Headline size")]),a("th",[e._v("Subline size")])])]),a("tbody",[a("tr",[a("td",[e._v("16-18 px")]),a("td",[e._v("16 px")])]),a("tr",[a("td",[e._v("20-42 px")]),a("td",[e._v("Min. 2 sizes smaller (see Porsche type scale)")])]),a("tr",[a("td",[e._v("44 px or larger")]),a("td",[e._v("Min. 4 sizes smaller (see Porsche type scale)")])])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("f5c7"),alt:"Headline-subline combinations"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The Porsche copytext styles are typically to be used for long-form writing. The default copytext size is 16px, which is represented by the "),a("strong",[e._v("text small")]),e._v(" style. The copy "),a("strong",[e._v("text x-small")]),e._v(" is only recommended for additional, low-informative text such as disclaimers or captions. Copy text keeps the respective text size throughout all viewports.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("table",[a("thead",[a("tr",[a("th",[e._v("Copy text")]),a("th",[e._v("Font size")]),a("th",[e._v("Available states")])])]),a("tbody",[a("tr",[a("td",[e._v("Text Small (default)")]),a("td",[e._v("16 px")]),a("td",[e._v("active, default, disabled, highlight, linked")])]),a("tr",[a("td",[e._v("Text X-Small")]),a("td",[e._v("12 px")]),a("td",[e._v("active, default, disabled, highlight, linked")])])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("a696"),alt:"Copytext states"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("For short text parts that are not explicitly a page or section headline, but need a bit more focus or should be displayed larger due to aesthetic purpose, you can stick to the additional sizes provided in the Porsche Design System. There are "),a("strong",[a("span",{staticStyle:{color:"#00D5B9"}},[e._v("predefined default text sizes")])]),e._v(", which should cover most use cases.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("table",[a("thead",[a("tr",[a("th",[e._v("Additional text size")]),a("th",[e._v("Font size")])])]),a("tbody",[a("tr",[a("td",[e._v("Text Medium")]),a("td",[e._v("24 px")])]),a("tr",[a("td",[e._v("Text Large")]),a("td",[e._v("36 px")])]),a("tr",[a("td",[e._v("Text X-Large")]),a("td",[e._v("52 px")])])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("f1df"),alt:"Additional text sizes"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("For reasons of legibility, the line height should always be adjusted to the respective text size. The text styles provided work with a 4 px baseline unit that fits to the "),a("a",{attrs:{href:"#/components/spacing"}},[e._v("8 px spacing system")]),e._v(" in order to follow a harmonious overall vertical rhythm.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("The color to be used for Porsche Next depends on the "),a("a",{attrs:{href:"#/components/color"}},[e._v("Porsche color theme")]),e._v(" in use. In order to support both simplicity and legibility (sufficient contrast), default text is either to be set in Porsche Black or Porsche Light. For copytext sizes the Porsche color themes also provide different text state colors, such as Porsche Red for active states or Porsche Grey for disabled text.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("strong",[e._v("Porsche Next Semibold")]),e._v(" for first-level headlines.")]),a("li",[a("strong",[e._v("Porsche Next Bold")]),e._v(" for copytext highlights.")]),a("li",[a("strong",[e._v("Porsche Next Regular")]),e._v(" for copytext, stand-alone text or sublines (in combination with first-level headlines).")]),a("li",[a("strong",[e._v("Porsche Next Thin")]),e._v(" for stand-alone text larger than 20px.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("5f4a"),alt:"Font Weights"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("… using the font in block typesetting, as this does not correspond with the high-quality brand image.")]),a("li",[e._v("… mixing up different text alignments within one paragraph. Keep it straight and simple.")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("For UI applications it is recommended to use "),a("a",{attrs:{href:"https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-visual-presentation.html"}},[e._v("no more than 80 characters or glyphs per line")]),e._v(". This might differ a bit depending on the respective line height and viewport size and results in different pixel widths depending on the Porsche type class in use:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("Copytext X-Small (12 px): max. 400-450 px")]),a("li",[e._v("Copytext Small (16 px): max. 500-550 px")]),a("li",[e._v("Headlines and additional sizes (20-84 px): max. 700 up to max. 2700 px")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("dc30"),alt:"Copytext paragraph spacing"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("Exceptional, one-of-a-kind design cases like standing-out parts of a (graphical) composition or in sole design elements like a tag cloud.")]),a("li",[e._v("Special components for which readability is generally not critical (such as short tags).")]),a("li",[e._v("Proper names such as GTS or BOSE.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("1b6c"),alt:"Example for uppercase text"}})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("As we stick to the common "),a("a",{attrs:{href:"#/accessibility/guidelines"}},[e._v("WCAG 2.1 Standard")]),e._v(", you should always ensure a sufficient contrast ratio when designing with text. The combination of text and background color should pass the WCAG AA standard and have a contrast ratio of at least 4.5:1 for standard text size and 3:1 for larger text sizes.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("No change of letter-spacing.")]),a("li",[e._v("No use of (drop) shadows on text.")]),a("li",[e._v("No formal change of letters (for example distortion).")]),a("li",[e._v("No use of outline borders on text.")]),a("li",[e._v("No use of opacity for text colors.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("img",{attrs:{src:a("2e89"),alt:"Example for uppercase text"}})])}],r=(a("33ef"),a("75a4"),a("276c")),i=a("e954"),o=a("920b"),l=a("92a6"),c=a("0122"),p=a("60a3"),h=(a("2aa5"),a("58d3"),{4:"0.25rem",8:"0.5rem",16:"1rem",24:"1.5rem",32:"2rem",40:"2.5rem",48:"3rem",56:"3.5rem",64:"4rem",72:"4.5rem",80:"5rem"}),d=(h["4"],h["8"],h["16"],h["32"],h["48"],h["80"],/^(\d+\.?\d*)(rem|px)$/),u=16,f=function(e){var t,a=null!==(t=null===e||void 0===e?void 0:e.match(d))&&void 0!==t?t:[],s=a[1],n=a[2];if("rem"!==n||"0"===s)throw new Error("function only accepts value in rem and not 0, e.g. 1.5rem");return parseFloat(""+s)*u+"px"},v=function(e){var t,a=null!==(t=null===e||void 0===e?void 0:e.match(d))&&void 0!==t?t:[],s=a[1],n=a[2];if(void 0===n||void 0===s||"0"===s)throw new Error("font size needs to be value + px or rem and not 0, e.g. 15rem or 16px, received: '"+e+"'");var r="rem"===n?f(e):s,i=parseFloat(r),o=2.71828,l=.911/(2.97+.005*Math.pow(o,.2*i))+1.2,c=i*l,p=c%4;p>2&&(p-=4);var h=1e5,u=c-p,v=u/i;return Math.round(v*h)/h},_=function(e,t,a,s){var n,r=arguments.length,i=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"===("undefined"===typeof Reflect?"undefined":Object(c["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,a,s);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(i=(r<3?n(i):r>3?n(t,a,i):n(t,a))||i);return r>3&&i&&Object.defineProperty(t,a,i),i},g=function(e){Object(o["a"])(a,e);var t=Object(l["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.size="16",e}return Object(i["a"])(a,[{key:"typeScale",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=v(e),s=Math.round(e.slice(0,-2)*a),n=e.slice(0,-2)/16;return t?"font-size: "+n+"rem; // "+e+"\nline-height: "+a+"; // "+s+"px":"font-size: "+n+"rem; line-height: "+a+";"}}]),a}(p["c"]);g=_([p["a"]],g);var m=g,x=m,y=(a("4360"),a("2877")),b=Object(y["a"])(x,s,n,!1,null,"e9139404",null);t["default"]=b.exports},dc30:function(e,t,a){e.exports=a.p+"img/typography-paragraph-spacing.39850e11.png"},df8c:function(e,t,a){var s=a("6a61"),n=a("42c5");e.exports=function(e,t){var a=e.exec;if("function"===typeof a){var r=a.call(e,t);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==s(e))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},e3f6:function(e,t,a){"use strict";var s=a("b7fb").charAt;e.exports=function(e,t,a){return t+(a?s(e,t).length:1)}},e8b7:function(e,t,a){},eb0f:function(e,t,a){e.exports=a.p+"img/typography-squircle.10cc973b.png"},f1df:function(e,t,a){e.exports=a.p+"img/typography-additional-sizes.789657ff.png"},f5c7:function(e,t,a){e.exports=a.p+"img/typography-headline-subline.b283e9f6.png"}}]);
//# sourceMappingURL=chunk-41bf3813.dc7aad02.js.map