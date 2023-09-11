# Stepper Horizontal

The `p-stepper-horizontal` component displays progress through a sequence of logical and numbered steps.  
It is ideal when the contents of one step depends on an earlier step.  
Avoid using long step names.

The component does not handle the display of your content. When using the component you have to manually take care of
the content to be rendered beneath. To help with this task, if a step is clicked, the component triggers an event called
`change` with the index of the clicked step.

**Note**: Maximum of 9 steps are supported.

It is a controlled component. This means it does not contain any internal state and you got full control over its
behavior.

<TableOfContents></TableOfContents>

## Basic example

Use `p-stepper-horizontal-item`s inside the `p-stepper-horizontal` component. Each item will be rendered as a step. You
have to manually manage the state of the items by setting the `state` property.

The `state` property can be set to `complete` when a step is complete, `warning` when a user has to revisit the step,
`current` for the step that is in progress and `undefined`.

If the `state` property is `undefined` the step renders as stateless and disabled.  
This can be used to prevent the user from navigating to a step which is not yet reachable. This is to be used for future
steps which cannot yet be processed at the time.

By clicking on a previous step, the `p-stepper-horizontal` emits the `update` event, which contains the index of the
clicked step.

<Notification heading="Deprecation hint" state="warning">
  The <code>stepChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

<Playground :config="config" :markup="basic"></Playground>

## Size

You can set the `size` property of the component which is breakpoint customizable.

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
</Playground>

## Scrollable

If the amount of steps exceeds the viewport, the component renders arrow buttons to help with horizontal scrolling.

<Playground :config="config" :markup="scrollable"></Playground>

## Framework Implementation

Below you can find an interactive example of an outlined registration process.

<Playground :frameworkMarkup="codeExample" :config="config">
  <p-stepper-horizontal :theme="theme" @update="onUpdate">    
    <p-stepper-horizontal-item v-for="({ state, text }, i) in steps" :key="i" :state="state">{{ text }}</p-stepper-horizontal-item>
  </p-stepper-horizontal>
  <p-text :theme="theme" class="mock-content">{{ stepContent[getActiveStepIndex(steps)] }}</p-text>

  <p-button-group>
    <p-button
      icon="arrow-head-left"
      variant="tertiary"
      :disabled="getActiveStepIndex(steps) === 0"
      :theme="theme"
      @click="onNextPrevStep('prev')"
    >
      Previous Step
    </p-button>
    <p-button
      variant="primary"
      :disabled="getActiveStepIndex(steps) === steps.length - 1"
      :theme="theme"
      @click="onNextPrevStep('next')"
    >
      Next Step
    </p-button>
  </p-button-group>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStepperHorizontalCodeSamples } from '@porsche-design-system/shared';
import type { Theme } from '@/models';
import { STEPPER_HORIZONTAL_SIZES } from './stepper-horizontal-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };

  codeExample = getStepperHorizontalCodeSamples();
  
  basic = `<p-stepper-horizontal>
  <p-stepper-horizontal-item state="complete">Step 1</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="warning">Step 2</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="current">Step 3</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 4</p-stepper-horizontal-item>
</p-stepper-horizontal>`;

  size = 'small';
  sizes = [...STEPPER_HORIZONTAL_SIZES, "{ base: 'small', l: 'medium' }"];
  get sizeMarkup() {
    return `<p-stepper-horizontal size="${this.size}">
  <p-stepper-horizontal-item state="complete">Step 1</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="warning">Step 2</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="current">Step 3</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 4</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 5</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 6</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 7</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 8</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 9</p-stepper-horizontal-item>
</p-stepper-horizontal>`;
  }

  scrollable = `<div style="max-width: 600px">
  <p-stepper-horizontal>
    <p-stepper-horizontal-item state="complete">Step 1</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 2</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 3</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 4</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 5</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="current">Step 6</p-stepper-horizontal-item>
    <p-stepper-horizontal-item>Step 7</p-stepper-horizontal-item>
    <p-stepper-horizontal-item>Step 8</p-stepper-horizontal-item>
    <p-stepper-horizontal-item>Step 9</p-stepper-horizontal-item>
  </p-stepper-horizontal>
</div>`;

  steps: { state: string; text: string; }[] = [
    { state: 'current', text: 'Enter personal details' }, 
    { state: undefined, text: 'Confirm e-mail' }, 
    { state: undefined, text: 'Set password' },
  ];

  stepContent = [
    'A form with personal details could be displayed here.',
    'A form with a verification code input field could be displayed here.',
    'A form with a password input field could be displayed here.',
  ];

  getActiveStepIndex(steps): number {
    return steps.findIndex((step) => step.state === 'current');
  }

  onNextPrevStep(direction): void {
    const activeStepIndex = this.getActiveStepIndex(this.steps);

    if (direction === 'next') {
      this.steps[activeStepIndex].state = 'complete';
      this.steps[activeStepIndex + 1].state = 'current';
    } else {
      this.steps[activeStepIndex].state = undefined;
      this.steps[activeStepIndex - 1].state = 'current';
    }
  }

  onUpdate(e): void {
    const { activeStepIndex } = e.detail;
    for (let i = activeStepIndex + 1; i < this.steps.length; i++) {
      /* reset step state when going back via stepper horizontal item click */
      this.steps[i].state = undefined;
    }
    this.steps[activeStepIndex].state = 'current';
  }

  get theme(): Theme {
    return this.$store.getters.theme;
  }
}
</script>

<style scoped lang="scss">
  .mock-content {
    margin: 2rem 0;
  }
</style>
