export const headBasic: string[] = ['Model', 'Date', 'Purchase Intention', 'Status', 'Lead ID'];

type DataItem = {
  model: string;
  date: string;
  interest: string;
  status: string;
  leadId: string;
};

export const dataBasic: DataItem[] = [
  {
    model: '718 Cayman',
    date: '23.06.2021',
    interest: 'New Car',
    status: 'Won',
    leadId: '0000824402',
  },
  {
    model: 'Panamera 4S',
    date: '19.06.2021',
    interest: 'New Car',
    status: 'Lost',
    leadId: '0000824409',
  },
  {
    model: '911 Carrera S',
    date: '19.05.2021',
    interest: 'Used Car',
    status: 'Won',
    leadId: '0000824408',
  },
  {
    model: 'Macan Turbo',
    date: '10.05.2021',
    interest: 'Used Car',
    status: 'Lost',
    leadId: '0000824407',
  },
  {
    model: 'Taycan',
    date: '03.05.2021',
    interest: 'New Car',
    status: 'Won',
    leadId: '0000824406',
  },
];
