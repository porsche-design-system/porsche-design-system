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
| `skeletonTagNames` | <span style='color:red'>**[EXPERIMENTAL]**</span> Components will have a built-in skeleton solution. By default no skeletons are used.               | `({{this.skeletonTagNamesType}})[]` | `[]`    |

## Skeleton Behavior

<p-inline-notification heading="Important note" state="warning" persistent="true">
  Be aware that Skeletons are currently an <span style='color:red'>[EXPERIMENTAL]</span> feature.<br>
  Their API and behaviour might change in future releases.
</p-inline-notification>

The skeletons provided by this partial cover the timespan between the page load and initialization of each component
provided in the `skeletonTagNames` array.  
They are **not** meant to be used as asynchronous loading indicators for content inside the initialized components.  
To further minimize the time it takes for the components to initialize use
our [Component Chunk Links Partial](partials/component-chunk-links) to preload the components.

Be aware that skeletons do **not** work when wrapped inside any of the following layout components: `Button Group`
, `Content Wrapper`, `Grid`, `Flex`.  
Using them inside said layout components will lead to flashes of skeletons.  
When using skeletons with `Fieldset Wrapper` be aware that layout shifts will happen, when providing a `label` property.

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getInitialStyles" :params="params" location="head"></PartialDocs>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {SKELETON_TAG_NAMES} from "@porsche-design-system/shared"; 

@Component
export default class Code extends Vue {
  public skeletonTagNamesType = SKELETON_TAG_NAMES.map(x => `'${x}'`).join(' | ');
  public skeletonTagNames = SKELETON_TAG_NAMES.map(x => `'${x}'`).join(', ');
  public params = [
    {
      value: ""
    },
    {
      value: "{ prefix: 'custom-prefix' }",
      comment: 'with custom prefix to match your prefixed components',
    },
    {
      value: `{ skeletonTagNames: [${this.skeletonTagNames}] }`,
      comment: 'with all components that come with a built-in skeleton'
    }
  ];
}
</script>