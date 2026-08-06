import {
  PLinkPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { EmotionBranch, EmotionNode } from '@porsche-design-system/emotion/meta';
import type { VanillaExtractBranch, VanillaExtractNode } from '@porsche-design-system/vanilla-extract/meta';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

// StylesTable renders the emotion and vanilla-extract catalogs, whose meta types are identical; reuse
// the exported leaf/branch types instead of re-declaring the shape. The prop is a record of branches
// (not the `*Meta` root) because pages pass sub-trees and ad-hoc groups, e.g. `emotionMeta.color.background`.
type MetaEntry = EmotionNode | VanillaExtractNode;
type MetaBranch = EmotionBranch | VanillaExtractBranch;
type Meta = Record<string, MetaBranch>;

// A leaf carries a `name`; records/arrays only group. Recursively collect the leaves in source order
// so the table renders both the flat domains and the nested grid tree uniformly.
const isLeaf = (node: MetaBranch): node is MetaEntry => 'name' in node;
const flattenEntries = (node: MetaBranch): MetaEntry[] =>
  isLeaf(node) ? [node] : (Array.isArray(node) ? node : Object.values(node)).flatMap(flattenEntries);

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
  const items = flattenEntries(meta);
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
