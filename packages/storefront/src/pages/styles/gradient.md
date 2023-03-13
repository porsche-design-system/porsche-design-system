# Gradient

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensGradient />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `gradientToBottomStyle`
- `gradientToLeftStyle`
- `gradientToRightStyle`
- `gradientToTopStyle`

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-gradient-to-bottom()`
- `@mixin pds-gradient-to-left()`
- `@mixin pds-gradient-to-right()`
- `@mixin pds-gradient-to-top()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesGradientCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensGradient from '@/pages/patterns/styles/example-gradient.vue';

@Component({
  components: {
    ExampleDesignTokensGradient
  },
})
export default class Code extends Vue {
  codeExample = getStylesGradientCodeSamples();
}
</script>
