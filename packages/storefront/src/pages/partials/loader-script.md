# Loader Script
**Function name:** `getLoaderScript()`

When using `porsche-design-system/components-{angular|react}` our core loader gets bundled into your application.  
This impacts the loading behavior of Porsche Design System components because the code gets executed later, once the framework bootstraps.

To achieve this bootstrapping **earlier** we provide a partial called `getLoaderScript()` in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be imported into the `<body>` of your `index.html`.

<TableOfContents></TableOfContents>

## Supported options:
- **prefix**: string | string[] = undefined
- **withoutTags**: boolean = false

### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<body>
  // Using template syntax
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getLoaderScript() %>

  // With custom prefix
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getLoaderScript({ prefix: 'my-prefix' }) %>

  // With multiple custom prefixes
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getLoaderScript({ prefix: ['my-prefix', 'another-prefix'] }) %>
</body>

<body>
  // without script tag  
  <script><%= require('@porsche-design-system/components-{js|angular|react}/partials').getLoaderScript({ withoutTags: true }) %></script>
</body>
```

### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<body>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_LOADER_SCRIPT-->
</body>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_LOADER_SCRIPT-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getLoaderScript())') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
```
