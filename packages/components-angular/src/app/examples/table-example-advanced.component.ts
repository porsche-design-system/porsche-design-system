import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dataAdvanced, headAdvanced } from '@porsche-design-system/shared';
import type { TableHeadCellSort } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-table-example-advanced',
  template: `
    <p-table (sortingChange)="onSortingChange($event)">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell *ngFor="let item of head" [sort]="item" [hideLabel]="item.hideLabel">
            {{ item.name }}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row *ngFor="let item of data">
          <p-table-cell>
            <p-flex>
              <p-flex-item>
                <img src="{{ item.imageUrl }}" width="80" height="45" style="margin-right: .5rem" alt="" />
              </p-flex-item>
              <p-flex-item>
                <p-text weight="semibold">{{ item.model }}</p-text>
                <p-text size="x-small">{{ item.date }}</p-text>
              </p-flex-item>
            </p-flex>
          </p-table-cell>
          <p-table-cell>{{ item.interest }}</p-table-cell>
          <p-table-cell>
            <a href="https://porsche.com">{{ item.vin }}</a>
          </p-table-cell>
          <p-table-cell>{{ item.purchaseIntention }}</p-table-cell>
          <p-table-cell>{{ item.status }}</p-table-cell>
          <p-table-cell>{{ item.leadId }}</p-table-cell>
          <p-table-cell>
            <p-button-pure icon="edit" style="padding: .5rem">Edit</p-button-pure>
            <p-button-pure icon="delete" style="padding: .5rem">Delete</p-button-pure>
          </p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExampleAdvancedComponent {
  public head = headAdvanced;
  public data = dataAdvanced;

  onSortingChange(e: CustomEvent<TableHeadCellSort>): void {
    const { id, direction } = e.detail;
    this.head = this.head.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) }));
    this.data = [...this.data].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  }
}
