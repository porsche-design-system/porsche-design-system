import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { TokenMeta } from '@porsche-design-system/tokens-meta';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

// Render Markdown bold (**text**) and backtick code (`text`) as React nodes
const renderDescription = (description: string): ReactNode => {
  const parts = description.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

export type SortDirection = 'asc' | 'desc' | 'none';

type TokensTableProps = {
  meta: TokenMeta[];
  group?: string;
  sort?: SortDirection;
};

// Convert camelCase token name to kebab-case CSS var, e.g. colorCanvas → --p-color-canvas
const toCssVar = (name: string): string => `--p-${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;

const isColorToken = (meta: TokenMeta[]): boolean => meta.length > 0 && meta[0].category === 'color';

export const TokensTable = ({ meta, group, sort = 'none' }: TokensTableProps) => {
  let filtered = group ? meta.filter((t) => t.group === group) : meta;

  if (sort !== 'none') {
    // Extract a sortable number: handle plain values ("8px") and clamp() ("clamp(4px, ...)")
    const toSortNum = (value: string): number => {
      const clampMatch = value.match(/clamp\(\s*([\d.]+)/);
      if (clampMatch) return parseFloat(clampMatch[1]);
      return parseFloat(value);
    };

    filtered = [...filtered].sort((a, b) => {
      const numA = toSortNum(a.value);
      const numB = toSortNum(b.value);
      const isNumeric = !Number.isNaN(numA) && !Number.isNaN(numB);
      const cmp = isNumeric ? numA - numB : a.value.localeCompare(b.value);
      return sort === 'asc' ? cmp : -cmp;
    });
  }

  const showSwatch = isColorToken(filtered);

  return (
    <PTable className="my-fluid-md" caption="table">
      <PTableHead>
        <PTableRow>
          {showSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>Token</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>Value</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {filtered.map((token) => (
          <PTableRow key={token.name}>
            {showSwatch && (
              <PTableCell>
                <div
                  className="w-10 h-10 rounded-md border border-contrast-low"
                  style={{ background: `var(${toCssVar(token.name)})` }}
                />
              </PTableCell>
            )}
            <PTableCell>
              <Code variant="nowrap">{token.name}</Code>
            </PTableCell>
            <PTableCell multiline={true}>{renderDescription(token.description)}</PTableCell>
            <PTableCell multiline={true}>
              <Code variant="value">{token.value}</Code>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
