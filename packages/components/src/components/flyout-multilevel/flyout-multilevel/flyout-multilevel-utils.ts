import { forceUpdate } from '@stencil/core';
import type { Class, Theme } from '../../../types';
import { consoleError, getTagNameWithoutPrefix } from '../../../utils';
import type { FlyoutMultilevelItemInternalHTMLProps } from '../flyout-multilevel-item/flyout-multilevel-item-utils';

export const FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutMultilevelAriaAttribute = (typeof FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES)[number];

export const INTERNAL_UPDATE_EVENT_NAME = 'internalUpdate';

export type FlyoutMultilevelUpdate = {
  activeIdentifier: string;
};
/** @deprecated */
export type FlyoutMultilevelUpdateEvent = FlyoutMultilevelUpdate;
export type FlyoutMultilevelUpdateEventDetail = FlyoutMultilevelUpdateEvent; // to have consistent event types

type Item = HTMLPFlyoutMultilevelItemElement & FlyoutMultilevelItemInternalHTMLProps;
export const syncFlyoutMultilevelItemsProps = (
  items: HTMLPFlyoutMultilevelItemElement[],
  activeIdentifier: string,
  theme: Theme,
  host: HTMLElement
): void => {
  (host as HTMLElement & { primary: boolean }).primary = false;
  for (const item of items) {
    item.primary = false;
    item.secondary = false;
  }

  (host.querySelector(`[identifier="${activeIdentifier}"]`) as HTMLElement & { secondary: boolean }).secondary = true;
  (
    host.querySelector(`[identifier="${activeIdentifier}"]`).parentElement as HTMLElement & { primary: boolean }
  ).primary = true;

  (
    host.querySelector(`[identifier="${activeIdentifier}"]`).parentElement.parentElement as HTMLElement & {
      cascade: boolean;
    }
  ).cascade = true;

  for (const item of items) {
    (item as Item).theme = theme;
    // (item as Item).secondary = item.identifier === activeIdentifier;
    forceUpdate(item);
  }
  forceUpdate(host);

  // const foo = items.filter((el) => el.secondary);
  // console.log(foo);
};

export const validateActiveIdentifier = <T extends Class<any>>(
  instance: InstanceType<T>,
  items: HTMLPFlyoutMultilevelItemElement[],
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
): void =>
  consoleError(
    `Invalid value '${activeIdentifier}' supplied to ${getTagNameWithoutPrefix(
      instance.host as HTMLElement
    )} for property 'activeIdentifier' because reference is not present.`
  );

const logMultipleIdentifierError = <T extends Class<any>>(
  instance: InstanceType<T>,
  activeIdentifier: string | undefined,
  matchingItems: HTMLElement[]
): void =>
  consoleError(
    `Found multiple matching items for value '${activeIdentifier}' supplied to ${getTagNameWithoutPrefix(
      instance.host as HTMLElement
    )}:`,
    ...matchingItems
  );
