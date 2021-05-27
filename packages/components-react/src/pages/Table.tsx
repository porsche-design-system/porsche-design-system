import {
  PButton,
  PButtonPure,
  PFlex,
  PFlexItem,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
  PText,
  TableHeadItem,
} from '@porsche-design-system/components-react';
import { data as rawData, head as rawHead } from '@porsche-design-system/shared';
import { useCallback, useEffect, useRef, useState } from 'react';

export const TablePage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();
  const [head, setHead] = useState(rawHead);
  const [data, setData] = useState(rawData);

  const onSortingChange = useCallback((e: CustomEvent<TableHeadItem>) => {
    const { key, direction } = e.detail;
    setHead((prev) => prev.map((x) => ({ ...x, isSorting: false, ...(x.key === key && e.detail) })));
    setData((prev) =>
      [...prev].sort((a, b) =>
        // @ts-ignore
        direction === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
      )
    );
  }, []);

  // workaround to pass data via property since our react wrappers set attributes
  useEffect(() => {
    headRow.current.childNodes.forEach((node, i) => {
      (node as any).item = head[i];
    });
  }, [head]);

  return (
    <>
      <div className="playground light table" title="should render table">
        <PTable onSortingChange={onSortingChange}>
          <PTableHead>
            <PTableRow ref={headRow}>
              {head.map((item, i) => (
                <PTableHeadCell key={i} item={item} children={item.name} />
              ))}
            </PTableRow>
          </PTableHead>
          <PTableBody>
            {data.map((item) => (
              <PTableRow key={item.leadId}>
                <PTableCell>
                  <PFlex>
                    <PFlexItem>
                      <img src={item.imageUrl} width="80" style={{ marginRight: 8 }} alt="" />
                    </PFlexItem>
                    <PFlexItem>
                      <PText weight="semibold">{item.model}</PText>
                      <PText size="x-small">{item.date}</PText>
                    </PFlexItem>
                  </PFlex>
                </PTableCell>
                <PTableCell>{item.interest}</PTableCell>
                <PTableCell>{item.vin}</PTableCell>
                <PTableCell>{item.purchaseIntention}</PTableCell>
                <PTableCell>{item.status}</PTableCell>
                <PTableCell>{item.leadId}</PTableCell>
                <PTableCell>
                  <PButtonPure icon="edit">
                    <span style={{ whiteSpace: 'nowrap' }}>Edit Lead</span>
                  </PButtonPure>
                </PTableCell>
                <PTableCell>
                  <PButton variant="tertiary" icon="refresh">
                    <span style={{ whiteSpace: 'nowrap' }}>Overwrite</span>
                  </PButton>
                </PTableCell>
              </PTableRow>
            ))}
          </PTableBody>
        </PTable>
      </div>
    </>
  );
};
