# Stepper Horizontal

The `p-stepper-horizontal` displays progress through a sequence of logical and numbered steps.  
Horizontal steppers are ideal when the contents of one step depend on an earlier step.  
Avoid using long step names.  
There is a limit of 9 steps.

<TableOfContents></TableOfContents>

## Basic example

<Playground :config="config" :markup="basic"></Playground>

## Interactive example

<Playground :frameworkMarkup="codeExample" :config="config" :markup="interactive"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getStepperHorizontalCodeSamples } from '@porsche-design-system/shared';

@Component
export default class Code extends Vue {
 config = { themeable: true };
 codeExample = getStepperHorizontalCodeSamples();

  get basic() {    
    return `<p-stepper-horizontal>
  <p-stepper-horizontal-item state="complete">Step 1</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="complete">Step 2</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="current">Step 3</p-stepper-horizontal-item>
  <p-stepper-horizontal-item state="warning">Step 4</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Step 5</p-stepper-horizontal-item>
</p-stepper-horizontal>`;
  }
 // TODO: Simulate Checkout Steps
  get interactive() {    
    return `<p-stepper-horizontal>
  <p-stepper-horizontal-item>Personal details</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Enter e-mail</p-stepper-horizontal-item>
  <p-stepper-horizontal-item>Overview</p-stepper-horizontal-item>  
</p-stepper-horizontal>
${stepContent}
<p-button-group>
  <p-button
    icon="arrow-head-left"
    variant="tertiary"
    disabled=${getActiveStepIndex(steps) === 0}
  >
    Previous Step
  </p-button>
  <p-button
    variant="primary"
    disabled=${getActiveStepIndex(steps) === steps.length - 1}
  >
    Next Step
  </p-button>
</p-button-group>
`;
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
