import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-tabs-bar>
        <a href="https://porsche.com/page-1">
          Page One
        </a>
        <a href="https://porsche.com/page-2">
          Page Two
        </a>
        <a href="https://porsche.com/page-3">
          Page Three
        </a>
      </p-tabs-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
