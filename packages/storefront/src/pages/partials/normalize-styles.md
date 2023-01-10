# Normalize Styles

**Function name:** `getNormalizeStyles()`

To improve the SSR support of `Porsche Design System` the `getNormalizeStyles()` partial applies basic css styles for
Light DOM. It includes normalize.css styles, which ensure that browsers render all elements more consistently. In
addition, the Partial applies the following styles according to the `Porsche Design System`: Focus style on all
focusable elements, font styles on form elements, basic styles and hover styles on anchor elements, proper font weight
on bold elements, and correct font style on emphasis elements.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages
which needs to be injected into the `<head>` of your `index.html`.

## Supported options

| Option   | Description                                                                                                               | Type    | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | -------- |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. | `'html' | 'jsx'`  | `'html'` |

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getNormalizeStyles" :params="params" location="head"></PartialDocs>

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
      value: "{ format: 'jsx' }",
      comment: 'Use JSX element for e.g. NextJS'
    },
  ];
}
</script>
