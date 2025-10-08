import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MultiSelectChangeEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example-controlled',
  template: `
    <p-multi-select name="options" label="Some Label" [value]="selectedValues" (change)="onChange($event)">
      <p-multi-select-option value="a">Option A</p-multi-select-option>
      <p-multi-select-option value="b">Option B</p-multi-select-option>
      <p-multi-select-option value="c">Option C</p-multi-select-option>
      <p-multi-select-option value="d">Option D</p-multi-select-option>
      <p-multi-select-option value="e">Option E</p-multi-select-option>
      <p-multi-select-option value="f">Option F</p-multi-select-option>
    </p-multi-select>

    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class MultiSelectExampleControlledComponent {
  selectedValues: string[] = [];
  get debugText(): string {
    return `Selected values: ${this.selectedValues.join(', ') || 'none'}`;
  }

  onChange(e: CustomEvent<MultiSelectChangeEventDetail>) {
    this.selectedValues = e.detail.value;
  }
}
