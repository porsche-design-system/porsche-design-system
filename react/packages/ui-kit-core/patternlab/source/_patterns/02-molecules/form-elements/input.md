---
title: Input
state: inprogress
---
Polyfill for :placeholder-shown support is available for input so that browsers like IE will be able to show field and placeholder correctly. 
polyfill.placeholder-shown.js and input.polyfill.placeholder-shown.scss should be imported. In addition there's a angular
extension polyfill.placeholder-shown.angular.js available.

To use the angular version of the polyfill simply require polyfill.placeholder-shown.js, polyfill.placeholder-shown.angular.js and 
input.polyfill.placeholder-shown.scss then add to module dependencies: 'ngPolyfillPlaceholderShown' and add to each input field 
the attribute 'polyfill-placeholder-shown'.

angular.module('myApp', ['ngPolyfillPlaceholderShown'])

