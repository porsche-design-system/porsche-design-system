# Drop Shadow

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensDropShadow />
</Playground>

## Usage

tbd.

## Styles

The Styles / Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens
work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `dropShadowHighStyle`
- `dropShadowMediumStyle`
- `dropShadowLowStyle`

#### SCSS

SCSS Design Tokens can be imported by `@import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';`
(make sure your bundler supports scss `~` tilde imports).

- `@mixin pds-drop-shadow-high()`
- `@mixin pds-drop-shadow-medium()`
- `@mixin pds-drop-shadow-low()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensDroshadowCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensDropShadow from '@/pages/patterns/design-tokens/example-drop-shadow.vue';

@Component({
  components: {
    ExampleDesignTokensDropShadow
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensDroshadowCodeSamples();
}
</script>
