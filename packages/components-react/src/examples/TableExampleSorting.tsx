import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  TableHeadCellSort,
} from '@porsche-design-system/components-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { dataSorting, DataSorting, headSorting } from '@porsche-design-system/shared';

export const TableExampleSortingPage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();
  const [head, setHead] = useState(headSorting);
  const [data, setData] = useState(dataSorting);

  // TODO: workaround to pass data via property since our react wrappers set attributes
  // as alternative we could also provide sort-active, sort-direction, sort-id,… and that's it.
  useEffect(() => {
    headRow.current.childNodes.forEach((node, i) => {
      (node as any).sort = head[i];
    });
  }, [head]);

  const onSortingChange = useCallback((e: CustomEvent<TableHeadCellSort<DataSorting>>) => {
    const { id, direction } = e.detail;
    setHead((prev) => prev.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) })));
    setData((prev) =>
      [...prev].sort((a, b) => {
        return direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
      })
    );
  }, []);

  return (
    <PTable caption="Some caption" onSortingChange={onSortingChange}>
      <PTableHead>
        <PTableHeadRow ref={headRow}>
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
