import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <h1 class="prose-heading-sm">Test</h1>
      <p-button>Test</p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PorscheDesignSystemModule],
})
export class ExampleComponent {}
