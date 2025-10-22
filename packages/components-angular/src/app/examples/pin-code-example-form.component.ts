import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-pin-code-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-pin-code formControlName="myPinCode" [label]="'Some Label'" [required]="true" />

      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myPinCode.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myPinCode.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myPinCode.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myPinCode.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myPinCode.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myPinCode.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class PinCodeExampleFormComponent {
  form = new FormGroup({
    myPinCode: new FormControl<string>(
      { value: '', disabled: false },
      { validators: Validators.required, nonNullable: true }
    ),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myPinCode.setValue('1234');
  }

  resetValue(): void {
    this.form.controls.myPinCode.reset({ value: '', disabled: false });
  }

  toggleDisabled(): void {
    const control = this.form.get('myPinCode')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
