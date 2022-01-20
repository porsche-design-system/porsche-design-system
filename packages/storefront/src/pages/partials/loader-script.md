# Loader Script
**Function name:** `getLoaderScript()`

When using `porsche-design-system/components-{angular|react}` our core loader gets bundled into your application.  
This impacts the loading behavior of Porsche Design System components because the code gets executed **later**, once the framework bootstraps.

To achieve this bootstrapping **earlier** we provide a partial in all `@porsche-design-system/components-{js|angular|react}` packages which needs to be injected into the `<body>` of your `index.html`.

## Supported options
- **prefix:** `string | string[] = undefined`
- **withoutTags:** `boolean = false`

## Examples

Project integration differs based on the project setup.  
The following showcases the most common ways.

<PartialDocs name="getLoaderScript" :params="params"></PartialDocs>

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
      value: "{ prefix: 'my-prefix' }",
      comment: 'With custom prefix'
    },
    { 
      value: "{ prefix: ['my-prefix', 'another-prefix'] }",
      comment: 'With multiple custom prefixes'
    },
  ];
}
</script>