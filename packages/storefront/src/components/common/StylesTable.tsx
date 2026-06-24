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

// Structural entry type covering both meta shapes: the legacy single-`value` model and the aligned
// token/utility split (tokens carry `value`, utilities carry `styles`). Kept local so the table
// works for every styling solution regardless of which package's meta it renders.
type MetaEntry = {
  name: string;
  description: string;
  value?: string | number | readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
  styles?: readonly unknown[] | Record<string, unknown> | ((...args: any[]) => unknown);
  deprecated?: boolean;
};

type Meta = Record<string, MetaEntry | Record<string, MetaEntry>>;

// A leaf's displayable payload lives under `value` (token) or `styles` (utility).
const payloadOf = (entry: MetaEntry): unknown => ('value' in entry ? entry.value : entry.styles);

type StylesTableProps = {
  meta: Meta;
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
const renderValue = (payload: unknown): ReactNode => {
  if (typeof payload === 'function') {
    return null;
  }
  const text = typeof payload === 'string' || typeof payload === 'number' ? String(payload) : JSON.stringify(payload);
  return <Code variant="value">{text}</Code>;
};

export const StylesTable = ({ meta, columnLabel = 'JS', showColorSwatch, showValue }: StylesTableProps) => {
  const items = Object.values(meta).filter(
    (entry): entry is MetaEntry => 'name' in entry && !(entry as MetaEntry).deprecated
  );
  const hasValues = showValue ?? items.some((entry) => typeof payloadOf(entry) !== 'function');

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
                  style={{ background: String(payloadOf(entry)) }}
                />
              </PTableCell>
            )}
            <PTableCell>
              <Code variant="nowrap">{entry.name}</Code>
            </PTableCell>
            <PTableCell multiline={true}>{renderDescription(entry.description)}</PTableCell>
            {hasValues && <PTableCell multiline={true}>{renderValue(payloadOf(entry))}</PTableCell>}
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
