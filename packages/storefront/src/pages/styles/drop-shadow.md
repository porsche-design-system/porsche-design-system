# Drop Shadow

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesDropShadow />
</Playground>

## Usage

### Do:

- Reduce the use of shadows within the panels. Rather use a combination of different background colors like base and
  surface to create a visual hierarchy.
- Use same style for common components that are arranged in the row.
- Reserve drop-shadow for elements that require it, such as flyouts, notifications, or navigation menus.
- Use medium for sticky elements.
- Use high for element that have high priority.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `dropShadowHighStyle`
- `dropShadowMediumStyle`
- `dropShadowLowStyle`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `@mixin pds-drop-shadow-high()`
- `@mixin pds-drop-shadow-medium()`
- `@mixin pds-drop-shadow-low()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesDroshadowCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesDropShadow from '@/pages/patterns/styles/example-drop-shadow.vue';

@Component({
  components: {
    ExampleStylesDropShadow
  },
})
export default class Code extends Vue {
  codeExample = getStylesDroshadowCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
