import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-tel-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-input-tel formControlName="myInputTel" [label]="'Some Label'" [required]="true" />
      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myInputTel.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myInputTel.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myInputTel.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myInputTel.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myInputTel.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myInputTel.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class InputTelExampleFormComponent {
  form = new FormGroup({
    myInputTel: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myInputTel.setValue('0123 4567890');
  }

  resetValue(): void {
    this.form.controls.myInputTel.reset('');
  }

  toggleDisabled(): void {
    const control = this.form.get('myInputTel')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
