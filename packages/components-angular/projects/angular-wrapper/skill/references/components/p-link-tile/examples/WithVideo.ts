import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-link-tile href="https://porsche.com" label="Some label" description="Some Description">
        <p-tag slot="header" color="background-frosted" [compact]="true">
          Some tag
        </p-tag>
        <video poster="assets/ocean.jpg" src="assets/ocean.mp4" loop muted autoplay aria-label="Some video description"></video>
      </p-link-tile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
