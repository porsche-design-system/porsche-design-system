import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="isolate bg-[#00aa3680] inline-block p-static-lg">
        <p-model-signature color="contrast-medium" [safeZone]="false" class="mix-blend-overlay"></p-model-signature>
      </div>

      <div class="isolate bg-[#f2f2f280] inline-block p-static-lg">
        <p-model-signature color="contrast-medium" [safeZone]="false" class="mix-blend-overlay"></p-model-signature>
      </div>

      <div class="isolate bg-[#1f1f1f80] inline-block p-static-lg">
        <p-model-signature color="contrast-medium" [safeZone]="false" class="mix-blend-overlay"></p-model-signature>
      </div>

      <div class="isolate bg-[#c5004280] inline-block p-static-lg">
        <p-model-signature color="contrast-medium" [safeZone]="false" class="mix-blend-overlay"></p-model-signature>
      </div>

      <div class="isolate bg-[#e1d4a480] inline-block p-static-lg">
        <p-model-signature color="contrast-medium" [safeZone]="false" class="mix-blend-overlay"></p-model-signature>
      </div>

      <div class="isolate bg-[#0099e080] inline-block p-static-lg">
        <p-model-signature color="contrast-medium" [safeZone]="false" class="mix-blend-overlay"></p-model-signature>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
