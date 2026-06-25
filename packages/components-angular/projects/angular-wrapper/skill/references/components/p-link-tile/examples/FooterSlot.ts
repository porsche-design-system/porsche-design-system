import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="grid grid-cols-2 gap-static-md">
        <p-link-tile href="https://porsche.com" label="Some label" description="Some Description">
          <p-tag slot="header" color="background-frosted" [compact]="true">
            Some tag
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
          <p-text slot="footer">
            Some footer text
          </p-text>
        </p-link-tile>
        <p-link-tile href="https://porsche.com" label="Some label" description="Some Description" [compact]="true">
          <p-tag slot="header" color="background-frosted" [compact]="true">
            Some tag
          </p-tag>
          <img src="assets/lights.jpg" alt="Some image description" />
          <p-text slot="footer">
            Some footer text
          </p-text>
        </p-link-tile>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
