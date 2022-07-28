import { getTagName, hasNamedSlot } from '../../../../utils';

export const warnIfCaptionIsUndefined = (host: HTMLElement, caption: string): void => {
  if (!caption && !hasNamedSlot(host, 'caption')) {
    console.warn(
      `Property "caption" of ${getTagName(
        host
      )} needs to be provided to fulfill accessibility requirements, either as prop or named slot.`
    );
  }
};

export type Direction = 'asc' | 'desc';

export type TableHeadCellSort = {
  id: string; // the only way for the consumer to identify which table column has been clicked on event callback
  active?: boolean;
  direction?: Direction;
};
export type SortingChangeEvent = TableHeadCellSort; // to have consistent event types

export const SORT_EVENT_NAME = 'internalSortingChange';
