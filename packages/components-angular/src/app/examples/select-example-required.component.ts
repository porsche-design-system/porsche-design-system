import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-select-example-required',
  template: `
    <label>
      <input type="checkbox" name="required" [checked]="isRequired" (change)="onChangeRequired()" />
      Required
    </label>
    <label>
      <input type="checkbox" name="deselection" [checked]="hasDeselection" (change)="onChangeDeselection()" />
      Allow deselection
    </label>

    <form (submit)="onSubmit($event)">
      <p-select name="options" label="Some Label" [required]="isRequired">
        <p-select-option *ngIf="hasDeselection"></p-select-option>
        <p-select-option value="1">Option 1</p-select-option>
        <p-select-option value="2">Option 2</p-select-option>
        <p-select-option value="3">Option 3</p-select-option>
      </p-select>
      <button type="submit">Submit</button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
