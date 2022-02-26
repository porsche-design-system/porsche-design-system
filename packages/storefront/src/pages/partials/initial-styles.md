# Initial Styles

**Function name:** `getInitialStyles()`

If you use `Porsche Design System` components, we take care that your application only renders those if they are fully
styled. However, it takes a moment until our core is fully loaded and only then we can take action. This short timespan
has to be covered.

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages
which needs to be injected into the `<head>` of your `index.html`.

## Supported options

| Option               | Description                                                                                                                                              | Type            | Default |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------|
| `prefix`             | Prefix will be added to the component names.                                                                                                             | `string`        | `''`    |
| `withoutTags`        | <span style='color:red'>**[DEPRECATED]**</span> since v2.9.0 and will be removed in v3, use `format: 'jsx'` instead.<br/>If true, it returns css styles. | `boolean`       | `false` |
| `format`             | Defines the output format of the partial. By default it returns a html string, with `jsx` it returns valid jsx elements.                                 | `'html'         | 'jsx'`  | `'html'` |
| `skeletonComponents` | <span style='color:red'>**[EXPERIMENTAL]**</span> Components will have a built-in skeleton solution. Default are all supported components.               | `Array<string>` | `[]`    |

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getInitialStyles" :params="params" location="head"></PartialDocs>

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
    {
      value: "{ skeletonComponents: ['p-button', 'p-button-pure', 'p-checkbox-wrapper', 'p-headline', 'p-fieldset-wrapper', 'p-link', 'p-link-pure', 'p-radio-button-wrapper', 'p-select-wrapper', 'p-text', 'p-text-list', 'p-text-list-item', 'p-textarea-wrapper', 'p-text-field-wrapper'] }",
      comment: 'with all components that come with a built-in skeleton'
    }
  ];
}
</script>