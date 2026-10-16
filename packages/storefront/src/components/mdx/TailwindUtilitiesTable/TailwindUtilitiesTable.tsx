import type { TailwindUtility } from '@porsche-design-system/tailwindcss';
import { Code } from '../Code/Code';
import { InlineMarkdown } from '../shared/InlineMarkdown';
import { MetaTable } from '../shared/MetaTable';

// A utilities branch: a leaf, an array, or a nested record (e.g. the grid area tree).
type UtilityBranch = TailwindUtility | UtilityBranch[] | { [key: string]: UtilityBranch };

type TailwindUtilitiesTableProps = {
  utilities: UtilityBranch;
};

// A leaf carries a `class`; records/arrays only group. Recursively collect the leaves in source order
// so the table renders both flat utility arrays and the nested grid tree uniformly.
const isLeaf = (node: UtilityBranch): node is TailwindUtility => 'class' in node;
const flattenUtilities = (node: UtilityBranch): TailwindUtility[] =>
  isLeaf(node) ? [node] : (Array.isArray(node) ? node : Object.values(node)).flatMap(flattenUtilities);

export const TailwindUtilitiesTable = ({ utilities }: TailwindUtilitiesTableProps) => (
  <MetaTable
    caption="List of Tailwind @utility CSS classes with their descriptions."
    items={flattenUtilities(utilities)}
    getKey={(utility) => utility.class}
    columns={[
      { label: 'Tailwind @utility CSS class', cell: (utility) => <Code variant="nowrap">{utility.class}</Code> },
      {
        label: 'Description',
        cell: (utility) => <InlineMarkdown>{utility.description}</InlineMarkdown>,
        multiline: true,
      },
    ]}
  />
);
