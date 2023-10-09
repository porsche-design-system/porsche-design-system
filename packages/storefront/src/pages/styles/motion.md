# Motion

<TableOfContents></TableOfContents>

## Duration

When objects move within a limited area, shorter durations are needed compared to objects that cover larger distances.
The duration of an animation directly affects the perceived lag time for users. To prevent this, it is essential to
ensure that motion is swift, subtle, and purposeful.

| Token                    | Easing | Usage                                |
|--------------------------|--------|--------------------------------------|
| `motionDurationShort`    | 0.25s  | Checkboxes, Switch, Hover, Popover   |
| `motionDurationModerate` | 0.4s   | Slide (Carousel), Modal, Link-Tile   |
| `motionDurationLong`     | 0.6s;  | Notifications, Flyout                |
| `motionDurationVeryLong` | 1.2s;  | Spinner, Skeleton                    |


## Easing

Effects are the key for turning components from static to interactive and keeping UI elements alive.


| Token         | Easing                         | Usage                                                                                                                 |
|---------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `$easingBase` | cubic-bezier(0.25,0.1,0.25,1) | Buttons (hover and active states).<br />Tabs or segments switching.<br />Basic fade-in and fade-out animations.       |
| `$easingIn`   | cubic-bezier(0,0,0.2,1)       | Elements that appear quickly and then ease into view.<br />Elements that slide in from off-screen and then slow down. |
| `$easingOut`  | cubic-bezier(0.4,0,0.5,1)     | Closing animations for modals or Flyouts.<br />Elements sliding out of view fast.                                     |


## Example Curves

<Playground :frameworkMarkup="motionCurvesExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionCurves />
</Playground>

## Example Moving

<Playground :frameworkMarkup="motionMovingExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionMoving />
</Playground>

## Example Enter / Exit

<Playground :frameworkMarkup="motionEnterExitExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionEnterExit />
</Playground>

## Example Expand

<Playground :frameworkMarkup="motionExpandExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionExpand />
</Playground>

## Example Show / Hide

<Playground :frameworkMarkup="motionShowHideExample" :externalStackBlitzDependencies="['styled-components']">
  <ExampleStylesMotionShowHide />
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
import {
  getStylesMotionCurvesCodeSamples,
  getStylesMotionEnterExitCodeSamples,
  getStylesMotionExpandCodeSamples,
  getStylesMotionMovingCodeSamples,
  getStylesMotionShowHideCodeSamples
} from '@porsche-design-system/shared';
import { adjustSelectedFramework } from '@/utils';
import ExampleStylesMotionCurves from '@/pages/patterns/styles/example-motion-curves.vue';
import ExampleStylesMotionMoving from '@/pages/patterns/styles/example-motion-moving.vue';
import ExampleStylesMotionEnterExit from '@/pages/patterns/styles/example-motion-enter-exit.vue';
import ExampleStylesMotionExpand from '@/pages/patterns/styles/example-motion-expand.vue';
import ExampleStylesMotionShowHide from '@/pages/patterns/styles/example-motion-show-hide.vue';

@Component({
  components: {
    ExampleStylesMotionCurves,
    ExampleStylesMotionMoving,
    ExampleStylesMotionEnterExit,
    ExampleStylesMotionExpand,
    ExampleStylesMotionShowHide
  },
})
export default class Code extends Vue {
  motionCurvesExample = getStylesMotionCurvesCodeSamples();
  motionEnterExitExample = getStylesMotionEnterExitCodeSamples();
  motionExpandExample = getStylesMotionExpandCodeSamples();
  motionMovingExample = getStylesMotionMovingCodeSamples();
  motionShowHideExample = getStylesMotionShowHideCodeSamples();

  public mounted(): void {
    adjustSelectedFramework(this.motionCurvesExample);
    adjustSelectedFramework(this.motionEnterExitExample);    
    adjustSelectedFramework(this.motionExpandExample);
    adjustSelectedFramework(this.motionMovingExample);
    adjustSelectedFramework(this.motionShowHideExample);

  }
}
</script>
