# Typography

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesTypography />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

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

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

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

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesTypographyCodeSamples } from '@porsche-design-system/shared';
import ExampleStylesTypography from '@/pages/patterns/styles/example-typography.vue';

@Component({
  components: {
    ExampleStylesTypography
  },
})
export default class Code extends Vue {
  codeExample = getStylesTypographyCodeSamples();
}
</script>
