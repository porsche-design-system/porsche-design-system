import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-fluid-sm">
      <p-multi-select formControlName="myMultiSelect" [label]="'Some Label'" >
        <p-multi-select-option value="a">Option A</p-multi-select-option>
        <p-multi-select-option value="b">Option B</p-multi-select-option>
        <p-multi-select-option value="c">Option C</p-multi-select-option>
        <p-multi-select-option value="d">Option D</p-multi-select-option>
        <p-multi-select-option value="e">Option E</p-multi-select-option>
        <p-multi-select-option value="f">Option F</p-multi-select-option>
      </p-multi-select>
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
export class MultiSelectExampleFormComponent {
  form = new FormGroup({
    myMultiSelect: new FormControl<string[]>([]),
  });

  submittedValue: any = undefined;

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
