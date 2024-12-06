# Dsr Ponyfill

**Function name:** `getDSRPonyfill()`

In SSR projects like NextJS, the Porsche Design System components are getting rendered on the server using native web
platform API called [Declarative Shadow DOM (DSR)](https://web.dev/declarative-shadow-dom). The
[browser support](https://caniuse.com/?search=declarative%20shadow%20dom) is already good but major browsers like Safari
and Firefox aren't supporting it yet.

Therefore, we provide a partial in `@porsche-design-system/components-react` package based on
[@webcomponents/template-shadowroot](https://npmjs.com/package/@webcomponents/template-shadowroot) which needs to be
injected before the closing `</body>` of your `index.html`.

## Supported options

<!-- prettier-ignore -->
| Option   | Description                                                                                                                                                                                                                                                                  | Type                        | Default  |
| -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------------------------- | -------- |
| `format` | Defines the output format of the partial. By default, it returns a html string.<br> For `jsx` it returns a jsx element.<br> For `sha256` it returns a SHA-256 hash of the innerHTML to use in a [Content Security Policy (CSP)](must-know/security/content-security-policy). | `'html' | 'jsx' | 'sha256'` | `'html'` |

When using `jsx` in the `format` option, it is necessary to have `react/jsx-runtime` as a dependency in the project
included.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getDSRPonyfill" :params="params" location="body"></PartialDocs>

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

<style scoped lang="scss">
  :deep(table code::before) {
    content: '' !important;
  }
</style>
