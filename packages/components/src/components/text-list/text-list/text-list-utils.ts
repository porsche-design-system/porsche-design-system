import type { TextListItem } from '../text-list-item/text-list-item';
import type { TextListItemInternalHTMLProps } from '../text-list-item/text-list-item-utils';
import { forceUpdate } from '@stencil/core';

export const LIST_TYPES = ['unordered', 'ordered'] as const;
export type ListType = typeof LIST_TYPES[number];

export const ORDER_TYPES = ['numbered', 'alphabetically'] as const;
export type OrderType = typeof ORDER_TYPES[number];

export const syncTextListItemsProps = (host: HTMLElement, listType: ListType, orderType: OrderType): void => {
  Array.from(host.children).forEach((item: HTMLElement & TextListItem & TextListItemInternalHTMLProps) => {
    item.listType = listType;
    item.orderType = orderType;
    forceUpdate(item);
  });
};
