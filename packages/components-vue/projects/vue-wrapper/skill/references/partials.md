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

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages which needs to be injected into the `<head>` of your `index.html`.

An in-depth optimization guide can be found at [Vanilla Js Optimization](/must-know/initialization/vanilla-js#optimization).

### Supported options

`type FontWeight = 'thin' | 'regular' | 'semi-bold' | 'bold'`

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `subset` | Defines which font subset should be loaded. | `'latin' | 'greek' | 'cyril' | 'arabic' | 'pashto' | 'urdu'` | `'latin'` |
| `weights` | Defines which font weights should be loaded. | `FontWeight[]` | `['regular', 'semi-bold']` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' | 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' | 'jsx' | 'js'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

**Note:** Make sure to preload only fonts which are really needed initially!

```
<span class=""><!-- index.html -->
</span><span class=""></span><span class="xml hljs-tag"><</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="xml">
</span><span class="xml">  </span><span class="xml hljs-comment"><!--PLACEHOLDER_FONT_LINKS--></span><span class="xml">
</span><span class="xml"></span><span class="xml hljs-tag"></</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="">
</span>
<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
<span class=""></span><span class="hljs-string">"scripts"</span><span class="">: {
</span><span class="">  </span><span class="hljs-string">"prestart"</span><span class="">: </span><span class="hljs-string">"npm run replace"</span><span class="">,
</span><span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_FONT_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontLinks())') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>  <!-- Alternative: Force using China CDN -->
<span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_FONT_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontLinks({ cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>}
```

```
<span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-regular.b8f1c20.woff2 </span><span class="hljs-attribute">as</span><span class="">=font </span><span class="hljs-attribute">type</span><span class="">=font/woff2 crossorigin>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-semi-bold.b5f6fca.woff2 </span><span class="hljs-attribute">as</span><span class="">=font </span><span class="hljs-attribute">type</span><span class="">=font/woff2 crossorigin>
</span>
// Alternative: Force using China CDN
<span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-latin-regular.b8f1c20.woff2 </span><span class="hljs-attribute">as</span><span class="">=font </span><span class="hljs-attribute">type</span><span class="">=font/woff2 crossorigin>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/fonts/porsche-next-latin-semi-bold.b5f6fca.woff2 </span><span class="hljs-attribute">as</span><span class="">=font </span><span class="hljs-attribute">type</span><span class="">=font/woff2 crossorigin>
</span>
```

## Component Chunk Links

**Function name:** `getComponentChunkLinks()`

Porsche Design System components load dynamically from a CDN as soon as they are used for the first time. This results in a waterfall like loading behaviour where your application bootstraps first, then loads the Porsche Design System Core and when any component rendered the corresponding component chunk gets loaded afterwards. This can be optimized by fetching used chunks in parallel while the application is bootstrapping.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages which needs to be injected into the `<head>` of your `index.html`.

An in-depth optimization guide can be found at [Vanilla Js Optimization](/must-know/initialization/vanilla-js#optimization).

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `components` | All components listed in the array are loaded from the CDN. By default, our core is always preloaded when using this partial. | `('accordion' | 'ai-tag' | 'banner' | 'button-pure' | 'button-tile' | 'button' | 'canvas' | 'carousel' | 'checkbox' | 'crest' | 'display' | 'divider' | 'drilldown' | 'fieldset' | 'flag' | 'flyout' | 'heading' | 'icon' | 'inline-notification' | 'input-date' | 'input-email' | 'input-month' | 'input-number' | 'input-password' | 'input-search' | 'input-tel' | 'input-text' | 'input-time' | 'input-url' | 'input-week' | 'link-pure' | 'link-tile-product' | 'link-tile' | 'link' | 'modal' | 'model-signature' | 'multi-select' | 'optgroup' | 'pagination' | 'pin-code' | 'popover' | 'radio-group' | 'scroller' | 'segmented-control' | 'select' | 'sheet' | 'spinner' | 'stepper-horizontal' | 'switch' | 'table' | 'tabs-bar' | 'tabs' | 'tag-dismissible' | 'tag' | 'text-list' | 'text' | 'textarea' | 'toast' | 'wordmark')[]` | `[]` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' | 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' | 'jsx' | 'js'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

**Note:** Make sure to preload only component chunks which are really needed initially!

```
<span class=""><!-- index.html -->
</span><span class=""></span><span class="xml hljs-tag"><</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="xml">
</span><span class="xml">  </span><span class="xml hljs-comment"><!--PLACEHOLDER_COMPONENT_CHUNK_LINKS--></span><span class="xml">
</span><span class="xml"></span><span class="xml hljs-tag"></</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="">
</span>
<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
<span class=""></span><span class="hljs-string">"scripts"</span><span class="">: {
</span><span class="">  </span><span class="hljs-string">"prestart"</span><span class="">: </span><span class="hljs-string">"npm run replace"</span><span class="">,
</span><span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_COMPONENT_CHUNK_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getComponentChunkLinks({ components: [\"button\", \"wordmark\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>  <!-- Alternative: force using China CDN -->
<span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_COMPONENT_CHUNK_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getComponentChunkLinks({ cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>}
```

```
<span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js </span><span class="hljs-attribute">as</span><span class="">=script crossorigin>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.button.5af99d4c11ab3c7d1f54.js </span><span class="hljs-attribute">as</span><span class="">=script>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.wordmark.e6b4300bed3bf9a2b2bb.js </span><span class="hljs-attribute">as</span><span class="">=script>
</span>
// Alternative: force using China CDN
<span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=preload </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js </span><span class="hljs-attribute">as</span><span class="">=script crossorigin>
</span>
```

## Meta Tags And Icon Links

**Function name:** `getMetaTagsAndIconLinks()`

Meta Icons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch Icons** and **Microsoft Windows Tiles**. To simplify the implementation process we provide a `getMetaTagsAndIconLinks` partial.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages which needs to be injected into the `<head>` of your `index.html`.

This partial also provides some default Open Graph and Twitter meta tags which will display a thumbnail image when sharing a link on social media. If you want to define your own information you can set the `ogImage` option to false.

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `appTitle` | **Mandatory:** Title of your app which will be reflected in the meta tag. | `string` | `undefined` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' | 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' | 'jsx' | 'js'` | `'html'` |
| `ogImage` | Boolean attribute to decide whether the Open Graph and Twitter meta tags should be included. | `boolean` | `true` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

```
<span class=""><!-- index.html -->
</span><span class=""></span><span class="xml hljs-tag"><</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="xml">
</span><span class="xml">  </span><span class="xml hljs-comment"><!--PLACEHOLDER_META_TAGS_AND_ICON_LINKS--></span><span class="xml">
</span><span class="xml"></span><span class="xml hljs-tag"></</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="">
</span>
<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
<span class=""></span><span class="hljs-string">"scripts"</span><span class="">: {
</span><span class="">  </span><span class="hljs-string">"prestart"</span><span class="">: </span><span class="hljs-string">"npm run replace"</span><span class="">,
</span><span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: \"TITLE_OF_YOUR_APP\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>  <!-- Alternative: Force using China CDN -->
<span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: \"TITLE_OF_YOUR_APP\", cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>}
```

```
<span class=""><meta </span><span class="hljs-attribute">property</span><span class="">=og:title </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-string">"TITLE_OF_YOUR_APP"</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">property</span><span class="">=og:image </span><span class="hljs-attribute">content</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/og-image.c880d39.png>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=twitter:title </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-string">"TITLE_OF_YOUR_APP"</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=twitter:card </span><span class="hljs-attribute">content</span><span class="">=summary_large_image>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=twitter:image </span><span class="hljs-attribute">content</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/og-image.c880d39.png>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=theme-color </span><span class="hljs-attribute">content</span><span class="">=#FFF media=(prefers-color-scheme:light)>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=theme-color </span><span class="hljs-attribute">content</span><span class="">=#0E1418 media=(prefers-color-scheme:dark)>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=mobile-web-app-capable </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-literal">yes</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=apple-mobile-web-app-status-bar-style </span><span class="hljs-attribute">content</span><span class="">=default>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=apple-mobile-web-app-title </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-string">"TITLE_OF_YOUR_APP"</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=msapplication-TileImage </span><span class="hljs-attribute">content</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.f58081f.png>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=msapplication-TileColor </span><span class="hljs-attribute">content</span><span class="">=#FFF>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=icon </span><span class="hljs-attribute">sizes</span><span class="">=any </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon.ed9a926.ico>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=icon </span><span class="hljs-attribute">type</span><span class="">=image/png </span><span class="hljs-attribute">sizes</span><span class="">=32x32 </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.d42ac28.png>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=apple-touch-icon </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11cc.png>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=manifest </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/manifest.b904b15.webmanifest>
</span>
// Alternative: Force using China CDN
<span class=""><meta </span><span class="hljs-attribute">property</span><span class="">=og:title </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-string">"TITLE_OF_YOUR_APP"</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">property</span><span class="">=og:image </span><span class="hljs-attribute">content</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/og-image.c880d39.png>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=twitter:title </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-string">"TITLE_OF_YOUR_APP"</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=twitter:card </span><span class="hljs-attribute">content</span><span class="">=summary_large_image>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=twitter:image </span><span class="hljs-attribute">content</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/og-image.c880d39.png>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=theme-color </span><span class="hljs-attribute">content</span><span class="">=#FFF media=(prefers-color-scheme:light)>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=theme-color </span><span class="hljs-attribute">content</span><span class="">=#0E1418 media=(prefers-color-scheme:dark)>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=mobile-web-app-capable </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-literal">yes</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=apple-mobile-web-app-status-bar-style </span><span class="hljs-attribute">content</span><span class="">=default>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=apple-mobile-web-app-title </span><span class="hljs-attribute">content</span><span class="">=</span><span class="hljs-string">"TITLE_OF_YOUR_APP"</span><span class="">>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=msapplication-TileImage </span><span class="hljs-attribute">content</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.f58081f.png>
</span><span class=""><meta </span><span class="hljs-attribute">name</span><span class="">=msapplication-TileColor </span><span class="hljs-attribute">content</span><span class="">=#FFF>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=icon </span><span class="hljs-attribute">sizes</span><span class="">=any </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon.ed9a926.ico>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=icon </span><span class="hljs-attribute">type</span><span class="">=image/png </span><span class="hljs-attribute">sizes</span><span class="">=32x32 </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-32x32.d42ac28.png>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=apple-touch-icon </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11cc.png>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=manifest </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/manifest.cn.7d59be6.webmanifest>
</span>
```

## Icon Links

**Function name:** `getIconLinks()`

Porsche Design System icons are loaded dynamically from a CDN as soon as they are used for the first time. This results in a waterfall like loading behaviour where your application is bootstrapped first, then loads the Porsche Design System Core and when any icon is rendered the corresponding icon is loaded afterwards. This can be optimized by prefetching used icons in parallel while the application is being bootstrapped. Keep in mind that prefetching is not yet supported on Safari and Safari on iOS, so you will not see a performance benefit there. [Current prefetch status on CanIUse](https://caniuse.com/link-rel-prefetch)

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages which needs to be injected into the `<head>` of your `index.html`.

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `icons` | All icons listed in the array are loaded from the CDN. | `({{this.iconNames}})[]` | `['arrowHeadRight']` |
| `cdn` | Decides from which CDN the resources are loaded. | `'auto' | 'cn'` | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the `js` option a javascript object is returned. | `'html' | 'jsx' | 'js'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

**Note:** Make sure to preload only icons which are really needed initially!

```
<span class=""><!-- index.html -->
</span><span class=""></span><span class="xml hljs-tag"><</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="xml">
</span><span class="xml">  </span><span class="xml hljs-comment"><!--PLACEHOLDER_ICON_LINKS--></span><span class="xml">
</span><span class="xml"></span><span class="xml hljs-tag"></</span><span class="xml hljs-tag hljs-name">head</span><span class="xml hljs-tag">></span><span class="">
</span>
<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
<span class=""></span><span class="hljs-string">"scripts"</span><span class="">: {
</span><span class="">  </span><span class="hljs-string">"prestart"</span><span class="">: </span><span class="hljs-string">"npm run replace"</span><span class="">,
</span><span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getIconLinks({ icons: [\"arrow-head-right\", \"plus\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>  <!-- Alternative: Force using China CDN -->
<span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getIconLinks({ icons: [\"arrow-head-right\", \"plus\"], cdn: \"cn\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>}
```

```
<span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=prefetch </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-head-right.304b330.svg </span><span class="hljs-attribute">as</span><span class="">=image </span><span class="hljs-attribute">type</span><span class="">=image/svg+xml crossorigin>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=prefetch </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.com/porsche-design-system/icons/plus.319993e.svg </span><span class="hljs-attribute">as</span><span class="">=image </span><span class="hljs-attribute">type</span><span class="">=image/svg+xml crossorigin>
</span>
// Alternative: Force using China CDN
<span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=prefetch </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/icons/arrow-head-right.304b330.svg </span><span class="hljs-attribute">as</span><span class="">=image </span><span class="hljs-attribute">type</span><span class="">=image/svg+xml crossorigin>
</span><span class=""><link </span><span class="hljs-attribute">rel</span><span class="">=prefetch </span><span class="hljs-attribute">href</span><span class="">=https://cdn.ui.porsche.cn/porsche-design-system/icons/plus.319993e.svg </span><span class="hljs-attribute">as</span><span class="">=image </span><span class="hljs-attribute">type</span><span class="">=image/svg+xml crossorigin>
</span>
```

## Loader Script

**Function name:** `getLoaderScript()`

When using `porsche-design-system/components-{angular|react}` our core loader gets bundled into your application. This impacts the loading behavior of Porsche Design System components because the code gets executed **later**, once the framework bootstraps.

To achieve this bootstrapping **earlier** we provide a partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages which needs to be injected into the `<body>` of your `index.html`.

An in-depth optimization guide can be found at [Vanilla Js Optimization](/must-know/initialization/vanilla-js#optimization).

### Supported options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `prefix` | Prefix will be added to the component names. | `string | string[]` | `undefined` |
| `format` | Defines the output format of the partial. By default it returns a html string. For `jsx` it returns a jsx element. For `sha256` it returns a SHA-256 hash of the innerHTML to use in a [Content Security Policy (CSP)](/must-know/security/content-security-policy/). | `'html' | 'jsx' | 'sha256'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.

### Examples

Project integration differs based on the project setup. The following showcases the most common ways.

```
<span class=""><!-- index.html -->
</span><span class=""></span><span class="xml hljs-tag"><</span><span class="xml hljs-tag hljs-name">body</span><span class="xml hljs-tag">></span><span class="xml">
</span><span class="xml">  </span><span class="xml hljs-comment"><!--PLACEHOLDER_LOADER_SCRIPT--></span><span class="xml">
</span><span class="xml"></span><span class="xml hljs-tag"></</span><span class="xml hljs-tag hljs-name">body</span><span class="xml hljs-tag">></span><span class="">
</span>
<!-- package.json (tested on macOS, the script may need to be adjusted depending on the operating system used) -->
<!-- make sure to adjust the path to the index.html file -->
<span class=""></span><span class="hljs-string">"scripts"</span><span class="">: {
</span><span class="">  </span><span class="hljs-string">"prestart"</span><span class="">: </span><span class="hljs-string">"npm run replace"</span><span class="">,
</span><span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript())') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>  <!-- Alternative: With custom prefix -->
<span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript({ prefix: \"custom-prefix\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>  <!-- Alternative: With multiple custom prefixes -->
<span class="">  </span><span class="hljs-string">"replace"</span><span class="">: </span><span class="hljs-string">"placeholder='<!--PLACEHOLDER_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript({ prefix: [\"\", \"custom-prefix\", \"another-prefix\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s^$regex^$partial^\" index.html"</span><span class="">
</span>}
```

```
<span class=""><script data-pds-loader-script>
</span><span class=""></span><span class="hljs-keyword">var</span><span class=""> porscheDesignSystem;</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">(</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{</span><span class="hljs-string">"use strict"</span><span class="">;</span><span class="hljs-keyword">var</span><span class=""> e={</span><span class="hljs-attr">d</span><span class="">:</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">t,o</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{</span><span class="hljs-keyword">for</span><span class="">(</span><span class="hljs-keyword">var</span><span class=""> n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{</span><span class="hljs-attr">enumerable</span><span class="">:!</span><span class="hljs-number">0</span><span class="">,</span><span class="hljs-attr">get</span><span class="">:o[n]})},</span><span class="hljs-attr">o</span><span class="">:</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">e,t</span><span class="hljs-function">)=></span><span class="">
</span><span class="">Object.prototype.hasOwnProperty.call(e,t),</span><span class="hljs-attr">r</span><span class="">:</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">=></span><span class="">
</span><span class="">{</span><span class="hljs-string">"undefined"</span><span class="">!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{</span><span class="hljs-attr">value</span><span class="">:</span><span class="hljs-string">"Module"</span><span class="">}),Object.defineProperty(e,</span><span class="hljs-string">"__esModule"</span><span class="">,{</span><span class="hljs-attr">value</span><span class="">:!</span><span class="hljs-number">0</span><span class="">})}},t={};e.r(t),e.d(t,{</span><span class="hljs-attr">load</span><span class="">:</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">r});const o=</span><span class="hljs-string">"porscheDesignSystem"</span><span class="">;</span><span class="hljs-function hljs-keyword">function</span><span class="hljs-function"> </span><span class="hljs-function hljs-title">n</span><span class="hljs-function">(</span><span class="hljs-function">)</span><span class="">{</span><span class="hljs-keyword">return</span><span class=""> document[o]||</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">document[o]={}</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">[</span><span class="hljs-function hljs-params">o</span><span class="hljs-function">]}</span><span class="hljs-function hljs-params">function</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">s</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">{script:e,version:t,prefix:s}</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">r</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">function</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">t</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">n</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">,{[</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">]:</span><span class="hljs-function hljs-params">o</span><span class="hljs-function">}=</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">;</span><span class="hljs-function hljs-params">if</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">!o</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">let</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">o</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">{};const n=</span><span class="hljs-keyword">new</span><span class=""> Promise(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">=></span><span class="">
</span><span class="">o=e);t[e]={</span><span class="hljs-attr">isInjected</span><span class="">:!</span><span class="hljs-number">1</span><span class="">,</span><span class="hljs-attr">isReady</span><span class="">:</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">n,</span><span class="hljs-attr">readyResolve</span><span class="">:o,</span><span class="hljs-attr">prefixes</span><span class="">:[],</span><span class="hljs-attr">registerCustomElements</span><span class="">:</span><span class="hljs-literal">null</span><span class="">}}</span><span class="hljs-keyword">return</span><span class=""> t[e]}(t),{</span><span class="hljs-attr">isInjected</span><span class="">:c,</span><span class="hljs-attr">prefixes</span><span class="">:i=[],</span><span class="hljs-attr">registerCustomElements</span><span class="">:d}=r,[u]=Object.entries(n()).filter(</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">[e,o]</span><span class="hljs-function">)=></span><span class="">
</span><span class="">e!==t&&</span><span class="hljs-string">"object"</span><span class="">==typeof o&&o.prefixes.includes(s));</span><span class="hljs-keyword">if</span><span class="">(u)throw </span><span class="hljs-keyword">new</span><span class=""> Error(</span><span class="hljs-string">`[Porsche Design System v</span><span class="hljs-string hljs-subst">${t}</span><span class="hljs-string">] prefix '</span><span class="hljs-string hljs-subst">${s}</span><span class="hljs-string">' is already registered with version '</span><span class="hljs-string hljs-subst">${u[</span><span class="hljs-string hljs-subst hljs-number">0</span><span class="hljs-string hljs-subst">]}</span><span class="hljs-string">' of the Porsche Design System. Please use a different one.\nTake a look at document.</span><span class="hljs-string hljs-subst">${o}</span><span class="hljs-string"> for more details.`</span><span class="">);c||</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-keyword">function</span><span class="hljs-function hljs-params">(e</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">t</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">createElement</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-string">"script"</span><span class="hljs-function">);</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">src</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">,</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">setAttribute</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-string">"crossorigin"</span><span class="hljs-function hljs-params">,</span><span class="hljs-function hljs-params hljs-string">""</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">body</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">appendChild</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">)}(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">r</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">isInjected</span><span class="hljs-function">=!0),</span><span class="hljs-function hljs-params">i</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">includes</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">s</span><span class="hljs-function">)||(</span><span class="hljs-function hljs-params">i.push(s</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">d</span><span class="hljs-function">&&</span><span class="hljs-function hljs-params">d</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">s</span><span class="hljs-function">))}</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">r</span><span class="hljs-function">=(</span><span class="hljs-function hljs-params">e={}</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{const t=</span><span class="hljs-string">"PORSCHE_DESIGN_SYSTEM_CDN"</span><span class="">;window[t]=e.cdn||window[t]||(window.location.origin.match(</span><span class="hljs-regexp">/\.cn$/</span><span class="">)?</span><span class="hljs-string">"cn"</span><span class="">:</span><span class="hljs-string">"auto"</span><span class="">);const o=</span><span class="hljs-string">"porscheDesignSystem"</span><span class="">;document[o]||(document[o]={}),document[o].cdn={</span><span class="hljs-attr">url</span><span class="">:</span><span class="hljs-string">"https://cdn.ui.porsche."</span><span class="">+(</span><span class="hljs-string">"cn"</span><span class="">===window[t]?</span><span class="hljs-string">"cn"</span><span class="">:</span><span class="hljs-string">"com"</span><span class="">),</span><span class="hljs-attr">prefixes</span><span class="">:[]},s({</span><span class="hljs-attr">version</span><span class="">:</span><span class="hljs-string">"4.3.0"</span><span class="">,</span><span class="hljs-attr">script</span><span class="">:</span><span class="hljs-string">"http://localhost:3001/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js"</span><span class="">,</span><span class="hljs-attr">prefix</span><span class="">:e.prefix||</span><span class="hljs-string">""</span><span class="">})};porscheDesignSystem=t})();porscheDesignSystem.load()
</span></script>

<span class=""></span><span class="hljs-comment">// Alternative: With custom prefix</span><span class="">
</span><script data-pds-loader-script>
<span class=""></span><span class="hljs-keyword">var</span><span class=""> porscheDesignSystem;</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">(</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{</span><span class="hljs-string">"use strict"</span><span class="">;</span><span class="hljs-keyword">var</span><span class=""> e={</span><span class="hljs-attr">d</span><span class="">:</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">t,o</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{</span><span class="hljs-keyword">for</span><span class="">(</span><span class="hljs-keyword">var</span><span class=""> n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{</span><span class="hljs-attr">enumerable</span><span class="">:!</span><span class="hljs-number">0</span><span class="">,</span><span class="hljs-attr">get</span><span class="">:o[n]})},</span><span class="hljs-attr">o</span><span class="">:</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">e,t</span><span class="hljs-function">)=></span><span class="">
</span><span class="">Object.prototype.hasOwnProperty.call(e,t),</span><span class="hljs-attr">r</span><span class="">:</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">=></span><span class="">
</span><span class="">{</span><span class="hljs-string">"undefined"</span><span class="">!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{</span><span class="hljs-attr">value</span><span class="">:</span><span class="hljs-string">"Module"</span><span class="">}),Object.defineProperty(e,</span><span class="hljs-string">"__esModule"</span><span class="">,{</span><span class="hljs-attr">value</span><span class="">:!</span><span class="hljs-number">0</span><span class="">})}},t={};e.r(t),e.d(t,{</span><span class="hljs-attr">load</span><span class="">:</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">r});const o=</span><span class="hljs-string">"porscheDesignSystem"</span><span class="">;</span><span class="hljs-function hljs-keyword">function</span><span class="hljs-function"> </span><span class="hljs-function hljs-title">n</span><span class="hljs-function">(</span><span class="hljs-function">)</span><span class="">{</span><span class="hljs-keyword">return</span><span class=""> document[o]||</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">document[o]={}</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">[</span><span class="hljs-function hljs-params">o</span><span class="hljs-function">]}</span><span class="hljs-function hljs-params">function</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">s</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">{script:e,version:t,prefix:s}</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">r</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">function</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">t</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">n</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">,{[</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">]:</span><span class="hljs-function hljs-params">o</span><span class="hljs-function">}=</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">;</span><span class="hljs-function hljs-params">if</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">!o</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">let</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">o</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">{};const n=</span><span class="hljs-keyword">new</span><span class=""> Promise(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">=></span><span class="">
</span><span class="">o=e);t[e]={</span><span class="hljs-attr">isInjected</span><span class="">:!</span><span class="hljs-number">1</span><span class="">,</span><span class="hljs-attr">isReady</span><span class="">:</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">n,</span><span class="hljs-attr">readyResolve</span><span class="">:o,</span><span class="hljs-attr">prefixes</span><span class="">:[],</span><span class="hljs-attr">registerCustomElements</span><span class="">:</span><span class="hljs-literal">null</span><span class="">}}</span><span class="hljs-keyword">return</span><span class=""> t[e]}(t),{</span><span class="hljs-attr">isInjected</span><span class="">:c,</span><span class="hljs-attr">prefixes</span><span class="">:i=[],</span><span class="hljs-attr">registerCustomElements</span><span class="">:d}=r,[u]=Object.entries(n()).filter(</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">[e,o]</span><span class="hljs-function">)=></span><span class="">
</span><span class="">e!==t&&</span><span class="hljs-string">"object"</span><span class="">==typeof o&&o.prefixes.includes(s));</span><span class="hljs-keyword">if</span><span class="">(u)throw </span><span class="hljs-keyword">new</span><span class=""> Error(</span><span class="hljs-string">`[Porsche Design System v</span><span class="hljs-string hljs-subst">${t}</span><span class="hljs-string">] prefix '</span><span class="hljs-string hljs-subst">${s}</span><span class="hljs-string">' is already registered with version '</span><span class="hljs-string hljs-subst">${u[</span><span class="hljs-string hljs-subst hljs-number">0</span><span class="hljs-string hljs-subst">]}</span><span class="hljs-string">' of the Porsche Design System. Please use a different one.\nTake a look at document.</span><span class="hljs-string hljs-subst">${o}</span><span class="hljs-string"> for more details.`</span><span class="">);c||</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-keyword">function</span><span class="hljs-function hljs-params">(e</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">t</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">createElement</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-string">"script"</span><span class="hljs-function">);</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">src</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">,</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">setAttribute</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-string">"crossorigin"</span><span class="hljs-function hljs-params">,</span><span class="hljs-function hljs-params hljs-string">""</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">body</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">appendChild</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">)}(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">r</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">isInjected</span><span class="hljs-function">=!0),</span><span class="hljs-function hljs-params">i</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">includes</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">s</span><span class="hljs-function">)||(</span><span class="hljs-function hljs-params">i.push(s</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">d</span><span class="hljs-function">&&</span><span class="hljs-function hljs-params">d</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">s</span><span class="hljs-function">))}</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">r</span><span class="hljs-function">=(</span><span class="hljs-function hljs-params">e={}</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{const t=</span><span class="hljs-string">"PORSCHE_DESIGN_SYSTEM_CDN"</span><span class="">;window[t]=e.cdn||window[t]||(window.location.origin.match(</span><span class="hljs-regexp">/\.cn$/</span><span class="">)?</span><span class="hljs-string">"cn"</span><span class="">:</span><span class="hljs-string">"auto"</span><span class="">);const o=</span><span class="hljs-string">"porscheDesignSystem"</span><span class="">;document[o]||(document[o]={}),document[o].cdn={</span><span class="hljs-attr">url</span><span class="">:</span><span class="hljs-string">"https://cdn.ui.porsche."</span><span class="">+(</span><span class="hljs-string">"cn"</span><span class="">===window[t]?</span><span class="hljs-string">"cn"</span><span class="">:</span><span class="hljs-string">"com"</span><span class="">),</span><span class="hljs-attr">prefixes</span><span class="">:[]},s({</span><span class="hljs-attr">version</span><span class="">:</span><span class="hljs-string">"4.3.0"</span><span class="">,</span><span class="hljs-attr">script</span><span class="">:</span><span class="hljs-string">"http://localhost:3001/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js"</span><span class="">,</span><span class="hljs-attr">prefix</span><span class="">:e.prefix||</span><span class="hljs-string">""</span><span class="">})};porscheDesignSystem=t})();porscheDesignSystem.load({</span><span class="hljs-attr">prefix</span><span class="">:</span><span class="hljs-string">'custom-prefix'</span><span class="">})
</span></script>

<span class=""></span><span class="hljs-comment">// Alternative: With multiple custom prefixes</span><span class="">
</span><script data-pds-loader-script>
<span class=""></span><span class="hljs-keyword">var</span><span class=""> porscheDesignSystem;</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">(</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{</span><span class="hljs-string">"use strict"</span><span class="">;</span><span class="hljs-keyword">var</span><span class=""> e={</span><span class="hljs-attr">d</span><span class="">:</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">t,o</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{</span><span class="hljs-keyword">for</span><span class="">(</span><span class="hljs-keyword">var</span><span class=""> n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{</span><span class="hljs-attr">enumerable</span><span class="">:!</span><span class="hljs-number">0</span><span class="">,</span><span class="hljs-attr">get</span><span class="">:o[n]})},</span><span class="hljs-attr">o</span><span class="">:</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">e,t</span><span class="hljs-function">)=></span><span class="">
</span><span class="">Object.prototype.hasOwnProperty.call(e,t),</span><span class="hljs-attr">r</span><span class="">:</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">=></span><span class="">
</span><span class="">{</span><span class="hljs-string">"undefined"</span><span class="">!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{</span><span class="hljs-attr">value</span><span class="">:</span><span class="hljs-string">"Module"</span><span class="">}),Object.defineProperty(e,</span><span class="hljs-string">"__esModule"</span><span class="">,{</span><span class="hljs-attr">value</span><span class="">:!</span><span class="hljs-number">0</span><span class="">})}},t={};e.r(t),e.d(t,{</span><span class="hljs-attr">load</span><span class="">:</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">r});const o=</span><span class="hljs-string">"porscheDesignSystem"</span><span class="">;</span><span class="hljs-function hljs-keyword">function</span><span class="hljs-function"> </span><span class="hljs-function hljs-title">n</span><span class="hljs-function">(</span><span class="hljs-function">)</span><span class="">{</span><span class="hljs-keyword">return</span><span class=""> document[o]||</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">document[o]={}</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">[</span><span class="hljs-function hljs-params">o</span><span class="hljs-function">]}</span><span class="hljs-function hljs-params">function</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">s</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">{script:e,version:t,prefix:s}</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">r</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">function</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">t</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">n</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">,{[</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">]:</span><span class="hljs-function hljs-params">o</span><span class="hljs-function">}=</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">;</span><span class="hljs-function hljs-params">if</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">!o</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">let</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">o</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">{};const n=</span><span class="hljs-keyword">new</span><span class=""> Promise(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">=></span><span class="">
</span><span class="">o=e);t[e]={</span><span class="hljs-attr">isInjected</span><span class="">:!</span><span class="hljs-number">1</span><span class="">,</span><span class="hljs-attr">isReady</span><span class="">:</span><span class="hljs-function hljs-params">()</span><span class="hljs-function">=></span><span class="">
</span><span class="">n,</span><span class="hljs-attr">readyResolve</span><span class="">:o,</span><span class="hljs-attr">prefixes</span><span class="">:[],</span><span class="hljs-attr">registerCustomElements</span><span class="">:</span><span class="hljs-literal">null</span><span class="">}}</span><span class="hljs-keyword">return</span><span class=""> t[e]}(t),{</span><span class="hljs-attr">isInjected</span><span class="">:c,</span><span class="hljs-attr">prefixes</span><span class="">:i=[],</span><span class="hljs-attr">registerCustomElements</span><span class="">:d}=r,[u]=Object.entries(n()).filter(</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">[e,o]</span><span class="hljs-function">)=></span><span class="">
</span><span class="">e!==t&&</span><span class="hljs-string">"object"</span><span class="">==typeof o&&o.prefixes.includes(s));</span><span class="hljs-keyword">if</span><span class="">(u)throw </span><span class="hljs-keyword">new</span><span class=""> Error(</span><span class="hljs-string">`[Porsche Design System v</span><span class="hljs-string hljs-subst">${t}</span><span class="hljs-string">] prefix '</span><span class="hljs-string hljs-subst">${s}</span><span class="hljs-string">' is already registered with version '</span><span class="hljs-string hljs-subst">${u[</span><span class="hljs-string hljs-subst hljs-number">0</span><span class="hljs-string hljs-subst">]}</span><span class="hljs-string">' of the Porsche Design System. Please use a different one.\nTake a look at document.</span><span class="hljs-string hljs-subst">${o}</span><span class="hljs-string"> for more details.`</span><span class="">);c||</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-keyword">function</span><span class="hljs-function hljs-params">(e</span><span class="hljs-function">){</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">t</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">createElement</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-string">"script"</span><span class="hljs-function">);</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">src</span><span class="hljs-function">=</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">,</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">setAttribute</span><span class="hljs-function">(</span><span class="hljs-function hljs-params hljs-string">"crossorigin"</span><span class="hljs-function hljs-params">,</span><span class="hljs-function hljs-params hljs-string">""</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">document</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">body</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">appendChild</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">t</span><span class="hljs-function">)}(</span><span class="hljs-function hljs-params">e</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">r</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">isInjected</span><span class="hljs-function">=!0),</span><span class="hljs-function hljs-params">i</span><span class="hljs-function">.</span><span class="hljs-function hljs-params">includes</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">s</span><span class="hljs-function">)||(</span><span class="hljs-function hljs-params">i.push(s</span><span class="hljs-function">),</span><span class="hljs-function hljs-params">d</span><span class="hljs-function">&&</span><span class="hljs-function hljs-params">d</span><span class="hljs-function">(</span><span class="hljs-function hljs-params">s</span><span class="hljs-function">))}</span><span class="hljs-function hljs-params">const</span><span class="hljs-function"> </span><span class="hljs-function hljs-params">r</span><span class="hljs-function">=(</span><span class="hljs-function hljs-params">e={}</span><span class="hljs-function">)=></span><span class="">
</span><span class="">{const t=</span><span class="hljs-string">"PORSCHE_DESIGN_SYSTEM_CDN"</span><span class="">;window[t]=e.cdn||window[t]||(window.location.origin.match(</span><span class="hljs-regexp">/\.cn$/</span><span class="">)?</span><span class="hljs-string">"cn"</span><span class="">:</span><span class="hljs-string">"auto"</span><span class="">);const o=</span><span class="hljs-string">"porscheDesignSystem"</span><span class="">;document[o]||(document[o]={}),document[o].cdn={</span><span class="hljs-attr">url</span><span class="">:</span><span class="hljs-string">"https://cdn.ui.porsche."</span><span class="">+(</span><span class="hljs-string">"cn"</span><span class="">===window[t]?</span><span class="hljs-string">"cn"</span><span class="">:</span><span class="hljs-string">"com"</span><span class="">),</span><span class="hljs-attr">prefixes</span><span class="">:[]},s({</span><span class="hljs-attr">version</span><span class="">:</span><span class="hljs-string">"4.3.0"</span><span class="">,</span><span class="hljs-attr">script</span><span class="">:</span><span class="hljs-string">"http://localhost:3001/components/porsche-design-system.v4.3.0.0bea98c7a1d46c18a7c2.js"</span><span class="">,</span><span class="hljs-attr">prefix</span><span class="">:e.prefix||</span><span class="hljs-string">""</span><span class="">})};porscheDesignSystem=t})();porscheDesignSystem.load({</span><span class="hljs-attr">prefix</span><span class="">:</span><span class="hljs-string">''</span><span class="">});porscheDesignSystem.load({</span><span class="hljs-attr">prefix</span><span class="">:</span><span class="hljs-string">'custom-prefix'</span><span class="">});porscheDesignSystem.load({</span><span class="hljs-attr">prefix</span><span class="">:</span><span class="hljs-string">'another-prefix'</span><span class="">})
</span></script>
```
