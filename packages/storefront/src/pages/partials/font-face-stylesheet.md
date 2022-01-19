# Font Face Stylesheet
**Function name:** `getFontFaceStylesheet()`

If you use the Porsche Design System components we inject a stylesheet with all font-face definitions into the head of your application as soon as our core is loaded.
Regarding which font-styles you use on your page, these fonts are downloaded from our CDN. This can lead (for the first time) to a decent rendering glitch of your texts. 
To improve rendering we recommend that you load the stylesheet on your own. 

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getFontFaceStylesheet()` which needs to be injected into the `<head>` of your `index.html`.

<TableOfContents></TableOfContents>

## Supported options:
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

### Example usage with dynamic template

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

### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_FACE_STYLESHEET-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_FACE_STYLESHEET-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontFaceStylesheet())') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
} 
```

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)
