import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-text class="text-[48px]" size="inherit">
        <p-icon class="me-static-sm" size="inherit" name="highway" [aria]="{'aria-label': 'Highway icon'}"></p-icon>
        Some text
      </p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
