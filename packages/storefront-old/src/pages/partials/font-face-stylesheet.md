# Font Face Stylesheet

<Notification heading="Deprecation hint" heading-tag="h2" state="warning">
  Critical CSS should be inlined in order to improve the performance of your page.<br>
  Therefore the <code>getFontFaceStylesheet()</code> has been deprecated and will be removed with the next major release.<br>
  Please use the <code>getFontFaceStyles()</code> partial instead.
</Notification>

**Function name:** `getFontFaceStylesheet()`

If you use the Porsche Design System components we inject a stylesheet with all font-face definitions into the head of
your application as soon as our core is loaded. To improve loading performance we recommend that you include the link to
the stylesheet on your own.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which needs to be injected into the `<head>` of your `index.html`.

We suggest that `getFontFaceStylesheet()` partial is implemented in every application that uses the Porsche Design
System therefore the partial provides additional link tags with `rel="preconnect"` and `rel="dns-prefetch"` to improve
the performance of the initial connection to our cdn.

An in-depth optimization guide can be found at
[Vanilla Js Optimization](must-know/initialization/vanilla-js#optimization).

## Supported options

| Option   | Description                                                                                                              | Type    | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ------- | ------- | -------- |
| `cdn`    | Decides from which CDN the resources are loaded.                                                                         | `'auto' | 'cn'`   | `'auto'` |
| `format` | Defines the output format of the partial. By default it returns a html string, with `jsx` it returns valid jsx elements. | `'html' | 'jsx'`  | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getFontFaceStylesheet" :params="params" location="head"></PartialDocs>

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
