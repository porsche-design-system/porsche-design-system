import { consoleError, getTagNameWithoutPrefix } from '../../../utils';
import { type FlyoutNavigationItemInternalHTMLProps } from '../flyout-navigation-item/flyout-navigation-item-utils';
import { forceUpdate } from '@stencil/core';
import { type Class, type Theme } from '../../../types';

export const INTERNAL_UPDATE_EVENT_NAME = 'internalUpdate';

export type FlyoutNavigationUpdate = {
  activeIdentifier: string;
};
export type FlyoutNavigationUpdateEvent = FlyoutNavigationUpdate; // to have consistent event types

export const syncFlyoutNavigationItemsProps = (
  items: HTMLPFlyoutNavigationItemElement[],
  activeIdentifier: string,
  theme: Theme
): void => {
  items.forEach((item: HTMLPFlyoutNavigationItemElement & FlyoutNavigationItemInternalHTMLProps) => {
    item.theme = theme;
    item.open = item.identifier === activeIdentifier;
    forceUpdate(item);
  });
};

export const validateActiveIdentifier = <T extends Class<any>>(
  instance: InstanceType<T>,
  items: HTMLPFlyoutNavigationItemElement[],
  activeIdentifier: string | undefined
): void => {
  if (!(activeIdentifier === undefined || !!items.filter((item) => item.identifier === activeIdentifier).length)) {
    consoleError(
      `Invalid value '${activeIdentifier}' supplied to ${getTagNameWithoutPrefix(
        instance.host as HTMLElement
      )} for property 'activeIdentifier' because reference is not present.`
    );
  }
};
