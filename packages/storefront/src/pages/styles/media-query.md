# Media Query

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensMediaQuery />
</Playground>

## Usage

tbd.

## Styles

The Styles / Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens
work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `breakpoint`
- `breakpointBase`
- `breakpointXS`
- `breakpointS`
- `breakpointM`
- `breakpointL`
- `breakpointXL`
- `breakpointXXL`
- `getMediaQueryMin(…)`
- `getMediaQueryMax(…)`
- `getMediaQueryMinMax(…)`

#### SCSS

SCSS Design Tokens can be imported by `@import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';`
(make sure your bundler supports scss `~` tilde imports).

- `$pds-breakpoint-base`
- `$pds-breakpoint-xs`
- `$pds-breakpoint-s`
- `$pds-breakpoint-m`
- `$pds-breakpoint-l`
- `$pds-breakpoint-xl`
- `$pds-breakpoint-xxl`
- `@mixin pds-media-query-min(…)`
- `@mixin pds-media-query-max(…)`
- `@mixin pds-media-query-min-max(…)`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensMediaQueryCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensMediaQuery from '@/pages/patterns/design-tokens/example-media-query.vue';

@Component({
  components: {
    ExampleDesignTokensMediaQuery
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensMediaQueryCodeSamples();
}
</script>
