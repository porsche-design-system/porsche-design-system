import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { ReactNode } from 'react';

export type MetaTableColumn<T> = {
  label: string;
  cell: (item: T) => ReactNode;
  /** Lets the cell wrap, for prose and long values. */
  multiline?: boolean;
  className?: string;
};

type MetaTableProps<T> = {
  caption: string;
  items: T[];
  getKey: (item: T) => string;
  columns: MetaTableColumn<T>[];
  /** Adds a leading column with a swatch of the CSS color an item returns. */
  colorSwatch?: (item: T) => string;
  className?: string;
};

/** A table with one row per entry of a meta package, such as tokens, styles or the API of a component. */
export const MetaTable = <T,>({
  caption,
  items,
  getKey,
  columns,
  colorSwatch,
  className = 'my-fluid-md',
}: MetaTableProps<T>) => (
  <PTable className={className} caption={caption}>
    <PTableHead>
      <PTableRow>
        {colorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
        {columns.map(({ label }) => (
          <PTableHeadCell key={label}>{label}</PTableHeadCell>
        ))}
      </PTableRow>
    </PTableHead>
    <PTableBody>
      {items.map((item) => (
        <PTableRow key={getKey(item)}>
          {colorSwatch && (
            <PTableCell>
              <div
                className="w-10 h-10 rounded-md border border-contrast-low"
                style={{ background: colorSwatch(item) }}
              />
            </PTableCell>
          )}
          {columns.map(({ label, cell, multiline, className: cellClassName }) => (
            <PTableCell key={label} className={cellClassName} multiline={multiline}>
              {cell(item)}
            </PTableCell>
          ))}
        </PTableRow>
      ))}
    </PTableBody>
  </PTable>
);
