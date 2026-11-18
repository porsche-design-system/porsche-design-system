import type { CssVariableMeta } from '@porsche-design-system/stylesheets/meta';
import { Code } from '../../content/Code/Code';
import { InlineMarkdown } from '../InlineMarkdown';
import { MetaTable } from '../MetaTable';

type CssVariablesTableProps = {
  /** A flat list or a record of CSS variable meta entries to render. */
  variables: CssVariableMeta[] | Record<string, CssVariableMeta>;
  /** Renders a leading color swatch column (for color variables). */
  showColorSwatch?: boolean;
};

export const CssVariablesTable = ({ variables, showColorSwatch }: CssVariablesTableProps) => (
  <MetaTable
    caption="List of CSS variables with their descriptions and values."
    items={Array.isArray(variables) ? variables : Object.values(variables)}
    getKey={(variable) => variable.property}
    colorSwatch={showColorSwatch ? (variable) => `var(${variable.property})` : undefined}
    columns={[
      { label: 'CSS variable', cell: (variable) => <Code variant="nowrap">{variable.property}</Code> },
      {
        label: 'Description',
        cell: (variable) => <InlineMarkdown>{variable.description}</InlineMarkdown>,
        multiline: true,
      },
      { label: 'Value', cell: (variable) => <Code variant="value">{variable.value}</Code>, multiline: true },
    ]}
  />
);
