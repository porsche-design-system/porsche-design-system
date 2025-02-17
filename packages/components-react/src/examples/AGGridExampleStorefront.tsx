import { PorscheDesignSystemContext } from '@porsche-design-system/components-react';
import { pdsTheme } from '@porsche-design-system/components-react/ag-grid';
import { type DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import { AllCommunityModule, type ColDef, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useContext } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

export const AGGridExampleStorefrontPage = (): JSX.Element => {
  const { theme } = useContext(PorscheDesignSystemContext);
  const rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

  const columnDefs: ColDef<ColumnDefs>[] = [
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
  const defaultColDef = {
    filter: true,
    editable: true,
  };

  return (
    <div data-ag-theme-mode={theme === 'light' ? null : 'dark'} style={{ height: '100vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        theme={pdsTheme}
      />
    </div>
  );
};
