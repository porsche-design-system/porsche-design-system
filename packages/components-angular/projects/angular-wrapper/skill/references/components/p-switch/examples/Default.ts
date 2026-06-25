import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type SwitchUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-switch [checked]="checked" (update)="onUpdate($event)">
        Some label
      </p-switch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  checked = false;

  onUpdate(e: CustomEvent<SwitchUpdateEventDetail>) {
    this.checked = e.detail.checked;
  }
}
