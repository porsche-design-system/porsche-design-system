# Stepper Horizontal

The `p-stepper-horizontal` displays progress through a sequence of logical and numbered steps.  
Horizontal steppers are ideal when the contents of one step depend on an earlier step.  
Avoid using long step names.

The component does not handle the display of your content. When using the component you have to manually take care of
the content to be rendered beneath. To help with this task, if a step is clicked, the component triggers an event called
`stepChange` with the index of the clicked step.

**Note**: Maximum of 9 steps are supported.

It is a controlled component. This means it does not contain any internal state and you got full control over its
behavior.

<TableOfContents></TableOfContents>

## Basic example

Use `p-horizontal-stepper-items` inside the `p-horizontal-stepper` component. Each item will be rendered as a step. You
have to manually manage the state of the items by setting the `state` property.

The `state` property can be set to `complete` when a step is complete, `warning` when a user has to revisit the step,
`current` for the step that is in progress and `undefined`.

If the `state` property is `undefined` the step renders as stateless and disabled.  
This can be used to prevent the user from navigating to a step which is not yet reachable. This is to be used for future
steps which cannot yet be processed at the time.

By clicking on a previous step, the `p-horizontal-stepper` emits the `stepChange` event, which contains the index of the
clicked step.

<Playground :config="config" :markup="basic"></Playground>

## Scrollable

If the amount of steps exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling.

<Playground :config="config" :markup="scrollable"></Playground>

## Framework Implementation

Below you can find an interactive example of an outlined registration process.

<Playground :frameworkMarkup="codeExample" :config="config">
  <p-stepper-horizontal ref="stepperInteractive" :theme="theme">
    <template v-for="step in steps">
      <p-stepper-horizontal-item :state="step.state">{{step.name}}</p-stepper-horizontal-item>
    </template>  
  </p-stepper-horizontal>

  <template v-for="(content, i) in stepContent">
    <p-text v-if="getActiveStepIndex(steps) === i" :theme="theme" class="mock-content">{{ content }}</p-text>
  </template>

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
  
  scrollable = `<div style="width: 600px">
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

  steps = [
    {
      state: 'current',
      name: 'Enter personal details',
    },
    {
      name: 'Confirm e-mail',
    },
    {
      name: 'Set password',
    },
  ];

  stepContent = [
    'A form with personal details could be displayed here.',
    'A form with a verification code input field could be displayed here.',
    'A form with a password input field could be displayed here.',
  ];

  getActiveStepIndex(steps) {
    return steps.findIndex((step) => step.state === 'current');
  }
  
  onNextPrevStep(direction) {
    const newState = [...this.steps];
    const activeStepIndex = this.getActiveStepIndex(newState);

    if (direction === 'next') {
      newState[activeStepIndex].state = 'complete';
      newState[activeStepIndex + 1].state = 'current';
    } else {
      delete newState[activeStepIndex].state;
      newState[activeStepIndex - 1].state = 'current';
    }

    this.steps = newState;
  }
  mounted() {   
    /* initially update accordion with open attribute in playground */
    this.registerEvents();

    /* theme switch needs to register event listeners again */
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tab => tab.addEventListener('tabChange', () => {
      this.registerEvents();
    }));
  }

  updated(){
    this.registerEvents(); 
  }

  registerEvents() {    
    this.$refs.stepperInteractive.addEventListener('stepChange', (e) => {
      const { activeStepIndex } = e.detail;

      const newState = [...this.steps];
      newState[activeStepIndex].state = 'current';
      for (let i = activeStepIndex + 1; i < newState.length; i++) {
        /* reset step state when going back via stepper horizontal item click */
        delete newState[i].state;
      }
      this.steps = newState;
    });
  }

  get theme(): Theme {
    return this.$store.getters.theme;
  }
}
</script>

<style>
  .mock-content {
    padding: 2rem;
  }
</style>
