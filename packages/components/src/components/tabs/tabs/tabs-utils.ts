import { forceUpdate } from '@stencil/core';
import type { Theme } from '../../../types';
import type { TabsItemInternalHTMLProps } from '../tabs-item/tabs-item-utils';

// TODO: following types should be re-exported from tabs-bar but causes component-meta generator to fail currently
export const TABS_SIZES = ['small', 'medium'] as const;
export type TabsSize = (typeof TABS_SIZES)[number];

export const TABS_WEIGHTS = ['regular', 'semi-bold'] as const;
export type TabsWeight = (typeof TABS_WEIGHTS)[number];

export type TabsUpdateEventDetail = { activeTabIndex: number };

export const syncTabsItemsProps = (items: HTMLPTabsItemElement[], theme: Theme): void => {
  for (const item of items) {
    (item as HTMLPTabsItemElement & TabsItemInternalHTMLProps).theme = theme;
    forceUpdate(item);
  }
};
