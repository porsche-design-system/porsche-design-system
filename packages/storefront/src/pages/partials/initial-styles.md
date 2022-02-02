# Initial Styles
**Function name:** `getInitialStyles()`

If you use `Porsche Design System` components, we take care that your application only renders those if they are fully styled.
However, it takes a moment until our core is fully loaded and only then we can take action. This short timespan has to be covered.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be injected into the `<head>` of your `index.html`.

## Supported options

| Option        | Description                                                                                                                                                                      | Type                   | Default  |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------- |------------------------|----------|
| `prefix`       | Prefix will be added to the component names                                                                                                       | `auto` `cn`            | `auto`   |
| `withoutTags` | <span style='color:red'>**[DEPRECATED]**</span> since v2.9.0 and will be removed in v3, use `format` instead.<br/>If true, it returns css styles | `boolean`              | `false`  |
| `format`      | Defines the output format of the partial. By default it returns a string, with `jsx` it returns valid jsx elements.                               | `'html'` `'jsx'`       | `html`   |

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getInitialStyles" :params="params" location="head"></PartialDocs>

You can find an implemented example in our [Sample VanillaJS Integration](https://github.com/porscheui/sample-integration-vanillajs), [Sample Angular Integration](https://github.com/porscheui/sample-integration-angular) or [Sample React Integration](https://github.com/porscheui/sample-integration-react)

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
      value: "{ prefix: 'custom-prefix' }",
      comment: 'with custom prefix to match your prefixed components',
    },
  ];
}
</script>