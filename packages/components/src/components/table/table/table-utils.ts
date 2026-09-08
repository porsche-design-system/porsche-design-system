import { consoleWarn, getTagNameWithoutPrefix, hasNamedSlot } from '../../../utils';

export const warnIfCaptionIsMissing = (host: HTMLElement, caption: string): void => {
  if (!caption && !hasNamedSlot(host, 'caption')) {
    consoleWarn(
      `caption has to be set via property or named slot for component ${getTagNameWithoutPrefix(
        host
      )} in order to ensure accessibility.`,
      host
    );
  }
};

export type Direction = 'asc' | 'desc';

export const TABLE_LAYOUTS = ['auto', 'fixed'] as const;
export type TableLayout = (typeof TABLE_LAYOUTS)[number];

export type TableHeadCellSort = {
  id: string; // the only way for the consumer to identify which table column has been clicked on event callback
  active?: boolean;
  direction?: Direction;
};
export type TableUpdateEventDetail = TableHeadCellSort; // to have consistent event types

export const SORT_EVENT_NAME = 'internalSortingChange';
