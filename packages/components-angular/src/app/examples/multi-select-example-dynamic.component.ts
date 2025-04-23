import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MultiSelectUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-multi-select-example-dynamic',
  template: `
    <p-text-field-wrapper label="Value:">
      <input
        name="input-value"
        type="text"
        [value]="inputValue"
        (input)="onChangeInput($event)"
        placeholder="e.g. 1,2"
      />
    </p-text-field-wrapper>
    <p-button type="button" (click)="onSetValue()" [compact]="true">Set Value</p-button>
    <p-button type="button" (click)="onResetValue()" [compact]="true">Reset value</p-button>

    <p-multi-select name="options" label="Some Label" [value]="selectedValues" (update)="onUpdate($event)">
      <p-multi-select-option *ngFor="let idx of optionIndices" [value]="(idx + 1).toString()"
        >Option {{ idx + 1 }}</p-multi-select-option
      >
    </p-multi-select>

    <p-button type="button" (click)="onAddOption()" [compact]="true">Add option</p-button>
    <p-button type="button" (click)="onRemoveOption()" [compact]="true">Remove last option</p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, NgFor],
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

  onUpdate(e: CustomEvent<MultiSelectUpdateEventDetail>) {
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
