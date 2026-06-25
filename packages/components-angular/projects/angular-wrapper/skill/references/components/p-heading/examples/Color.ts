import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-heading tag="h3" color="inherit" class="text-[deeppink]">
        The quick brown fox jumps over the lazy dog
      </p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
