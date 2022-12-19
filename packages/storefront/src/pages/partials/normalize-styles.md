# Normalize Styles

**Function name:** `getNormalizeStyles()`

// TODO: Description

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react}` packages
which needs to be injected into the `<head>` of your `index.html`.

## Supported options

| Option        | Description                                                                                                                                                  | Type      | Default |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- | -------- |
| `prefix`      | Prefix will be added to the component names.                                                                                                                 | `string`  | `''`    |
| `withoutTags` | <span style='color:#d5001c'>**[DEPRECATED]**</span> since v2.9.0 and will be removed in v3, use `format: 'jsx'` instead.<br/>If true, it returns css styles. | `boolean` | `false` |
| `format`      | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements.                                    | `'html'   | 'jsx'`  | `'html'` |

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
      value: "{ prefix: 'custom-prefix' }",
      comment: 'with custom prefix to match your prefixed components',
    }
  ];
}
</script>
