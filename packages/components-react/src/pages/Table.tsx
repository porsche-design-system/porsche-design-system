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
} from '@porsche-design-system/components-react';
import { data, head } from '@porsche-design-system/shared';

export const TablePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light table" title="should render table">
        <PTable>
          <PTableHead>
            <PTableRow>
              {head.map((item) => (
                <PTableHeadCell key={(item as any).name} item={item} children={(item as any).name} />
              ))}
            </PTableRow>
          </PTableHead>
          <PTableBody>
            {data.map((item) => (
              <PTableRow>
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
