import { Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import type { LabelState } from './stepper-horizontal-navigation-example-start.component';

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
      @for (step of steps; track step) {
        <p-stepper-horizontal-item [state]="getState(step)">{{
          step.label
        }}</p-stepper-horizontal-item>
      }
    </p-stepper-horizontal>
    `,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class StepperHorizontalNavigationExampleSecondComponent {
  steps = secondSteps;
  getState(step: LabelState) {
    return step.state;
  }
}
