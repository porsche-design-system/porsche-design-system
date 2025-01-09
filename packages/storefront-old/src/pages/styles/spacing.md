# Spacing

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesSpacing />
</Playground>

## Usage

Fluid spacing scale up or down based on the size of the viewing device or browser window in a predefined range. This is
in contrast to using static spacing, which is set using a specific pixel value and does not scale.

### Do:

- Use the fluid spacers to ensure a smooth and proportional scaling of space between elements, groups, and sections that
  are aligned with the fluid typography and grid.
- Use "m" as the default space value since it corresponds to the grid-gap.
- Use values from "xs" to "l" for distances within a container, such as between heading, text, and buttons, or for
  spacing and grouping of form fields.
- Use values from "l" to "xxl" for spacing between sections on a page.

### Don't:

- Only use the static spacers when needed (e.g. within custom components).
- Don't use values outside the recommended range for specific types of spacing.
- Don't change the fluid spacer manually based on different viewports.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `spacing`
- `spacingFluid`
- `spacingFluidXSmall`
- `spacingFluidSmall`
- `spacingFluidMedium`
- `spacingFluidLarge`
- `spacingFluidXLarge`
- `spacingFluidXXLarge`
- `spacingStatic`
- `spacingStaticXSmall`
- `spacingStaticSmall`
- `spacingStaticMedium`
- `spacingStaticLarge`
- `spacingStaticXLarge`
- `spacingStaticXXLarge`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `$pds-spacing-fluid-x-small`
- `$pds-spacing-fluid-small`
- `$pds-spacing-fluid-medium`
- `$pds-spacing-fluid-large`
- `$pds-spacing-fluid-x-large`
- `$pds-spacing-fluid-xx-large`
- `$pds-spacing-static-x-small`
- `$pds-spacing-static-small`
- `$pds-spacing-static-medium`
- `$pds-spacing-static-large`
- `$pds-spacing-static-x-large`
- `$pds-spacing-static-xx-large`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesSpacingCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesSpacing from '@/pages/patterns/styles/example-spacing.vue';

@Component({
  components: {
    ExampleStylesSpacing
  },
})
export default class Code extends Vue {
  codeExample = getStylesSpacingCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
