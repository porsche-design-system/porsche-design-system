import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dataBasic, headBasic } from '@porsche-design-system/shared';

@Component({
  selector: 'page-table-example-basic',
  template: `
    <p-table caption="Some caption">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell *ngFor="let item of head">{{ item }}</p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row *ngFor="let item of data">
          <p-table-cell>{{ item.model }}</p-table-cell>
          <p-table-cell>{{ item.date }}</p-table-cell>
          <p-table-cell>{{ item.interest }}</p-table-cell>
          <p-table-cell>{{ item.status }}</p-table-cell>
          <p-table-cell>{{ item.leadId }}</p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExampleBasicComponent {
  public head = headBasic;
  public data = dataBasic;
}
