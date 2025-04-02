import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  type TableUpdateEventDetail,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

type HeadSorting = {
  id: string;
  name: string;
  active?: boolean;
  direction?: 'asc' | 'desc';
};

const headSorting: HeadSorting[] = [
  { name: 'Column 1', id: 'col1' } as HeadSorting,
  { name: 'Column 2', id: 'col2' } as HeadSorting,
  { name: 'Column 3', id: 'col3' } as HeadSorting,
].map((item, i) => ({
  ...item,
  active: i === 1,
  direction: 'asc',
}));

type DataSorting = {
  col1: string;
  col2: string;
  col3: string;
};

const dataSorting: DataSorting[] = [
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

export const TableExampleSortingPage = (): JSX.Element => {
  const [head, setHead] = useState(headSorting);
  const [data, setData] = useState(dataSorting);

  const onUpdate = useCallback((e: CustomEvent<TableUpdateEventDetail>) => {
    const { id, direction } = e.detail as TableUpdateEventDetail & { id: keyof DataSorting };
    setHead((prev) => prev.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) })));
    setData((prev) =>
      [...prev].sort((a, b) => {
        return direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
      })
    );
  }, []);

  return (
    <PTable caption="Some caption" onUpdate={onUpdate}>
      <PTableHead>
        <PTableHeadRow>
          {head.map((item, i) => (
            <PTableHeadCell key={i} sort={item}>
              {item.name}
            </PTableHeadCell>
          ))}
        </PTableHeadRow>
      </PTableHead>
      <PTableBody>
        {data.map((item, i) => (
          <PTableRow key={i}>
            <PTableCell>{item.col1}</PTableCell>
            <PTableCell>{item.col2}</PTableCell>
            <PTableCell>{item.col3}</PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
