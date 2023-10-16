# Motion

<TableOfContents></TableOfContents>

## Duration

When objects move within a limited area, shorter durations are needed, compared to objects that cover larger distances.
The duration of an animation directly affects the perceived lag time for users. To prevent this, it is essential to
ensure that motion is swift, subtle, and purposeful.

| Token JS                 | Token SCSS                       | Duration | Usage                              |
| ------------------------ | -------------------------------- | -------- | ---------------------------------- |
| `motionDurationShort`    | `$pds-motion-duration-short`     | 0.25s    | Checkboxes, Switch, Hover, Popover |
| `motionDurationModerate` | `$pds-motion-duration-moderate`  | 0.4s     | Slide (Carousel), Modal, Link-Tile |
| `motionDurationLong`     | `$pds-motion-duration-long`      | 0.6s     | Notifications, Flyout              |
| `motionDurationVeryLong` | `$pds-motion-duration-very-long` | 1.2s     | Spinner, Skeleton                  |

## Easing

Effects are the key for turning components from static to interactive and keeping UI elements alive.

| Token              | Token SCSS                | Easing                        | Usage                                                                                                                 |
| ------------------ | ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `motionEasingBase` | `$pds-motion-easing-base` | cubic-bezier(0.25,0.1,0.25,1) | Buttons (hover and active states).<br />Tabs or segments switching.<br />Basic fade-in and fade-out animations.       |
| `motionEasingIn`   | `$pds-motion-easing-in`   | cubic-bezier(0,0,0.2,1)       | Elements that appear quickly and then ease into view.<br />Elements that slide in from off-screen and then slow down. |
| `motionEasingOut`  | `$pds-motion-easing-out`  | cubic-bezier(0.4,0,0.5,1)     | Closing animations for Modals or Flyouts.<br />Elements sliding out of view fast.                                     |

## Example Motion Curves

<Playground :frameworkMarkup="motionCurvesExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionCurves />
</Playground>

## Examples

<Playground :frameworkMarkup="motionExamples" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotion />
</Playground>

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
import {
  getStylesMotionCurvesCodeSamples, getStylesMotionCodeSamples
} from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesMotionCurves from '@/pages/patterns/styles/example-motion-curves.vue';
import ExampleStylesMotion from '@/pages/patterns/styles/example-motion.vue';

@Component({
  components: {
    ExampleStylesMotionCurves,
    ExampleStylesMotion,
  },
})
export default class Code extends Vue {
  motionCurvesExample = getStylesMotionCurvesCodeSamples();
  motionExamples = getStylesMotionCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.motionCurvesExample);
    adjustSelectedFramework(this.motionExamples);
  }
}
</script>
