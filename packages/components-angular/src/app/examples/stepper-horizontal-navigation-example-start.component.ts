import { Component } from '@angular/core';

export interface LabelState {
  label: string;
  state: 'complete' | 'current' | 'warning' | undefined;
}

export const startSteps: LabelState[] = [
  { label: 'One', state: 'complete' },
  { label: 'Two', state: 'current' },
  { label: 'Three', state: undefined },
  { label: 'Four', state: undefined },
];

@Component({
  selector: 'page-stepper-horizontal-navigation-example-start',
  template: `
    <p-stepper-horizontal size="small">
      <p-stepper-horizontal-item *ngFor="let step of steps" [state]="getState(step)">{{
        step.label
      }}</p-stepper-horizontal-item>
    </p-stepper-horizontal>
    <p-link-pure>
      <a routerLink="/stepper-horizontal-navigation-example-second-component">to second page</a>
    </p-link-pure>
  `,
})
export class StepperHorizontalNavigationExampleStartComponent {
  steps = startSteps;
  getState(step: LabelState) {
    return step.state;
  }
}
