import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-table caption="Some caption" layout="fixed">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell class="w-[50%] max-w-[50%]">
              Column 1 (50%)
            </p-table-head-cell>
            <p-table-head-cell class="w-[150px] max-w-[150px]">
              Column 2 (150px)
            </p-table-head-cell>
            <p-table-head-cell>
              Column 3 (auto)
            </p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
        <p-table-body>
          <p-table-row>
            <p-table-cell class="w-[50%] max-w-[50%]">
              Cell 1
            </p-table-cell>
            <p-table-cell class="w-[150px] max-w-[150px]">
              Cell 2
            </p-table-cell>
            <p-table-cell>
              Cell 3
            </p-table-cell>
          </p-table-row>
          <p-table-row>
            <p-table-cell class="w-[50%] max-w-[50%]">
              Cell 1
            </p-table-cell>
            <p-table-cell class="w-[150px] max-w-[150px]">
              <p-text [ellipsis]="true" title="Cell 2 with more content">
                Cell 2 with more content
              </p-text>
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
