(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ecdf8fe4"],{"32f5":function(e,t,n){"use strict";var o=n("95b2"),a=n("157c"),s=n("37d1"),i=n("b495"),r=n("8bb2"),c=n("730c"),l=n("e3f6"),d=n("df8c"),h=Math.max,p=Math.min,u=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,f=/\$([$&'`]|\d\d?)/g,_=function(e){return void 0===e?e:String(e)};o("replace",2,(function(e,t,n,o){var m=o.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,y=o.REPLACE_KEEPS_$0,g=m?"$":"$0";return[function(n,o){var a=c(this),s=void 0==n?void 0:n[e];return void 0!==s?s.call(n,a,o):t.call(String(a),n,o)},function(e,o){if(!m&&y||"string"===typeof o&&-1===o.indexOf(g)){var s=n(t,e,this,o);if(s.done)return s.value}var c=a(e),u=String(this),v="function"===typeof o;v||(o=String(o));var f=c.global;if(f){var b=c.unicode;c.lastIndex=0}var S=[];while(1){var x=d(c,u);if(null===x)break;if(S.push(x),!f)break;var k=String(x[0]);""===k&&(c.lastIndex=l(u,i(c.lastIndex),b))}for(var E="",$=0,F=0;F<S.length;F++){x=S[F];for(var U=String(x[0]),T=h(p(r(x.index),u.length),0),C=[],D=1;D<x.length;D++)C.push(_(x[D]));var P=x.groups;if(v){var O=[U].concat(C,T,u);void 0!==P&&O.push(P);var I=String(o.apply(void 0,O))}else I=w(U,u,T,C,P,o);T>=$&&(E+=u.slice($,T)+I,$=T+U.length)}return E+u.slice($)}];function w(e,n,o,a,i,r){var c=o+e.length,l=a.length,d=f;return void 0!==i&&(i=s(i),d=v),t.call(r,d,(function(t,s){var r;switch(s.charAt(0)){case"$":return"$";case"&":return e;case"`":return n.slice(0,o);case"'":return n.slice(c);case"<":r=i[s.slice(1,-1)];break;default:var d=+s;if(0===d)return t;if(d>l){var h=u(d/10);return 0===h?t:h<=l?void 0===a[h-1]?s.charAt(1):a[h-1]+s.charAt(1):t}r=a[d-1]}return void 0===r?"":r}))}}))},"37d1":function(e,t,n){var o=n("730c");e.exports=function(e){return Object(o(e))}},"9ce0":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vmark"},[n("h1",[e._v("Loading Behaviour")]),n("p",[e._v("Unstyled content when opening an application or website creates a bad first impression. To prevent this, the Porsche Design System offers various solutions to ensure all necessary Porsche Design System fonts and components are fully loaded.")]),n("p",[e._v("On this page you find detailed instructions on how to prevent Flash of Unstyled Content and Flash of Unstyled Text where we provide options to boost your application, so make sure to keep reading.")]),n("h2",[e._v("Unstyled Porsche Design System Components")]),e._m(0),e._m(1),e._m(2),n("h3",[e._v("Example usage with template")]),e._m(3),n("h3",[e._v("Example usage static")]),e._m(4),n("pre",[n("code",[e._v("// index.html\n\n<head>\n  "+e._s(e.coreStyles)+"\n</head>\n")])]),n("h2",[e._v("Flash of Unstyled Text")]),n("p",[e._v("The Porsche Design System provides font face definitions and loads all needed fonts dynamically from our CDN. Until the fonts are fully loaded the components use the fallback font and you can see a little change as soon as loading is finished.")]),n("h3",[e._v("Inject Porsche Design System Stylesheet")]),n("p",[e._v("So far, if you use the Porsche Design System components we inject the stylesheet with all font face definitions into the head of your application as soon as our core is loaded. We recommend that you load the stylesheet on your own. We don't want to interfere with you application if we don't have to. Also you got more control over resources that are loaded.")]),e._m(5),e._m(6),n("h4",[e._v("Example")]),n("pre",[n("code",[e._v("// index.html\n// Using template syntax\n<head>\n  <%= require('@porsche-design-system/partials').getFontFaceCSS() %>\n</head>\n\n// Static solution\n// If you use the static solution watch your console output. We notify if changes happen.\n<head>\n  "+e._s(e.fontFaceCSS)+"\n</head>\n")])]),n("h3",[e._v("Preload specific Fonts")]),n("p",[e._v("Fonts should be loaded as soon as possible but only those which are needed. The Porsche Design System is not able to determine which components you use on the site and which fonts we have to provide initially but we export all resources you need to preload fonts and solve 'Flash of Unstyled Text' in your application")]),e._m(7),n("h4",[e._v("Example preload")]),e._m(8)])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If you use "),n("code",[e._v("Porsche Design System")]),e._v(" components, we take care that your application only renders a component if it is fully styled. But there is a blink until our core is loaded and we can take action. This short timespan has to be covered.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("There are two ways to get rid of FOUC. We provide partials in our "),n("code",[e._v("@porsche-design-system/partials")]),e._v(" package for you to import into the "),n("code",[e._v("<head>")]),e._v(" of your "),n("code",[e._v("index.html")]),e._v(". The example shows how to implement a partial in a webpack project.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If you are not able to use partials use the second, static solution. Just copy the whole "),n("code",[e._v("<style>")]),e._v(" tag from the second example and put it into the "),n("code",[e._v("<head>")]),e._v(" of the "),n("code",[e._v("index.html")]),e._v(" of your application. While using the static solution, make sure to list every component you use and update the list when you upgrade the version of the "),n("code",[e._v("Porsche Design Sytem")]),e._v(" with new components introduced.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v("// index.html\n\n<head>\n  <%= require('@porsche-design-system/partials').getPorscheDesignSystemCoreStyles() %>\n</head>\n")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("strong",[e._v("Note:")]),e._v(" If you implement this static solution you have to keep track of the list and add every new component you use.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("We provide the URL to our stylesheet in our "),n("code",[e._v("@porsche-design-system/assets")]),e._v(" package with the name "),n("code",[e._v("FONT_FACE_CDN_URL")]),e._v(". We also provide a ready to use partial in the "),n("code",[e._v("@porsche-design-system/partials")]),e._v(" package called "),n("code",[e._v("getFontFaceCSS()")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("If you use the static solution you have to update the "),n("code",[e._v("<Link>")]),e._v(" if changes are made in our font face definitions. But don't worry, we don't remove old files to grant you a valid fallback.")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("We provide all URL´s you need in the "),n("code",[e._v("@porsche-design-system/assets")]),e._v(" package. Use the const "),n("code",[e._v("FONTS_CDN_BASE_URL")]),e._v(" which is the basic path to the CDN and the object "),n("code",[e._v("FONTS_MANIFEST")]),e._v(" which contains the filenames of all "),n("code",[e._v("fonts")]),e._v(" and according "),n("code",[e._v("weights")]),e._v(" in either "),n("code",[e._v("woff")]),e._v(" or "),n("code",[e._v("woff2")]),e._v(" file format. Combine the path and filename to preload them as "),n("code",[e._v("href")]),e._v(" in a "),n("code",[e._v("<Link>")]),e._v(" at the head of your "),n("code",[e._v("index.html")]),e._v(".")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",[e._v('<head>\n <link\n   rel="preload"\n   href="path/to/webfont/nameOfWebFontFile"\n   as="font"\n   type="font/woff2"\n   crossorigin\n />\n</head>\n')])])}],s=(n("ac1f"),n("5319"),n("d4ec")),i=n("262e"),r=n("2caf"),c=n("9ab4"),l=n("2b0e"),d=n("2fe1"),h=(n("2aa5"),n("32f5"),function(e){var t=("cn"===(null===e||void 0===e?void 0:e.cdn)?"https://cdn.ui.porsche.cn":"https://cdn.ui.porsche.com")+"/porsche-design-system/styles/"+("cn"===(null===e||void 0===e?void 0:e.cdn)?"font-face.min.cn.c1b46971322e96095de49987cdc90226.css":"font-face.min.de7353ac41430a74da152a5bf0e7bb5b.css");return(null===e||void 0===e?void 0:e.withoutTags)?t:"<link rel=stylesheet href=$URL$>".replace("$URL$",t)}),p=function(e){var t="p-button,p-button-pure,p-checkbox-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,p-grid-item,p-headline,p-icon,p-link,p-link-pure,p-link-social,p-marque,p-pagination,p-radio-button-wrapper,p-select-wrapper,p-spinner,p-tabs,p-tabs-item,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea-wrapper{visibility:hidden}";return(null===e||void 0===e?void 0:e.withoutTags)?t:"<style>"+t+"</style>"},u=function(e){Object(i["a"])(n,e);var t=Object(r["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.fontFaceCSS=h(),e.coreStyles=p().replace(">",">\n    ").replace(/,/g,",\n    ").replace("}","}\n  "),e}return n}(l["a"]);u=Object(c["a"])([d["b"]],u);var v=u,f=v,_=n("2877"),m=Object(_["a"])(f,o,a,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-ecdf8fe4.254bfaaf.js.map