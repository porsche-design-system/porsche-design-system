# Icon Links

**Function name:** `getIconLinks()`

Porsche Design System icons are loaded dynamically from a CDN as soon as they are used for the first time.  
This results in a waterfall like loading behaviour where your application is bootstrapped first, then loads the Porsche
Design System Core and when any icon is rendered the corresponding icon is loaded afterwards.  
This can be optimized by prefetching used icons in parallel while the application is being bootstrapped. Keep in mind
that prefetching is not yet supported on Safari and Safari on iOS, so you will not see a performance benefit there.
[Current prefetch status on CanIUse](https://caniuse.com/link-rel-prefetch)

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which needs to be injected into the `<head>` of your `index.html`.

## Supported options

| Option   | Description                                                                                                                                                                                                        | Type                     | Default              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------- | -------- | -------- |
| `icons`  | All icons listed in the array are loaded from the CDN.                                                                                                                                                             | `({{this.iconNames}})[]` | `['arrowHeadRight']` |
| `cdn`    | Decides from which CDN the resources are loaded.                                                                                                                                                                   | `'auto'                  | 'cn'`                | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the <code class="no-before">js</code> option a javascript object is returned. | `'html'                  | 'jsx'                | 'js'`    | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

**Note:** Make sure to preload only icons which are really needed initially!

<PartialDocs name="getIconLinks" :params="params" location="head"></PartialDocs>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ICON_NAMES } from '@porsche-design-system/icons';

@Component
export default class Code extends Vue {
  public iconNames: string = ICON_NAMES.map(x => `'${x}'`).join(' | ');
  public params = [
    {
      value: "{ icons: ['arrowHeadRight', 'plus'] }"
    },
    {
      value: "{ icons: ['arrowHeadRight', 'plus'], cdn: 'cn' }",
      comment: 'force using China CDN',
    },
  ];
}
</script>
