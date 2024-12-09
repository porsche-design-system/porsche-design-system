import { forceUpdate } from '@stencil/core';
import type { Class, Theme } from '../../../types';
import { consoleError, getTagNameWithoutPrefix, isElementOfKind } from '../../../utils';
import type { FlyoutMultilevelItemInternalHTMLProps } from '../flyout-multilevel-item/flyout-multilevel-item-utils';

export const FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type FlyoutMultilevelAriaAttribute = (typeof FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES)[number];

export const INTERNAL_UPDATE_EVENT_NAME = 'internalUpdate';

export type FlyoutMultilevelUpdate = {
  activeIdentifier: string | undefined;
};
/** @deprecated */
export type FlyoutMultilevelUpdateEvent = FlyoutMultilevelUpdate;
export type FlyoutMultilevelUpdateEventDetail = FlyoutMultilevelUpdateEvent; // to have consistent event types

export type Item = HTMLPFlyoutMultilevelItemElement & FlyoutMultilevelItemInternalHTMLProps;

/**
 * Updates the state of the flyout multilevel and its children based on the provided activeItem and value.
 *
 * @param {string | undefined} activeItem - The flyout-multilevel-item element which is currently active (which has the activeIdentifier as identifier). If undefined, updates the root element.
 * @param {boolean} value - The new state value to apply.
 * @returns {void}
 */
export const updateFlyoutMultiLevelItemState = (activeItem: HTMLPFlyoutMultilevelItemElement, value: boolean): void => {
  activeItem.secondary = value;
  traverseTreeAndUpdateState(activeItem.parentElement as HTMLPFlyoutMultilevelItemElement, 'primary', value);
};

/**
 * Recursively updates the state of a flyout item's parent elements by traversing up the DOM tree.
 *
 * @param {HTMLPFlyoutMultilevelItemElement} activeItem - The current flyout item being updated.
 * @param {'primary' | 'secondary' | 'cascade'} prop - The property of the flyout item to update.
 * @param {boolean} value - The new state value to apply.
 */
export const traverseTreeAndUpdateState = (
  activeItem: HTMLPFlyoutMultilevelItemElement,
  prop: 'primary' | 'secondary' | 'cascade',
  value: boolean
) => {
  if (isElementOfKind(activeItem, 'p-flyout-multilevel-item')) {
    activeItem[prop] = value;
    traverseTreeAndUpdateState(activeItem.parentElement as HTMLPFlyoutMultilevelItemElement, 'cascade', value);
  }
};

/**
 * Synchronizes the provided theme to all items in the given array by updating each item's theme property.
 * Ensures that updates are reflected by forcing a component update.
 *
 * @param {Theme} theme - The theme to apply to all items.
 * @param {Item[]} items - The array of items whose theme will be updated.
 */
export const syncThemeToItems = (theme: Theme, items: Item[]) => {
  for (const item of items) {
    item.theme = theme;
    forceUpdate(item);
  }
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
