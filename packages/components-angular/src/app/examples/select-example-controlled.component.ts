import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, SelectUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-controlled',
  template: `
    <p-select name="options" label="Some Label" [value]="selectedValue" (update)="onUpdate($event)">
      <p-select-option value="a">Option A</p-select-option>
      <p-select-option value="b">Option B</p-select-option>
      <p-select-option value="c">Option C</p-select-option>
      <p-select-option value="d">Option D</p-select-option>
      <p-select-option value="e">Option E</p-select-option>
      <p-select-option value="f">Option F</p-select-option>
    </p-select>

    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SelectExampleControlledComponent {
  selectedValue: string = 'a';
  get debugText(): string {
    return `Selected value: ${this.selectedValue}`;
  }

  onUpdate(e: CustomEvent<SelectUpdateEventDetail>) {
    this.selectedValue = e.detail.value;
  }
}
