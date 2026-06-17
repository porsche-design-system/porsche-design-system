import {
  PLinkPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { VanillaExtractMeta, VanillaExtractMetaEntry } from '@porsche-design-system/vanilla-extract/meta';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type StylesTableProps = {
  meta: VanillaExtractMeta;
  columnLabel?: string;
  showColorSwatch?: boolean;
  showValue?: boolean;
};

// Render Markdown bold (**text**), backtick code (`text`) and links ([text](url)) as React nodes
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
          <a href={linkMatch[2]} target="_blank" rel="noreferrer noopener">
            {linkMatch[1]}
          </a>
        </PLinkPure>
      );
    }
    return part;
  });
};

// Functions carry no displayable value; strings/numbers render verbatim, everything else as JSON
const renderValue = (value: VanillaExtractMetaEntry['value']): ReactNode => {
  if (typeof value === 'function') {
    return null;
  }
  const text = typeof value === 'string' || typeof value === 'number' ? String(value) : JSON.stringify(value);
  return <Code variant="value">{text}</Code>;
};

export const StylesTable = ({ meta, columnLabel = 'JS', showColorSwatch, showValue }: StylesTableProps) => {
  const items = Object.values(meta).filter(
    (entry): entry is VanillaExtractMetaEntry => 'name' in entry && !entry.deprecated
  );
  const hasValues = showValue ?? items.some((entry) => typeof entry.value !== 'function');

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
            {hasValues && <PTableCell multiline={true}>{renderValue(entry.value)}</PTableCell>}
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
