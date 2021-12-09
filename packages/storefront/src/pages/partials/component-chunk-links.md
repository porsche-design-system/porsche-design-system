# Component Chunk Links
**Function name:** `getComponentChunkLinks()`

Porsche Design System components load dynamically from a CDN as soon as they are used for the first time.  
This results in a waterfall like loading behaviour where your application bootstraps first, then loads the Porsche Design System Core and when any component rendered the corresponding component chunk gets loaded afterwards.  
This can be optimized by fetching used chunks in parallel while the application is bootstrapping.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages called `getComponentChunkLinks()` which needs to be imported into the `<head>` of your `index.html`.

<TableOfContents></TableOfContents>

## Supported options:
- **components**: ({{this.componentChunks}})[] = []
- **cdn:** 'auto' | 'cn' = 'auto'
- **withoutTags**: boolean = false

By default, our core is always preloaded when using this partial.

### Example usage with dynamic template

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

### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_COMPONENT_CHUNKS-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_COMPONENT_CHUNKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getComponentChunkLinks({ components: [\"button\", \"marque\"] }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
``` 

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { COMPONENT_CHUNK_NAMES } from '../../../../components-js/projects/components-wrapper';
  
  @Component
  export default class Code extends Vue {
    public componentChunks: string = COMPONENT_CHUNK_NAMES.map(x => `'${x}'`).join(' | ');
  }
</script>