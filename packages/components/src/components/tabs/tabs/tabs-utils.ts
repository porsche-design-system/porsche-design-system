import { forceUpdate } from '@stencil/core';
import type { Theme } from '../../../types';
import type { TabsBarSize, TabsBarUpdateEventDetail, TabsBarWeight } from '../../tabs-bar/tabs-bar-utils';
import type { TabsItemInternalHTMLProps } from '../tabs-item/tabs-item-utils';

export type TabsSize = TabsBarSize;
export type TabsWeight = TabsBarWeight;

export type TabsUpdateEventDetail = TabsBarUpdateEventDetail;

export const syncTabsItemsProps = (items: HTMLPTabsItemElement[], theme: Theme): void => {
  for (const item of items) {
    (item as HTMLPTabsItemElement & TabsItemInternalHTMLProps).theme = theme;
    forceUpdate(item);
  }
};
