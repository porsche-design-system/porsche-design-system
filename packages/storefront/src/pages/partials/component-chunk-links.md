# Component Chunk Links
**Function name:** `getComponentChunkLinks()`

Porsche Design System components load dynamically from a CDN as soon as they are used for the first time.  
This results in a waterfall like loading behaviour where your application bootstraps first, then loads the Porsche Design System Core and when any component rendered the corresponding component chunk gets loaded afterwards.  
This can be optimized by fetching used chunks in parallel while the application is bootstrapping.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be injected into the `<head>` of your `index.html`.

## Supported options

| Option        | Description                                                                                                                                                                                               | Type                           | Default |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|---------|
| `components`  | All components listed in the array are loaded from the CDN. By default, our core is always preloaded when using this partial.                                                                             | `({{this.componentChunks}})[]` | `[]`    |
| `cdn`         | Decides from which CDN the resources are loaded.                                                                                                                                                          | `'auto'                        | 'cn'`   | `'auto'` |
| `withoutTags` | <span style='color:red'>**[DEPRECATED]**</span> since v2.9.0 and will be removed in v3, use `format` instead.<br/>If true, it returns an array of strings with urls to the cdn location of the resources. | `boolean`                      | `false` |
| `format`      | Defines the output format of the partial. By default it returns a html string, with `jsx` it returns valid jsx elements.                                                                                  | `'html' | 'jsx'`  | `'html'` |


## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

**Note:** Make sure to preload only component chunks which are really needed initially!

<PartialDocs name="getComponentChunkLinks" :params="params" location="head"></PartialDocs>

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
  ];
}
</script>