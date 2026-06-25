import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MultiSelectChangeEventDetail,
  type PMultiSelectProps,
  PorscheDesignSystemModule,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
  <div class="flex flex-col gap-fluid-sm">
    <p-input-text
      label="Value:"
      name="input-value"
      type="text"
      [value]="inputValue"
      (input)="onChangeInput($event)"
      placeholder="e.g. 1,2"
    ></p-input-text>
    <div class="flex gap-fluid-sm">
      <p-button type="button" (click)="onSetValue()" [compact]="true">Set Value</p-button>
      <p-button type="button" (click)="onResetValue()" [compact]="true">Reset value</p-button>
    </div>
    <p-multi-select name="options" label="Some Label" [value]="selectedValues" (change)="onChange($event)">
      @for (idx of optionIndices; track idx) {
        <p-multi-select-option [value]="(idx + 1).toString()"
          >Option {{ idx + 1 }}</p-multi-select-option
          >
        }
      </p-multi-select>
      <div class="flex gap-fluid-sm">  
        <p-button type="button" (click)="onAddOption()" [compact]="true">Add option</p-button>
        <p-button type="button" (click)="onRemoveOption()" [compact]="true">Remove last option</p-button>
      </div>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class ExampleComponent {
  selectedValues: PMultiSelectProps['value'] = [];
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

  onChange(e: CustomEvent<MultiSelectChangeEventDetail>) {
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
