import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dataAdvanced, type DataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { type Theme } from '@porsche-design-system/components-angular';

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
