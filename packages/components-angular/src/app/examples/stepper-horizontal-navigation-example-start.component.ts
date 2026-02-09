import { Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

export type LabelState = {
  label: string;
  state: 'complete' | 'current' | 'warning' | undefined;
};

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
      @for (step of steps; track step) {
        <p-stepper-horizontal-item [state]="getState(step)">{{
          step.label
        }}</p-stepper-horizontal-item>
      }
    </p-stepper-horizontal>
    <p-link-pure>
      <a routerLink="/stepper-horizontal-navigation-example-second-component">to second page</a>
    </p-link-pure>
    `,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class StepperHorizontalNavigationExampleStartComponent {
  steps = startSteps;
  getState(step: LabelState) {
    return step.state;
  }
}
