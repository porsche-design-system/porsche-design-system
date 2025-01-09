# Motion

<TableOfContents></TableOfContents>

## Duration

When objects move within a limited area, shorter durations are needed, compared to objects that cover larger distances.
The duration of an animation directly affects the perceived lag time for users. To prevent this, it is essential to
ensure that motion is swift, subtle, and purposeful.

| Token JS/SCSS                                                  | Duration | Usage                                                                                                                                                                                                               |
| -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `motionDurationShort`<br />`$pds-motion-duration-short`        | 0.25s    | For hover effects, consider elements like Buttons, Checkboxes, Switches, or the display of Popovers.                                                                                                                |
| `motionDurationModerate`<br />`$pds-motion-duration-moderate`  | 0.4s     | Best suited for elements that require moderate motion, such as the Slide transitions in Carousels, Modals, and Link-Tiles.                                                                                          |
| `motionDurationLong`<br />`$pds-motion-duration-long`          | 0.6s     | This duration is ideal for creating longer, more deliberate animations. It's commonly used for animations associated with Notifications and Flyouts, where a slightly slower and more controlled motion is desired. |
| `motionDurationVeryLong`<br />`$pds-motion-duration-very-long` | 1.2s     | Reserved for the longest animations, this duration is perfect for elements like Spinners and Skeleton loaders, where a very deliberate and gradual animation is necessary to convey loading or progress.            |

## Easing

Effects are the key for turning components from static to interactive and keeping UI elements alive.

| Token JS/SCSS                                     | Easing Demo                                                                    | Usage                                                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `motionEasingBase`<br />`$pds-motion-easing-base` | x: Time \| y: Progression<br /><ExampleStylesMotionCurve path="easing-base" /> | Buttons (hover and active states).<br />Tabs or segments switching.<br />Basic fade-in and fade-out animations.                                                  |
| `motionEasingIn`<br />`$pds-motion-easing-in`     | x: Time \| y: Progression<br /><ExampleStylesMotionCurve path='easing-in'/>    | Elements like Banners/Toasts or Modals that appear quickly and then ease into view.<br />Elements like Flyouts that slide in from off-screen and then slow down. |
| `motionEasingOut`<br />`$pds-motion-easing-out`   | x: Time \| y: Progression<br /><ExampleStylesMotionCurve path='easing-out'/>   | Closing animations for Modals or Flyouts.<br />Elements sliding out of view fast.                                                                                |

## Examples

<Playground :frameworkMarkup="motionExamples" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotion />
</Playground>

## Styles

The styles are available as `JavaScript` and `SCSS` version. Look at the example above to see how the styles work.

### JS

When using `JSS`, `styled-components` etc. JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

When using `vanilla-extract` JavaScript styles can be imported by:
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`.

- `motionDurationShort`
- `motionDurationModerate`
- `motionDurationLong`
- `motionDurationVeryLong`

- `motionEasingBase`
- `motionEasingIn`
- `motionEasingOut`

---

### SCSS

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
import { getStylesMotionCodeSamples } from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesMotionCurve from '@/pages/patterns/styles/example-motion-curve.vue';
import ExampleStylesMotion from '@/pages/patterns/styles/example-motion.vue';

@Component({
  components: {
    ExampleStylesMotionCurve,
    ExampleStylesMotion,
  },
})
export default class Code extends Vue {
  motionExamples = getStylesMotionCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.motionExamples);
  }
}
</script>
