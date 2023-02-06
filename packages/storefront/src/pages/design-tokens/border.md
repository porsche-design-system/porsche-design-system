# Border

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensBorder />
</Playground>

## Usage

tbd.

## Tokens

The Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/utilities/js';`.

- `border`
- `borderRadius`
- `borderRadiusLarge`
- `borderRadiusMedium`
- `borderRadiusSmall`
- `borderWidth`
- `borderWidthBase`
- `borderWidthThin`

#### SCSS

SCSS Design Tokens can be imported by
`@import '~@porsche-design-system/components-{js|angular|react|vue}/utilities/scss';` (make sure your bundler supports
scss `~` tilde imports).

- `$pds-border-radius-large`
- `$pds-border-radius-small`
- `$pds-border-radius-medium`
- `$pds-border-width-base`
- `$pds-border-width-thin`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensBorderCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensBorder from '@/pages/patterns/design-tokens/example-border.vue';

@Component({
  components: {
    ExampleDesignTokensBorder
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensBorderCodeSamples();
}
</script>
