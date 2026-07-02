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

let component: Popover;

beforeEach(() => {
  autoUpdateMock.mockReset();
  component = new Popover();
  component.host = document.createElement('p-popover');
  component.host.attachShadow({ mode: 'open' });
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
    const slotButton = document.createElement('slot');
    const popover = document.createElement('div');
    component['refPopover'] = popover as HTMLDivElement;

    // initial bind to the default shadow button
    component['refButton'] = button as HTMLButtonElement;
    component['syncAutoUpdate'](true);

    // trigger switches to the slotted button (default button removed → ref nulled by Stencil)
    component['refButton'] = undefined;
    component['refSlotButton'] = slotButton;
    component['syncAutoUpdate'](true);

    expect(cleanUp).toHaveBeenCalledTimes(1); // old binding torn down
    expect(autoUpdateMock).toHaveBeenCalledTimes(2);
    expect(autoUpdateMock).toHaveBeenLastCalledWith(slotButton, popover, component['updatePosition']);
  });

  it('should not rebind autoUpdate when the trigger reference is unchanged', () => {
    const cleanUp = vi.fn();
    autoUpdateMock.mockReturnValue(cleanUp);
    const slotButton = document.createElement('slot');
    const popover = document.createElement('div');
    component['refSlotButton'] = slotButton;
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


