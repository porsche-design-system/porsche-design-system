import { AgGridReact } from 'ag-grid-react';
import { dataAdvanced, type DataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import '@porsche-design-system/components-react/ag-grid/theme.css';
import { Theme } from '@porsche-design-system/components-react';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

const theme: Theme = 'light';

export const AGGridExampleStorefrontPage = (): JSX.Element => {
  const rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

  const columnDefs: ColDef<ColumnDefs>[] = [
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
  const defaultColDef = {
    filter: true,
    editable: true,
  };

  return (
    <div className={theme === 'light' ? 'ag-theme-pds' : 'ag-theme-pds-dark'} style={{ height: '100vh' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} />
    </div>
  );
};
