# Loading Behaviour

**Unstyled content** when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various solutions to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent **Flash of Unstyled Content** (FOUC) and **Flash of Unstyled Text** (FOUT) where we provide options to
boost your application.

## Unstyled Porsche Design System Components (FOUC)

If you use `Porsche Design System` components, we take care that your application only renders a component if it is fully styled.
However, it takes a moment until our core is fully loaded and only then we can take action. This short timespan has to be covered.

There are two ways to get rid of FOUC: via **partials** or as **static CSS snippet**. 
We provide partials in our `@porsche-design-system/components-{js|angular|react}` package for you to import them into the `<head>` of your `index.html`.

### Example usage of  partials with template 

The example shows how to implement a partial in a webpack project. The core styles partial has following parameters (optional)  
`getInitialStyles({ withoutTags: true, prefix: 'custom-prefix' })`

```html
// index.html

<head>
  // without parameters
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getInitialStyles() %>
</head>

<head>
  // with custom prefix to match your prefixed components
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getInitialStyles({ prefix: 'custom-prefix' }) %>
</head>

<head>
  // without style tags
  <style>
    <%= require('@porsche-design-system/components-{js|angular|react}/partials').getInitialStyles({ withoutTags: true }) %>
  </style>
</head>
``` 

### Example usage of partials with placeholder 

If you don't use webpack or your bundler does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script. 
You can also pass following parameters (optional)  
`getInitialStyles({ withoutTags: true, prefix: 'custom-prefix' })`

```html
// index.html

<head>
  <!--PLACEHOLDER_CORE_STYLES-->
</head>
``` 

```json
// package.json

"scripts": {
  "prestart": "yarn replace",
  "replace": "partial=$(node -e 'console.log(require(\"@porsche-design-system/components-{js|angular|react}/partials\").getInitialStyles())') && regex='<!--PLACEHOLDER_CORE_STYLES-->|<style>(p-[a-z-]*,?)*{visibility:hidden}<\\/style>' && sed -i '' -E -e \"s@$regex@$partial@\" src/index.html",
} 
``` 

### Example usage with static CSS snippet
If you are not able to use **partials** use the **static** solution. Just copy the whole `<style>` tag from the static example and put it into the `<head>`
of the `index.html` of your application. While using the static solution, make sure to list every component you use and 
**update the list** when you upgrade the version of the `Porsche Design Sytem` with new components introduced. Be aware if using custom prefixed components to adapt the style names with your custom prefix. 

```html
// index.html

<head>
  {{initialStyles}}
</head>
```
---

## Flash of Unstyled Text

The Porsche Design System provides font face definitions and loads all needed fonts dynamically from our CDN. Until the fonts are fully loaded
the components use the fallback font and you might see a little change until the loading is finished.

### Inject Porsche Design System Font Stylesheet

If you use the Porsche Design System components we inject the font-stylesheet with all font-face definitions into the head of your application as soon as our core is loaded.
Regarding which font-styles do you use on your page, these fonts get downloaded from our CDN. This can lead (for the first time) to a decent rendering glitch of your texts. 
To improve rendering we recommend that you load the stylesheet on your own. 

We provide the URL to our stylesheet in our `@porsche-design-system/assets` package with the name `FONT_FACE_CDN_URL`. We also provide a ready to use partial in the `@porsche-design-system/components-{js|angular|react}` package called `getFontFaceStylesheet()`.

#### Example with partials

```html
// index.html

<head>
  // Using template syntax
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet() %>
</head>
```


#### Example with placeholder 

```html
// index.html

<head>
  <!--PLACEHOLDER_FONT_FACE_CSS-->
</head>
``` 

```json
// package.json

"scripts": {
  "prestart": "yarn replace",
  "replace": "partial=$(node -e 'console.log(require(\"@porsche-design-system/components-{js|angular|react}/partials\").getFontFaceStylesheet())') && regex='<!--PLACEHOLDER_FONT_FACE_CSS-->|<link rel=\"?stylesheet\"? href=\"?https:\\/\\/cdn\\.ui\\.porsche\\.(com|cn)\\/porsche-design-system\\/styles\\/font-face\\.min\\..*\\.css\"?>' && sed -i '' -E -e \"s@$regex@$partial@\" src/index.html",
} 
``` 

#### Example with static path

If you use the static solution you have to update the `<Link>` if changes are made in our font face definitions. But don't worry, we don't remove old files
to grant you a valid fallback.

```html
// index.html

<head>
  // Make sure to watch your console output. We notify you about any changes.
  {{fontFaceStylesheet}}
</head>
```

### Preload specific font files

Fonts should be loaded as soon as possible but only those which are needed. The Porsche Design System is not able to determine which components
you use on the site and which fonts we have to provide initially, but we export all resources you need to preload fonts and optimize **Flash of Unstyled Tex** in your application.

We provide all URLs that you need in the `@porsche-design-system/assets` package.
Use the const `FONTS_CDN_BASE_URL` which is the basic path to the CDN and the object `FONTS_MANIFEST` which contains the filenames of all `fonts` 
and according `weights` in either `woff` or `woff2` file format. Combine the path and filename to preload them via `href` with a `<link>` tag at the head of your `index.html`.

#### Example preload

```html
// index.html

<head>
 <link
   rel="preload"
   href="path/to/webfont/nameOfWebFontFile"
   as="font"
   type="font/woff2"
   crossorigin
 />
</head>
```

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getFontFaceStylesheet, getInitialStyles } from '@porsche-design-system/components-js/partials';
  
  @Component
  export default class FlashOfUnstyledContent extends Vue {
    public fontFaceStylesheet = getFontFaceStylesheet();
    public initialStyles = getInitialStyles()
        .replace('>', '>\n    ') // add new line and some white space after '>'
        .replace(/,/g, ',\n    ') // add new line and some white space after ','
        .replace('}', '}\n  ') // add new line and some white space after '}'
        .replace(/({|}|:)/g, ' $1 ') // add space before and after '{', '}', ':'
        .replace(' :', ':'); // remove space before ':'
  }
</script>