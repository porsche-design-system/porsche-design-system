import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, SelectChangeEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-tile-example-hyphens',
  template: `
    <p-select name="hyphens" label="Select hyphens" [value]="selectedValue" (change)="onChange($event)">
      <p-select-option value="auto">style="hyphens: auto;"</p-select-option>
      <p-select-option value="manual">style="hyphens: manual;"</p-select-option>
      <p-select-option value="none">style="hyphens: none;"</p-select-option>
    </p-select>

    <p-link-tile
      href="https://porsche.com"
      label="Some label"
      description="An extra&shy;ordinarily Porsche"
      [compact]="true"
      size="inherit"
      [style]="{ maxWidth: '400px', fontSize: '45px', hyphens: selectedValue }"
    >
      <img src="http://localhost:3002/lights.jpg" alt="Some image description" />
    </p-link-tile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class LinkTileExampleHyphensComponent {
  selectedValue: string = 'auto';

  onChange(e: CustomEvent<SelectChangeEventDetail>) {
    this.selectedValue = e.detail.value;
  }
}
