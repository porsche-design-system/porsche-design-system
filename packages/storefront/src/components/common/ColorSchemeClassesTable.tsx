import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { ColorSchemeClassMeta } from '@porsche-design-system/global-styles-meta';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type ColorSchemeClassesTableProps = {
  classes: ColorSchemeClassMeta[];
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

export const ColorSchemeClassesTable = ({ classes }: ColorSchemeClassesTableProps) => (
  <PTable className="my-fluid-md" caption="List of color-scheme utility classes with their usage and descriptions.">
    <PTableHead>
      <PTableRow>
        <PTableHeadCell>CSS class</PTableHeadCell>
        <PTableHeadCell>Usage</PTableHeadCell>
        <PTableHeadCell>Description</PTableHeadCell>
      </PTableRow>
    </PTableHead>
    <PTableBody>
      {classes.map((schemeClass) => (
        <PTableRow key={schemeClass.selector}>
          <PTableCell>
            <Code variant="nowrap">{schemeClass.selector}</Code>
          </PTableCell>
          <PTableCell multiline={true}>
            <Code variant="value">{schemeClass.usage}</Code>
          </PTableCell>
          <PTableCell multiline={true}>{renderDescription(schemeClass.description)}</PTableCell>
        </PTableRow>
      ))}
    </PTableBody>
  </PTable>
);
