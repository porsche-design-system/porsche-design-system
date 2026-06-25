import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="flex gap-static-sm">
        <p-link-pure href="https://porsche.com" icon="phone">
          Some label
        </p-link-pure>
        <p-link-pure href="https://porsche.com" iconSource="assets/icon-custom-kaixin.svg" [hideLabel]="true">
          Some label
        </p-link-pure>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
