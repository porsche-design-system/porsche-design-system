export type HeadAdvanced = {
  id: string;
  name: string;
  hideLabel: boolean;
  active?: boolean;
  direction?: 'asc' | 'desc';
};

export const headAdvanced: HeadAdvanced[] = [
  { name: 'Model', id: 'model' } as HeadAdvanced,
  { name: 'Interest', id: 'interest' } as HeadAdvanced,
  { name: 'VIN', id: 'vin' } as HeadAdvanced,
  { name: 'Purchase Intention', id: 'purchaseIntention' } as HeadAdvanced,
  { name: 'Status', id: 'status' } as HeadAdvanced,
  { name: 'Comment', id: 'comment' } as HeadAdvanced,
  { name: 'Lead ID', id: 'leadId' } as HeadAdvanced,
  { name: 'Select', id: 'select' } as HeadAdvanced,
  { name: 'Action', id: 'action', hideLabel: true } as HeadAdvanced,
].map((item, i) => ({
  ...item,
  ...(i > 0 &&
    i < 7 &&
    i !== 5 && {
      active: i === 1,
      direction: 'asc',
    }),
}));

export type DataAdvanced = {
  imageUrl: string;
  model: string;
  date: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  comment: string;
  leadId: string;
};

export const dataAdvanced: DataAdvanced[] = [
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/718@2x.jpg',
    model: '718 Cayman',
    date: '23.06.2021',
    interest: 'New Car',
    vin: '1FM5K7F84FGB16304',
    purchaseIntention: '08/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824402',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/panamera@2x.jpg',
    model: 'Panamera 4S',
    date: '19.06.2021',
    interest: 'New Car',
    vin: '2GCEC13T141374801',
    purchaseIntention: '11/2021',
    status: 'Lost',
    comment: 'Some multiline text and a column with a min width.',
    leadId: '0000824409',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '19.05.2021',
    interest: 'Used Car',
    vin: '5GAKVCKD8EJ335750',
    purchaseIntention: '09/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824408',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/macan@2x.jpg',
    model: 'Macan Turbo',
    date: '10.05.2021',
    interest: 'Used Car',
    vin: '1FMPU17L83LC09302',
    purchaseIntention: '07/2021',
    status: 'Lost',
    comment: '-',
    leadId: '0000824407',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/768/taycan@2x.jpg',
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
