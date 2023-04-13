# Media Query

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMediaQuery />
</Playground>

## Usage

#### Do:

- Use breakpoints as building blocks of responsive design to control layout adaptation at specific viewport or device
  sizes.
- Follow a mobile-first approach, starting with the breakpoint base and layering on styles for larger devices.
- Test the application on different breakpoints to ensure that it works on all devices.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `breakpoints`
- `breakpoint`
- `breakpointBase`
- `breakpointXS`
- `breakpointS`
- `breakpointM`
- `breakpointL`
- `breakpointXL`
- `breakpointXXL`
- `getMediaQueryMin('base'|'xs'|'s'|'m' |'l'|'xl'|'xxl')`
- `getMediaQueryMax('xs'|'s'|'m' |'l'|'xl'|'xxl')`
- `getMediaQueryMinMax('base'|'xs'|'s'|'m' |'l'|'xl', 'xs'|'s'|'m' |'l'|'xl'|'xxl')`

---

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-js/styles' as *;`

<p-inline-notification heading="Important note" state="warning" dismiss-button="false">
 At the moment, importing SCSS styles is only possible from `@porsche-design-system/components-js` npm package.
</p-inline-notification>

- `$pds-breakpoint-base`
- `$pds-breakpoint-xs`
- `$pds-breakpoint-s`
- `$pds-breakpoint-m`
- `$pds-breakpoint-l`
- `$pds-breakpoint-xl`
- `$pds-breakpoint-xxl`
- `@mixin pds-media-query-min('base'|'xs'|'s'|'m' |'l'|'xl'|'xxl')`
- `@mixin pds-media-query-max('xs'|'s'|'m' |'l'|'xl'|'xxl')`
- `@mixin pds-media-query-min-max('base'|'xs'|'s'|'m' |'l'|'xl', 'xs'|'s'|'m' |'l'|'xl'|'xxl')`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesMediaQueryCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesMediaQuery from '@/pages/patterns/styles/example-media-query.vue';

@Component({
  components: {
    ExampleStylesMediaQuery
  },
})
export default class Code extends Vue {
  codeExample = getStylesMediaQueryCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
