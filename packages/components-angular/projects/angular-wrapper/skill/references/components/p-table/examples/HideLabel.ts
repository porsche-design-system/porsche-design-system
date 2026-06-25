import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-table caption="Some caption">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell>
              Column 1
            </p-table-head-cell>
            <p-table-head-cell>
              Column 2
            </p-table-head-cell>
            <p-table-head-cell [hideLabel]="true">
              Column 3
            </p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
        <p-table-body>
          <p-table-row>
            <p-table-cell>
              Cell 1
            </p-table-cell>
            <p-table-cell>
              Cell 2
            </p-table-cell>
            <p-table-cell>
              Cell 3
            </p-table-cell>
          </p-table-row>
        </p-table-body>
      </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
