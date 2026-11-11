import type { ScssVariable } from '@porsche-design-system/scss';
import { Code } from '../../content/Code/Code';
import { InlineMarkdown } from '../InlineMarkdown';
import { MetaTable } from '../MetaTable';

type ScssVariablesTableProps = {
  /** A flat list or a record of scss variable meta entries to render. */
  variables: ScssVariable[] | Record<string, ScssVariable>;
  /** Renders a leading color swatch column (for color variables). */
  showColorSwatch?: boolean;
};

export const ScssVariablesTable = ({ variables, showColorSwatch }: ScssVariablesTableProps) => (
  <MetaTable
    caption="List of SCSS variables with their descriptions and values."
    items={Array.isArray(variables) ? variables : Object.values(variables)}
    getKey={(variable) => variable.name}
    colorSwatch={showColorSwatch ? (variable) => String(variable.value) : undefined}
    columns={[
      { label: 'SCSS variable', cell: (variable) => <Code variant="nowrap">{variable.name}</Code> },
      {
        label: 'Description',
        cell: (variable) => <InlineMarkdown>{variable.description}</InlineMarkdown>,
        multiline: true,
      },
      { label: 'Value', cell: (variable) => <Code variant="value">{String(variable.value)}</Code>, multiline: true },
    ]}
  />
);
