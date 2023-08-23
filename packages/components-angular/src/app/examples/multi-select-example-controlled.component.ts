import { Component } from '@angular/core';
import type { MultiSelectUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example-controlled',
  template: `
    <p-multi-select name="options" [value]="selectedValues" (update)="handleUpdate($event)">
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
})
export class MultiSelectExampleControlledComponent {
  selectedValues: (string | number)[] = [];
  get debugText(): string {
    return `Selected values: ${this.selectedValues.join(', ') || 'none'}`;
  }

  handleUpdate(e: CustomEvent<MultiSelectUpdateEvent>) {
    this.selectedValues = e.detail.value;
  }
}
