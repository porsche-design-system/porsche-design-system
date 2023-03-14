import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
} from '@porsche-design-system/components-react';
import type { TableChangeEvent } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import { dataSorting, DataSorting, headSorting } from '@porsche-design-system/shared';

export const TableExampleSortingPage = (): JSX.Element => {
  const [head, setHead] = useState(headSorting);
  const [data, setData] = useState(dataSorting);

  const onChange = useCallback((e: CustomEvent<TableChangeEvent>) => {
    const { id, direction } = e.detail as TableChangeEvent & { id: keyof DataSorting };
    setHead((prev) => prev.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) })));
    setData((prev) =>
      [...prev].sort((a, b) => {
        return direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
      })
    );
  }, []);

  return (
    <PTable caption="Some caption" onChange={onChange}>
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
