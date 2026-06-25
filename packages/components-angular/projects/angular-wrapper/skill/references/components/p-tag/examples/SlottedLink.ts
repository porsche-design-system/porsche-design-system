import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="flex flex-wrap gap-static-md">
        <p-tag icon="car" variant="primary">
          <a href="https://porsche.com">
            Variant primary
          </a>
        </p-tag>
        <p-tag variant="secondary">
          <a href="https://porsche.com">
            Variant secondary
          </a>
        </p-tag>
        <p-tag variant="info">
          <a href="https://porsche.com">
            Variant info
          </a>
        </p-tag>
        <p-tag variant="warning">
          <a href="https://porsche.com">
            Variant warning
          </a>
        </p-tag>
        <p-tag variant="success">
          <a href="https://porsche.com">
            Variant success
          </a>
        </p-tag>
        <p-tag variant="error">
          <a href="https://porsche.com">
            Variant error
          </a>
        </p-tag>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
