import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-checkbox formControlName="myCheckbox" [label]="'Some Label'" [required]="true" />
      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myCheckbox.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myCheckbox.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myCheckbox.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myCheckbox.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myCheckbox.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myCheckbox.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class CheckboxExampleFormComponent {
  form = new FormGroup({
    myCheckbox: new FormControl<boolean>(false, { validators: Validators.required, nonNullable: true }),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myCheckbox.setValue(true);
  }

  resetValue(): void {
    this.form.controls.myCheckbox.reset(false);
  }

  toggleDisabled(): void {
    const control = this.form.get('myCheckbox')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
