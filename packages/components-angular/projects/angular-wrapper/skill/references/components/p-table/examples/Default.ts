import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-table caption="Some caption">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell>
              Model
            </p-table-head-cell>
            <p-table-head-cell>
              Date
            </p-table-head-cell>
            <p-table-head-cell>
              Purchase Intention
            </p-table-head-cell>
            <p-table-head-cell>
              Status
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
              19.06.2021
            </p-table-cell>
            <p-table-cell>
              New Car
            </p-table-cell>
            <p-table-cell>
              Lost
            </p-table-cell>
            <p-table-cell>
              0000824409
            </p-table-cell>
          </p-table-row>
          <p-table-row>
            <p-table-cell>
              911 Carrera S
            </p-table-cell>
            <p-table-cell>
              19.05.2021
            </p-table-cell>
            <p-table-cell>
              Used Car
            </p-table-cell>
            <p-table-cell>
              Won
            </p-table-cell>
            <p-table-cell>
              0000824408
            </p-table-cell>
          </p-table-row>
          <p-table-row>
            <p-table-cell>
              Macan Turbo
            </p-table-cell>
            <p-table-cell>
              10.05.2021
            </p-table-cell>
            <p-table-cell>
              Used Car
            </p-table-cell>
            <p-table-cell>
              Lost
            </p-table-cell>
            <p-table-cell>
              0000824407
            </p-table-cell>
          </p-table-row>
          <p-table-row>
            <p-table-cell>
              Taycan
            </p-table-cell>
            <p-table-cell>
              03.05.2021
            </p-table-cell>
            <p-table-cell>
              New Car
            </p-table-cell>
            <p-table-cell>
              Won
            </p-table-cell>
            <p-table-cell>
              0000824406
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
