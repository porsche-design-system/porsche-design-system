import {
  PLinkPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type MetaEntry = {
  name: string;
  value?: string | number;
  description: string;
};

type StylesTableProps = {
  meta: Record<string, MetaEntry>;
  columnLabel?: string;
  showColorSwatch?: boolean;
};

// Render Markdown bold (**text**), backtick code (`text`), and links ([text](url)) as React nodes
const renderDescription = (description: string): ReactNode => {
  const parts = description.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <PLinkPure key={i} icon="none" underline={true}>
          <a href={linkMatch[2]} target="_blank" rel="noreferrer">
            {linkMatch[1]}
          </a>
        </PLinkPure>
      );
    }
    return part;
  });
};

export const StylesTable = ({ meta, columnLabel = 'Style', showColorSwatch }: StylesTableProps) => {
  const items = Object.values(meta);
  const hasValues = items.some((entry) => entry.value !== undefined);

  return (
    <PTable className="my-fluid-md" caption="List of style utilities with their descriptions and values.">
      <PTableHead>
        <PTableRow>
          {showColorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>{columnLabel}</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          {hasValues && <PTableHeadCell>Value</PTableHeadCell>}
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {items.map((entry) => (
          <PTableRow key={entry.name}>
            {showColorSwatch && (
              <PTableCell>
                <div
                  className="w-10 h-10 rounded-md border border-contrast-low"
                  style={{ background: String(entry.value) }}
                />
              </PTableCell>
            )}
            <PTableCell>
              <Code variant="nowrap">{entry.name}</Code>
            </PTableCell>
            <PTableCell multiline={true}>{renderDescription(entry.description)}</PTableCell>
            {hasValues && (
              <PTableCell multiline={true}>
                {entry.value !== undefined ? <Code variant="value">{String(entry.value)}</Code> : null}
              </PTableCell>
            )}
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
