# Font Links
**Function name:** `getFontLinks()`

Fonts should be loaded as soon as possible but only those which are needed. 
The Porsche Design System is not able to determine which components you use on the site and which fonts to be provided **initially**.
That's why the font face stylesheet of the Porsche Design System handles the correct font to be loaded by unicode-range definition but during runtime and after bootstrapping of your application, which might result in FOUT.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be injected into the `<head>` of your `index.html`.

## Supported options
`type FontWeight = 'thin' | 'regular' | 'semi-bold' | 'bold'`

| Option        | Description                                                                                                                                                                                               | Type                          | Default       |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|---------------|
| `subset`      | Defines which font subset should be loaded.                                                                                                                                                               | `'latin'` `'greek'` `'cyril'` | `'latin'`     |
| `weights`     | Defines which font weights should be loaded.                                                                                                                                                              | `FontWeight[]`                | `['regular']` |
| `cdn`         | Decides from which CDN the resources are loaded.                                                                                                                                                          | `'auto'` `'cn'`               | `'auto'`      |
| `withoutTags` | <span style='color:red'>**[DEPRECATED]**</span> since v2.9.0 and will be removed in v3, use `format` instead.<br/>If true, it returns an array of strings with urls to the cdn location of the resources. | `boolean`                     | `false`       |
| `format`      | Defines the output format of the partial. By default it returns a html string, with `jsx` it returns valid jsx elements.                                                                                  | `'html'` `'jsx'`              | `'html'`      |

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

**Note:** Make sure to preload only fonts which are really needed initially!

<PartialDocs name="getFontLinks" :params="params"></PartialDocs>

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  public params = [
    { 
      value: "{ weights: ['regular', 'semi-bold'] }"
    },
    { 
      value: "{ cdn: 'cn' ",
      comment: 'force using China CDN'
    },
  ];
}
</script>
