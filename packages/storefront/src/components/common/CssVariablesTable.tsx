import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { CssVariableMeta } from '@porsche-design-system/stylesheets/meta';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type CssVariablesTableProps = {
  /** A flat list or a record of CSS variable meta entries to render. */
  variables: CssVariableMeta[] | Record<string, CssVariableMeta>;
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

export const CssVariablesTable = ({ variables, showColorSwatch }: CssVariablesTableProps) => {
  const items = Array.isArray(variables) ? variables : Object.values(variables);

  return (
    <PTable className="my-fluid-md" caption="List of CSS variables with their descriptions and values.">
      <PTableHead>
        <PTableRow>
          {showColorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>CSS variable</PTableHeadCell>
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
            <PTableCell multiline={true}>{renderDescription(variable.description)}</PTableCell>
            <PTableCell multiline={true}>
              <Code variant="value">{variable.value}</Code>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
