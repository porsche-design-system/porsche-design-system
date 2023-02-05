# Focus

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

- `getFocusStyle(…)`

#### SCSS

SCSS Design Tokens can be imported by
`@import '~@porsche-design-system/components-{js|angular|react|vue}/utilities/scss';` (make sure your bundler supports
scss `~` tilde imports).

- `@mixin pds-focus(…)`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensFocusCodeSamples } from '@porsche-design-system/shared';

@Component({
  components: {},
})
export default class Code extends Vue {
  codeExample = getDesignTokensFocusCodeSamples();
}
</script>
