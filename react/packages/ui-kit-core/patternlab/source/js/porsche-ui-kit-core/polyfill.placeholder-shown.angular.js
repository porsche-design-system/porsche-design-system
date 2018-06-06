"use strict"

import { PolyfillPlaceholderShown } from "./polyfill.placeholder-shown"
;((angular) => {
    angular.module("ngPolyfillPlaceholderShown", []).directive("polyfillPlaceholderShown", () => {
        return {
            link: ($scope, $element) => {
                let polyfill = new PolyfillPlaceholderShown($element[0])
            }
        }
    })
})(window.angular)
