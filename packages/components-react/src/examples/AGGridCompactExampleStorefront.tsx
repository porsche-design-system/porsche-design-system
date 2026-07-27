import { pdsThemeCompact } from '@porsche-design-system/components-react/ag-grid';
import { AllCommunityModule, type ColDef, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

type Row = {
  model: string;
  date: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  comment: string;
  leadId: string;
};

type ColumnDefs = Row & {
  active: boolean;
};

const data: Row[] = [
  {
    model: '718',
    date: '23.06.2021',
    interest: 'New Car',
    vin: '1FM5K7F84FGB16304',
    purchaseIntention: '08/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824402',
  },
  {
    model: 'Panamera',
    date: '19.06.2021',
    interest: 'New Car',
    vin: '2GCEC13T141374801',
    purchaseIntention: '11/2021',
    status: 'Lost',
    comment: 'Some multiline text and a column with a min width.',
    leadId: '0000824409',
  },
  {
    model: '911',
    date: '19.05.2021',
    interest: 'Used Car',
    vin: '5GAKVCKD8EJ335750',
    purchaseIntention: '09/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824408',
  },
  {
    model: 'Macan',
    date: '10.05.2021',
    interest: 'Used Car',
    vin: '1FMPU17L83LC09302',
    purchaseIntention: '07/2021',
    status: 'Lost',
    comment: '-',
    leadId: '0000824407',
  },
  {
    model: 'Taycan',
    date: '03.05.2021',
    interest: 'New Car',
    vin: 'JN1BY1AR3BM375187',
    purchaseIntention: '05/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824406',
  },
];

export const AGGridCompactExampleStorefrontPage = () => {
  const rowData = data.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

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
    <div>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        domLayout="autoHeight"
        theme={pdsThemeCompact}
      />
    </div>
  );
};
