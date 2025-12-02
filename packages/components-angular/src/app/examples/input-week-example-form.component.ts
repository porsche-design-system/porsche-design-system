import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-week-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-fluid-sm">
      <p-input-week formControlName="myInputWeek" [label]="'Some Label'" />
      <div class="flex gap-fluid-sm">
        <p-button type="submit">Submit</p-button>
        <p-button type="reset">Reset</p-button>
      </div>
      <p-text>Last submitted data: {{ submittedValue }}</p-text>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class InputWeekExampleFormComponent {
  form = new FormGroup({
    myInputWeek: new FormControl<string>(''),
  });

  submittedValue: any = undefined;

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
