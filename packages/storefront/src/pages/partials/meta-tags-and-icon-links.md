# Meta Tags And Icon Links
**Function name:** `getMetaTagsAndIconLinks()`

<TableOfContents></TableOfContents>

## Introduction
Meta Icons are a set of icons to be used for the following purposes: **Favicon**, **Apple Touch Icons**, **Android Touch Icons** and **Microsoft Windows Tiles**.
To simplify the implementation process we provide a `getMetaTagsAndIconLinks` partial.

##### Options:
- **appTitle:** string
- **cdn:** 'auto' | 'cn' = 'auto'

#### Example usage with dynamic template

The example shows how to implement the partial in a webpack (or similar) project.

```html
// index.html

<head>  
  // with appTitle only
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }) %>
</head>

<head>
  // force using China CDN
  <%= require('@porsche-design-system/components-{js|angular|react}/partials').getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP', cdn: 'cn' }) %>
</head>
```

##### Result

The result of this partial looks like this:

<pre><code class="language-html readonly">{{this.metaTagsAndIconLinks}}</code></pre>


#### Alternative: Example usage with placeholder

If your bundler (webpack or similar) does not work with the syntax of the previous example you can put a placeholder in your markup and replace its content with a script.

```html
// index.html

<head>
  <!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_META_TAGS_AND_ICON_LINKS-->
</head>
``` 

```json
// package.json (tested on macOS, the script may need to be adjusted depending on the operating system used), make sure to adjust the path to the index.html file and use the correct partials package import from your framework {js|angular|react}

"scripts": {
  "prestart": "yarn replace",
  "replace": "placeholder='<!--PLACEHOLDER_PORSCHE_DESIGN_SYSTEM_META_TAGS_AND_ICON_LINKS-->' && partial=$placeholder$(node -e 'console.log(require(\"@porsche-design-system/components-js/partials\").getMetaTagsAndIconLinks({ appTitle: \"TITLE_OF_YOUR_APP\" }))') && regex=$placeholder'.*' && sed -i '' -E -e \"s@$regex@$partial@\" index.html",
}
```

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)


<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getMetaTagsAndIconLinks } from '@porsche-design-system/components-js/partials';
  
  @Component
  export default class Code extends Vue {
    public metaTagsAndIconLinks: string = getMetaTagsAndIconLinks({ appTitle: 'TITLE_OF_YOUR_APP' }).replaceAll('><', '>\n<');
  }
</script>