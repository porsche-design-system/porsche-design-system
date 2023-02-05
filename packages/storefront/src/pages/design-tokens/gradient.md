# Gradient

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

- `gridBasic`
- `gridBasicColumnEnd`
- `gridBasicColumnStart`
- `gridBasicSpanOneHalf`
- `gridBasicSpanOneThird`
- `gridBasicSpanTwoThirds`
- `gridExtended`
- `gridExtendedColumnEnd`
- `gridExtendedColumnStart`
- `gridExtendedSpanOneHalf`
- `gridFull`
- `gridFullColumnEnd`
- `gridFullColumnStart`
- `gridGap`
- `gridNarrow`
- `gridNarrowColumnEnd`
- `gridNarrowColumnStart`
- `gridNarrowSpanOneHalf`
- `gridSafeZone`
- `gridSafeZoneBase`
- `gridSafeZoneXXL`
- `gridStyle`
- `gridWidth`
- `gridWidthMax`
- `gridWidthMin`

#### SCSS

SCSS Design Tokens can be imported by
`@import '~@porsche-design-system/components-{js|angular|react|vue}/utilities/scss';` (make sure your bundler supports
scss `~` tilde imports).

- `@mixin pds-grid()`
- `$pds-grid-basic-column-start`
- `$pds-grid-basic-column-end`
- `$pds-grid-basic-span-one-half`
- `$pds-grid-basic-span-one-third`
- `$pds-grid-basic-span-two-thirds`
- `$pds-grid-extended-column-start`
- `$pds-grid-extended-column-end`
- `$pds-grid-extended-span-one-half`
- `$pds-grid-full-column-start`
- `$pds-grid-full-column-end`
- `$pds-grid-gap`
- `$pds-grid-narrow-column-start`
- `$pds-grid-narrow-column-end`
- `$pds-grid-narrow-span-one-half`
- `$pds-grid-safe-zone-base`
- `$pds-grid-safe-zone-xxl`
- `$pds-grid-width-min`
- `$pds-grid-width-max`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensGradientCodeSamples } from '@porsche-design-system/shared';

@Component({
  components: {},
})
export default class Code extends Vue {
  codeExample = getDesignTokensGradientCodeSamples();
}
</script>
