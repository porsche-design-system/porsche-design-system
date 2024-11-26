import { forceUpdate } from '@stencil/core';
import type { Class, Theme } from '../../../types';
import { consoleError, getTagNameWithoutPrefix, isElementOfKind } from '../../../utils';
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

export type Item = HTMLPFlyoutMultilevelItemElement & FlyoutMultilevelItemInternalHTMLProps;

export const syncFlyoutMultilevelItemsProps = (
  items: Item[],
  activeIdentifier: string,
  theme: Theme,
  host: HTMLElement
): void => {
  // TODO: Instead of resetting all items every time, call this function initially and create separate update function
  (host as HTMLPFlyoutMultilevelElement & { children: HTMLPFlyoutMultilevelItemElement }).primary = false;
  // biome-ignore lint/complexity/noForEach: <explanation>
  items.forEach((item) => {
    item.primary = false;
    item.secondary = false;
    item.cascade = false;
    item.theme = theme;
    forceUpdate(item);
  });

  const activeItem = items.find((it) => it.identifier === activeIdentifier);
  const activeItemParent = activeItem.parentElement as HTMLPFlyoutMultilevelItemElement;
  activeItem.secondary = true;
  activeItemParent.primary = true;
  forceUpdate(activeItem);
  forceUpdate(activeItemParent);

  if (isElementOfKind(activeItemParent, 'p-flyout-multilevel')) {
    return;
  }

  const applyCascadeUntilRoot = (item: HTMLPFlyoutMultilevelItemElement): void => {
    const parent = item.parentElement as HTMLPFlyoutMultilevelItemElement;
    if (isElementOfKind(parent, 'p-flyout-multilevel')) {
      return;
    }
    parent.cascade = true;
    forceUpdate(parent);
    applyCascadeUntilRoot(parent);
  };

  applyCascadeUntilRoot(activeItemParent);
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
