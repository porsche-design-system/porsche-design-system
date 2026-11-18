import type { EmotionBranch, EmotionNode } from '@porsche-design-system/emotion/meta';
import type { VanillaExtractBranch, VanillaExtractNode } from '@porsche-design-system/vanilla-extract/meta';
import { Code } from '../../content/Code/Code';
import { InlineMarkdown } from '../InlineMarkdown';
import { MetaTable, type MetaTableColumn } from '../MetaTable';

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

// Functions carry no displayable value; strings/numbers render verbatim, everything else as JSON
const renderValue = (payload: unknown) => {
  if (typeof payload === 'function') {
    return null;
  }
  const text = typeof payload === 'string' || typeof payload === 'number' ? String(payload) : JSON.stringify(payload);
  return <Code variant="value">{text}</Code>;
};

export const StylesTable = ({ meta, columnLabel = 'JS', showColorSwatch, showValue }: StylesTableProps) => {
  const items = flattenEntries(meta);
  const hasValues = showValue ?? items.some((entry) => typeof payloadOf(entry) !== 'function');
  const columns: MetaTableColumn<MetaEntry>[] = [
    { label: columnLabel, cell: (entry) => <Code variant="nowrap">{entry.name}</Code> },
    { label: 'Description', cell: (entry) => <InlineMarkdown>{entry.description}</InlineMarkdown>, multiline: true },
    ...(hasValues
      ? [{ label: 'Value', cell: (entry: MetaEntry) => renderValue(payloadOf(entry)), multiline: true }]
      : []),
  ];

  return (
    <MetaTable
      caption="List of style utilities with their descriptions and values."
      items={items}
      getKey={(entry) => entry.name}
      colorSwatch={showColorSwatch ? (entry) => String(payloadOf(entry)) : undefined}
      columns={columns}
    />
  );
};
