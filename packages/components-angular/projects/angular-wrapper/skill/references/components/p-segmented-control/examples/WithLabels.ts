import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-segmented-control value="1">
        <p-segmented-control-item value="1" label="Label">
          Option 1
        </p-segmented-control-item>
        <p-segmented-control-item value="2" label="Label">
          Option 2
        </p-segmented-control-item>
        <p-segmented-control-item value="3" label="Label">
          Option 3
        </p-segmented-control-item>
        <p-segmented-control-item value="4" label="Label" [disabled]="true">
          Option 4
        </p-segmented-control-item>
        <p-segmented-control-item value="5" label="Label">
          Option 5
        </p-segmented-control-item>
      </p-segmented-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
