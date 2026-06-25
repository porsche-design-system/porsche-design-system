import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="flex flex-col gap-static-sm">
        <p-checkbox label="Some label" [indeterminate]="true"></p-checkbox>
        <p-checkbox label="Some label" [indeterminate]="true" [checked]="true"></p-checkbox>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
