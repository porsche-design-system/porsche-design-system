import { vi } from 'vitest';
import * as loggerUtils from '../../../utils/log/logger';
import * as drilldownUtils from './drilldown-utils';

const createChild = (identifier: string = undefined): HTMLPDrilldownItemElement => {
  const el = document.createElement('div') as any;
  el.identifier = identifier;
  return el;
};

const identifier = 'some-id';

const errorMessage = `Invalid value '${identifier}' supplied to p-drilldown for property 'activeIdentifier' because reference is not present.`;
const errorMessageMultiple = `Found multiple matching items for value '${identifier}' supplied to p-drilldown:`;

class SomeInstance {
  host = document.createElement('p-drilldown');
}

describe('validateActiveIdentifier()', () => {
  it('should not call consoleError() util when activeIdentifier of drilldown is undefined', () => {
    const instance = new SomeInstance();
    const items = [createChild(), createChild()];

    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    drilldownUtils.validateActiveIdentifier<typeof SomeInstance>(instance, items, undefined);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call consoleError() util when activeIdentifier of drilldown matches identifier of a drilldown-item', () => {
    const instance = new SomeInstance();
    const items = [createChild(identifier), createChild()];

    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    drilldownUtils.validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call consoleError() util when activeIdentifier of drilldown matches no identifier of a drilldown-item', () => {
    const instance = new SomeInstance();
    const items = [createChild(), createChild()];

    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    drilldownUtils.validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).toHaveBeenCalledWith(errorMessage);
  });

  it("should call consoleError() util when activeIdentifier of drilldown matches multiple identifier of drilldown-item's", () => {
    const instance = new SomeInstance();
    const items = [createChild(identifier), createChild(identifier)];

    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    drilldownUtils.validateActiveIdentifier<typeof SomeInstance>(instance, items, identifier);
    expect(spy).toHaveBeenCalledWith(errorMessageMultiple, ...items);
  });
});

describe('updateDrilldownItemState()', () => {
  let traverseTreeAndUpdateStateSpy: ReturnType<typeof vi.spyOn>;
  let host: HTMLElement & { primary?: boolean };
  let child: HTMLPDrilldownItemElement;

  beforeEach(() => {
    traverseTreeAndUpdateStateSpy = vi
      .spyOn(drilldownUtils.internalDrilldown, 'traverseTreeAndUpdateState')
      .mockImplementation(() => {});

    host = document.createElement('p-drilldown');
    child = document.createElement('p-drilldown-item');
    child.setAttribute('identifier', '1');
    host.appendChild(child);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set secondary prop of item with activeIdentifier to value=true and call functions', () => {
    drilldownUtils.updateDrilldownItemState(child, true);
    expect(child.secondary).toBe(true);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(host, 'primary', true);
  });
  it('should set secondary prop of item with activeIdentifier to value=false and call functions', () => {
    drilldownUtils.updateDrilldownItemState(child, false);
    expect(child.secondary).toBe(false);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(host, 'primary', false);
  });
});

describe('traverseTreeAndUpdateState()', () => {
  let traverseTreeAndUpdateStateSpy: ReturnType<typeof vi.spyOn>;
  let host: HTMLElement & { primary?: boolean };
  let child: HTMLPDrilldownItemElement;
  let grandChild: HTMLPDrilldownItemElement;

  beforeEach(() => {
    traverseTreeAndUpdateStateSpy = vi.spyOn(drilldownUtils.internalDrilldown, 'traverseTreeAndUpdateState');

    host = document.createElement('p-drilldown');
    child = document.createElement('p-drilldown-item');
    grandChild = document.createElement('p-drilldown-item');
    host.appendChild(child);
    child.appendChild(grandChild);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should traverse up the tree and set states to value', () => {
    drilldownUtils.internalDrilldown.traverseTreeAndUpdateState(grandChild, 'primary', true);
    expect(grandChild.primary).toBe(true);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(child, 'cascade', true);

    expect(child.cascade).toBe(true);
    expect(traverseTreeAndUpdateStateSpy).toHaveBeenCalledTimes(3);
    expect(traverseTreeAndUpdateStateSpy).toBeCalledWith(host, 'cascade', true);
  });
});
