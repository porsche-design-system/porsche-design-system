import { ChangeDetectionStrategy, Component } from '@angular/core';
import type {
  StepperHorizontalUpdateEventDetail,
  StepperHorizontalItemState,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-stepper-horizontal-example',
  template: `
    <p-stepper-horizontal (update)="onUpdate($event)">
      <ng-container *ngFor="let step of steps">
        <p-stepper-horizontal-item [state]="step.state">
          {{ step.name }}
        </p-stepper-horizontal-item>
      </ng-container>
    </p-stepper-horizontal>

    <ng-container *ngFor="let content of stepContent; let i = index">
      <p-text *ngIf="getActiveStepIndex(steps) === i">{{ content }}</p-text>
    </ng-container>

    <p-button-group>
      <p-button
        type="button"
        [icon]="'arrow-head-left'"
        [variant]="'tertiary'"
        [disabled]="getActiveStepIndex(steps) === 0"
        (click)="onNextPrevStep('prev')"
      >
        Previous Step
      </p-button>

      <p-button
        type="button"
        [variant]="'primary'"
        [disabled]="getActiveStepIndex(steps) === steps.length - 1"
        (click)="onNextPrevStep('next')"
      >
        Next Step
      </p-button>
    </p-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperHorizontalExampleComponent {
  steps: StepperHorizontalItemProps[] = [
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

  stepContent: string[] = [
    'A form with personal details could be displayed here.',
    'A form with a verification code input field could be displayed here.',
    'A form with a password input field could be displayed here.',
  ];

  getActiveStepIndex(steps: StepperHorizontalItemProps[]): number {
    return steps.findIndex((step) => step.state === 'current');
  }

  onNextPrevStep(direction: 'next' | 'prev'): void {
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

  onUpdate(e: CustomEvent<StepperHorizontalUpdateEventDetail>): void {
    const { activeStepIndex } = e.detail;

    const newState = [...this.steps];
    for (let i = activeStepIndex + 1; i < newState.length; i++) {
      // reset step state when going back via stepper horizontal item click
      delete newState[i].state;
    }
    newState[activeStepIndex].state = 'current';

    this.steps = newState;
  }
}

type StepperHorizontalItemProps = {
  state?: StepperHorizontalItemState;
  name: string;
};
