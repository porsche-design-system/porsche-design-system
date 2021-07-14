# Loader Script
**Function name:** `getLoaderScriptScript()`

When using `porsche-design-system/components-{angular|react}` our core loader gets bundled into your application.  
This impacts the loading behavior of Porsche Design System components because the code gets executed later once the framework bootstraps.

To achieve this bootstrapping earlier we provide a partial called `getLoaderScript()` in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be imported into the `<head>` of your `index.html`.

## Supported options:
- **withoutTags**: boolean = false

### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<head>
  // Using template syntax (make sure to preload only icons which are really needed initially!)
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getLoaderScript() %>
</head>

<head>
  // without link tags  
  <script><%= require('@porsche-design-system/components-{js|angular|react}/partials').getLoaderScript({ withoutTags: true }) %></script>
</head>


<body>
  <script>
    porscheDesignSystem.load(); // default without prefix
    porscheDesignSystem.load({ prefix: 'sample-prefix' }); // alternative with custom prefix, can be called multiple times with different parameters
  </script>
</body>
```

### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_LOADER-->
</head>

<body>
  <script>
    porscheDesignSystem.load(); // default without prefix
    porscheDesignSystem.load({ prefix: 'sample-prefix' }); // alternative with custom prefix, can be called multiple times with different parameters
  </script>
</body>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_LOADER-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript())') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
```
