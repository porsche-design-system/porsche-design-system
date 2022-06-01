# Stepper Horizontal

The `p-stepper-horizontal` displays progress through a sequence of logical and numbered steps.  
Horizontal steppers are ideal when the contents of one step depend on an earlier step.  
Avoid using long step names.

The component does not handle the display of your content. If you use the component you have to manually take care of
the content to be rendered beneath. To help with this task, if a step is clicked the component triggers an event called
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

## Interactive example

<Playground :frameworkMarkup="codeExample" :config="config">
  <p-stepper-horizontal id="stepper-interactive">
    <p-stepper-horizontal-item state="current">Personal details</p-stepper-horizontal-item>
    <p-stepper-horizontal-item>Enter e-mail</p-stepper-horizontal-item>
    <p-stepper-horizontal-item>Overview</p-stepper-horizontal-item>  
  </p-stepper-horizontal>
  <p-text>Some Content</p-text>
  <p-button-group>
    <p-button
      icon="arrow-head-left"
      variant="tertiary"
      disabled="${this.getActiveStepIndex(this.steps) === 0}"
      @click="this.onNextPrevStep('prev')"
    >
      Previous Step
    </p-button>
    <p-button
      variant="primary"
      disabled="${this.getActiveStepIndex(this.steps) === this.steps.length - 1}"
      @click="onNextPrevStep('next')"
    >
      Next Step
    </p-button>
</p-button-group>
</Playground>

### <A11yIcon></A11yIcon> Accessibility hints

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStepperHorizontalCodeSamples } from '@porsche-design-system/shared';

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
      name: 'Personal details',
    },
    {
      name: 'Enter e-mail',
    },
    {
      name: 'Overview',
    },
  ];

  stepContent = ['One', 'Two', 'Three'];

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

  getActiveStepIndex(){
    return 0;
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
    const stepperHorizontal = this.$el.querySelector('.playground .demo #stepper-interactive');
    stepperHorizontal.addEventListener('stepChange', (e) => {
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
}
</script>
