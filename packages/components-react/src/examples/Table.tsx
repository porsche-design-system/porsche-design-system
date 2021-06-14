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

const rawHead: any[] = [
  { name: 'Slotted Styles' },
  { name: 'Interest', sort: { id: 'interest', active: false, direction: 'asc' } },
  { name: 'Slotted Styles', sort: { id: 'vin', active: false, direction: 'asc' } },
  { name: 'Purchase Intention', sort: { id: 'purchaseIntention', active: true, direction: 'asc' } },
  { name: 'Status', sort: { id: 'status', active: false, direction: 'asc' } },
  { name: 'Lead ID', sort: { id: 'leadId', active: false, direction: 'asc' } },
  { name: 'Action', hideLabel: true },
];

const rawData: any[] = [
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'New Car',
    vin: '-',
    purchaseIntention: '08.2020',
    status: 'Won',
    leadId: '0000824402',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/taycan@2x.jpg',
    model: 'Taycan',
    date: '03.05.2021',
    interest: 'New Car',
    vin: '-',
    purchaseIntention: '11.2020',
    status: 'Lost',
    leadId: '0000824409',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'Used Car',
    vin: '-',
    purchaseIntention: '09.2020',
    status: 'Won',
    leadId: '0000824408',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg',
    model: '911 Carrera S',
    date: '03.05.2021',
    interest: 'Used Car',
    vin: '-',
    purchaseIntention: '04.2020',
    status: 'Lost',
    leadId: '0000824407',
  },
  {
    imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/macan@2x.jpg',
    model: 'Macan S',
    date: '03.05.2021',
    interest: 'New Car',
    vin: '-',
    purchaseIntention: '03.2020',
    status: 'Won',
    leadId: '0000824406',
  },
];

export const TablePage = (): JSX.Element => {
  const headRow = useRef<HTMLElement>();
  const [head, setHead] = useState(rawHead);
  const [data, setData] = useState(rawData);

  const onSortingChange = useCallback((e: CustomEvent<TableHeadCellSort>) => {
    const { id, direction } = e.detail;
    setHead((prev) => {
      return prev.map((x) => ({
        ...x,
        ...(x.sort && { sort: { ...x.sort, active: false } }),
        ...(x.sort && x.sort.id === id && { sort: e.detail }),
      }));
    });
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
      (node as any).sort = head[i].sort;
    });
  }, [head]);

  return (
    <>
      <div className="playground light table" title="should render table">
        <PTable caption="Some caption" onSortingChange={onSortingChange}>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell>Slotted Styles</PTableHeadCell>
              <PTableHeadCell>Multiline text</PTableHeadCell>
              <PTableHeadCell style={{ minWidth: 300 }}>Min width cell</PTableHeadCell>
              <PTableHeadCell sort={{ id: 'vin', active: false, direction: 'asc' }}>
                Multiline
                <br />
                header
                <br />
                cell
              </PTableHeadCell>
              <PTableHeadCell hideLabel>Actions</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            {[0, 1, 2].map((item, i) => (
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
      <div className="playground light table" title="should render table">
        <PTable caption="Some caption" onSortingChange={onSortingChange}>
          <PTableHead>
            <PTableHeadRow ref={headRow}>
              {head.map((item, i) => (
                <PTableHeadCell key={i} sort={item.sort} hideLabel={item.hideLabel}>
                  {item.name === 'Purchase Intention' ? (
                    <span>
                      Purchase
                      <br />
                      Intention
                    </span>
                  ) : (
                    item.name
                  )}
                </PTableHeadCell>
              ))}
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            {data.map((item) => (
              <PTableRow key={item.leadId}>
                <PTableCell>
                  <img src={item.imageUrl} width="80" height="48" style={{ marginRight: '.5rem' }} alt="" />
                </PTableCell>
                <PTableCell>
                  <a href="#">Some link</a> <b>some bold text</b> <i>some italic text</i>{' '}
                  <strong>some strong text</strong> <em>some emphasized text</em>
                </PTableCell>
                <PTableCell></PTableCell>
                <PTableCell>{item.purchaseIntention}</PTableCell>
                <PTableCell>{item.status}</PTableCell>
                <PTableCell>{item.leadId}</PTableCell>
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
