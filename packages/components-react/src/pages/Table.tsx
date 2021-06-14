import {
  PButtonPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
} from '@porsche-design-system/components-react';
import { useEffect, useRef, useState } from 'react';

const rawHead: any[] = [
  { name: 'Slotted Styles', sort: { id: 'some-id', active: false, direction: 'asc' } },
  { name: 'Multiline text', sort: { id: 'some-id', active: true, direction: 'desc' } },
  { name: 'Min width cell', style: { minWidth: 250 } },
  { name: 'Multiline<br/>header<br/>cell', sort: { id: 'some-id', active: true, direction: 'asc' } },
  { name: 'Hide header cell', hideLabel: true },
];

export const TablePage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();
  const [head, setHead] = useState(rawHead);

  // TODO: workaround to pass data via property since our react wrappers set attributes
  // as alternative we could also provide sort-active, sort-direction, sort-id,… and that's it.
  useEffect(() => {
    headRow.current.childNodes.forEach((node, i) => {
      (node as any).sort = head[i].sort;
    });
  }, [head]);

  return (
    <>
      <div className="playground light" title="should render table">
        <PTable caption="Some caption">
          <PTableHead>
            <PTableHeadRow ref={headRow}>
              {head.map((item, i) => (
                <PTableHeadCell
                  key={i}
                  sort={item.sort}
                  hideLabel={item.hideLabel}
                  style={item.style}
                  dangerouslySetInnerHTML={{ __html: item.name }}
                />
              ))}
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            {[0, 1, 2, 3].map((item, i) => (
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
                  <PButtonPure style={{ padding: '.5rem' }} icon="edit">
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
