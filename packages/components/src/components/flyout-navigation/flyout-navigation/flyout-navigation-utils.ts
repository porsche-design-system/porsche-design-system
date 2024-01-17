import { consoleError, getTagNameWithoutPrefix } from '../../../utils';
import { type FlyoutNavigationItemInternalHTMLProps } from '../flyout-navigation-item/flyout-navigation-item-utils';
import { forceUpdate } from '@stencil/core';
import { type Class, type Theme } from '../../../types';

export const FLYOUT_NAVIGATION_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutNavigationAriaAttribute = (typeof FLYOUT_NAVIGATION_ARIA_ATTRIBUTES)[number];

export const INTERNAL_UPDATE_EVENT_NAME = 'internalUpdate';

export type FlyoutNavigationUpdate = {
  activeIdentifier: string;
};
/** @deprecated */
export type FlyoutNavigationUpdateEvent = FlyoutNavigationUpdate;
export type FlyoutNavigationUpdateEventDetail = FlyoutNavigationUpdateEvent; // to have consistent event types

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
  if (activeIdentifier !== undefined) {
    const matchingItems = items.filter((item) => item.identifier === activeIdentifier);
    if (matchingItems.length === 0) {
      logInvalidIdentifierError(instance, activeIdentifier);
    } else if (matchingItems.length > 1) {
      logMultipleIdentifierError(instance, activeIdentifier, matchingItems);
    }
  }
};

const logInvalidIdentifierError = <T extends Class<any>>(
  instance: InstanceType<T>,
  activeIdentifier: string | undefined
) =>
  consoleError(
    `Invalid value '${activeIdentifier}' supplied to ${getTagNameWithoutPrefix(
      instance.host as HTMLElement
    )} for property 'activeIdentifier' because reference is not present.`
  );

const logMultipleIdentifierError = <T extends Class<any>>(
  instance: InstanceType<T>,
  activeIdentifier: string | undefined,
  matchingItems: HTMLElement[]
) =>
  consoleError(
    `Found multiple matching items for value '${activeIdentifier}' supplied to ${getTagNameWithoutPrefix(
      instance.host as HTMLElement
    )}:`,
    ...matchingItems
  );
