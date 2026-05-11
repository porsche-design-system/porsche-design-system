import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

const headBasic: string[] = ['Model', 'Date', 'Purchase Intention', 'Status', 'Lead ID'];

type DataBasic = {
  model: string;
  date: string;
  interest: string;
  status: string;
  leadId: string;
};

const dataBasic: DataBasic[] = [
  {
    model: '718 Cayman',
    date: '23.06.2021',
    interest: 'New Car',
    status: 'Won',
    leadId: '0000824402',
  },
  {
    model: 'Panamera 4S',
    date: '19.06.2021',
    interest: 'New Car',
    status: 'Lost',
    leadId: '0000824409',
  },
  {
    model: '911 Carrera S',
    date: '19.05.2021',
    interest: 'Used Car',
    status: 'Won',
    leadId: '0000824408',
  },
  {
    model: 'Macan Turbo',
    date: '10.05.2021',
    interest: 'Used Car',
    status: 'Lost',
    leadId: '0000824407',
  },
  {
    model: 'Taycan',
    date: '03.05.2021',
    interest: 'New Car',
    status: 'Won',
    leadId: '0000824406',
  },
];

@Component({
  selector: 'page-table-example-basic',
  template: `
    <p-table caption="Some caption">
      <p-table-head>
        <p-table-head-row>
          @for (item of head; track item) {
            <p-table-head-cell>{{ item }}</p-table-head-cell>
          }
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        @for (item of data; track item) {
          <p-table-row>
            <p-table-cell>{{ item.model }}</p-table-cell>
            <p-table-cell>{{ item.date }}</p-table-cell>
            <p-table-cell>{{ item.interest }}</p-table-cell>
            <p-table-cell>{{ item.status }}</p-table-cell>
            <p-table-cell>{{ item.leadId }}</p-table-cell>
          </p-table-row>
        }
      </p-table-body>
    </p-table>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class TableExampleBasicComponent {
  public head = headBasic;
  public data = dataBasic;
}
