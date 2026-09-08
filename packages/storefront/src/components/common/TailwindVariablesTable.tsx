import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { TailwindThemeVariable } from '@porsche-design-system/tailwindcss';
import { Fragment, type ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type TailwindVariablesTableProps = {
  /** A flat list or a record of Tailwind theme variable meta entries to render. */
  variables: TailwindThemeVariable[] | Record<string, TailwindThemeVariable>;
  /** Renders a leading color swatch column (for color variables). */
  showColorSwatch?: boolean;
};

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

export const TailwindVariablesTable = ({ variables, showColorSwatch }: TailwindVariablesTableProps) => {
  const items = Array.isArray(variables) ? variables : Object.values(variables);

  return (
    <PTable className="my-fluid-md" caption="List of Tailwind CSS variables with their classes, descriptions and values.">
      <PTableHead>
        <PTableRow>
          {showColorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>Tailwind CSS variable</PTableHeadCell>
          <PTableHeadCell>Tailwind CSS class</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>Value</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {items.map((variable) => (
          <PTableRow key={variable.property}>
            {showColorSwatch && (
              <PTableCell>
                <div
                  className="w-10 h-10 rounded-md border border-contrast-low"
                  style={{ background: `var(${variable.property})` }}
                />
              </PTableCell>
            )}
            <PTableCell>
              <Code variant="nowrap">{variable.property}</Code>
            </PTableCell>
            <PTableCell>
              {variable.classes?.map((className, i) => (
                <Fragment key={className}>
                  {i > 0 && ' '}
                  <Code variant="nowrap">{className}</Code>
                </Fragment>
              ))}
            </PTableCell>
            <PTableCell multiline={true}>{renderDescription(variable.description)}</PTableCell>
            <PTableCell multiline={true}>
              <Code variant="value">{String(variable.value)}</Code>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
