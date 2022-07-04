# Browser Support Script

**Function name:** `getBrowserSupportScript()`

The Porsche Design System components rely on dedicated JavaScript features like `IntersectionObserver`,
`MutationObserver`, `customElements` and others. If any of the requirements are not met, a blocking overlay is displayed
which recommends the user to update the browser.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages
which needs to be injected before the closing `</body>` of your `index.html`.

## Supported options

| Option   | Description                                                                                                               | Type    | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | -------- |
| `cdn`    | Decides from which CDN the resources are loaded.                                                                          | `'auto' | 'cn'`   | `'auto'` |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. | `'html' | 'jsx'`  | `'html'` |

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getBrowserSupportScript" :params="params" location="body"></PartialDocs>

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
