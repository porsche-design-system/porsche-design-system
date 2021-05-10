import { FunctionalComponent, h } from '@stencil/core';
import { getAriaSort, HeadItem } from '../table-generics/table-utils';

type Props = {
  head: HeadItem[];
  onHeadClick: (item: HeadItem) => void;
};

export const TableHeadFunctional: FunctionalComponent<Props> = ({ head = [], onHeadClick }) => {
  return (
    <thead>
      <tr>
        {head.map((item) => {
          const { name, isSortable, direction, isSorting } = item;
          return (
            <th
              class={{ ['sortable']: isSortable, [`sortable--${direction}`]: true, ['sortable--active']: isSorting }}
              scope="col"
              role="columnheader"
              aria-sort={getAriaSort(isSortable, direction)}
              onClick={() => onHeadClick(item)}
            >
              {name}
              {isSortable && (
                <span class="sorting">
                  <p-icon color="inherit" name="arrow-up" />
                  <p-icon color="inherit" name="arrow-down" />
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
