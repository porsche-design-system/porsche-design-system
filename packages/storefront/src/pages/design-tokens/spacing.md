# Spacing

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
</Playground>

## Usage

tbd.

## Tokens

The Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/utilities/js';`.

- `spacing`
- `spacingFluid`
- `spacingFluidXSmall`
- `spacingFluidSmall`
- `spacingFluidMedium`
- `spacingFluidLarge`
- `spacingFluidXLarge`
- `spacingStatic`
- `spacingStaticXSmall`
- `spacingStaticSmall`
- `spacingStaticMedium`
- `spacingStaticLarge`
- `spacingStaticXLarge`
- `spacingStaticXXLarge`

#### SCSS

SCSS Design Tokens can be imported by
`@import '~@porsche-design-system/components-{js|angular|react|vue}/utilities/scss';` (make sure your bundler supports
scss `~` tilde imports).

- `$pds-spacing-fluid-x-small`
- `$pds-spacing-fluid-small`
- `$pds-spacing-fluid-medium`
- `$pds-spacing-fluid-large`
- `$pds-spacing-fluid-x-large`
- `$pds-spacing-static-x-small`
- `$pds-spacing-static-small`
- `$pds-spacing-static-medium`
- `$pds-spacing-static-large`
- `$pds-spacing-static-x-large`
- `$pds-spacing-static-xx-large`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensSpacingCodeSamples } from '@porsche-design-system/shared';

@Component({
  components: {},
})
export default class Code extends Vue {
  codeExample = getDesignTokensSpacingCodeSamples();
}
</script>
