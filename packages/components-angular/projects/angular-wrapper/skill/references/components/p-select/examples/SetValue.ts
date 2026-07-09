import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PInputText,
  PorscheDesignSystemModule,
  PSelect,
  SelectChangeEventDetail,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
    <div class="flex flex-col gap-fluid-sm">
      <p-input-text label="Value:" name="input-value" [value]="inputValue" (input)="onChangeInput($event)" placeholder="e.g. 1"></p-input-text>
      <div class="flex gap-fluid-sm">
        <p-button type="button" (click)="onSetValue()" [compact]="true">Set Value</p-button>
        <p-button type="button" (click)="onResetValue()" [compact]="true">Reset value</p-button>
      </div>
      <p-select name="options" label="Some Label" [value]="selectedValue" (change)="onChange($event)">
        @for (idx of optionIndices; track idx) {
          <p-select-option [value]="(idx + 1).toString()"
            >Option {{ idx + 1 }}</p-select-option
            >
          }
        </p-select>
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
  selectedValue: PSelect['value'] = '1';
  inputValue: PInputText['value'] = '';
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

  onChange(e: CustomEvent<SelectChangeEventDetail>) {
    this.selectedValue = e.detail.value;
    this.inputValue = String(e.detail.value ?? '');
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
