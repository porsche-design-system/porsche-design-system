import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-select formControlName="mySelect" [label]="'Some Label'" [required]="true">
        <p-select-option value="a">Option A</p-select-option>
        <p-select-option value="b">Option B</p-select-option>
        <p-select-option value="c">Option C</p-select-option>
        <p-select-option value="d">Option D</p-select-option>
        <p-select-option value="e">Option E</p-select-option>
        <p-select-option value="f">Option F</p-select-option>
      </p-select>

      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.mySelect.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.mySelect.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.mySelect.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.mySelect.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.mySelect.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.mySelect.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class SelectExampleReactiveFormComponent {
  form = new FormGroup({
    mySelect: new FormControl<string | undefined>(
      { value: undefined, disabled: false },
      { validators: Validators.required, nonNullable: true }
    ),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.mySelect.setValue('a');
  }

  resetValue(): void {
    this.form.controls.mySelect.reset({ value: undefined, disabled: false });
  }

  toggleDisabled(): void {
    const control = this.form.get('mySelect')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
