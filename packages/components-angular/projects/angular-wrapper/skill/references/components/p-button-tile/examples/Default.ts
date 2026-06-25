import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button-tile label="Some label" description="Some Description" [gradient]="true">
        <p-tag slot="header" color="background-frosted" [compact]="true">
          Some tag
        </p-tag>
        <img src="assets/lights.jpg" alt="Some image description" />
        <p-text slot="footer">
          Some footer text
        </p-text>
      </p-button-tile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
