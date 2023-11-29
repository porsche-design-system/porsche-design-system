import { type Theme } from '../../../utils';
import { type FlyoutNavigationItemInternalHTMLProps } from '../flyout-navigation-item/flyout-navigation-item-utils';
import { forceUpdate } from '@stencil/core';

export const INTERNAL_UPDATE_EVENT_NAME = 'internalUpdate';
export const INTERNAL_DISMISS_EVENT_NAME = 'internalDismiss';
export type FlyoutNavigationUpdate = {
  activeId: string;
};
export type FlyoutNavigationUpdateEvent = FlyoutNavigationUpdate; // to have consistent event types

export const FLYOUT_NAVIGATION_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutNavigationAriaAttribute = (typeof FLYOUT_NAVIGATION_ARIA_ATTRIBUTES)[number];

export const syncFlyoutNavigationItemsProps = (
  items: HTMLPFlyoutNavigationItemElement[],
  activeId: string,
  theme: Theme
): void => {
  items.forEach((item: HTMLPFlyoutNavigationItemElement & FlyoutNavigationItemInternalHTMLProps) => {
    item.theme = theme;
    item.open = item.id === activeId;
    forceUpdate(item);
  });
};
