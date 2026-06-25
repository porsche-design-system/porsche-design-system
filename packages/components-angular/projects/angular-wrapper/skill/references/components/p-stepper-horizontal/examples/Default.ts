import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-stepper-horizontal>
        <p-stepper-horizontal-item state="complete">
          Step 1
        </p-stepper-horizontal-item>
        <p-stepper-horizontal-item state="warning">
          Step 2
        </p-stepper-horizontal-item>
        <p-stepper-horizontal-item state="current">
          Step 3
        </p-stepper-horizontal-item>
        <p-stepper-horizontal-item>
          Step 4
        </p-stepper-horizontal-item>
      </p-stepper-horizontal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
