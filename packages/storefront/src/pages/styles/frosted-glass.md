# Frosted Glass

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensFrostedGlass />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `frostedGlassStyle`

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-frosted-glass()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensFrostedGlassCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensFrostedGlass from '@/pages/patterns/design-tokens/example-frosted-glass.vue';

@Component({
  components: {
    ExampleDesignTokensFrostedGlass
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensFrostedGlassCodeSamples();
}
</script>
