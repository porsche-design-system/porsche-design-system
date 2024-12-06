# Font Face Styles

**Function name:** `getFontFaceStyles()`

If you use the Porsche Design System components we inject a link to a stylesheet with all font-face definitions into the
head of your application as soon as our core is loaded. These definitions have to be downloaded from our CDN which makes
them a blocking resource. This can lead (for the first time) to a decent rendering glitch of your texts. To improve
rendering it is recommended to deliver critical CSS inline.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which needs to be injected into the `<head>` of your `index.html`. The partial directly returns the `<style>` tag with
all relevant font-face definitions.

An in-depth optimization guide can be found at
[Vanilla Js Optimization](must-know/initialization/vanilla-js#optimization).

## Supported options

| Option   | Description                                                                                                                                                                                                                                                                 | Type    | Default |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | --------- | -------- |
| `cdn`    | Decides from which CDN the resources are loaded.                                                                                                                                                                                                                            | `'auto' | 'cn'`   | `'auto'`  |
| `format` | Defines the output format of the partial. By default, it returns a html string.<br> For `jsx` it return a jsx element.<br> For `sha256` it returns a SHA-256 hash of the innerHTML to use in a [Content Security Policy (CSP)](must-know/security/content-security-policy). | `'html' | 'jsx'   | 'sha256'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getFontFaceStyles" :params="params" location="head"></PartialDocs>

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
      comment: 'force using China CDN',
    },
  ];
}
</script>
