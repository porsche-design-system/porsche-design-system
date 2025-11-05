import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-segmented-control-example-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-fluid-sm">
      <p-segmented-control formControlName="mySegmentedControl">
        <p-segmented-control-item [value]="1">Option 1</p-segmented-control-item>
        <p-segmented-control-item [value]="2">Option 2</p-segmented-control-item>
        <p-segmented-control-item [value]="3">Option 3</p-segmented-control-item>
        <p-segmented-control-item [value]="4">Option 4</p-segmented-control-item>
        <p-segmented-control-item [value]="5">Option 5</p-segmented-control-item>
      </p-segmented-control>
      <div class="flex gap-fluid-sm">
        <p-button type="submit">Submit</p-button>
        <p-button type="reset">Reset</p-button>
      </div>
      <p-text>Last submitted data: {{ submittedValue }}</p-text>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, FormsModule, ReactiveFormsModule], // <-- PDS module is imported here
})
export class SegmentedControlExampleFormComponent {
  form = new FormGroup({
    mySegmentedControl: new FormControl<string | number | undefined>({ value: undefined, disabled: false }),
  });

  submittedValue: any = undefined;

  onSubmit(): void {
    this.submittedValue = JSON.stringify(this.form.value);
  }
}
