import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-segmented-control-example-reactive-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <p-segmented-control formControlName="mySegmentedControl">
        <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
        <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
        <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
        <p-segmented-control-item [value]="4">Option 4</p-segmented-control-item>
        <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
      </p-segmented-control>

      <button type="submit">Submit</button>
    </form>

    <button type="button" (click)="setValue()">
      Set Value
    </button>

    <button type="button" (click)="resetValue()">
      Reset
    </button>

    <button type="button" (click)="toggleDisabled()">
      {{ form.controls.mySegmentedControl.disabled ? 'Enable' : 'Disable' }}
    </button>

    <div>Touched: <span data-field="touched">{{ form.controls.mySegmentedControl.touched }}</span></div>
    <div>Dirty: <span data-field="dirty">{{ form.controls.mySegmentedControl.dirty }}</span></div>
    <div>Disabled: <span data-field="disabled">{{ form.controls.mySegmentedControl.disabled }}</span></div>
    <div>Value: <span data-field="value">{{ form.controls.mySegmentedControl.value }}</span></div>
    <div>Valid: <span data-field="valid">{{ form.controls.mySegmentedControl.valid }}</span></div>
    <div [@if]="submittedValue !== undefined">Submitted: <span data-field="submitted">{{ submittedValue }}</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class SegmentedControlExampleReactiveFormComponent {
  form = new FormGroup({
    mySegmentedControl: new FormControl<string | number | undefined>(
      { value: undefined, disabled: false },
      { validators: Validators.required, nonNullable: true }
    ),
  });

  submittedValue: any = undefined;

  setValue(): void {
    this.form.controls.mySegmentedControl.setValue(1);
  }

  resetValue(): void {
    this.form.controls.mySegmentedControl.reset({ value: undefined, disabled: false });
  }

  toggleDisabled(): void {
    const control = this.form.get('mySegmentedControl')!;
    control.disabled ? control.enable() : control.disable();
  }

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
