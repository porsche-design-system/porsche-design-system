import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dataSorting, DataSorting, headSorting } from '@porsche-design-system/shared';
import type { TableHeadCellSort } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-table-example-sorting',
  template: `
    <p-table (sortingChange)="onSortingChange($event)">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell *ngFor="let item of head" [sort]="item">
            {{ item.name }}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row *ngFor="let item of data">
          <p-table-cell>{{ item.col1 }}</p-table-cell>
          <p-table-cell>{{ item.col2 }}</p-table-cell>
          <p-table-cell>{{ item.col3 }}</p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExampleSortingComponent {
  public head = headSorting;
  public data = dataSorting;

  onSortingChange(e: CustomEvent<TableHeadCellSort<DataSorting>>): void {
    const { id, direction } = e.detail;
    this.head = this.head.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) }));
    this.data = [...this.data].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  }
}
