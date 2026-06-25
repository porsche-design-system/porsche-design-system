import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="relative inline-block rounded-lg overflow-hidden">
        <img src="assets/ai-tag-image.jpg" alt="AI modified image" class="block w-[300px] h-[300px] object-cover" />
        <p-ai-tag variant="modified" class="absolute bottom-static-sm end-static-sm scheme-dark"></p-ai-tag>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
