import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { pdsTheme } from '@porsche-design-system/components-angular/ag-grid';
import { type DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  type ColDef,
  ModuleRegistry,
  ValidationModule /* Development Only */,
} from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllCommunityModule, ValidationModule]);

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

@Component({
  selector: 'porsche-design-system-app',
  template: `
    <div>
      <ag-grid-angular
        style="width: 100%; height: 100vh;"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [pagination]="true"
        [theme]="agGridTheme"
      />
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PorscheDesignSystemModule, AgGridAngular],
})
export class AgGridExampleStorefrontComponent {
  protected readonly agGridTheme = pdsTheme;

  rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));
  // Columns to be displayed (Should match rowData properties)
  columnDefs: ColDef<ColumnDefs>[] = [
    {
      field: 'active',
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
