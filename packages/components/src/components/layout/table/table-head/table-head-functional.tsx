import { FunctionalComponent, h } from '@stencil/core';
import type { TableHeadItem } from '../table-utils';
import { getAriaSort, toggleDirection } from '../table-utils';

type Props = {
  head: TableHeadItem[];
  onHeadClick: (item: TableHeadItem) => void;
};

export const TableHeadFunctional: FunctionalComponent<Props> = ({ head = [], onHeadClick }) => {
  const onClick = (headItem: TableHeadItem): void => {
    if (headItem.isSortable) {
      onHeadClick({
        ...headItem,
        isSorting: true,
        direction: toggleDirection(headItem.direction),
      });
    }
  };

  return (
    <thead>
      <tr>
        {head.map((item) => {
          const { name, isSortable, direction, isSorting } = item as any;
          return (
            <th
              class={{ ['sortable']: isSortable, [`sortable--${direction}`]: true, ['sortable--active']: isSorting }}
              scope="col"
              role="columnheader"
              aria-sort={getAriaSort(item)}
              onClick={() => onClick(item)}
            >
              {name}
              {isSortable && (
                <span class="sorting">
                  <p-icon color="inherit" name="arrow-head-up" />
                  <p-icon color="inherit" name="arrow-head-down" />
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
