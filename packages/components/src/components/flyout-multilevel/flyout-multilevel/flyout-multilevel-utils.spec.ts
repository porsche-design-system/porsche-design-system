import { expect } from '@jest/globals';
import * as loggerUtils from '../../../utils/log/logger';
import type { FlyoutMultilevelItemInternalHTMLProps } from '../flyout-multilevel-item/flyout-multilevel-item-utils';
import * as flyoutMultilevelUtils from './flyout-multilevel-utils';
import {
  traverseTreeAndUpdateState,
  updateFlyoutMultiLevelItemState,
  validateActiveIdentifier,
} from './flyout-multilevel-utils';

const createChild = (
  identifier: string = undefined
): HTMLPFlyoutMultilevelItemElement & FlyoutMultilevelItemInternalHTMLProps => {
  const el = document.createElement('div') as any;
  el.identifier = identifier;
  return el;
};

const identifier = 'some-id';

const errorMessage = `Invalid value '${identifier}' supplied to p-flyout-multilevel for property 'activeIdentifier' because reference is not present.`;
const errorMessageMultiple = `Found multiple matching items for value '${identifier}' supplied to p-flyout-multilevel:`;

class SomeInstance {
  host = document.createElement('p-flyout-multilevel');
}

describe('validateActiveIdentifier()', () => {
  it('should not call consoleError() util when activeIdentifier of flyout-multilevel is undefined', () => {
    const instance = new SomeInstance();
    const items = [createChild(), createChild()];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, undefined);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call consoleError() util when activeIdentifier of flyout-multilevel matches identifier of a flyout-multilevel-item', () => {
    const instance = new SomeInstance();
    const items = [createChild(identifier), createChild()];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call consoleError() util when activeIdentifier of flyout-multilevel matches no identifier of a flyout-multilevel-item', () => {
    const instance = new SomeInstance();
    const items = [createChild(), createChild()];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).toHaveBeenCalledWith(errorMessage);
  });

  it("should call consoleError() util when activeIdentifier of flyout-multilevel matches multiple identifier of flyout-multilevel-item's", () => {
    const instance = new SomeInstance();
    const items = [createChild(identifier), createChild(identifier)];

    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).toHaveBeenCalledWith(errorMessageMultiple, ...items);
  });
});

describe('updateFlyoutMultiLevelState()', () => {
  // let forceUpdateSpy: jest.SpyInstance;
  let traverseTreeAndUpdateStateSpy: jest.SpyInstance;
  let host: HTMLElement & { primary?: boolean };
  let child: HTMLElement & { primary?: boolean; secondary?: boolean; cascade?: boolean; identifier?: string };

  beforeEach(() => {
    // forceUpdateSpy = jest.spyOn(stencilCore, 'forceUpdate').mockImplementation();
    traverseTreeAndUpdateStateSpy = jest
      .spyOn(flyoutMultilevelUtils, 'traverseTreeAndUpdateState')
      .mockImplementation();

    host = document.createElement('p-flyout-multilevel');
    child = document.createElement('p-flyout-multilevel-item');
    child.setAttribute('identifier', '1');
    host.appendChild(child);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set secondary prop of item with activeIdentifier to value=true and call functions', () => {
    updateFlyoutMultiLevelItemState(host, child, true);
    expect(child.secondary).toBe(true);
    // expect(forceUpdateSpy).toBeCalledWith(child);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(host, 'primary', true);
  });
  it('should set secondary prop of item with activeIdentifier to value=false and call functions', () => {
    updateFlyoutMultiLevelItemState(host, child, false);
    expect(child.secondary).toBe(false);
    // expect(forceUpdateSpy).toBeCalledWith(child);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(host, 'primary', false);
  });
  it('should set host primary prop to value=true if no activeIdentifier is set', () => {
    updateFlyoutMultiLevelItemState(host, undefined, true);
    expect(host.primary).toBe(true);
    // expect(forceUpdateSpy).toBeCalledWith(host);
  });
  it('should set host primary prop to value=false if no activeIdentifier is set', () => {
    updateFlyoutMultiLevelItemState(host, undefined, false);
    expect(host.primary).toBe(false);
    // expect(forceUpdateSpy).toBeCalledWith(host);
  });
});

describe('traverseTreeAndUpdateState()', () => {
  // let forceUpdateSpy: jest.SpyInstance;
  let traverseTreeAndUpdateStateSpy: jest.SpyInstance;
  let host: HTMLElement & { primary?: boolean };
  let child: HTMLElement & { primary?: boolean; secondary?: boolean; cascade?: boolean; identifier?: string };
  let grandChild: HTMLElement & { primary?: boolean; secondary?: boolean; cascade?: boolean; identifier?: string };

  beforeEach(() => {
    // forceUpdateSpy = jest.spyOn(stencilCore, 'forceUpdate').mockImplementation();
    traverseTreeAndUpdateStateSpy = jest.spyOn(flyoutMultilevelUtils, 'traverseTreeAndUpdateState');

    host = document.createElement('p-flyout-multilevel');
    child = document.createElement('p-flyout-multilevel-item');
    grandChild = document.createElement('p-flyout-multilevel-item');
    host.appendChild(child);
    child.appendChild(grandChild);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set traverse up the tree and set states to value', () => {
    traverseTreeAndUpdateState(grandChild, 'primary', true);
    expect(grandChild.primary).toBe(true);
    // expect(forceUpdateSpy).toBeCalledWith(grandChild);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(child, 'cascade', true);

    expect(child.cascade).toBe(true);
    // expect(forceUpdateSpy).toBeCalledWith(child);

    expect(traverseTreeAndUpdateStateSpy).toHaveBeenCalledTimes(2);
    expect(traverseTreeAndUpdateStateSpy).not.toHaveBeenCalledWith(host, expect.any(String), expect.any(Boolean));
  });
});
