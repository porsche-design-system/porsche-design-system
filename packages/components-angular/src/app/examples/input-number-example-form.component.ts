import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-number-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-input-number formControlName="myInputNumber" [label]="'Some Label'" [required]="true" />
      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myInputNumber.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myInputNumber.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myInputNumber.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myInputNumber.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myInputNumber.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myInputNumber.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class InputNumberExampleFormComponent {
  form = new FormGroup({
    myInputNumber: new FormControl<number | undefined>(
      { value: undefined, disabled: false },
      { validators: Validators.required, nonNullable: true }
    ),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myInputNumber.setValue(123456);
  }

  resetValue(): void {
    this.form.controls.myInputNumber.reset({ value: undefined, disabled: false });
  }

  toggleDisabled(): void {
    const control = this.form.get('myInputNumber')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
