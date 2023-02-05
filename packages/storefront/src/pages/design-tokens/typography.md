# Typography

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
</Playground>

## Usage

tbd.

## Tokens

The Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/utilities/js';`.

- `displayLargeStyle`
- `displayMediumStyle`
- `headingXXXLargeStyle`
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

SCSS Design Tokens can be imported by
`@import '~@porsche-design-system/components-{js|angular|react|vue}/utilities/scss';` (make sure your bundler supports
scss `~` tilde imports).

- `@mixin pds-display-medium`
- `@mixin pds-display-large`
- `@mixin pds-heading-xxx-large`
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
import { getDesignTokensTypographyCodeSamples } from '@porsche-design-system/shared';

@Component({
  components: {},
})
export default class Code extends Vue {
  codeExample = getDesignTokensTypographyCodeSamples();
}
</script>
