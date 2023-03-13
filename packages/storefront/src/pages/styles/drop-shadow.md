# Drop Shadow

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensDropShadow />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `dropShadowHighStyle`
- `dropShadowMediumStyle`
- `dropShadowLowStyle`

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-drop-shadow-high()`
- `@mixin pds-drop-shadow-medium()`
- `@mixin pds-drop-shadow-low()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesDroshadowCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensDropShadow from '@/pages/patterns/styles/example-drop-shadow.vue';

@Component({
  components: {
    ExampleDesignTokensDropShadow
  },
})
export default class Code extends Vue {
  codeExample = getStylesDroshadowCodeSamples();
}
</script>
