# Icon Links
**Function name:** `getIconLinks()`

Porsche Design System icons are loaded dynamically from a CDN as soon as they are used for the first time.  
This results in a waterfall like loading behaviour where your application is bootstrapped first, then loads the Porsche Design System Core and when any icon is rendered the corresponding icon is loaded afterwards.  
This can be optimized by prefetching used icons in parallel while the application is being bootstrapped.
Keep in mind that prefetching is not yet supported on Safari and Safari on iOS, so you will not see a performance benefit there. [Current prefetch status on CanIUse](https://caniuse.com/link-rel-prefetch)

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getIconLinks()` which needs to be injected into the `<head>` of your `index.html`.

<TableOfContents></TableOfContents>

## Supported options:
- **icons**: ({{this.iconNames}})[] = []
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<head>
  // Using template syntax (make sure to preload only icons which are really needed initially!)
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getIconLinks({ icons: ['arrowHeadRight', 'plus'] }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getIconLinks({ icons: ['arrowHeadRight', 'plus'], cdn: 'cn' }) %>
</head>

<head>
  // without link tags  
  <link rel="prefetch" href="<%= require('@porsche-design-system/components-{js|angular|react}/partials').getIconLinks({ withoutTags: true, icons: ['arrowHeadRight'] })[0] %>" as="image" type="image/svg+xml" crossorigin>
</head>
```

### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_ICONS-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_ICONS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getIconLinks({ icons: [\"arrowHeadRight\", \"plus\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ICON_NAMES } from '@porsche-design-system/icons';

@Component
export default class Code extends Vue {
  public iconNames: string = ICON_NAMES.map(x => `'${x}'`).join(' | ');
}
</script>
