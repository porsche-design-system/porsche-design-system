import { FunctionalComponent, h } from '@stencil/core';
import type { HeadItem } from '../table-generics/table-utils';
import { getAriaSort, toggleDirection } from '../table-generics/table-utils';

type Props = {
  head: HeadItem[];
  onHeadClick: (item: HeadItem) => void;
};

export const TableHeadFunctional: FunctionalComponent<Props> = ({ head = [], onHeadClick }) => {
  const onClick = (headItem: HeadItem): void => {
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
          const { name, isSortable, direction, isSorting } = item;
          return (
            <th
              class={{ ['sortable']: isSortable, [`sortable--${direction}`]: true, ['sortable--active']: isSorting }}
              scope="col"
              role="columnheader"
              aria-sort={getAriaSort(isSortable, direction)}
              onClick={() => onClick(item)}
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
