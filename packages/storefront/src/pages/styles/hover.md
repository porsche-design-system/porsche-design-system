# Hover

<TableOfContents></TableOfContents>

## Example

<p-inline-notification heading="Important note" state="error" persistent="true">
 The <code>getHoverStyle() / pds-hover()</code> style is still experimental, interface might change.
</p-inline-notification>

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesHover />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `getHoverStyle({borderRadius: 'small'|'medium'|string})`

---

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `@mixin pds-hover($border-radius: 'small'|'medium'|any)`

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
