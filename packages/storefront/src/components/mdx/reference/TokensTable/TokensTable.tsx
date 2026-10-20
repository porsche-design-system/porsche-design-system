import type { TokenMeta } from '@porsche-design-system/tokens-meta';
import { Code } from '../../content/Code/Code';
import { InlineMarkdown } from '../InlineMarkdown';
import { MetaTable } from '../MetaTable';

type TokensTableProps = {
  meta: Record<string, TokenMeta>;
  showColorSwatch?: boolean;
};

export const TokensTable = ({ meta, showColorSwatch }: TokensTableProps) => (
  <MetaTable
    caption="List of design tokens with their descriptions and values."
    items={Object.values(meta)}
    getKey={(token) => token.name}
    colorSwatch={showColorSwatch ? (token) => String(token.value) : undefined}
    columns={[
      { label: 'Token', cell: (token) => <Code variant="nowrap">{token.name}</Code> },
      { label: 'Description', cell: (token) => <InlineMarkdown>{token.description}</InlineMarkdown>, multiline: true },
      { label: 'Value', cell: (token) => <Code variant="value">{token.value}</Code>, multiline: true },
    ]}
  />
);
