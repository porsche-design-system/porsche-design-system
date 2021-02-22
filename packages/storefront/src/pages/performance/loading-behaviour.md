# Loading Behaviour

**Unstyled content** when opening an application or website creates a bad first impression.
To prevent this, the Porsche Design System offers various **partials** as part of the `@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and components are fully loaded.

On this page you find detailed instructions on how to prevent **Flash of Unstyled Content** (FOUC) and **Flash of Unstyled Text** (FOUT) to
boost your application.

## Flash of Unstyled Content (FOUC)

### Initial Styles

If you use `Porsche Design System` components, we take care that your application only renders those if they are fully styled.
However, it takes a moment until our core is fully loaded and only then we can take action. This short timespan has to be covered.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getInitialStyles()` which needs to be imported into the `<head>` of your `index.html`.

##### Supported options:
- **prefix:** string = ''
- **withoutTags**: boolean = false

#### Example usage with dynamic template 

The example shows how to implement the partial in a webpack (or similar) project.

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

#### Alternative: Example usage with placeholder 

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

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

### Preload component chunks

Porsche Design System components are loaded dynamically from a CDN as soon as they are used for the first time.  
This results in a waterfall like loading behaviour where your application is bootstrapped first, then loads the Porsche Design System Core and when any component is rendered the corresponding component chunk is loaded afterwards.  
This can be optimized by fetching used chunks in parallel while the application is being bootstrapped.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getComponentChunkLinks()` which needs to be imported into the `<head>` of your `index.html`.

##### Supported options:
- **components**: ({{this.componentChunks}})[] = []
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

By default, our core is always preloaded when using this partial.

#### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<head>
  // Using template syntax (make sure to preload only components chunks which are really needed initially!)
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getComponentChunkLinks({ components: ['button', 'marque'] }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getComponentChunkLinks({ cdn: 'cn' }) %>
</head>

<head>
  // without link tags
  // first element is core which needs to be loaded with crossorigin attribute
  <link rel="preload" href="<%= require('@porsche-design-system/components-{js|angular|react}/partials').getComponentChunkLinks({ withoutTags: true, components: ['button'] })[0] %>" crossorigin>
  // further elements are the ones passed into components array
  <link rel="preload" href="<%= require('@porsche-design-system/components-{js|angular|react}/partials').getComponentChunkLinks({ withoutTags: true, components: ['button'] })[1] %>">
</head>
```

#### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_COMPONENT_CHUNKS-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used)

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_COMPONENT_CHUNKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getComponentChunkLinks({ components: [\"button\", \"marque\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
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

#### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

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

#### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

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

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getFontLinks()` which needs to be imported into the `<head>` of your `index.html`.

##### Supported options:
- **subset**: 'latin' | 'greek' | 'cyril' = 'latin'
- **weights**: ('thin' | 'regular' | 'semi-bold' | 'bold')[] = ['regular']
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

#### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<head>
  // Using template syntax (make sure to preload only fonts which are really needed initially!)
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontLinks({ weights: ['regular', 'semi-bold'] }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontLinks({ cdn: 'cn' }) %>
</head>

<head>
  // without link tags
  <link rel="preload" href="<%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontLinks({ withoutTags: true })[0] %>" as="font" type="font/woff2" crossorigin>
</head>
```

#### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

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
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_LATIN-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontLinks({ weights: [\"regular\", \"semi-bold\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { COMPONENT_CHUNK_NAMES } from '../../../../components-js/projects/components-wrapper';
  
  @Component
  export default class Code extends Vue {
    public componentChunks: string = COMPONENT_CHUNK_NAMES.map(x => `'${x}'`).join(' | ');
  }
</script>
