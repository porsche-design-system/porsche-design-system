# Grid

<TableOfContents></TableOfContents>

## Example

The Porsche grid system is based on native [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) for best
performance, changing its available columns on mobile (6 content columns + 2 safe zone columns) and desktop view
(8/12/14 content columns + 2 safe zone columns). It has a size range between 320px and 2560px, using fluid sized columns
and gaps.

<p-link href="patterns/design-tokens/example/grid" target="_blank" variant="secondary">View Porsche Grid in Full
Window</p-link>

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensGrid />
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
import { getDesignTokensGridCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensGrid from '@/pages/patterns/design-tokens/example-grid.vue';

@Component({
  components: {
    ExampleDesignTokensGrid
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensGridCodeSamples();
}
</script>
