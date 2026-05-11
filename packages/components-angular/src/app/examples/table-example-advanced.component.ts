
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, TableUpdateEventDetail } from '@porsche-design-system/components-angular';

type HeadAdvanced = {
  id: string;
  name: string;
  hideLabel: boolean;
  active?: boolean;
  direction?: 'asc' | 'desc';
};

const headAdvanced: HeadAdvanced[] = [
  { name: 'Model', id: 'model' } as HeadAdvanced,
  { name: 'Interest', id: 'interest' } as HeadAdvanced,
  { name: 'VIN', id: 'vin' } as HeadAdvanced,
  { name: 'Purchase Intention', id: 'purchaseIntention' } as HeadAdvanced,
  { name: 'Status', id: 'status' } as HeadAdvanced,
  { name: 'Comment', id: 'comment' } as HeadAdvanced,
  { name: 'Lead ID', id: 'leadId' } as HeadAdvanced,
  { name: 'Select Wrapper', id: 'selectWrapper' } as HeadAdvanced,
  { name: 'Select', id: 'select' } as HeadAdvanced,
  { name: 'Multi-Select', id: 'multiSelect' } as HeadAdvanced,
  { name: 'Action', id: 'action', hideLabel: true } as HeadAdvanced,
].map((item, i) => ({
  ...item,
  ...(i > 0 &&
    i < 7 &&
    i !== 5 && {
      active: i === 1,
      direction: 'asc',
    }),
}));

type DataAdvanced = {
  imageUrl: string;
  model: string;
  date: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  comment: string;
  leadId: string;
};

const dataAdvanced: DataAdvanced[] = [
  {
    imageUrl: 'http://localhost:3002/718.png',
    model: '718',
    date: '23.06.2021',
    interest: 'New Car',
    vin: '1FM5K7F84FGB16304',
    purchaseIntention: '08/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824402',
  },
  {
    imageUrl: 'http://localhost:3002/panamera.png',
    model: 'Panamera',
    date: '19.06.2021',
    interest: 'New Car',
    vin: '2GCEC13T141374801',
    purchaseIntention: '11/2021',
    status: 'Lost',
    comment: 'Some multiline text and a column with a min width.',
    leadId: '0000824409',
  },
  {
    imageUrl: 'http://localhost:3002/911.png',
    model: '911',
    date: '19.05.2021',
    interest: 'Used Car',
    vin: '5GAKVCKD8EJ335750',
    purchaseIntention: '09/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824408',
  },
  {
    imageUrl: 'http://localhost:3002/macan.png',
    model: 'Macan',
    date: '10.05.2021',
    interest: 'Used Car',
    vin: '1FMPU17L83LC09302',
    purchaseIntention: '07/2021',
    status: 'Lost',
    comment: '-',
    leadId: '0000824407',
  },
  {
    imageUrl: 'http://localhost:3002/taycan.png',
    model: 'Taycan',
    date: '03.05.2021',
    interest: 'New Car',
    vin: 'JN1BY1AR3BM375187',
    purchaseIntention: '05/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824406',
  },
];

@Component({
  selector: 'page-table-example-advanced',
  template: `
    <p-table (update)="onUpdate($event)">
      <p-heading slot="caption" size="large" tag="h3">Some visual caption</p-heading>
      <p-table-head>
        <p-table-head-row>
          @for (item of head; track item) {
            <p-table-head-cell [sort]="item" [hideLabel]="item.hideLabel">
              {{ item.name }}
            </p-table-head-cell>
          }
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        @for (item of data; track item) {
          <p-table-row>
            <p-table-cell>
              <div style="display: flex;">
                <img src="{{ item.imageUrl }}" width="80" height="45" style="margin-right: .5rem; object-fit: contain; max-width: none;" alt="" />
                <div>
                  <p-text weight="semi-bold">{{ item.model }}</p-text>
                  <p-text size="x-small">{{ item.date }}</p-text>
                </div>
              </div>
            </p-table-cell>
            <p-table-cell>{{ item.interest }}</p-table-cell>
            <p-table-cell>
              <a href="https://porsche.com">{{ item.vin }}</a>
            </p-table-cell>
            <p-table-cell>{{ item.purchaseIntention }}</p-table-cell>
            <p-table-cell>{{ item.status }}</p-table-cell>
            <p-table-cell [multiline]="true" style="min-width: 10rem;">{{ item.comment }}</p-table-cell>
            <p-table-cell>{{ item.leadId }}</p-table-cell>
            <p-table-cell>
              <p-button-pure icon="edit" style="padding: .5rem">Edit</p-button-pure>
              <p-button-pure icon="delete" style="padding: .5rem">Delete</p-button-pure>
            </p-table-cell>
          </p-table-row>
        }
      </p-table-body>
    </p-table>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class TableExampleAdvancedComponent {
  public head = headAdvanced;
  public data = dataAdvanced;

  onUpdate(e: CustomEvent<TableUpdateEventDetail>): void {
    const { id, direction } = e.detail as TableUpdateEventDetail & { id: keyof DataAdvanced };
    this.head = this.head.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) }));
    this.data = [...this.data].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  }
}
