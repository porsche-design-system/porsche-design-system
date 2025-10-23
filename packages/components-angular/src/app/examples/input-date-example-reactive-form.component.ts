import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-date-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-input-date formControlName="myInputDate" [label]="'Some Label'" [required]="true" />
      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myInputDate.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myInputDate.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myInputDate.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myInputDate.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myInputDate.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myInputDate.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class InputDateExampleReactiveFormComponent {
  form = new FormGroup({
    myInputDate: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myInputDate.setValue('2025-10-24');
  }

  resetValue(): void {
    this.form.controls.myInputDate.reset('');
  }

  toggleDisabled(): void {
    const control = this.form.get('myInputDate')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
