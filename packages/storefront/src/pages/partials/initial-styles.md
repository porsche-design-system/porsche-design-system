# Initial Styles
**Function name:** `getInitialStyles()`

If you use `Porsche Design System` components, we take care that your application only renders those if they are fully styled.
However, it takes a moment until our core is fully loaded and only then we can take action. This short timespan has to be covered.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getInitialStyles()` which needs to be imported into the `<head>` of your `index.html`.

<TableOfContents></TableOfContents>

## Supported options:
- **prefix:** string = ''
- **withoutTags**: boolean = false

### Example usage with dynamic template 

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

### Alternative: Example usage with placeholder 

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_INITIAL_STYLES-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_INITIAL_STYLES-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getInitialStyles())') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
} 
``` 

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)
