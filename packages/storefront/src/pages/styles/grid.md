# Grid

<TableOfContents></TableOfContents>

## Example

The Porsche grid system is based on native [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) for best
performance, changing its available columns on mobile (6 content columns + 2 safe zone columns) and desktop view >=
760px viewport width (8-narrow/12-basic/14-extended/16-wide content columns + 2 safe zone columns). It has a size range
between 320px and 2560px, using fluid sized columns and gaps.

<p-link href="patterns/styles/example/grid" target="_blank" variant="secondary">View Porsche Grid in Full
Window</p-link>

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesGrid />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `gridStyle`
- `gridGap`
- `gridNarrow`
- `gridNarrowColumnStart`
- `gridNarrowColumnEnd`
- `gridNarrowSpanOneHalf`
- `gridBasic`
- `gridBasicColumnStart`
- `gridBasicColumnEnd`
- `gridBasicSpanOneHalf`
- `gridBasicSpanOneThird`
- `gridBasicSpanTwoThirds`
- `gridExtended`
- `gridExtendedColumnStart`
- `gridExtendedColumnEnd`
- `gridExtendedSpanOneHalf`
- `gridWide`
- `gridWideColumnStart`
- `gridWideColumnEnd`
- `gridFull`
- `gridFullColumnEnd`
- `gridFullColumnStart`

---

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-grid()`
- `$pds-grid-gap`
- `$pds-grid-narrow-column-start`
- `$pds-grid-narrow-column-end`
- `$pds-grid-narrow-span-one-half`
- `$pds-grid-basic-column-start`
- `$pds-grid-basic-column-end`
- `$pds-grid-basic-span-one-half`
- `$pds-grid-basic-span-one-third`
- `$pds-grid-basic-span-two-thirds`
- `$pds-grid-extended-column-start`
- `$pds-grid-extended-column-end`
- `$pds-grid-extended-span-one-half`
- `$pds-grid-wide-column-start`
- `$pds-grid-wide-column-end`
- `$pds-grid-full-column-start`
- `$pds-grid-full-column-end`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesGridCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesGrid from '@/pages/patterns/styles/example-grid.vue';

@Component({
  components: {
    ExampleStylesGrid
  },
})
export default class Code extends Vue {
  codeExample = getStylesGridCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
