import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { ScssVariable } from '@porsche-design-system/scss';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type ScssVariablesTableProps = {
  /** A flat list or a record of scss variable meta entries to render. */
  variables: ScssVariable[] | Record<string, ScssVariable>;
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

export const ScssVariablesTable = ({ variables, showColorSwatch }: ScssVariablesTableProps) => {
  const items = Array.isArray(variables) ? variables : Object.values(variables);

  return (
    <PTable className="my-fluid-md" caption="List of SCSS variables with their descriptions and values.">
      <PTableHead>
        <PTableRow>
          {showColorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>SCSS variable</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>Value</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {items.map((variable) => (
          <PTableRow key={variable.name}>
            {showColorSwatch && (
              <PTableCell>
                <div
                  className="w-10 h-10 rounded-md border border-contrast-low"
                  style={{ background: String(variable.value) }}
                />
              </PTableCell>
            )}
            <PTableCell>
              <Code variant="nowrap">{variable.name}</Code>
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
