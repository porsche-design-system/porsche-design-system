import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-enterprise';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PorscheDesignSystemModule, Theme } from '@porsche-design-system/components-angular';
import { AsyncPipe } from '@angular/common';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

@Component({
  selector: 'app-company-logo-renderer',
  standalone: true,
  template: `
    <span class="cell-centered'">
      <img [src]="value.replace('/porsche-design-system/', '/dummyasset/')" width="80" height="45" alt="" />
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
  selector: 'app-company-button-renderer',
  standalone: true,
  template: `
    <span class="cell-centered'">
      <p-link-pure
        [underline]="true"
        [theme]="theme"
        target="_blank"
        [href]="'https://www.porsche.com/germany/models/' + data.model.toLowerCase()"
      >
        More information
      </p-link-pure>
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
  imports: [PorscheDesignSystemModule, AsyncPipe],
})
class ButtonRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public data!: any;
  public theme: Theme = 'light';

  agInit(params: ICellRendererParams): void {
    this.data = params.data;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.data = params.data;
    return true;
  }
}

@Component({
  selector: 'ag-grid-example',
  template: ` <ag-grid-angular
    style="width: 100%; height: 550px;"
    [class]="theme === 'light' ? 'ag-theme-pds' : 'ag-theme-pds-dark'"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [pagination]="true"
    [sideBar]="true"
    [enableRangeSelection]="true"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridExampleComponent {
  public theme: Theme = 'light';
  rowData = dataAdvanced.map((row) => ({ active: Math.random() < 0.5 /* random boolean */, ...row }));
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
    {
      field: 'leadId',
      headerName: 'More',
      cellRenderer: ButtonRenderer,
      editable: false,
      sortable: false,
      filter: false,
    },
  ];
  // Configurations applied to all columns
  defaultColDef = {
    filter: true,
    editable: true,
  };
}
