import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { TailwindUtility } from '@porsche-design-system/tailwindcss';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type TailwindUtilitiesTableProps = {
  utilities: TailwindUtility[];
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

export const TailwindUtilitiesTable = ({ utilities }: TailwindUtilitiesTableProps) => (
  <PTable className="my-fluid-md" caption="List of Tailwind @utility CSS classes with their descriptions.">
    <PTableHead>
      <PTableRow>
        <PTableHeadCell>Tailwind @utility CSS class</PTableHeadCell>
        <PTableHeadCell>Description</PTableHeadCell>
      </PTableRow>
    </PTableHead>
    <PTableBody>
      {utilities.map((utility) => (
        <PTableRow key={utility.class}>
          <PTableCell>
            <Code variant="nowrap">{utility.class}</Code>
          </PTableCell>
          <PTableCell multiline={true}>{renderDescription(utility.description)}</PTableCell>
        </PTableRow>
      ))}
    </PTableBody>
  </PTable>
);
