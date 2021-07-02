import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
} from '@porsche-design-system/components-react';
import { headBasic, dataBasic } from '@porsche-design-system/shared';

export const TableExampleBasicPage = (): JSX.Element => {
  return (
    <PTable caption="Some caption">
      <PTableHead>
        <PTableHeadRow>
          {headBasic.map((item, i) => (
            <PTableHeadCell key={i}>{item}</PTableHeadCell>
          ))}
        </PTableHeadRow>
      </PTableHead>
      <PTableBody>
        {dataBasic.map((item, i) => (
          <PTableRow key={i}>
            <PTableCell>{item.model}</PTableCell>
            <PTableCell>{item.date}</PTableCell>
            <PTableCell>{item.interest}</PTableCell>
            <PTableCell>{item.status}</PTableCell>
            <PTableCell>{item.leadId}</PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
