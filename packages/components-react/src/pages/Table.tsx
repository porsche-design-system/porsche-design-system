import { PTable, PTableHead, PTableHeadCell, PTableHeadRow } from '@porsche-design-system/components-react';
import { TableWithCaption } from '../components';

export const TablePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render table on light background">
        <TableWithCaption />
      </div>

      <div className="playground dark" title="should render table on dark background">
        <TableWithCaption />
      </div>

      <div className="playground light" title="should render table with unstyled slotted caption on light background">
        <PTable>
          <span slot="caption">
            Some unstyled caption <a href="https://porsche.com">with a link</a>
          </span>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell>Column 1</PTableHeadCell>
              <PTableHeadCell>Column 2</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
        </PTable>
      </div>

      <div className="playground dark" title="should render table with unstyled slotted caption on dark background">
        <PTable>
          <span slot="caption">
            Some unstyled caption <a href="https://porsche.com">with a link</a>
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
