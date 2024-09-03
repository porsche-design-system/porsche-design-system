import { AgGridReact } from 'ag-grid-react';
import { dataAdvanced, type DataAdvanced } from '@porsche-design-system/shared';
import { ColDef } from 'ag-grid-enterprise';
import 'ag-grid-enterprise/styles/ag-grid.css';
import '@porsche-design-system/components-js/ag-grid/theme-light.css';

const ImageUrlRendererer = ({ value }: { value: string }) => {
  return (
    <img
      src={value.replace('/porsche-design-system/', '/dummyasset/')}
      style={{
        marginInlineEnd: '8px',
        objectFit: 'contain',
      }}
      width="80"
      height="45"
      alt=""
    />
  );
};

const columnDefs: ColDef<DataAdvanced>[] = [
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
// Configurations applied to all columns
const defaultColDef = {
  filter: true,
  editable: true,
};

export const AGGridExamplePage = (): JSX.Element => {
  return (
    <div className="ag-theme-quartz" style={{ height: '80vh' }}>
      <AgGridReact rowData={dataAdvanced} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} />
    </div>
  );
};
