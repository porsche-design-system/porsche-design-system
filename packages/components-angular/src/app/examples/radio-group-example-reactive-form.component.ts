import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-radio-group-example-reactive-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-radio-group formControlName="myRadioGroup" [label]="'Some Label'" [required]="true">
        <p-radio-group-option label="Option A" value="a"></p-radio-group-option>
        <p-radio-group-option label="Option B" value="b"></p-radio-group-option>
        <p-radio-group-option label="Option C" value="c"></p-radio-group-option>
        <p-radio-group-option label="Option D" value="d"></p-radio-group-option>
        <p-radio-group-option label="Option E" value="e"></p-radio-group-option>
        <p-radio-group-option label="Option F" value="f"></p-radio-group-option>
      </p-radio-group>

      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.myRadioGroup.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.myRadioGroup.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.myRadioGroup.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.myRadioGroup.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.myRadioGroup.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.myRadioGroup.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class RadioGroupExampleReactiveFormComponent {
  form = new FormGroup({
    myRadioGroup: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.myRadioGroup.setValue('a');
  }

  resetValue(): void {
    this.form.controls.myRadioGroup.reset('');
  }

  toggleDisabled(): void {
    const control = this.form.get('myRadioGroup')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
