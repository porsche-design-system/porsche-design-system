# Initial Styles

**Function name:** `getInitialStyles()`

<Notification heading="Attention" state="warning">
<b>This partial is required since v3.7.0</b>.<br>
It is necessary to provide some default styles to Porsche Design System components until they are fully bootstrapped to
prevent FOUC. In addition, normalize and component related slotted styles are provided too.
</Notification>

Therefore, we provide a ready to use partial in all `@porsche-design-system/components-{js|angular|react|vue}` packages
which has to be injected into the `<head>` of your `index.html`.

## Supported options

| Option   | Description                                                                                                               | Type    | Default   |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | --------- | -------- |
| `prefix` | Prefix will be added to the component names. It's also possible to pass multiple prefixes.                                | `string | string[]` | `''`     |
| `format` | Defines the output format of the partial. By default, it returns a html string, with `jsx` it returns valid jsx elements. | `'html' | 'jsx'`    | `'html'` |

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getInitialStyles" :params="params" location="head"></PartialDocs>

<Notification heading="Hint" state="success">
  In case, micro frontends with custom prefixed Porsche Design System components are used, 
it's possible to provide proper initial styles to all of them by defining an array of custom prefixes (see example below).
By entering <code>document.porscheDesignSystem</code> in the browser console of your application, it's possible to find out which prefixes are used.
</Notification>

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
      value: "{ prefix: ['', 'custom-prefix', 'another-prefix'] }",
      comment: 'with multiple prefixes to match prefixed components coming from micro frontends',
    },
  ];
}
</script>
