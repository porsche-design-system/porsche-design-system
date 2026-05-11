import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-required',
  template: `
    <p-checkbox label="Required" name="required" [checked]="isRequired" (update)="onChangeRequired()" />
    <p-checkbox label="Allow deselection" name="deselection" [checked]="hasDeselection" (update)="onChangeDeselection()" />

    <form (submit)="onSubmit($event)">
      <p-select name="options" label="Some Label" [required]="isRequired">
        @if (hasDeselection) {
          <p-select-option></p-select-option>
        }
        <p-select-option value="1">Option 1</p-select-option>
        <p-select-option value="2">Option 2</p-select-option>
        <p-select-option value="3">Option 3</p-select-option>
      </p-select>
      <p-button type="submit">Submit</p-button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SelectExampleRequiredComponent {
  isRequired: boolean = true;
  hasDeselection: boolean = false;
  lastSubmittedData: string = 'none';

  onChangeRequired() {
    this.isRequired = !this.isRequired;
  }

  onChangeDeselection() {
    this.hasDeselection = !this.hasDeselection;
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('options')?.toString() || 'none';
  }
}
