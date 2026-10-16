import type { TailwindThemeVariable } from '@porsche-design-system/tailwindcss';
import { Fragment } from 'react';
import { Code } from '../Code/Code';
import { InlineMarkdown } from '../shared/InlineMarkdown';
import { MetaTable } from '../shared/MetaTable';

type TailwindVariablesTableProps = {
  /** A flat list or a record of Tailwind theme variable meta entries to render. */
  variables: TailwindThemeVariable[] | Record<string, TailwindThemeVariable>;
  /** Renders a leading color swatch column (for color variables). */
  showColorSwatch?: boolean;
};

export const TailwindVariablesTable = ({ variables, showColorSwatch }: TailwindVariablesTableProps) => (
  <MetaTable
    caption="List of Tailwind CSS variables with their classes, descriptions and values."
    items={Array.isArray(variables) ? variables : Object.values(variables)}
    getKey={(variable) => variable.property}
    colorSwatch={showColorSwatch ? (variable) => `var(${variable.property})` : undefined}
    columns={[
      { label: 'Tailwind CSS variable', cell: (variable) => <Code variant="nowrap">{variable.property}</Code> },
      {
        label: 'Tailwind CSS class',
        cell: (variable) =>
          variable.classes?.map((className, i) => (
            <Fragment key={className}>
              {i > 0 && ' '}
              <Code variant="nowrap">{className}</Code>
            </Fragment>
          )),
      },
      {
        label: 'Description',
        cell: (variable) => <InlineMarkdown>{variable.description}</InlineMarkdown>,
        multiline: true,
      },
      { label: 'Value', cell: (variable) => <Code variant="value">{String(variable.value)}</Code>, multiline: true },
    ]}
  />
);
