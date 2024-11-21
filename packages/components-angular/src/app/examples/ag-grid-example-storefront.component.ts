import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { type DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-community';
import { type Theme } from '@porsche-design-system/components-angular';
import { ColDef } from 'ag-grid-community';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

@Component({
  selector: 'porsche-design-system-app',
  template: ` <ag-grid-angular
    style="width: 100%; height: 100vh;"
    [class]="theme === 'light' ? 'ag-theme-pds' : 'ag-theme-pds-dark'"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [pagination]="true"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      @import '@porsche-design-system/components-angular/ag-grid/theme.css';
    `,
  ],
  standalone: false,
})
export class AgGridExampleStorefrontComponent {
  public theme: Theme = 'light';
  rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));
  // Columns to be displayed (Should match rowData properties)
  columnDefs: ColDef<ColumnDefs>[] = [
    {
      field: 'active',
      showDisabledCheckboxes: true,
      width: 170,
    },
    {
      field: 'model',
      editable: false,
    },
    {
      field: 'date',
      editable: false,
    },
    {
      field: 'interest',
      editable: false,
    },
    {
      field: 'vin',
      width: 250,
      editable: false,
    },
    {
      field: 'purchaseIntention',
      editable: false,
    },
    {
      field: 'status',
      editable: false,
    },
    {
      field: 'comment',
      filter: false,
      width: 500,
    },
  ];
  // Configurations applied to all columns
  defaultColDef = {
    filter: true,
    editable: true,
  };
}
