import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-model-signature [safeZone]="false" class="[--p-model-signature-width:auto]">
        <video poster="assets/ocean.jpg" src="assets/ocean.mp4" autoplay playsinline loop muted></video>
      </p-model-signature>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
