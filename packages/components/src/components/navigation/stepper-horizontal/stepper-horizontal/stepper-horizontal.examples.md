# Stepper Horizontal

The `p-stepper-horizontal` displays progress through a sequence of logical and numbered steps.  
Horizontal steppers are ideal when the contents of one step depend on an earlier step.  
Avoid using long step names.

The component does not handle the display of your content. If you use the component you have to manually care for the
content to be rendered beneath. To help with this task, if a step is clicked the component triggers an event
called `stepChange` with the index of the clicked step.

**Note**: Maximum of 9 steps are supported.

It is a controlled component. This means it does not contain any internal state, and you got full control over its
behavior.

<TableOfContents></TableOfContents>

## Basic example

Use `p-horizontal-stepper-items` inside the `p-horizontal-stepper` component. Each item will be rendered as step. You
have to manually manage the state of the items by setting the `state` property.

The `state` property can be set to `complete` when a step is complete, `warning` when a user has to revisit the
step, `current` the step that is in progress and `undefined`.

If the `state` property is undefined the step is rendered as stateless and disabled. This is to be used for future steps
which cannot yet be processed at the time, but only after the previous step has been completed.

By clicking on a previous step, the `p-horizontal-stepper` emits the `stepChange` event, which contains the index of the
clicked step.

<Playground :config="config" :markup="basic"></Playground>

## Scrollable

If the amount of steps exceeds the viewport, the component renders arrow-buttons to help with horizontal scrolling.

<Playground :config="config" :markup="scrollable"></Playground>

## Interactive example

<Playground :frameworkMarkup="codeExample" :config="config" :markup="interactive"></Playground>

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
  <p-stepper-horizontal-item>Step 5</p-stepper-horizontal-item>
</p-stepper-horizontal>`

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
</div>`

 // TODO: Simulate Checkout Steps
  get interactive() {    
    return `<p-stepper-horizontal>
  <p-stepper-horizontal-item>Personal details</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Enter e-mail</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Overview</p-stepper-horizontal-item>  
</p-stepper-horizontal>
<p-text>Some Content</p-text>
<p-button-group>
  <p-button
    icon="arrow-head-left"
    variant="tertiary"
  >
    Previous Step
  </p-button>
  <p-button
    variant="primary"
  >
    Next Step
  </p-button>
</p-button-group>`;
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
    const stepperHorizontals = this.$el.querySelectorAll('.playground .demo p-stepper-horizontal');
    stepperHorizontals.forEach(stepperEl => stepperEl.addEventListener('stepChange', (e) => (console.log(e))));
  }

}
</script>
