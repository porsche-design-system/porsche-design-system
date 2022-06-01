import { Component } from '@angular/core';
import type { StepChangeEvent, StepperState } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-stepper-horizontal-example',
  template: `
    <p-stepper-horizontal (stepChange)="onStepChange($event)">
      <ng-container *ngFor="let step of steps">
        <p-stepper-horizontal-item [state]="step.state">
          {{ step.name }}
        </p-stepper-horizontal-item>
      </ng-container>
    </p-stepper-horizontal>

    <ng-container *ngFor="let content of stepContent; let i = index">
      <p-text *ngIf="getActiveStepIndex(steps) === i">Your content of Step {{ content }}</p-text>
    </ng-container>

    <p-button-group>
      <p-button
        [icon]="'arrow-head-left'"
        [variant]="'tertiary'"
        [disabled]="getActiveStepIndex(steps) === 0"
        (click)="onNextPrevStep('prev')"
      >
        Previous Step
      </p-button>

      <p-button
        [variant]="'primary'"
        [disabled]="getActiveStepIndex(steps) === steps.length - 1"
        (click)="onNextPrevStep('next')"
      >
        Next Step
      </p-button>
    </p-button-group>
  `,
})
export class StepperHorizontalExampleComponent {
  steps: StepperHorizontalItemProps[] = [
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

  stepContent: string[] = ['One', 'Two', 'Three'];

  getActiveStepIndex(steps: StepperHorizontalItemProps[]) {
    return steps.findIndex((step) => step.state === 'current');
  }

  onNextPrevStep(direction: 'next' | 'prev') {
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

  onStepChange(e: CustomEvent<StepChangeEvent>) {
    const { activeStepIndex } = e.detail;

    const newState = [...this.steps];
    newState[activeStepIndex].state = 'current';
    for (let i = activeStepIndex + 1; i < newState.length; i++) {
      // reset step state when going back via stepper horizontal item click
      delete newState[i].state;
    }

    this.steps = newState;
  }
}

type StepperHorizontalItemProps = {
  state?: StepperState;
  name: string;
};
