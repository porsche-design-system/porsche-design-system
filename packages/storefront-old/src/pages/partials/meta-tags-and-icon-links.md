# Meta Tags And Icon Links

**Function name:** `getMetaTagsAndIconLinks()`

Meta Icons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch
Icons** and **Microsoft Windows Tiles**. To simplify the implementation process we provide a `getMetaTagsAndIconLinks`
partial.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which needs to be injected into the `<head>` of your `index.html`.

This partial also provides some default Open Graph and Twitter meta tags which will display a thumbnail image when
sharing a link on social media. If you want to define your own information you can set the `ogImage` option to false.

## Supported options

| Option     | Description                                                                                                                                                                                                        | Type      | Default     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- | -------- | -------- |
| `appTitle` | **Mandatory:** Title of your app which will be reflected in the meta tag.                                                                                                                                          | `string`  | `undefined` |
| `cdn`      | Decides from which CDN the resources are loaded.                                                                                                                                                                   | `'auto'   | 'cn'`       | `'auto'` |
| `format`   | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the <code class="no-before">js</code> option a javascript object is returned. | `'html'   | 'jsx'       | 'js'`    | `'html'` |
| `ogImage`  | Boolean attribute to decide whether the Open Graph and Twitter meta tags should be included.                                                                                                                       | `boolean` | `true`      |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getMetaTagsAndIconLinks" :params="params" location="head"></PartialDocs>

## Result

The result of this partial looks like this:

<Playground :showCodeEditor="false" :frameworkMarkup="[this.metaTagsAndIconLinks]"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { metaTagsAndIconLinksDemo } from '@/lib/partialResults';

@Component
export default class Code extends Vue {
  public metaTagsAndIconLinks = metaTagsAndIconLinksDemo.replaceAll('><', '>\n<');
  public params = [
    {
      value: "{ appTitle: 'TITLE_OF_YOUR_APP' }",
    },
    {
      value: "{ appTitle: 'TITLE_OF_YOUR_APP', cdn: 'cn' }",
      comment: 'force using China CDN'
    },
  ];
}
</script>
