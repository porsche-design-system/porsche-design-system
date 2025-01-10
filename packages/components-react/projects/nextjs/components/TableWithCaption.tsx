import {
  PButtonPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  type TableHeadCellSort,
  type Theme,
} from '@porsche-design-system/components-react/ssr';
import { dataVrt as data, headVrt as head } from '@porsche-design-system/shared/esm/data';
import Image from 'next/image';

// NOTE: this component is duplicated and adjusted from react
export const TableWithCaption = ({ theme }: { theme?: Theme }): JSX.Element => {
  return (
    <PTable caption="Some caption" theme={theme}>
      <PTableHead>
        <PTableHeadRow>
          {head.map((item, i) => (
            <PTableHeadCell
              key={i}
              sort={item.direction as unknown as TableHeadCellSort}
              hideLabel={item.hideLabel}
              multiline={item.multiline}
              style={item.style as React.CSSProperties}
            >
              <span dangerouslySetInnerHTML={{ __html: item.name }} />
            </PTableHeadCell>
          ))}
        </PTableHeadRow>
      </PTableHead>
      <PTableBody>
        {data.map((item, i) => (
          <PTableRow key={i}>
            <PTableCell>
              <Image
                src={item.imageUrl}
                width={item.imageWidth}
                height={item.imageHeight}
                style={{ marginRight: '.5rem' }}
                alt=""
              />
              <span dangerouslySetInnerHTML={{ __html: item.html }} />
            </PTableCell>
            <PTableCell multiline={true}>{item.longText}</PTableCell>
            <PTableCell>{item.shortText}</PTableCell>
            <PTableCell>{item.shortText}</PTableCell>
            <PTableCell>{item.shortText}</PTableCell>
            <PTableCell>
              <PButtonPure theme={theme} icon="edit" style={{ padding: '.5rem' }}>
                Edit
              </PButtonPure>
              <PButtonPure theme={theme} icon="delete" style={{ padding: '.5rem' }}>
                Delete
              </PButtonPure>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
