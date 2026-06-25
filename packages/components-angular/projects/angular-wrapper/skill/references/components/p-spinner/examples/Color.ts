import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-text [style]="{'color': 'light-dark(mediumvioletred, deeppink)'}" color="inherit">
        <p-spinner class="me-static-sm" color="inherit" [aria]="{'aria-label': 'Loading page content'}"></p-spinner>
        Some text
      </p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
