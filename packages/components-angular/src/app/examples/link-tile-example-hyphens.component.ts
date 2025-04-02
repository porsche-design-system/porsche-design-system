import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, SelectUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-tile-example-hyphens',
  template: `
    <p-select name="hyphens" label="Select hyphens" [value]="selectedValue" (update)="onUpdate($event)">
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
      <img src="assets/lights.jpg" alt="Some image description" />
    </p-link-tile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class LinkTileExampleHyphensComponent {
  selectedValue: string = 'auto';

  onUpdate(e: CustomEvent<SelectUpdateEventDetail>) {
    this.selectedValue = e.detail.value;
  }
}
