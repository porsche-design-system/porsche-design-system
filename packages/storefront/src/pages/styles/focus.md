# Focus

<TableOfContents></TableOfContents>

## Example

<p-inline-notification heading="Important note" state="warning" persistent="true">
 Safari < 16.4 isn't able to visualize a rounded focus outline, instead it will be edgy. 
We implemented the focus style with a standard CSS outline anyway because of too many disadvantages caused by alternative integrations, e.g. with pseudo-elements. 
<br>
In addition, the way the focus style is integrated it will only be visible with keyboard navigation, not with mouse interaction.
</p-inline-notification>

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensFocus />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `getFocusStyle(…)`

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-focus(…)`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensFocusCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensFocus from '@/pages/patterns/design-tokens/example-focus.vue';

@Component({
  components: {
    ExampleDesignTokensFocus
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensFocusCodeSamples();
}
</script>
