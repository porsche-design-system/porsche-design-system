import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-company-logo-renderer',
  standalone: true,
  template: ` <img [src]="value.replace('/porsche-design-system/', '/dummyasset/')" width="80" height="45" alt="" /> `,
  styles: ['img { margin-inline-end: 8px; object-fit: contain}'],
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
  selector: 'ag-grid-example',
  template: ` <ag-grid-angular
    style="width: 100%; height: 550px;"
    class="ag-theme-quartz"
    [rowData]="dataAdvanced"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [pagination]="true"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridExampleComponent {
  dataAdvanced = dataAdvanced;
  columnDefs: ColDef<DataAdvanced>[] = [
    {
      field: 'imageUrl',
      cellRenderer: ImageUrlRendererer,
    },
    {
      field: 'model',
    },
    {
      field: 'date',
    },
    {
      field: 'interest',
    },
    {
      field: 'vin',
    },
    {
      field: 'purchaseIntention',
    },
    {
      field: 'status',
    },
    {
      field: 'comment',
    },
    {
      field: 'leadId',
    },
  ];
  defaultColDef = {
    filter: true,
    editable: true,
  };
}
