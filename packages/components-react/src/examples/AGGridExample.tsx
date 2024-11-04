import { AgGridReact, type CustomCellRendererProps } from 'ag-grid-react';
import { dataAdvanced, type DataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-enterprise';
import { type ColDef } from 'ag-grid-community';
import '@porsche-design-system/components-react/ag-grid/theme.css';
import { PLinkPure, type Theme } from '@porsche-design-system/components-react';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

const theme: Theme = 'light';

const ImageUrlRenderer = ({ value }: CustomCellRendererProps) => {
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

const ButtonRenderer = ({ data }: CustomCellRendererProps) => {
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

export const AGGridExamplePage = (): JSX.Element => {
  return (
    <div className={theme === 'light' ? 'ag-theme-pds' : 'ag-theme-pds-dark'} style={{ height: '80vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        sideBar={true}
        enableRangeSelection={true}
      />
    </div>
  );
};
