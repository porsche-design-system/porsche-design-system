import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PorscheDesignSystemModule,
  PSelect,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
    <p-select name="hyphens" label="Select hyphens" [value]="selectedValue" (change)="onChange($event)">
      <p-select-option value="auto">style="hyphens: auto;"</p-select-option>
      <p-select-option value="manual">style="hyphens: manual;"</p-select-option>
      <p-select-option value="none">style="hyphens: none;"</p-select-option>
    </p-select>

    <p-button-tile
      label="Some label"
      description="An extra&shy;ordinarily Porsche"
      [compact]="true"
      size="inherit"
      [style]="{ maxWidth: '400px', fontSize: '45px', hyphens: selectedValue }"
      class="mt-fluid-sm"
    >
      <img src="assets/lights.jpg" alt="Some image description" />
    </p-button-tile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class ExampleComponent {
  selectedValue: PSelect['value'] = 'auto';

  onChange(e: CustomEvent<SelectChangeEventDetail>) {
    this.selectedValue = e.detail.value;
  }
}
