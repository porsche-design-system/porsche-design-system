type HeadItem = {
  id: string;
  name: string;
  hideLabel: boolean;
  active: boolean;
  direction: 'asc' | 'desc';
};

export const headAdvanced: HeadItem[] = [
  { name: 'Model', id: 'model' } as HeadItem,
  { name: 'Interest', id: 'interest' } as HeadItem,
  { name: 'VIN', id: 'vin' } as HeadItem,
  { name: 'Purchase Intention', id: 'purchaseIntention' } as HeadItem,
  { name: 'Status', id: 'status' } as HeadItem,
  { name: 'Lead ID', id: 'leadId' } as HeadItem,
  { name: 'Action', id: 'action', hideLabel: true } as HeadItem,
].map((item, i) => ({
  ...item,
  ...(i > 0 &&
    item.name && {
      active: i === 1,
      direction: 'asc',
    }),
}));

type DataItem = {
  imageUrl: string;
  model: string;
  date: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  leadId: string;
};

export const dataAdvanced: DataItem[] = [
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
