import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-text [style]="{'color': 'light-dark(mediumvioletred, deeppink)'}" color="inherit">
        <p-icon class="me-static-sm" color="inherit" name="highway" [aria]="{'aria-label': 'Highway icon'}"></p-icon>
        Some text
      </p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
