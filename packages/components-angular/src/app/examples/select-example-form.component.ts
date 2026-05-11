import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-fluid-sm">
      <p-select formControlName="mySelect" [label]="'Some Label'">
        <p-select-option value="a">Option A</p-select-option>
        <p-select-option value="b">Option B</p-select-option>
        <p-select-option value="c">Option C</p-select-option>
        <p-select-option value="d">Option D</p-select-option>
        <p-select-option value="e">Option E</p-select-option>
        <p-select-option value="f">Option F</p-select-option>
      </p-select>
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
export class SelectExampleFormComponent {
  form = new FormGroup({
    mySelect: new FormControl<string | undefined>({ value: undefined, disabled: false }),
  });

  submittedValue: any = undefined;

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
