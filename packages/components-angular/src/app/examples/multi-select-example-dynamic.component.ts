import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { MultiSelectUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example-dynamic',
  template: `
    <label>
      Value:
      <input
        name="input-value"
        type="text"
        [value]="inputValue"
        (input)="onChangeInput($event)"
        placeholder="e.g. 1,2"
      />
    </label>
    <button type="button" (click)="onSetValue()">Set Value</button>
    <button type="button" (click)="onResetValue()">Reset value</button>

    <p-multi-select name="options" label="Some Label" [value]="selectedValues" (update)="handleUpdate($event)">
      <p-multi-select-option *ngFor="let idx of optionIndices" [value]="(idx + 1).toString()"
        >Option {{ idx + 1 }}</p-multi-select-option
      >
    </p-multi-select>

    <button type="button" (click)="onAddOption()">Add option</button>
    <button type="button" (click)="onRemoveOption()">Remove last option</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectExampleDynamicComponent {
  selectedValues: string[] = [];
  inputValue: string = '';
  optionCount: number = 3;

  get optionIndices(): number[] {
    return [...Array(this.optionCount).keys()];
  }

  onChangeInput(e: Event) {
    this.inputValue = (e.target as HTMLInputElement).value;
  }

  onSetValue() {
    this.selectedValues = this.inputValue.split(',');
  }

  onResetValue() {
    this.selectedValues = [];
    this.inputValue = '';
  }

  handleUpdate(e: CustomEvent<MultiSelectUpdateEvent>) {
    this.selectedValues = e.detail.value;
    this.inputValue = e.detail.value.join(',');
  }

  onAddOption() {
    this.optionCount += 1;
  }

  onRemoveOption() {
    if (this.optionCount > 0) {
      this.optionCount -= 1;
    }
  }
}
