import { vi } from 'vitest';
import { forceUpdate } from '@stencil/core';
import { autoUpdate } from '@floating-ui/dom';
import * as childrenObserverUtils from '../../utils/children-observer';
import { Popover } from './popover';

// `autoUpdate` is an ESM export and cannot be spied on directly, so the module is mocked. Only the members used by the
// component are stubbed; the rest keep their real implementations.
vi.mock('@floating-ui/dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@floating-ui/dom')>()),
  autoUpdate: vi.fn(),
}));

const autoUpdateMock = vi.mocked(autoUpdate);

// Creates a `<slot>` whose `assignedElements()` resolves to the given light-DOM element, mirroring a projected
// `slot="button"` child (jsdom does not perform real slot assignment without a full shadow tree).
const createSlotWithAssigned = (assigned?: HTMLElement): HTMLSlotElement => {
  const slot = document.createElement('slot');
  vi.spyOn(slot, 'assignedElements').mockReturnValue(assigned ? [assigned] : []);
  return slot;
};

let component: Popover;

beforeEach(() => {
  autoUpdateMock.mockReset();
  component = new Popover();
  component.host = document.createElement('p-popover');
  component.host.attachShadow({ mode: 'open' });
});

describe('triggerElement', () => {
  it('should return the default shadow button when no slotted button is projected', () => {
    const button = document.createElement('button');
    component['refButton'] = button as HTMLButtonElement;

    expect(component['triggerElement']).toBe(button);
  });

  it('should return the assigned element of the button slot instead of the slot itself', () => {
    const slotButton = document.createElement('button');
    component['refSlotButton'] = createSlotWithAssigned(slotButton);

    expect(component['triggerElement']).toBe(slotButton);
  });

  it('should return undefined when the button slot has no assigned element', () => {
    component['refSlotButton'] = createSlotWithAssigned();

    expect(component['triggerElement']).toBeUndefined();
  });
});

describe('connectedCallback', () => {
  it('should call observeChildren with correct parameters', () => {
    const spy = vi.spyOn(childrenObserverUtils, 'observeChildren');
    component.connectedCallback();

    expect(spy).toHaveBeenCalledWith(component.host, expect.anything(), undefined, {
      attributes: false,
      childList: true,
      subtree: false,
    });
  });

  it('should call forceUpdate() when observed children change', () => {
    const observeChildrenSpy = vi.spyOn(childrenObserverUtils, 'observeChildren');
    component.connectedCallback();

    // invoke the callback passed to observeChildren to simulate a slotted child change
    const callback = observeChildrenSpy.mock.calls[0][1];
    callback();

    expect(forceUpdate).toHaveBeenCalledWith(component.host);
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveChildren() with correct parameters', () => {
    const unobserveChildrenSpy = vi.spyOn(childrenObserverUtils, 'unobserveChildren');
    component.disconnectedCallback();

    expect(unobserveChildrenSpy).toHaveBeenCalledWith(component.host);
  });
});

describe('syncAutoUpdate', () => {
  it('should bind autoUpdate to the current trigger reference when activated', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    const button = document.createElement('button');
    const popover = document.createElement('div');
    component['refButton'] = button as HTMLButtonElement;
    component['refPopover'] = popover as HTMLDivElement;

    component['syncAutoUpdate'](true);

    expect(autoUpdateMock).toHaveBeenCalledTimes(1);
    expect(autoUpdateMock).toHaveBeenCalledWith(button, popover, component['updatePosition']);
  });

  it('should rebind autoUpdate when the trigger identity changes while active', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    const button = document.createElement('button');
    const slotButton = document.createElement('button');
    const popover = document.createElement('div');
    component['refPopover'] = popover as HTMLDivElement;

    // initial bind to the default shadow button
    component['refButton'] = button as HTMLButtonElement;
    component['syncAutoUpdate'](true);

    // trigger switches to the slotted button (default button removed → ref nulled by Stencil), resolved via the slot's
    // assigned element rather than the slot itself
    component['refButton'] = undefined;
    component['refSlotButton'] = createSlotWithAssigned(slotButton);
    component['syncAutoUpdate'](true);

    expect(cleanUp).toHaveBeenCalledTimes(1); // old binding torn down
    expect(autoUpdateMock).toHaveBeenCalledTimes(2);
    expect(autoUpdateMock).toHaveBeenLastCalledWith(slotButton, popover, component['updatePosition']);
  });

  it('should not bind autoUpdate while active when no trigger element is resolvable yet', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    // slotted button not yet projected → `assignedElements()` is empty
    component['refSlotButton'] = createSlotWithAssigned();
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component['syncAutoUpdate'](true);

    expect(autoUpdateMock).not.toHaveBeenCalled();
    expect(component['cleanUpAutoUpdate']).toBeUndefined();
  });

  it('should tear down autoUpdate when the trigger becomes unresolvable while active', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    const button = document.createElement('button');
    component['refButton'] = button as HTMLButtonElement;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    // initial bind to the default shadow button
    component['syncAutoUpdate'](true);

    // trigger disappears while still open (e.g. slotted button removed and not yet replaced) → `triggerElement` undefined
    component['refButton'] = undefined;
    component['refSlotButton'] = createSlotWithAssigned();
    component['syncAutoUpdate'](true);

    expect(cleanUp).toHaveBeenCalledTimes(1); // old binding torn down
    expect(autoUpdateMock).toHaveBeenCalledTimes(1); // not re-created against an undefined reference
    expect(component['cleanUpAutoUpdate']).toBeUndefined();
  });

  it('should not rebind autoUpdate when the trigger reference is unchanged', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    const slotButton = document.createElement('button');
    const popover = document.createElement('div');
    component['refSlotButton'] = createSlotWithAssigned(slotButton);
    component['refPopover'] = popover as HTMLDivElement;

    component['syncAutoUpdate'](true);
    component['syncAutoUpdate'](true);

    expect(cleanUp).not.toHaveBeenCalled();
    expect(autoUpdateMock).toHaveBeenCalledTimes(1);
  });

  it('should tear down autoUpdate when deactivated', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    component['refButton'] = document.createElement('button') as HTMLButtonElement;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component['syncAutoUpdate'](true);
    component['syncAutoUpdate'](false);

    expect(cleanUp).toHaveBeenCalledTimes(1);
    expect(component['cleanUpAutoUpdate']).toBeUndefined();
    expect(component['autoUpdateRef']).toBeUndefined();
  });
});
