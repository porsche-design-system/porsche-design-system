import type { AriaAttributes } from '../../../../types';
import type { Direction, SortingChangeEvent, TableHeadCellSort } from '../table/table-utils';

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const getAriaSort = (sort: TableHeadCellSort): AriaAttributes['aria-sort'] => {
  return sort?.active ? (isDirectionAsc(sort.direction) ? 'ascending' : 'descending') : null;
};

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const createSortedEventInitDictDetail = (sort: TableHeadCellSort): CustomEventInit<SortingChangeEvent> => ({
  bubbles: true,
  detail: { ...sort, active: true, direction: sort.active ? toggleDirection(sort.direction) : sort.direction },
});

export const isSortable = (active: boolean, direction: Direction): boolean => {
  return active !== undefined && direction !== undefined;
};
