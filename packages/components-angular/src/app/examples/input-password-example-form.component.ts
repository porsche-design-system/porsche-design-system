import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-password-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-input-password formControlName="myInputPassword" [label]="'Some Label'" [required]="true" />
      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myInputPassword.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myInputPassword.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myInputPassword.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myInputPassword.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myInputPassword.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myInputPassword.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class InputPasswordExampleFormComponent {
  form = new FormGroup({
    myInputPassword: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myInputPassword.setValue('some-password');
  }

  resetValue(): void {
    this.form.controls.myInputPassword.reset('');
  }

  toggleDisabled(): void {
    const control = this.form.get('myInputPassword')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
