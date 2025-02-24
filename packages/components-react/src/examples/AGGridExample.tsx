import { PLinkPure, PorscheDesignSystemContext } from '@porsche-design-system/components-react';
import { pdsTheme } from '@porsche-design-system/components-react/ag-grid';
import { type DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import { AllEnterpriseModule, type ColDef, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useContext } from 'react';

ModuleRegistry.registerModules([AllEnterpriseModule]);

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

const ImageUrlRendererer = ({ value }: { value: string }) => {
  return (
    <span
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src={value}
        style={{
          objectFit: 'contain',
        }}
        width="80"
        height="45"
        alt=""
      />
    </span>
  );
};

const ButtonRenderer = ({ data }: { data: any }) => {
  const { theme } = useContext(PorscheDesignSystemContext);

  return (
    <span
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <PLinkPure
        underline={true}
        theme={theme}
        target="_blank"
        href={'https://www.porsche.com/germany/models/' + data.model.toLowerCase()}
      >
        More information
      </PLinkPure>
    </span>
  );
};

const rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

const columnDefs: ColDef<ColumnDefs>[] = [
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
const defaultColDef = {
  filter: true,
  editable: true,
};

export const AGGridExamplePage = (): JSX.Element => {
  const { theme } = useContext(PorscheDesignSystemContext);

  return (
    <div data-ag-theme-mode={theme === 'light' ? null : 'dark'} style={{ height: '80vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        sideBar={true}
        cellSelection={true}
        theme={pdsTheme}
      />
    </div>
  );
};
