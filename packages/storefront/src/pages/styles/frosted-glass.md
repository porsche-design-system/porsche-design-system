# Frosted Glass

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesFrostedGlass />
</Playground>

## Usage

#### Do:

- Add frosted-glass effect to a container to create an emersive moment.
- Use the effect as an overlay on contrast-rich backgrounds.
- Use it for hover states.
- Only pair with neutral colors.
- Use it rarely.

#### Hint:

- Be aware of contrast issues depending on the background
- Some browsers have issues with rendering the effect

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `frostedGlassStyle`

---

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles' as *;`

<p-inline-notification heading="Important note" state="warning" dismiss-button="false">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-frosted-glass()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesFrostedGlassCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesFrostedGlass from '@/pages/patterns/styles/example-frosted-glass.vue';

@Component({
  components: {
    ExampleStylesFrostedGlass
  },
})
export default class Code extends Vue {
  codeExample = getStylesFrostedGlassCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
