import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-segmented-control label="Some Label" description="Some description">
        <p-segmented-control-item value="1">
          Option 1
        </p-segmented-control-item>
        <p-segmented-control-item value="2">
          Option 2
        </p-segmented-control-item>
        <p-segmented-control-item value="3">
          Option 3
        </p-segmented-control-item>
        <p-segmented-control-item value="4">
          Option 4
        </p-segmented-control-item>
        <p-segmented-control-item value="5">
          Option 5
        </p-segmented-control-item>
      </p-segmented-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
