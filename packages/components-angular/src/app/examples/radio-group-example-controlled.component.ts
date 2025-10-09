import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, RadioGroupChangeEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-radio-group-example-controlled',
  template: `
    <p-radio-group name="options" label="Some Label" [value]="selectedValue" (change)="onChange($event)">
      <p-radio-group-option label="Option A" value="a"></p-radio-group-option>
      <p-radio-group-option label="Option B" value="b"></p-radio-group-option>
      <p-radio-group-option label="Option C" value="c"></p-radio-group-option>
      <p-radio-group-option label="Option D" value="d"></p-radio-group-option>
      <p-radio-group-option label="Option E" value="e"></p-radio-group-option>
      <p-radio-group-option label="Option F" value="f"></p-radio-group-option>
    </p-radio-group>

    <p-text>{{ debugText }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class RadioGroupExampleControlledComponent {
  selectedValue: string = 'a';
  get debugText(): string {
    return `Selected value: ${this.selectedValue}`;
  }

  onChange(e: CustomEvent<RadioGroupChangeEventDetail>) {
    const input = e.target as HTMLInputElement;
    this.selectedValue = input.value;
  }
}
