# Spacing

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesSpacing />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

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

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles' as *;`

<p-inline-notification heading="Important note" state="warning" dismiss-button="false">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

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
