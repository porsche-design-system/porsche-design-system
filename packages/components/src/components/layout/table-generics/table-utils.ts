export type Direction = 'asc' | 'desc';

export type HeadItem = {
  key: string;
  name: string;
  isSortable: boolean;
  isSorting: boolean;
  direction: Direction;
};

export const isDirectionAsc = (dir: Direction): boolean => dir === 'asc';

export const toggleDirection = (dir: Direction): Direction => (isDirectionAsc(dir) ? 'desc' : 'asc');

export const getAriaSort = (isSortable: boolean, dir: Direction): string =>
  isSortable ? (isDirectionAsc(dir) ? 'ascending' : 'descending') : 'none';
