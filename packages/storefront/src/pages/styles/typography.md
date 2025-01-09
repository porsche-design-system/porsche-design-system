# Typography

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesTypography />
</Playground>

## Usage

Fluid typography scales up or down based on the size of the viewing device or browser window within a predefined min-max
font size. This is in contrast to static font sizes, which are set to a specific pixel value and do not scale according
to the viewport.

### Do:

- Use fluid font styles as default.
- Section headings should be center-aligned.
- Ensure that all headlines have the same vertical line of the grid when left-aligned.
- Use only predefined font styles for text, headline, and display copy to ensure a proportional scaling of all copies,
  aligned with the fluid spacers, and a consistent appearance over all products.
- Use display styles for either hero intro, stats, or emotional moments.
- Use headline-xx-large for dedicated appointing of a section.
- Use text-styles for running text.
- Text-small is the default, but a bigger text style can be picked for introductions and short descriptions.
- Pair a headline style with a text style one or two steps below (e.g. headline-large with text-medium).
- Use text-xx-small only for disclaimers/consumption.

### Don't:

- Don't use static font styles.
- Don't use thin or any italic style of the Porsche Next.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `displayLargeStyle`
- `displayMediumStyle`
- `displaySmallStyle`
- `headingXXLargeStyle`
- `headingXLargeStyle`
- `headingLargeStyle`
- `headingMediumStyle`
- `headingSmallStyle`
- `textXLargeStyle`
- `textLargeStyle`
- `textMediumStyle`
- `textSmallStyle`
- `textXSmallStyle`
- `textXXSmallStyle`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `@mixin pds-display-large`
- `@mixin pds-display-medium`
- `@mixin pds-display-small`
- `@mixin pds-heading-xx-large`
- `@mixin pds-heading-x-large`
- `@mixin pds-heading-large`
- `@mixin pds-heading-medium`
- `@mixin pds-heading-small`
- `@mixin pds-text-x-large`
- `@mixin pds-text-large`
- `@mixin pds-text-medium`
- `@mixin pds-text-small`
- `@mixin pds-text-x-small`
- `@mixin pds-text-xx-small`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesTypographyCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesTypography from '@/pages/patterns/styles/example-typography.vue';

@Component({
  components: {
    ExampleStylesTypography
  },
})
export default class Code extends Vue {
  codeExample = getStylesTypographyCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
