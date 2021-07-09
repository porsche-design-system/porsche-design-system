import { AriaAttributes } from 'react';

export type Direction = 'asc' | 'desc';

export type TableHeadCellSort = {
  id: string; // the only way for the consumer to identify which table column has been clicked on event callback
  active: boolean;
  direction: Direction;
};
export type SortingChangeEvent = TableHeadCellSort; // to have consistent event types

export const SORT_EVENT_NAME = 'internalSortingChange';

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const getAriaSort = (sort: TableHeadCellSort): AriaAttributes['aria-sort'] => {
  return sort?.active ? (isDirectionAsc(sort.direction) ? 'ascending' : 'descending') : null;
};

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const createSortedEventInitDictDetail = (sort: TableHeadCellSort): CustomEventInit<SortingChangeEvent> => ({
  bubbles: true,
  detail: { ...sort, active: true, direction: toggleDirection(sort.direction) },
});
