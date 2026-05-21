import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { TokenMeta } from '@porsche-design-system/tokens-meta';
import { kebabCase } from 'change-case';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type TokensTableProps = {
  meta: Record<string, TokenMeta>;
  showColorSwatch?: boolean;
};

// Convert a camelCase token name to a PDS CSS custom property, e.g. colorCanvas → --p-color-canvas
const toCssVar = (name: string): string => `--p-${kebabCase(name)}`;

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

export const TokensTable = ({ meta, showColorSwatch }: TokensTableProps) => {
  const items = Object.values(meta);

  return (
    <PTable className="my-fluid-md">
      <PTableHead>
        <PTableRow>
          {showColorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>Token</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>Value</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {items.map((token) => (
          <PTableRow key={token.name}>
            {showColorSwatch && (
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
