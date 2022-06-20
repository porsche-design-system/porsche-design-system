// TODO: this file (compiled npm package) should be used in the demo project
import { version } from '../package.json';

/* Auto Generated Below */
// prettier-ignore
export const includeBanner = (): string => `<script>!function(){var n,e;if(n=/\\b(MSIE |Trident.*?rv:|Edge\\/)(\\d+)/.exec(window.navigator.userAgent||navigator.userAgent),(e=n?parseInt(n[2]):-1)>0&&e<=18){var t=document.createElement("script");t.src="".concat("https://cdn.ui.porsche.com/browser-notification","/banner.min.").concat("${version}",".js"),document.body.appendChild(t)}}();</script>`;
// prettier-ignore
export const includeOverlay = (): string => `<script>!function(){if(["IntersectionObserver","MutationObserver","customElements"].some((function(n){return!(n in window)}))){var n=document.createElement("script");n.src="".concat("https://cdn.ui.porsche.com/browser-notification","/overlay.min.").concat("${version}",".js"),document.body.appendChild(n)}}();</script>`;
// prettier-ignore
export const includeCookieOverlay = (): string => `<script>!function(){if(!(window.navigator||navigator).cookieEnabled){var o=document.createElement("script");o.src="".concat("https://cdn.ui.porsche.com/browser-notification","/cookie-overlay.min.").concat("${version}",".js"),document.body.appendChild(o)}}();</script>`;