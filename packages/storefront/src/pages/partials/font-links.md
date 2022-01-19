# Font Links
**Function name:** `getFontLinks()`

Fonts should be loaded as soon as possible but only those which are needed. 
The Porsche Design System is not able to determine which components you use on the site and which fonts to be provided **initially**.
That's why the font face stylesheet of the Porsche Design System handles the correct font to be loaded by unicode-range definition but during runtime and after bootstrapping of your application, which might result in FOUT.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getFontLinks()` which needs to be injected into the `<head>` of your `index.html`.

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
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_FONT_LATIN-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getFontLinks({ weights: [\"regular\", \"semi-bold\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)
