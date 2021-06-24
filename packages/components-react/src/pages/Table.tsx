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
import { useEffect, useRef } from 'react';
import { headVrt as head, dataVrt as data } from '@porsche-design-system/shared';

export const TablePage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();

  // TODO: workaround to pass data via property since our react wrappers set attributes
  // as alternative we could also provide sort-active, sort-direction, sort-id,… and that's it.
  useEffect(() => {
    headRow.current.childNodes.forEach((node, i) => {
      (node as any).sort = head[i];
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
                  // sort={item}
                  hideLabel={item.hideLabel}
                  style={item.style}
                  dangerouslySetInnerHTML={{ __html: item.name }}
                />
              ))}
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            {data.map((item, i) => (
              <PTableRow key={i}>
                <PTableCell>
                  <img
                    src={item.imageUrl}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    style={{ marginRight: '.5rem' }}
                    alt=""
                  />
                  <span dangerouslySetInnerHTML={{ __html: item.html }} />
                </PTableCell>
                <PTableCell style={{ whiteSpace: 'normal' }}>{item.longText}</PTableCell>
                <PTableCell>{item.shortText}</PTableCell>
                <PTableCell>{item.shortText}</PTableCell>
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
      </div>

      <div className="playground light" title="should render table with unstyled slotted caption">
        <PTable>
          <span slot="caption">
            Some unstyled caption <a href="#">with a link</a>
          </span>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell>Column 1</PTableHeadCell>
              <PTableHeadCell>Column 2</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
        </PTable>
      </div>
    </>
  );
};
