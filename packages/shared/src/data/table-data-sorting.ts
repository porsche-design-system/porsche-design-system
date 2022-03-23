export type HeadSorting = {
  id: string;
  name: string;
  hideLabel: boolean;
  active: boolean;
  direction: 'asc' | 'desc';
};

export const headSorting: HeadSorting[] = [
  { name: 'Column 1', id: 'col1' } as HeadSorting,
  { name: 'Column 2', id: 'col2' } as HeadSorting,
  { name: 'Column 3', id: 'col3' } as HeadSorting,
].map((item, i) => ({
  ...item,
  active: i === 1,
  direction: 'asc',
}));

export type DataSorting = {
  col1: string;
  col2: string;
  col3: string;
};

export const dataSorting: DataSorting[] = [
  {
    col1: 'Name A',
    col2: '9',
    col3: '01.06.2021',
  },
  {
    col1: 'Name Z',
    col2: '1',
    col3: '24.06.2021',
  },
];
