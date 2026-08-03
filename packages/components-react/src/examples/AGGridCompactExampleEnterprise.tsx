import { PLinkPure } from '@porsche-design-system/components-react';
import { pdsThemeCompact } from '@porsche-design-system/components-react/ag-grid';
import { type DataAdvanced, dataAdvanced } from '@porsche-design-system/shared';
import { AllEnterpriseModule, type ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

const ImageUrlRenderer = ({ value }: { value: string }) => {
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
    width: 170,
  },
  {
    field: 'imageUrl',
    headerName: 'Image',
    cellRenderer: ImageUrlRenderer,
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

// AG Grid Enterprise is registered per grid, since ModuleRegistry.registerModules() would apply the license check to every grid
export const AGGridCompactExampleEnterprisePage = () => {
  return (
    <div style={{ height: '80vh' }}>
      <AgGridReact
        modules={[AllEnterpriseModule]}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        sideBar={true}
        cellSelection={true}
        theme={pdsThemeCompact}
      />
    </div>
  );
};
