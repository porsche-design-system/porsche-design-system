# Loading Behaviour

**Unstyled content** when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various **partials** as part of the `@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent **Flash of Unstyled Content** (FOUC) and **Flash of Unstyled Text** (FOUT) to
boost your application.

## Flash of Unstyled Content (FOUC)

If you use `Porsche Design System` components, we take care that your application only renders those if they are fully styled.
However, it takes a moment until our core is fully loaded and only then we can take action. This short timespan has to be covered.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getInitialStyles()` which needs to be imported into the `<head>` of your `index.html`.

##### Supported options:
- **prefix:** string = ''
- **withoutTags**: boolean = false

#### Example usage with template 

The example shows how to implement the partial in a webpack project.

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

#### Example usage with placeholder 

If you don't use webpack or your bundler does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_INITIAL_STYLES-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_INITIAL_STYLES-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getInitialStyles())') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
} 
``` 

---

## Flash of Unstyled Text (FOUT)

The Porsche Design System provides font face definitions and loads all needed fonts dynamically from our CDN. Until the fonts are fully loaded
the components use the fallback font and you might see a little change until the loading is finished.

### Inject Porsche Design System Font Face Stylesheet

If you use the Porsche Design System components we inject a stylesheet with all font-face definitions into the head of your application as soon as our core is loaded.
Regarding which font-styles you use on your page, these fonts are downloaded from our CDN. This can lead (for the first time) to a decent rendering glitch of your texts. 
To improve rendering we recommend that you load the stylesheet on your own. 

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getFontFaceStylesheet()` which needs to be imported into the `<head>` of your `index.html`.

##### Supported options:
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

#### Example usage with template

```html
// index.html

<head>
  // without parameters
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet() %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet({ cdn: 'cn' }) %>
</head>

<head>
  // without link tags
  <link rel="stylesheet" href="<%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet({ withoutTags: true }) %>" type="text/css" crossorigin>
</head>
```

#### Example usage with placeholder

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_FACE_STYLESHEET-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_FACE_STYLESHEET-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontFaceStylesheet())') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
} 
```

### Preload specific font files

Fonts should be loaded as soon as possible but only those which are needed. 
The Porsche Design System is not able to determine which components you use on the site and which fonts to be provided **initially**.
That's why the font face stylesheet of the Porsche Design System handles the correct font to be loaded by unicode-range definition but during runtime and after bootstrapping of your application, which might result in FOUT.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getFontPreloadLink()` which needs to be imported into the `<head>` of your `index.html`.

##### Supported options:
- **subset**: 'latin' | 'greek' | 'cyril' = 'latin'
- **weight**: ('thin' | 'regular' | 'semi-bold' | 'bold')[] = ['regular']
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

#### Example usage with template

```html
// index.html

<head>
  // Using template syntax (make sure to preload only fonts which are really needed initially!)
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontPreloadLink({ weight: ['regular', 'semi-bold'] }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontPreloadLink({ cdn: 'cn' }) %>
</head>

<head>
  // without link tags
  <link rel="preload" href="<%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontPreloadLink({ withoutTags: true })[0] %>" as="font" type="font/woff2" crossorigin>
</head>
```

#### Example usage with placeholder

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_LATIN-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_LATIN-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontPreloadLink({ weight: [\"regular\", \"semi-bold\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 
