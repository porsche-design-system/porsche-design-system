import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { SelectUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-dynamic',
  template: `
    <label>
      Value:
      <input name="input-value" type="text" [value]="inputValue" (input)="onChangeInput($event)" placeholder="e.g. 1" />
    </label>
    <button type="button" (click)="onSetValue()">Set Value</button>
    <button type="button" (click)="onResetValue()">Reset value</button>

    <p-select name="options" label="Some Label" [value]="selectedValue" (update)="onUpdate($event)">
      <p-select-option *ngFor="let idx of optionIndices" [value]="(idx + 1).toString()"
        >Option {{ idx + 1 }}</p-select-option
      >
    </p-select>

    <button type="button" (click)="onAddOption()">Add option</button>
    <button type="button" (click)="onRemoveOption()">Remove last option</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectExampleDynamicComponent {
  selectedValue: string = '1';
  inputValue: string = '';
  optionCount: number = 3;

  get optionIndices(): number[] {
    return [...Array(this.optionCount).keys()];
  }

  onChangeInput(e: Event) {
    this.inputValue = (e.target as HTMLInputElement).value;
  }

  onSetValue() {
    this.selectedValue = this.inputValue;
  }

  onResetValue() {
    this.selectedValue = '1';
    this.inputValue = '';
  }

  onUpdate(e: CustomEvent<SelectUpdateEventDetail>) {
    this.selectedValue = e.detail.value;
    this.inputValue = e.detail.value;
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
