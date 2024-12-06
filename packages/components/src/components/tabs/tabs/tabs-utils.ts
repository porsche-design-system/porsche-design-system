import { forceUpdate } from '@stencil/core';
import type { Theme } from '../../../types';
import type {
  TabsBarGradientColor,
  TabsBarGradientColorScheme,
  TabsBarSize,
  TabsBarUpdateEvent,
  TabsBarWeight,
} from '../../tabs-bar/tabs-bar-utils';
import type { TabsItemInternalHTMLProps } from '../tabs-item/tabs-item-utils';

export type TabsSize = TabsBarSize;
export type TabsWeight = TabsBarWeight;
/** @deprecated */
export type TabsGradientColorScheme = TabsBarGradientColorScheme;
export type TabsGradientColor = TabsBarGradientColor;
/** @deprecated */
export type TabsUpdateEvent = TabsBarUpdateEvent;
export type TabsUpdateEventDetail = TabsUpdateEvent;

export const syncTabsItemsProps = (items: HTMLPTabsItemElement[], theme: Theme): void => {
  for (const item of items) {
    (item as HTMLPTabsItemElement & TabsItemInternalHTMLProps).theme = theme;
    forceUpdate(item);
  }
};
