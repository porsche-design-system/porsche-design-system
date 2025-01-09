# Hover

<TableOfContents></TableOfContents>

## Example

<Notification heading="Important note" heading-tag="h3" state="error">
 The <code>getHoverStyle() / pds-hover()</code> style is still experimental, interface might change.
</Notification>

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesHover />
</Playground>

## Usage

The :hover state gives visual feedback on interactive elements. It is only visible when the mouse is over the element to
indicate the possibility of interaction.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `getHoverStyle({ borderRadius: 'small' | 'medium' | string })`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `@mixin pds-hover($border-radius: 'small' | 'medium' | any)`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesHoverCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesHover from '@/pages/patterns/styles/example-hover.vue';

@Component({
  components: {
    ExampleStylesHover
  },
})
export default class Code extends Vue {
  codeExample = getStylesHoverCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
