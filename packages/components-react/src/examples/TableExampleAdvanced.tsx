import {
  PButtonPure,
  PFlex,
  PFlexItem,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  PText,
  TableHeadCellSort,
} from '@porsche-design-system/components-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { dataAdvanced, DataAdvanced, headAdvanced } from '@porsche-design-system/shared';

export const TableExampleAdvancedPage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();
  const [head, setHead] = useState(headAdvanced);
  const [data, setData] = useState(dataAdvanced);

  // TODO: workaround to pass data via property since our react wrappers set attributes
  // as alternative we could also provide sort-active, sort-direction, sort-id,… and that's it.
  useEffect(() => {
    headRow.current.childNodes.forEach((node, i) => {
      (node as any).sort = head[i];
    });
  }, [head]);

  const onSortingChange = useCallback((e: CustomEvent<TableHeadCellSort<DataAdvanced>>) => {
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
            <PTableHeadCell key={i} sort={item} hideLabel={item.hideLabel}>
              {item.name}
            </PTableHeadCell>
          ))}
        </PTableHeadRow>
      </PTableHead>
      <PTableBody>
        {data.map((item, i) => (
          <PTableRow key={i}>
            <PTableCell>
              <PFlex>
                <PFlexItem>
                  <img src={item.imageUrl} width={80} height={45} style={{ marginRight: '.5rem' }} alt="" />
                </PFlexItem>
                <PFlexItem>
                  <PText weight="semibold">{item.model}</PText>
                  <PText size="x-small">{item.date}</PText>
                </PFlexItem>
              </PFlex>
            </PTableCell>
            <PTableCell>{item.interest}</PTableCell>
            <PTableCell>
              <a href="https://porsche.com">{item.vin}</a>
            </PTableCell>
            <PTableCell>{item.purchaseIntention}</PTableCell>
            <PTableCell>{item.status}</PTableCell>
            <PTableCell>{item.leadId}</PTableCell>
            <PTableCell>
              <PButtonPure icon="edit" style={{ padding: '.5rem' }}>
                Edit
              </PButtonPure>
              <PButtonPure icon="delete" style={{ padding: '.5rem' }}>
                Delete
              </PButtonPure>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
