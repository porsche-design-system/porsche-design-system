type HeadItem = {
  name: string;
  key?: string;
};

type DataItem = {
  id?: string;
  imageUrl: string;
  model: string;
  date: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  leadId: string;
};

export const head: HeadItem[] = [
  { name: 'Model' },
  { name: 'Interest', key: 'interest' },
  { name: 'VIN', key: 'vin' },
  { name: 'Purchase Intention', key: 'purchaseIntention' },
  { name: 'Status', key: 'status' },
  { name: 'Lead ID', key: 'leadId' },
  { name: 'Action' },
].map((item, i) => ({
  ...item,
  ...(item.name && {
    isSortable: i > 0,
    isSorting: i === 1,
    direction: 'asc',
  }),
}));

export const data: DataItem[] = [
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'New Car',
    vin: '-',
    purchaseIntention: '08.2020',
    status: 'Won',
    leadId: '0000824402',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'New Car',
    vin: '-',
    purchaseIntention: '11.2020',
    status: 'Lost',
    leadId: '0000824409',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'Used Car',
    vin: '-',
    purchaseIntention: '09.2020',
    status: 'Won',
    leadId: '0000824408',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'Used Car',
    vin: '-',
    purchaseIntention: '04.2020',
    status: 'Lost',
    leadId: '0000824407',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'New Car',
    vin: '-',
    purchaseIntention: '03.2020',
    status: 'Won',
    leadId: '0000824406',
  },
];
