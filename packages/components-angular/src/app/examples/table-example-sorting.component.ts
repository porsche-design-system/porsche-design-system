import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, TableUpdateEventDetail } from '@porsche-design-system/components-angular';

type HeadSorting = {
  id: string;
  name: string;
  active?: boolean;
  direction?: 'asc' | 'desc';
};

const headSorting: HeadSorting[] = [
  { name: 'Column 1', id: 'col1' } as HeadSorting,
  { name: 'Column 2', id: 'col2' } as HeadSorting,
  { name: 'Column 3', id: 'col3' } as HeadSorting,
].map((item, i) => ({
  ...item,
  active: i === 1,
  direction: 'asc',
}));

type DataSorting = {
  col1: string;
  col2: string;
  col3: string;
};

const dataSorting: DataSorting[] = [
  {
    col1: 'Name A',
    col2: '9',
    col3: '01.06.2021',
  },
  {
    col1: 'Name Z',
    col2: '1',
    col3: '24.06.2021',
  },
];

@Component({
  selector: 'page-table-example-sorting',
  template: `
    <p-table caption="Some caption" (update)="onUpdate($event)">
      <p-table-head>
        <p-table-head-row>
          @for (item of head; track item) {
            <p-table-head-cell [sort]="item">
              {{ item.name }}
            </p-table-head-cell>
          }
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        @for (item of data; track item) {
          <p-table-row>
            <p-table-cell>{{ item.col1 }}</p-table-cell>
            <p-table-cell>{{ item.col2 }}</p-table-cell>
            <p-table-cell>{{ item.col3 }}</p-table-cell>
          </p-table-row>
        }
      </p-table-body>
    </p-table>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class TableExampleSortingComponent {
  public head = headSorting;
  public data = dataSorting;

  onUpdate(e: CustomEvent<TableUpdateEventDetail>): void {
    const { id, direction } = e.detail as TableUpdateEventDetail & { id: keyof DataSorting };
    this.head = this.head.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) }));
    this.data = [...this.data].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  }
}
