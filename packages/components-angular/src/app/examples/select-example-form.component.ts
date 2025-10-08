import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-form',
  template: `
    <form [formGroup]="form">
      <p-select formControlName="select">
        <p-select-option value="a">Option A</p-select-option>
        <p-select-option value="b">Option B</p-select-option>
        <p-select-option value="c">Option C</p-select-option>
        <p-select-option value="d">Option D</p-select-option>
        <p-select-option value="e">Option E</p-select-option>
        <p-select-option value="f">Option F</p-select-option>
      </p-select>
    </form>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.select.disabled ? 'Enable' : 'Disable' }} Select
    </button>

    <button type="button" (click)="this.form.controls.select.reset({ value: undefined, disabled: false })">
        Reset
    </button>

    <button type="button" (click)="this.form.controls.select.setValue('a')">
      Set Value a
    </button>

    <pre>Touched: {{ form.controls.select.touched }}</pre>
    <pre>Dirty: {{ form.controls.select.dirty }}</pre>
    <pre>Disabled: {{ form.controls.select.disabled }}</pre>
    <pre>Value: {{ form.controls.select.value }}</pre>
    <pre>Valid: {{ form.controls.select.valid }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class SelectExampleFormComponent {
  form = new FormGroup({
    select: new FormControl<string | undefined>(
      { value: undefined, disabled: false },
      { validators: Validators.required }
    ),
  });

  toggleDisabled(): void {
    const control = this.form.get('select')!;
    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }
}
