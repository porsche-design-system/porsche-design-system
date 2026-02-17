import type { Class } from '../../../types';
import { consoleError, getTagNameWithoutPrefix, isElementOfKind } from '../../../utils';

export const DRILLDOWN_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type DrilldownAriaAttribute = (typeof DRILLDOWN_ARIA_ATTRIBUTES)[number];

export const INTERNAL_UPDATE_EVENT_NAME = 'internalUpdate';

export type DrilldownUpdateEventDetail = {
  activeIdentifier: string | undefined;
};

export type Item = HTMLPDrilldownItemElement;

/**
 * Recursively updates the state of a drilldown item's parent elements by traversing up the DOM tree.
 *
 * @param {HTMLPDrilldownItemElement} activeItem - The current drilldown item being updated.
 * @param {'primary' | 'secondary' | 'cascade'} prop - The property of the drilldown item to update.
 * @param {boolean} value - The new state value to apply.
 */
export const traverseTreeAndUpdateState = (
  activeItem: HTMLPDrilldownItemElement,
  prop: 'primary' | 'secondary' | 'cascade',
  value: boolean
) => {
  if (isElementOfKind(activeItem, 'p-drilldown-item')) {
    activeItem[prop] = value;
    internalDrilldown.traverseTreeAndUpdateState(
      activeItem.parentElement as HTMLPDrilldownItemElement,
      'cascade',
      value
    );
  }
};

export const internalDrilldown = {
  traverseTreeAndUpdateState,
};

/**
 * Updates the state of the drilldown and its children based on the provided activeItem and value.
 *
 * @param {string | undefined} activeItem - The drilldown-item element which is currently active (which has the activeIdentifier as identifier). If undefined, updates the root element.
 * @param {boolean} value - The new state value to apply.
 * @returns {void}
 */
export const updateDrilldownItemState = (activeItem: HTMLPDrilldownItemElement, value: boolean): void => {
  activeItem.secondary = value;
  internalDrilldown.traverseTreeAndUpdateState(activeItem.parentElement as HTMLPDrilldownItemElement, 'primary', value);
};

export const validateActiveIdentifier = <T extends Class<any>>(
  instance: InstanceType<T>,
  items: HTMLPDrilldownItemElement[],
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
