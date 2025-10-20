import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, SelectChangeEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-dynamic',
  template: `
    <p-input-text label="Value:" name="input-value" type="text" [value]="inputValue" (input)="onChangeInput($event)" placeholder="e.g. 1"></p-input-text>
    <p-button type="button" (click)="onSetValue()" [compact]="true">Set Value</p-button>
    <p-button type="button" (click)="onResetValue()" [compact]="true">Reset value</p-button>

    <p-select name="options" label="Some Label" [value]="selectedValue" (change)="onChange($event)">
      <p-select-option *ngFor="let idx of optionIndices" [value]="(idx + 1).toString()"
        >Option {{ idx + 1 }}</p-select-option
      >
    </p-select>

    <p-button type="button" (click)="onAddOption()" [compact]="true">Add option</p-button>
    <p-button type="button" (click)="onRemoveOption()" [compact]="true">Remove last option</p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, NgForOf],
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

  onChange(e: CustomEvent<SelectChangeEventDetail>) {
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
