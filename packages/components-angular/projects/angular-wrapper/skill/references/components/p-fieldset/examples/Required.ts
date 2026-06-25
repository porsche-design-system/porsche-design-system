import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-fieldset label="Some legend label" [required]="true">
        <p-input-text label="Some label" name="some-name-1" [required]="true"></p-input-text>
        <p-input-text label="Some label" name="some-name-2" [required]="true" class="mt-fluid-sm"></p-input-text>
      </p-fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
