# Focus

<TableOfContents></TableOfContents>

## Example

<Notification heading="Important note" heading-tag="h3" state="warning">
 Safari < 16.4 isn't able to visualize a rounded focus outline, instead it will be edgy. 
We implemented the focus style with a standard CSS outline anyway because of too many disadvantages caused by alternative integrations, e.g. with pseudo-elements. 
<br>
In addition, the way the focus style is integrated it will only be visible with keyboard navigation, not with mouse interaction.
</Notification>

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesFocus />
</Playground>

## Usage

The `:focus` state helps you to navigate through all interactive elements via tab on keyboard. It is only visible when
using the keyboard but not with the mouse.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `getFocusStyle({ offset: 'small' | 'none' | string, borderRadius: 'small' | 'medium' | string })`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `@mixin pds-focus($offset: 'small' | 'none' | any, $border-radius: 'small' | 'medium' | any)`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesFocusCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesFocus from '@/pages/patterns/styles/example-focus.vue';

@Component({
  components: {
    ExampleStylesFocus
  },
})
export default class Code extends Vue {
  codeExample = getStylesFocusCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
