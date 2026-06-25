import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <div class="w-full">
        <p-table>
          <p-heading slot="caption" size="large" tag="h3">
            Some slotted caption
          </p-heading>
          <p-table-head>
            <p-table-head-row>
              <p-table-head-cell [sort]="{'id': 'model', 'active': 'true', 'direction': 'desc'}">
                Model
              </p-table-head-cell>
              <p-table-head-cell>
                Date
              </p-table-head-cell>
              <p-table-head-cell>
                Purchase Intention
              </p-table-head-cell>
              <p-table-head-cell>
                <span class="inline-flex items-center gap-static-sm">
                  Status
                  <p-ai-tag variant="abbreviation"></p-ai-tag>
                </span>
              </p-table-head-cell>
              <p-table-head-cell>
                Lead ID
              </p-table-head-cell>
            </p-table-head-row>
          </p-table-head>
          <p-table-body>
            <p-table-row>
              <p-table-cell>
                718 Cayman
              </p-table-cell>
              <p-table-cell>
                23.06.2021
              </p-table-cell>
              <p-table-cell>
                New Car
              </p-table-cell>
              <p-table-cell>
                Won
              </p-table-cell>
              <p-table-cell>
                0000824402
              </p-table-cell>
            </p-table-row>
            <p-table-row>
              <p-table-cell>
                Panamera 4S
              </p-table-cell>
              <p-table-cell>
                15.03.2023
              </p-table-cell>
              <p-table-cell>
                Used Car
              </p-table-cell>
              <p-table-cell>
                Lost
              </p-table-cell>
              <p-table-cell>
                0000824408
              </p-table-cell>
            </p-table-row>
            <p-table-row>
              <p-table-cell>
                911 Carrera S
              </p-table-cell>
              <p-table-cell>
                28.08.2025
              </p-table-cell>
              <p-table-cell>
                New Car
              </p-table-cell>
              <p-table-cell>
                Won
              </p-table-cell>
              <p-table-cell>
                0000824409
              </p-table-cell>
            </p-table-row>
          </p-table-body>
        </p-table>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {}
