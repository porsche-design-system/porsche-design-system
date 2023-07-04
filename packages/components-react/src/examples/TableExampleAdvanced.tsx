import {
  PButtonPure,
  PHeading,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  PText,
  type TableUpdateEvent,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';
import { dataAdvanced, type DataAdvanced, headAdvanced } from '@porsche-design-system/shared';

export const TableExampleAdvancedPage = (): JSX.Element => {
  const [head, setHead] = useState(headAdvanced);
  const [data, setData] = useState(dataAdvanced);

  const onUpdate = useCallback((e: CustomEvent<TableUpdateEvent>) => {
    const { id, direction } = e.detail as TableUpdateEvent & { id: keyof DataAdvanced };
    setHead((prev) => prev.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) })));
    setData((prev) =>
      [...prev].sort((a, b) => {
        return direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
      })
    );
  }, []);

  return (
    <PTable onUpdate={onUpdate}>
      <PHeading slot="caption" size="large">
        Some visual caption
      </PHeading>
      <PTableHead>
        <PTableHeadRow>
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
              <div style={{ display: 'flex' }}>
                <img src={item.imageUrl} width={80} height={45} style={{ marginRight: '.5rem' }} alt="" />
                <div>
                  <PText weight="semi-bold">{item.model}</PText>
                  <PText size="x-small">{item.date}</PText>
                </div>
              </div>
            </PTableCell>
            <PTableCell>{item.interest}</PTableCell>
            <PTableCell>
              <a href="https://porsche.com">{item.vin}</a>
            </PTableCell>
            <PTableCell>{item.purchaseIntention}</PTableCell>
            <PTableCell>{item.status}</PTableCell>
            <PTableCell multiline={true} style={{ minWidth: '10rem' }}>
              {item.comment}
            </PTableCell>
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
