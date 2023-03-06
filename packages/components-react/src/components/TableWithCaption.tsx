import {
  PButtonPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  Theme,
} from '@porsche-design-system/components-react';
import { headVrt as head, dataVrt as data } from '@porsche-design-system/shared';

export const TableWithCaption = ({ theme }: { theme?: Theme }): JSX.Element => {
  return (
    <PTable caption="Some caption" theme={theme}>
      <PTableHead>
        <PTableHeadRow>
          {head.map((item, i) => (
            <PTableHeadCell
              key={i}
              sort={item}
              hideLabel={item.hideLabel}
              multiline={item.multiline}
              style={item.style}
              dangerouslySetInnerHTML={{ __html: item.name }}
              theme={theme}
            />
          ))}
        </PTableHeadRow>
      </PTableHead>
      <PTableBody>
        {data.map((item, i) => (
          <PTableRow key={i} theme={theme}>
            <PTableCell theme={theme}>
              <img
                src={item.imageUrl}
                width={item.imageWidth}
                height={item.imageHeight}
                style={{ marginRight: '.5rem' }}
                alt=""
              />
              <span dangerouslySetInnerHTML={{ __html: item.html }} />
            </PTableCell>
            <PTableCell multiline={true} theme={theme}>
              {item.longText}
            </PTableCell>
            <PTableCell theme={theme}>{item.shortText}</PTableCell>
            <PTableCell theme={theme}>{item.shortText}</PTableCell>
            <PTableCell theme={theme}>{item.shortText}</PTableCell>
            <PTableCell theme={theme}>
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
