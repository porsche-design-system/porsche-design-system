import type { FlyoutNavigationItemInternalHTMLProps } from '../flyout-navigation-item/flyout-navigation-item-utils';
import type { Theme } from '../../../types';
import { syncFlyoutNavigationItemsProps, validateActiveIdentifier } from './flyout-navigation-utils';
import * as stencilCore from '@stencil/core';
import * as loggerUtils from '../../../utils/log/logger';

const createChild = (
  identifier: string = undefined
): HTMLPFlyoutNavigationItemElement & FlyoutNavigationItemInternalHTMLProps => {
  const el = document.createElement('div') as any;
  el.identifier = identifier;
  return el;
};
const theme: Theme = 'dark';
const identifier = 'some-id';

describe('syncFlyoutNavigationItemsProps()', () => {
  it('should set theme property on every item', () => {
    const child1 = createChild();
    const child2 = createChild();
    const children = [child1, child2];

    expect(child1.theme).toBeUndefined();
    expect(child2.theme).toBeUndefined();

    syncFlyoutNavigationItemsProps(children, undefined, theme);

    expect(child1.theme).toBe(theme);
    expect(child2.theme).toBe(theme);
  });

  it('should set open property on every item matching the active-identifier', () => {
    const child1 = createChild(identifier);
    const child2 = createChild();
    const children = [child1, child2];

    expect(child1.open).toBeUndefined();
    expect(child2.open).toBeUndefined();

    syncFlyoutNavigationItemsProps(children, identifier, theme);

    expect(child1.open).toBe(true);
    expect(child2.open).toBe(false);
  });

  it('should call forceUpdate() on every item', () => {
    const child1 = createChild();
    const child2 = createChild();
    const children = [child1, child2];

    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncFlyoutNavigationItemsProps(children, undefined, theme);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});

const errorMessage = `Invalid value '${identifier}' supplied to p-flyout-navigation for property 'activeIdentifier' because reference is not present.`;
const errorMessageMultiple = `Found multiple matching items for value '${identifier}' supplied to p-flyout-navigation:`;

class SomeInstance {
  host = document.createElement('p-flyout-navigation');
}

describe('validateActiveIdentifier()', () => {
  it('should not call consoleError() util when activeIdentifier of flyout-navigation is undefined', () => {
    const instance = new SomeInstance();
    const items = [createChild(), createChild()];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, undefined);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call consoleError() util when activeIdentifier of flyout-navigation matches identifier of a flyout-navigation-item', () => {
    const instance = new SomeInstance();
    const items = [createChild(identifier), createChild()];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call consoleError() util when activeIdentifier of flyout-navigation matches no identifier of a flyout-navigation-item', () => {
    const instance = new SomeInstance();
    const items = [createChild(), createChild()];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).toHaveBeenCalledWith(errorMessage);
  });

  it("should call consoleError() util when activeIdentifier of flyout-navigation matches multiple identifier of flyout-navigation-item's", () => {
    const instance = new SomeInstance();
    const items = [createChild(identifier), createChild(identifier)];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).toHaveBeenCalledWith(errorMessageMultiple, ...items);
  });
});
