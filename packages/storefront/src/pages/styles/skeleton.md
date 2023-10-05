# Skeleton

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesSkeleton />
</Playground>

## Usage

The skeleton styles can be used to illustrate the loading state of more complex elements, for example a list of cards.

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `getSkeletonStyle({ borderRadius: 'small' | 'medium' | string })`

---

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `@mixin pds-skeleton($border-radius: 'small' | 'medium' | any)`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesSkeletonCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesSkeleton from '@/pages/patterns/styles/example-skeleton.vue';

@Component({
  components: {
    ExampleStylesSkeleton
  },
})
export default class Code extends Vue {
  codeExample = getStylesSkeletonCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
