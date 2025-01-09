# Gradient

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesGradient />
</Playground>

## Usage

### Do:

- Use only when placing text on images (e.g. a Link Tile) to provide a subtle contrast, making it easier to read.

### Don't:

- Don't build the gradient yourself.

### Hint

- The gradient consists of various points to create a smooth gradient.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `gradientToBottomStyle`
- `gradientToLeftStyle`
- `gradientToRightStyle`
- `gradientToTopStyle`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `@mixin pds-gradient-to-bottom()`
- `@mixin pds-gradient-to-left()`
- `@mixin pds-gradient-to-right()`
- `@mixin pds-gradient-to-top()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesGradientCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesGradient from '@/pages/patterns/styles/example-gradient.vue';

@Component({
  components: {
    ExampleStylesGradient
  },
})
export default class Code extends Vue {
  codeExample = getStylesGradientCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
