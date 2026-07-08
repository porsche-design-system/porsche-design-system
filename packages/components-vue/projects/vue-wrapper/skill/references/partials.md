# Partials

## Partials

Partials are utility functions that return static code or markup that is very dynamic (e.g. contains hashed file names). We primarily offer them to improve the loading and bootstrapping experience by preloading external assets like component chunks, fonts and icons but also initializing the Porsche Design System as early as possible. In addition, "fallbacks" are provided to inform the user about e.g. the usage of an unsupported browser or disabled browser cookies.

Partials have to be called during build time, **not** run time.

## Framework usage

Partials are framework-agnostic build-time functions, called at build time — **not** run time. Rather
than per-framework variants, each partial takes a `format` option that selects its output shape:

- `format: 'html'` (default) — returns an HTML string, for `index.html` or any server-rendered template.
- `format: 'jsx'` — returns JSX elements, for React/Next (requires `react/jsx-runtime` as a dependency).
- `format: 'js'` — returns a JavaScript object, for programmatic use (all partials except `getLoaderScript`).
- `format: 'sha256'` — `getLoaderScript` only; returns a SHA-256 hash for a Content Security Policy.

The per-partial "Supported options" tables below document each partial's exact `format` values.

## Font Links

**Function name:** `getFontLinks()`

Fonts should be loaded as soon as possible but only those which are needed. The Porsche Design System is not able to determine which components you use on the site and which fonts to be provided **initially**. That's why the font face stylesheet of the Porsche Design System handles the correct font to be loaded by unicode-range definition but during runtime and after bootstrapping of your application, which might result in FOUT.

Font loading strategy for Porsche Next uses `font-display: swap` (FOUT) instead of `font-display: block` for better performance and less potential for layout shifts.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-vue` packages which needs to be injected into the `<head>` of your `index.html`.

An in-depth optimization guide can be found at [Vanilla Js Optimization](https://designsystem.porsche.com/must-know/initialization/vanilla-js#optimization).

### Supported options

`type FontWeight = 'thin' | 'regular' | 'semi-bold' | 'bold'`

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `subset` | Defines which font subset should be loaded. | `'latin' \| 'greek' \| 'cyril' \| 'arabic' \| 'pashto' \| 'urdu'` | `'latin'` |
| `weights` | Defines which font weights should be loaded. | `FontWeight[]` | `['regular', 'semi-bold']` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' \| 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' \| 'jsx' \| 'js'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

**Note:** Make sure to preload only fonts which are really needed initially!

```
<!-- index.html -->
<head>
  <!--PLACEHOLDER_FONT_LINKS-->
</head>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "npm run replace",
  "replace": "placeholder='<!--PLACEHOLDER_FONT_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontLinks())') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
  <!-- Alternative: Force using China CDN -->
  "replace": "placeholder='<!--PLACEHOLDER_FONT_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontLinks({ cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
}
```

```
<link rel=preload href=https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-regular.b8f1c20.woff2 as=font type=font/woff2 crossorigin>
<link rel=preload href=https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-semi-bold.b5f6fca.woff2 as=font type=font/woff2 crossorigin>

// Alternative: Force using China CDN
<link rel=preload href=https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-latin-regular.b8f1c20.woff2 as=font type=font/woff2 crossorigin>
<link rel=preload href=https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-latin-semi-bold.b5f6fca.woff2 as=font type=font/woff2 crossorigin>
```

## Component Chunk Links

**Function name:** `getComponentChunkLinks()`

Porsche Design System components load dynamically from a CDN as soon as they are used for the first time. This results in a waterfall like loading behaviour where your application bootstraps first, then loads the Porsche Design System Core and when any component rendered the corresponding component chunk gets loaded afterwards. This can be optimized by fetching used chunks in parallel while the application is bootstrapping.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-vue` packages which needs to be injected into the `<head>` of your `index.html`.

