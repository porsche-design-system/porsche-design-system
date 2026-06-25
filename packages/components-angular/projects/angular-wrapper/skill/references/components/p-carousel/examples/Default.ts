import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-carousel heading="Some heading" [trimSpace]="true" [pagination]="true" [rewind]="true">
        <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 1
        </div>
        <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 2
        </div>
        <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 3
        </div>
        <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
          Slide 4
        </div>
      </p-carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
