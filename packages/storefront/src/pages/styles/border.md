# Border

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleStylesBorder />
</Playground>

## Usage

tbd.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `border`
- `borderRadius`
- `borderRadiusLarge`
- `borderRadiusMedium`
- `borderRadiusSmall`
- `borderWidth`
- `borderWidthBase`
- `borderWidthThin`

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles/scss' as *;`

<p-inline-notification heading="Important note" state="warning" persistent="true">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `$pds-border-radius-large`
- `$pds-border-radius-small`
- `$pds-border-radius-medium`
- `$pds-border-width-base`
- `$pds-border-width-thin`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesBorderCodeSamples } from '@porsche-design-system/shared';
import ExampleStylesBorder from '@/pages/patterns/styles/example-border.vue';

@Component({
  components: {
    ExampleStylesBorder
  },
})
export default class Code extends Vue {
  codeExample = getStylesBorderCodeSamples();
}
</script>
