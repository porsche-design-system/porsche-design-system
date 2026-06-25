import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-display tag="h3">
        The quick brown fox jumps over the lazy dog
      </p-display>

      <p-display>
        <h3>
          The quick brown fox jumps over the lazy dog
        </h3>
      </p-display>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
