import {
  PButtonPure,
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
import { head as rawHead, data as rawData } from '@porsche-design-system/shared';

export const TableExamplePage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();
  const [head, setHead] = useState(rawHead);
  const [data, setData] = useState(rawData);

  const onSortingChange = useCallback((e: CustomEvent<TableHeadCellSort>) => {
    const { id, direction } = e.detail;
    setHead((prev) =>
      prev.map((x) => ({
        ...x,
        active: false,
        ...(x.id === id && { sort: e.detail }),
      }))
    );
    setData((prev) =>
      [...prev].sort((a, b) => {
        // @ts-ignore
        return direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
      })
    );
  }, []);

  // TODO: workaround to pass data via property since our react wrappers set attributes
  // as alternative we could also provide sort-active, sort-direction, sort-id,… and that's it.
  useEffect(() => {
    headRow.current.childNodes.forEach((node, i) => {
      (node as any).sort = head[i];
    });
  }, [head]);

  return (
    <>
      <div className="playground light table" title="should render table">
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
                  <img
                    src="https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg"
                    width="80"
                    height="48"
                    style={{ marginRight: '.5rem' }}
                    alt=""
                  />
                  <a href="#">link</a> <b>bold</b> <i>italic</i> <strong>strong</strong> <em>emphasized</em>
                </PTableCell>
                <PTableCell style={{ whiteSpace: 'normal' }}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                </PTableCell>
                <PTableCell>Some text</PTableCell>
                <PTableCell>Some text</PTableCell>
                <PTableCell>
                  <PButtonPure style={{ padding: '.5rem' }} icon="delete">
                    Edit
                  </PButtonPure>
                  <PButtonPure style={{ padding: '.5rem' }} icon="delete">
                    Delete
                  </PButtonPure>
                </PTableCell>
              </PTableRow>
            ))}
          </PTableBody>
        </PTable>
      </div>
    </>
  );
};
