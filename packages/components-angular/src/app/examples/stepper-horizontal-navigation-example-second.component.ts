import { Component } from '@angular/core';
import { LabelState } from './stepper-horizontal-navigation-example-start.component';

const secondSteps: LabelState[] = [
  { label: 'One', state: 'complete' },
  { label: 'Two', state: 'complete' },
  { label: 'Three', state: 'current' },
  { label: 'Four', state: undefined },
];

@Component({
  selector: 'page-stepper-horizontal-navigation-example-second',
  template: `
    <p-stepper-horizontal size="small">
      <p-stepper-horizontal-item *ngFor="let step of steps" [state]="getState(step)">{{
        step.label
      }}</p-stepper-horizontal-item>
    </p-stepper-horizontal>
  `,
})
export class StepperHorizontalNavigationExampleSecondComponent {
  steps = secondSteps;
  getState(step: LabelState) {
    return step.state;
  }
}
