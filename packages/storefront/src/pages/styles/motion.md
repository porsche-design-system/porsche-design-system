# Motion

<TableOfContents></TableOfContents>

## Duration

When objects move within a limited area, shorter durations are needed compared to objects that cover larger distances.
The duration of an animation directly affects the perceived lag time for users. To prevent this, it is essential to
ensure that motion is swift, subtle, and purposeful.

## Easing

Effects are the key for turning components from static to interactive and keeping UI elements alive.

## Example Curves

<Playground :frameworkMarkup="codeExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionCurves />
</Playground>

## Usage

#### Do:

#### Don't:

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

#### JS

JavaScript styles can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `motionDurationShort`
- `motionDurationModerate`
- `motionDurationLong`
- `motionDurationVeryLong`

- `motionEasingBase`
- `motionEasingIn`
- `motionEasingOut`

---

#### SCSS

SCSS styles can be imported by `@use '@porsche-design-system/components-{js|angular|react|vue}/styles' as *;`

- `$pds-motion-duration-short`
- `$pds-motion-duration-moderate`
- `$pds-motion-duration-long`
- `$pds-motion-duration-very-long`

- `$pds-motion-easing-base`
- `$pds-motion-easing-in`
- `$pds-motion-easing-out`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStylesMotionCurvesCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesMotionCurves from '@/pages/patterns/styles/example-motion-curves.vue';

@Component({
  components: {
    ExampleStylesMotionCurves
  },
})
export default class Code extends Vue {
  codeExample = getStylesMotionCurvesCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.codeExample);
  }
}
</script>
