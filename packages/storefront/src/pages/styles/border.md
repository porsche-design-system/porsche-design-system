# Border

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesBorder />
</Playground>

## Usage

### Border-Radius

#### Do:

- Use the large border-radius for parent elements such as images and containers.
- Adapt nested elements within a parent element with a medium border-radius for better visual appearance.
- Use the small border-radius for all interactive elements (e.g. Buttons).
- Icons should be designed with a 2px border-radius when feasible.

#### Don't:

- Don't use other border-radius than the defined tokens.
- Don't use a border-radius when an element touches the side of a parent element or the browser.

### Border-Width

Standardized stroke-widths are used for all components for a consistent appearance.

#### Don't

- Use borders to create a minimalistic interface. Use other than the defined stroke widths.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `border`
- `borderRadius`
- `borderRadiusLarge`
- `borderRadiusMedium`
- `borderRadiusSmall`
- `borderWidth`
- `borderWidthBase`
- `borderWidthThin`

---

### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `$pds-border-radius-large`
- `$pds-border-radius-small`
- `$pds-border-radius-medium`
- `$pds-border-width-base`
- `$pds-border-width-thin`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesBorderCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesBorder from '@/pages/patterns/styles/example-border.vue';

@Component({
  components: {
    ExampleStylesBorder
  },
})
export default class Code extends Vue {
  codeExample = getStylesBorderCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
