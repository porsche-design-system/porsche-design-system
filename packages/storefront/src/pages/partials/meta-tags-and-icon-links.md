# Meta Tags And Icon Links
**Function name:** `getMetaTagsAndIconLinks()`

Meta Icons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch Icons** and **Microsoft Windows Tiles**.
To simplify the implementation process we provide a `getMetaTagsAndIconLinks` partial.

## Supported options
- **appTitle:** string
- **cdn:** 'auto' | 'cn' = 'auto'

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getMetaTagsAndIconLinks" :params="params" location="head"></PartialDocs>

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getMetaTagsAndIconLinks } from '@porsche-design-system/components-js/partials';

@Component
export default class Code extends Vue {
  public metaTagsAndIconLinks: string = getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }).replaceAll('><', '>\n<');
  public params = [
    {
      value: "{ appTitle: 'TITLE_OF_YOUR_APP' }",
      comment: 'with appTitle only'
    },
    {
      value: "{ appTitle: 'TITLE_OF_YOUR_APP', cdn: 'cn' }",
      comment: 'force using China CDN'
    },
  ];
}
</script>

## Result

The result of this partial looks like this:

<pre><code class="language-html readonly">{{this.metaTagsAndIconLinks}}</code></pre>
