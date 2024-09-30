import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dataAdvanced, type DataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-community';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { type Theme } from '@porsche-design-system/components-angular';
import '@porsche-design-system/components-angular/ag-grid/theme.css';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

@Component({
  selector: 'app-company-logo-renderer',
  standalone: true,
  template: `
    <span class="cell-centered'">
      <img [src]="value" width="80" height="45" alt="" />
    </span>
  `,
  styles: [
    `
      img {
        object-fit: contain;
      }
      .cell-centered {
        height: 100%;
        display: flex;
        align-items: center;
      }
    `,
  ],
})
class ImageUrlRendererer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

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
      field: 'imageUrl',
      headerName: 'Image',
      cellRenderer: ImageUrlRendererer,
      editable: false,
      filter: false,
      sortable: false,
      width: 130,
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