An in-depth optimization guide can be found at [Vanilla Js Optimization](https://designsystem.porsche.com/must-know/initialization/vanilla-js#optimization).

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `components` | All components listed in the array are loaded from the CDN. By default, our core is always preloaded when using this partial. | `('accordion' \| 'ai-tag' \| 'banner' \| 'button-pure' \| 'button-tile' \| 'button' \| 'canvas' \| 'carousel' \| 'checkbox' \| 'crest' \| 'display' \| 'divider' \| 'drilldown' \| 'fieldset' \| 'flag' \| 'flyout' \| 'heading' \| 'icon' \| 'inline-notification' \| 'input-date' \| 'input-email' \| 'input-month' \| 'input-number' \| 'input-password' \| 'input-search' \| 'input-tel' \| 'input-text' \| 'input-time' \| 'input-url' \| 'input-week' \| 'link-pure' \| 'link-tile-product' \| 'link-tile' \| 'link' \| 'modal' \| 'model-signature' \| 'multi-select' \| 'optgroup' \| 'pagination' \| 'pin-code' \| 'popover' \| 'radio-group' \| 'scroller' \| 'segmented-control' \| 'select' \| 'sheet' \| 'spinner' \| 'stepper-horizontal' \| 'switch' \| 'table' \| 'tabs-bar' \| 'tabs' \| 'tag-dismissible' \| 'tag' \| 'text-list' \| 'text' \| 'textarea' \| 'toast' \| 'wordmark')[]` | `[]` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' \| 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' \| 'jsx' \| 'js'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

**Note:** Make sure to preload only component chunks which are really needed initially!

```
<!-- index.html -->
<head>
  <!--PLACEHOLDER_COMPONENT_CHUNK_LINKS-->
</head>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "npm run replace",
  "replace": "placeholder='<!--PLACEHOLDER_COMPONENT_CHUNK_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getComponentChunkLinks({ components: [\"button\", \"wordmark\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
  <!-- Alternative: force using China CDN -->
  "replace": "placeholder='<!--PLACEHOLDER_COMPONENT_CHUNK_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getComponentChunkLinks({ cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
}
```

```
<link rel=preload href=https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js as=script crossorigin>
<link rel=preload href=https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.button.5af99d4c11ab3c7d1f54.js as=script>
<link rel=preload href=https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.wordmark.e6b4300bed3bf9a2b2bb.js as=script>

// Alternative: force using China CDN
<link rel=preload href=https://cdn.ui.porsche.cn/porsche-design-system/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js as=script crossorigin>
```

## Meta Tags And Icon Links

**Function name:** `getMetaTagsAndIconLinks()`

Meta Icons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch Icons** and **Microsoft Windows Tiles**. To simplify the implementation process we provide a `getMetaTagsAndIconLinks` partial.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-vue` packages which needs to be injected into the `<head>` of your `index.html`.

This partial also provides some default Open Graph and Twitter meta tags which will display a thumbnail image when sharing a link on social media. If you want to define your own information you can set the `ogImage` option to false.

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `appTitle` | **Mandatory:** Title of your app which will be reflected in the meta tag. | `string` | `undefined` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' \| 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' \| 'jsx' \| 'js'` | `'html'` |
| `ogImage` | Boolean attribute to decide whether the Open Graph and Twitter meta tags should be included. | `boolean` | `true` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

```
<!-- index.html -->
<head>
  <!--PLACEHOLDER_META_TAGS_AND_ICON_LINKS-->
</head>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "npm run replace",
  "replace": "placeholder='<!--PLACEHOLDER_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: \"TITLE_OF_YOUR_APP\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
  <!-- Alternative: Force using China CDN -->
  "replace": "placeholder='<!--PLACEHOLDER_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: \"TITLE_OF_YOUR_APP\", cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
}
```

```
<meta property=og:title content="TITLE_OF_YOUR_APP">
<meta property=og:image content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/og-image.c880d39.png>
<meta name=twitter:title content="TITLE_OF_YOUR_APP">
<meta name=twitter:card content=summary_large_image>
<meta name=twitter:image content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/og-image.c880d39.png>
<meta name=theme-color content=#FFF media=(prefers-color-scheme:light)>
<meta name=theme-color content=#0E1418 media=(prefers-color-scheme:dark)>
<meta name=mobile-web-app-capable content=yes>
<meta name=apple-mobile-web-app-status-bar-style content=default>
<meta name=apple-mobile-web-app-title content="TITLE_OF_YOUR_APP">
<meta name=msapplication-TileImage content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.f58081f.png>
<meta name=msapplication-TileColor content=#FFF>
<link rel=icon sizes=any href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon.ed9a926.ico>
<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.d42ac28.png>
<link rel=apple-touch-icon href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11cc.png>
<link rel=manifest href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/manifest.b904b15.webmanifest>

// Alternative: Force using China CDN
<meta property=og:title content="TITLE_OF_YOUR_APP">
<meta property=og:image content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/og-image.c880d39.png>
<meta name=twitter:title content="TITLE_OF_YOUR_APP">
<meta name=twitter:card content=summary_large_image>
<meta name=twitter:image content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/og-image.c880d39.png>
<meta name=theme-color content=#FFF media=(prefers-color-scheme:light)>
<meta name=theme-color content=#0E1418 media=(prefers-color-scheme:dark)>
<meta name=mobile-web-app-capable content=yes>
<meta name=apple-mobile-web-app-status-bar-style content=default>
<meta name=apple-mobile-web-app-title content="TITLE_OF_YOUR_APP">
<meta name=msapplication-TileImage content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.f58081f.png>
<meta name=msapplication-TileColor content=#FFF>
<link rel=icon sizes=any href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon.ed9a926.ico>
<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-32x32.d42ac28.png>
<link rel=apple-touch-icon href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11cc.png>
<link rel=manifest href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/manifest.cn.7d59be6.webmanifest>
```

## Icon Links

**Function name:** `getIconLinks()`

Porsche Design System icons are loaded dynamically from a CDN as soon as they are used for the first time. This results in a waterfall like loading behaviour where your application is bootstrapped first, then loads the Porsche Design System Core and when any icon is rendered the corresponding icon is loaded afterwards. This can be optimized by prefetching used icons in parallel while the application is being bootstrapped. Keep in mind that prefetching is not yet supported on Safari and Safari on iOS, so you will not see a performance benefit there. [Current prefetch status on CanIUse](https://caniuse.com/link-rel-prefetch)

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-vue` packages which needs to be injected into the `<head>` of your `index.html`.

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `icons` | All icons listed in the array are loaded from the CDN. | `({{this.iconNames}})[]` | `['arrowHeadRight']` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' \| 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' \| 'jsx' \| 'js'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

**Note:** Make sure to preload only icons which are really needed initially!

```
<!-- index.html -->
<head>
  <!--PLACEHOLDER_ICON_LINKS-->
</head>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "npm run replace",
  "replace": "placeholder='<!--PLACEHOLDER_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getIconLinks({ icons: [\"arrow-head-right\", \"plus\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
  <!-- Alternative: Force using China CDN -->
  "replace": "placeholder='<!--PLACEHOLDER_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getIconLinks({ icons: [\"arrow-head-right\", \"plus\"], cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
}
```

```
<link rel=prefetch href=https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-head-right.304b330.svg as=image type=image/svg+xml crossorigin>
<link rel=prefetch href=https://cdn.ui.porsche.com/porsche-design-system/icons/plus.319993e.svg as=image type=image/svg+xml crossorigin>

// Alternative: Force using China CDN
<link rel=prefetch href=https://cdn.ui.porsche.cn/porsche-design-system/icons/arrow-head-right.304b330.svg as=image type=image/svg+xml crossorigin>
<link rel=prefetch href=https://cdn.ui.porsche.cn/porsche-design-system/icons/plus.319993e.svg as=image type=image/svg+xml crossorigin>
```

## Loader Script

**Function name:** `getLoaderScript()`

When using `porsche-design-system/components-{angular|react}` our core loader gets bundled into your application. This impacts the loading behavior of Porsche Design System components because the code gets executed **later**, once the framework bootstraps.

To achieve this bootstrapping **earlier** we provide a partial in all `@porsche-design-system/components-vue` packages which needs to be injected into the `<body>` of your `index.html`.

An in-depth optimization guide can be found at [Vanilla Js Optimization](https://designsystem.porsche.com/must-know/initialization/vanilla-js#optimization).

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `prefix` | Prefix will be added to the component names. | `string \| string[]` | `undefined` |
| `format` | Defines the output format of the partial. By default it returns a html string. For `jsx` it returns a jsx element. For `sha256` it returns a SHA-256 hash of the innerHTML to use in a [Content Security Policy (CSP)](https://designsystem.porsche.com/must-know/security/content-security-policy/). | `'html' \| 'jsx' \| 'sha256'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

```
<!-- index.html -->
<body>
  <!--PLACEHOLDER_LOADER_SCRIPT-->
</body>

<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
"scripts": {
  "prestart": "npm run replace",
  "replace": "placeholder='<!--PLACEHOLDER_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript())') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
  <!-- Alternative: With custom prefix -->
  "replace": "placeholder='<!--PLACEHOLDER_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript({ prefix: \"custom-prefix\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
  <!-- Alternative: With multiple custom prefixes -->
  "replace": "placeholder='<!--PLACEHOLDER_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript({ prefix: [\"\", \"custom-prefix\", \"another-prefix\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"
}
```

```
<script data-pds-loader-script>
var porscheDesignSystem;(()=>
{"use strict";var e={d:(t,o)=>
{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>
Object.prototype.hasOwnProperty.call(e,t),r:e=>
{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{load:()=>
r});const o="porscheDesignSystem";function n(){return document[o]||(document[o]={}),document[o]}function s({script:e,version:t,prefix:s}){const r=function(e){const t=n(),{[e]:o}=t;if(!o){let o=()=>
{};const n=new Promise(e=>
o=e);t[e]={isInjected:!1,isReady:()=>
n,readyResolve:o,prefixes:[],registerCustomElements:null}}return t[e]}(t),{isInjected:c,prefixes:i=[],registerCustomElements:d}=r,[u]=Object.entries(n()).filter(([e,o])=>
e!==t&&"object"==typeof o&&o.prefixes.includes(s));if(u)throw new Error(`[Porsche Design System v${t}] prefix '${s}' is already registered with version '${u[0]}' of the Porsche Design System. Please use a different one.\nTake a look at document.${o} for more details.`);c||(function(e){const t=document.createElement("script");t.src=e,t.setAttribute("crossorigin",""),document.body.appendChild(t)}(e),r.isInjected=!0),i.includes(s)||(i.push(s),d&&d(s))}const r=(e={})=>
{const t="PORSCHE_DESIGN_SYSTEM_CDN";window[t]=e.cdn||window[t]||(window.location.origin.match(/\.cn$/)?"cn":"auto");const o="porscheDesignSystem";document[o]||(document[o]={}),document[o].cdn={url:"https://cdn.ui.porsche."+("cn"===window[t]?"cn":"com"),prefixes:[]},s({version:"4.3.0",script:"http://localhost:3001/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js",prefix:e.prefix||""})};porscheDesignSystem=t})();porscheDesignSystem.load()
</script>

// Alternative: With custom prefix
<script data-pds-loader-script>
var porscheDesignSystem;(()=>
{"use strict";var e={d:(t,o)=>
{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>
Object.prototype.hasOwnProperty.call(e,t),r:e=>
{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{load:()=>
r});const o="porscheDesignSystem";function n(){return document[o]||(document[o]={}),document[o]}function s({script:e,version:t,prefix:s}){const r=function(e){const t=n(),{[e]:o}=t;if(!o){let o=()=>
{};const n=new Promise(e=>
o=e);t[e]={isInjected:!1,isReady:()=>
n,readyResolve:o,prefixes:[],registerCustomElements:null}}return t[e]}(t),{isInjected:c,prefixes:i=[],registerCustomElements:d}=r,[u]=Object.entries(n()).filter(([e,o])=>
e!==t&&"object"==typeof o&&o.prefixes.includes(s));if(u)throw new Error(`[Porsche Design System v${t}] prefix '${s}' is already registered with version '${u[0]}' of the Porsche Design System. Please use a different one.\nTake a look at document.${o} for more details.`);c||(function(e){const t=document.createElement("script");t.src=e,t.setAttribute("crossorigin",""),document.body.appendChild(t)}(e),r.isInjected=!0),i.includes(s)||(i.push(s),d&&d(s))}const r=(e={})=>
{const t="PORSCHE_DESIGN_SYSTEM_CDN";window[t]=e.cdn||window[t]||(window.location.origin.match(/\.cn$/)?"cn":"auto");const o="porscheDesignSystem";document[o]||(document[o]={}),document[o].cdn={url:"https://cdn.ui.porsche."+("cn"===window[t]?"cn":"com"),prefixes:[]},s({version:"4.3.0",script:"http://localhost:3001/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js",prefix:e.prefix||""})};porscheDesignSystem=t})();porscheDesignSystem.load({prefix:'custom-prefix'})
</script>

// Alternative: With multiple custom prefixes
<script data-pds-loader-script>
var porscheDesignSystem;(()=>
{"use strict";var e={d:(t,o)=>
{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>
Object.prototype.hasOwnProperty.call(e,t),r:e=>
{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{load:()=>
r});const o="porscheDesignSystem";function n(){return document[o]||(document[o]={}),document[o]}function s({script:e,version:t,prefix:s}){const r=function(e){const t=n(),{[e]:o}=t;if(!o){let o=()=>
{};const n=new Promise(e=>
o=e);t[e]={isInjected:!1,isReady:()=>
n,readyResolve:o,prefixes:[],registerCustomElements:null}}return t[e]}(t),{isInjected:c,prefixes:i=[],registerCustomElements:d}=r,[u]=Object.entries(n()).filter(([e,o])=>
e!==t&&"object"==typeof o&&o.prefixes.includes(s));if(u)throw new Error(`[Porsche Design System v${t}] prefix '${s}' is already registered with version '${u[0]}' of the Porsche Design System. Please use a different one.\nTake a look at document.${o} for more details.`);c||(function(e){const t=document.createElement("script");t.src=e,t.setAttribute("crossorigin",""),document.body.appendChild(t)}(e),r.isInjected=!0),i.includes(s)||(i.push(s),d&&d(s))}const r=(e={})=>
{const t="PORSCHE_DESIGN_SYSTEM_CDN";window[t]=e.cdn||window[t]||(window.location.origin.match(/\.cn$/)?"cn":"auto");const o="porscheDesignSystem";document[o]||(document[o]={}),document[o].cdn={url:"https://cdn.ui.porsche."+("cn"===window[t]?"cn":"com"),prefixes:[]},s({version:"4.3.0",script:"http://localhost:3001/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js",prefix:e.prefix||""})};porscheDesignSystem=t})();porscheDesignSystem.load({prefix:''});porscheDesignSystem.load({prefix:'custom-prefix'});porscheDesignSystem.load({prefix:'another-prefix'})
</script>
```
