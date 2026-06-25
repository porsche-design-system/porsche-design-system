import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-model-signature color="inherit" class="text-info"></p-model-signature>

      <p-model-signature class="[--p-model-signature-width:auto] [--p-model-signature-height:50px] block"></p-model-signature>

      <p-model-signature class="[--p-model-signature-width:50px] [--p-model-signature-height:auto] block"></p-model-signature>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
