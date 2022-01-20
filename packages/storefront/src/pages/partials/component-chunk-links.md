# Component Chunk Links
**Function name:** `getComponentChunkLinks()`

Porsche Design System components load dynamically from a CDN as soon as they are used for the first time.  
This results in a waterfall like loading behaviour where your application bootstraps first, then loads the Porsche Design System Core and when any component rendered the corresponding component chunk gets loaded afterwards.  
This can be optimized by fetching used chunks in parallel while the application is bootstrapping.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be injected into the `<head>` of your `index.html`.

## Supported options
- **components:** `({{this.componentChunks}})[] = []`
- **cdn:** `'auto' | 'cn' = 'auto'`
- **withoutTags:** `boolean = false`

By default, our core is always preloaded when using this partial.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

**Note:** Make sure to preload only components chunks which are really needed initially!

<PartialDocs name="getComponentChunkLinks" :params="params" location="head"></PartialDocs>

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { COMPONENT_CHUNK_NAMES } from '../../../../components-js/projects/components-wrapper';

@Component
export default class Code extends Vue {
  public componentChunks = COMPONENT_CHUNK_NAMES.map(x => `'${x}'`).join(' | ');
  public params = [
    {
      value: "{ components: ['button', 'marque'] }"
    },
    {
      value: "{ cdn: 'cn' }",
      comment: 'force using China CDN'
    },
    {
      value: "{ withoutTags: true, components: ['button'] }",
      comment: 'first element is core which needs to be loaded with crossorigin attribute',
      usage: `<link rel="preload" href="<%= $$$PARTIAL$$$[0] %>" crossorigin>`
    },
    {
      value: "{ withoutTags: true, components: ['button'] }",
      comment: 'further elements are the ones passed into components array',
      usage: `<link rel="preload" href="<%= $$$PARTIAL$$$[1] %>">`
    }
  ];
}
</script>