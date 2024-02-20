import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { MultiSelectUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example-controlled',
  template: `
    <p-multi-select name="options" label="Some Label" [value]="selectedValues" (update)="onUpdate($event)">
      <p-multi-select-option value="a">Option A</p-multi-select-option>
      <p-multi-select-option value="b">Option B</p-multi-select-option>
      <p-multi-select-option value="c">Option C</p-multi-select-option>
      <p-multi-select-option value="d">Option D</p-multi-select-option>
      <p-multi-select-option value="e">Option E</p-multi-select-option>
      <p-multi-select-option value="f">Option F</p-multi-select-option>
    </p-multi-select>
    <button type="submit">Submit</button>

    <p>{{ debugText }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectExampleControlledComponent {
  selectedValues: string[] = [];
  get debugText(): string {
    return `Selected values: ${this.selectedValues.join(', ') || 'none'}`;
  }

  onUpdate(e: CustomEvent<MultiSelectUpdateEventDetail>) {
    this.selectedValues = e.detail.value;
  }
}
