import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { ScssMixin } from '@porsche-design-system/scss';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

type ScssMixinsTableProps = {
  /** A flat list of scss mixin meta entries to render. */
  mixins: ScssMixin[];
};

// Render Markdown bold (**text**), backtick code (`text`) and links ([text](url)) as React nodes
const renderDescription = (description: string): ReactNode => {
  const parts = description.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      );
    }
    return part;
  });
};

export const ScssMixinsTable = ({ mixins }: ScssMixinsTableProps) => (
  <PTable className="my-fluid-md" caption="List of SCSS mixins with their include signatures and descriptions.">
    <PTableHead>
      <PTableRow>
        <PTableHeadCell>SCSS mixin</PTableHeadCell>
        <PTableHeadCell>Description</PTableHeadCell>
      </PTableRow>
    </PTableHead>
    <PTableBody>
      {mixins.map((mixin) => (
        <PTableRow key={mixin.name}>
          <PTableCell>
            <Code variant="nowrap">{`@include ${mixin.name}${mixin.signature ?? ''}`}</Code>
          </PTableCell>
          <PTableCell multiline={true}>{renderDescription(mixin.description)}</PTableCell>
        </PTableRow>
      ))}
    </PTableBody>
  </PTable>
);
