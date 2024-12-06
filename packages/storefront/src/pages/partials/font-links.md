# Font Links

**Function name:** `getFontLinks()`

Fonts should be loaded as soon as possible but only those which are needed. The Porsche Design System is not able to
determine which components you use on the site and which fonts to be provided **initially**. That's why the font face
stylesheet of the Porsche Design System handles the correct font to be loaded by unicode-range definition but during
runtime and after bootstrapping of your application, which might result in FOUT.

Font loading strategy for Porsche Next uses `font-display: swap` (FOUT) instead of `font-display: block` for better
performance and less potential for layout shifts.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which needs to be injected into the `<head>` of your `index.html`.

An in-depth optimization guide can be found at
[Vanilla Js Optimization](must-know/initialization/vanilla-js#optimization).

## Supported options

`type FontWeight = 'thin' | 'regular' | 'semi-bold' | 'bold'`

| Option    | Description                                                                                                                                                                                                        | Type           | Default                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | -------------------------- | -------- | -------- | -------- | ------- | --------- |
| `subset`  | Defines which font subset should be loaded.                                                                                                                                                                        | `'latin'       | 'greek'                    | 'cyril'  | 'arabic' | 'pashto' | 'urdu'` | `'latin'` |
| `weights` | Defines which font weights should be loaded.                                                                                                                                                                       | `FontWeight[]` | `['regular', 'semi-bold']` |
| `cdn`     | Decides from which CDN the resources are loaded.                                                                                                                                                                   | `'auto'        | 'cn'`                      | `'auto'` |
| `format`  | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. When using the <code class="no-before">js</code> option a javascript object is returned. | `'html'        | 'jsx'                      | 'js'`    | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

**Note:** Make sure to preload only fonts which are really needed initially!

<PartialDocs name="getFontLinks" :params="params" location="head"></PartialDocs>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  public params = [
    { 
      value: ""
    },
    { 
      value: "{ cdn: 'cn' }",
      comment: 'force using China CDN'
    },
  ];
}
</script>
