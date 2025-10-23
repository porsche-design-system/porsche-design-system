import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-email-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-input-email formControlName="myInputEmail" [label]="'Some Label'" [required]="true" />
      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myInputEmail.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myInputEmail.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myInputEmail.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myInputEmail.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myInputEmail.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myInputEmail.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class InputEmailExampleReactiveFormComponent {
  form = new FormGroup({
    myInputEmail: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myInputEmail.setValue('example@mail.com');
  }

  resetValue(): void {
    this.form.controls.myInputEmail.reset('');
  }

  toggleDisabled(): void {
    const control = this.form.get('myInputEmail')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
