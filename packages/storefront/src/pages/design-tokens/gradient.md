# Gradient

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensGradient />
</Playground>

## Usage

tbd.

## Tokens

The Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/utilities/js';`.

- `gradientToBottomStyle`
- `gradientToLeftStyle`
- `gradientToRightStyle`
- `gradientToTopStyle`

#### SCSS

SCSS Design Tokens can be imported by
`@import '~@porsche-design-system/components-{js|angular|react|vue}/utilities/scss';` (make sure your bundler supports
scss `~` tilde imports).

- `@mixin pds-gradient-to-bottom()`
- `@mixin pds-gradient-to-left()`
- `@mixin pds-gradient-to-right()`
- `@mixin pds-gradient-to-top()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensGradientCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensGradient from '@/pages/patterns/design-tokens/example-gradient.vue';

@Component({
  components: {
    ExampleDesignTokensGradient
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensGradientCodeSamples();
}
</script>
