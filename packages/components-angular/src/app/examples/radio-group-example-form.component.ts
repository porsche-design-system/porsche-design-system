import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-radio-group-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-fluid-sm">
      <p-radio-group formControlName="myRadioGroup" [label]="'Some Label'">
        <p-radio-group-option label="Option A" value="a"></p-radio-group-option>
        <p-radio-group-option label="Option B" value="b"></p-radio-group-option>
        <p-radio-group-option label="Option C" value="c"></p-radio-group-option>
        <p-radio-group-option label="Option D" value="d"></p-radio-group-option>
        <p-radio-group-option label="Option E" value="e"></p-radio-group-option>
        <p-radio-group-option label="Option F" value="f"></p-radio-group-option>
      </p-radio-group>
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
export class RadioGroupExampleFormComponent {
  form = new FormGroup({
    myRadioGroup: new FormControl<string>(''),
  });

  submittedValue: any = undefined;

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
