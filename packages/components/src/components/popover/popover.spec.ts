import { vi } from 'vitest';
import { forceUpdate } from '@stencil/core';
import { autoUpdate } from '@floating-ui/dom';
import * as childrenObserverUtils from '../../utils/children-observer';
import { Popover } from './popover';
import type { PopoverDismissEventDetail } from './popover-utils';

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

  it('should tear down the top layer, autoUpdate and dismiss listeners', () => {
    const cancel = vi.fn();
    component['topLayer'] = { requestShow: vi.fn(), requestHide: vi.fn(), cancel } as any;
    const syncAutoUpdateSpy = vi.spyOn(component as any, 'syncAutoUpdate').mockImplementation(() => {});
    const syncDismissListenersSpy = vi.spyOn(component as any, 'syncDismissListeners').mockImplementation(() => {});

    component.disconnectedCallback();

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(syncAutoUpdateSpy).toHaveBeenCalledWith(false);
    expect(syncDismissListenersSpy).toHaveBeenCalledWith(false);
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
    expect(autoUpdateMock).toHaveBeenCalledWith(button, popover, component['positionPopover']);
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
    expect(autoUpdateMock).toHaveBeenLastCalledWith(slotButton, popover, component['positionPopover']);
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
    expect(component['boundTriggerElement']).toBeUndefined();
  });
});

describe('isControlled', () => {
  it.each<[boolean | undefined, boolean]>([
    [true, true],
    [false, true],
    [undefined, false],
  ])('should return %s for open: %s', (open, expected) => {
    component.open = open;

    expect(component['isControlled']).toBe(expected);
  });
});

describe('effectiveOpen', () => {
  it('should reflect the open prop in controlled mode', () => {
    component.open = true;
    component['isOpen'] = false;

    expect(component['effectiveOpen']).toBe(true);
  });

  it('should reflect the internal isOpen state in uncontrolled mode', () => {
    component.open = undefined;
    component['isOpen'] = true;

    expect(component['effectiveOpen']).toBe(true);
  });
});

describe('onClick', () => {
  it('should toggle isOpen when a slotted button is clicked in uncontrolled mode', () => {
    const slotButton = document.createElement('button');
    slotButton.slot = 'button';
    component.host.appendChild(slotButton);
    component['isOpen'] = false;

    component.onClick({ target: slotButton } as unknown as MouseEvent);

    expect(component['isOpen']).toBe(true);
  });

  it('should not toggle isOpen when the click did not originate from a slotted button', () => {
    const other = document.createElement('div');
    component['isOpen'] = false;

    component.onClick({ target: other } as unknown as MouseEvent);

    expect(component['isOpen']).toBe(false);
  });

  it('should not toggle isOpen in controlled mode', () => {
    const slotButton = document.createElement('button');
    slotButton.slot = 'button';
    component.host.appendChild(slotButton);
    component.open = true;
    component['isOpen'] = false;

    component.onClick({ target: slotButton } as unknown as MouseEvent);

    expect(component['isOpen']).toBe(false);
  });
});

describe('onFocusout', () => {
  it('should dismiss when focus moves to an element outside host and panel', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = true;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component.onFocusout({ relatedTarget: document.createElement('a') } as unknown as FocusEvent);

    expect(dismissSpy).toHaveBeenCalledTimes(1);
    expect(dismissSpy).toHaveBeenCalledWith('focus-out');
  });

  it('should not dismiss when relatedTarget is null', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover');
    component.open = true;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component.onFocusout({ relatedTarget: null } as unknown as FocusEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when focus stays inside the host', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover');
    const child = document.createElement('button');
    component.host.appendChild(child);
    component.open = true;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component.onFocusout({ relatedTarget: child } as unknown as FocusEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when focus stays inside the panel', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover');
    const panel = document.createElement('div');
    const child = document.createElement('button');
    panel.appendChild(child);
    component.open = true;
    component['refPopover'] = panel as HTMLDivElement;

    component.onFocusout({ relatedTarget: child } as unknown as FocusEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when the popover is closed', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover');
    component.open = false;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component.onFocusout({ relatedTarget: document.createElement('a') } as unknown as FocusEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when focus moves to an ancestor of the host (e.g. a focusable container)', () => {
    // Clicking non-focusable panel content inside a focusable ancestor (such as a `[tabindex]` scroll/main wrapper)
    // shifts focus up to that container; `relatedTarget` then contains the host and must not dismiss the popover.
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover');
    const ancestor = document.createElement('div');
    ancestor.appendChild(component.host);
    component.open = true;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component.onFocusout({ relatedTarget: ancestor } as unknown as FocusEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss on focusout during a pointer interaction (deferred to onClickOutside)', () => {
    // A pointer click on an outside focusable element is dismissed by `onClickOutside`; `onFocusout` must defer so
    // `dismiss` is emitted once, not twice.
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover');
    component.open = true;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;
    component['isPointerInteraction'] = true;

    component.onFocusout({ relatedTarget: document.createElement('a') } as unknown as FocusEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });
});

describe('onEscape', () => {
  it('should focus the trigger and dismiss when Escape is pressed while open', () => {
    const focusTriggerSpy = vi.spyOn(component as any, 'focusTrigger').mockImplementation(() => {});
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = true;

    component['onEscape']({ key: 'Escape' } as KeyboardEvent);

    expect(focusTriggerSpy).toHaveBeenCalledTimes(1);
    expect(dismissSpy).toHaveBeenCalledTimes(1);
    expect(dismissSpy).toHaveBeenCalledWith('escape');
  });

  it('should not dismiss for other keys', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = true;

    component['onEscape']({ key: 'Enter' } as KeyboardEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when the popover is closed', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = false;

    component['onEscape']({ key: 'Escape' } as KeyboardEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });
});

describe('onClickOutside', () => {
  it('should dismiss on a click outside both the trigger and the panel', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = true;
    component['refButton'] = document.createElement('button') as HTMLButtonElement;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;
    const outside = document.createElement('div');

    component['onClickOutside']({ target: outside, composedPath: () => [outside] } as unknown as MouseEvent);

    expect(dismissSpy).toHaveBeenCalledTimes(1);
    expect(dismissSpy).toHaveBeenCalledWith('outside-click');
  });

  it('should not dismiss when clicking inside the panel', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    const panel = document.createElement('div');
    component.open = true;
    component['refButton'] = document.createElement('button') as HTMLButtonElement;
    component['refPopover'] = panel as HTMLDivElement;

    component['onClickOutside']({ target: panel, composedPath: () => [panel] } as unknown as MouseEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when the popover is closed', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = false;
    component['refButton'] = document.createElement('button') as HTMLButtonElement;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;
    const outside = document.createElement('div');

    component['onClickOutside']({ target: outside, composedPath: () => [outside] } as unknown as MouseEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when the gesture started inside the popover (selection dragged outside)', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissPopover').mockImplementation(() => {});
    component.open = true;
    component['refButton'] = document.createElement('button') as HTMLButtonElement;
    component['refPopover'] = document.createElement('div') as HTMLDivElement;
    component['isPointerDownInside'] = true; // pointerdown originated inside the panel
    const outside = document.createElement('div');

    component['onClickOutside']({ target: outside, composedPath: () => [outside] } as unknown as MouseEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
    expect(component['isPointerDownInside']).toBe(false); // flag consumed
  });
});

describe('dismissPopover', () => {
  it.each<PopoverDismissEventDetail['reason']>(['outside-click', 'focus-out', 'escape'])(
    'should emit dismiss with reason %s and keep isOpen in controlled mode',
    (reason) => {
      const emit = vi.fn();
      component.dismiss = { emit } as any;
      component.open = true;
      component['isOpen'] = true;

      component['dismissPopover'](reason);

      expect(emit).toHaveBeenCalledWith({ reason });
      expect(component['isOpen']).toBe(true);
    }
  );

  it('should set isOpen to false in uncontrolled mode', () => {
    const emit = vi.fn();
    component.dismiss = { emit } as any;
    component.open = undefined;
    component['isOpen'] = true;

    component['dismissPopover']('escape');

    expect(emit).not.toHaveBeenCalled();
    expect(component['isOpen']).toBe(false);
  });
});

describe('focusTrigger', () => {
  it('should focus the resolved trigger element', () => {
    const button = document.createElement('button');
    const focusSpy = vi.spyOn(button, 'focus');
    component['refButton'] = button as HTMLButtonElement;

    component['focusTrigger']();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});

describe('syncDismissListeners', () => {
  it('should register document listeners once when activated', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');

    component['syncDismissListeners'](true);
    component['syncDismissListeners'](true); // idempotent

    expect(addSpy).toHaveBeenCalledWith('click', component['onClickOutside'], true);
    expect(addSpy).toHaveBeenCalledWith('keydown', component['onEscape']);
    expect(addSpy).toHaveBeenCalledWith('pointerdown', component['onPointerDown'], true);
    expect(addSpy).toHaveBeenCalledWith('pointerup', component['onPointerUp'], true);
    expect(component['hasDismissListeners']).toBe(true);
    expect(addSpy).toHaveBeenCalledTimes(4);
  });

  it('should remove document listeners once when deactivated', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    component['syncDismissListeners'](true);

    component['syncDismissListeners'](false);
    component['syncDismissListeners'](false); // idempotent

    expect(removeSpy).toHaveBeenCalledWith('click', component['onClickOutside'], true);
    expect(removeSpy).toHaveBeenCalledWith('keydown', component['onEscape']);
    expect(removeSpy).toHaveBeenCalledWith('pointerdown', component['onPointerDown'], true);
    expect(removeSpy).toHaveBeenCalledWith('pointerup', component['onPointerUp'], true);
    expect(component['hasDismissListeners']).toBe(false);
    expect(removeSpy).toHaveBeenCalledTimes(4);
  });
});

describe('pointer interaction tracking', () => {
  it('should flag on pointerdown and unflag on pointerup', () => {
    component['onPointerDown']({ composedPath: () => [] } as unknown as PointerEvent);
    expect(component['isPointerInteraction']).toBe(true);
    component['onPointerUp']();
    expect(component['isPointerInteraction']).toBe(false);
  });

  it('should flag isPointerDownInside when the press starts inside the panel', () => {
    const panel = document.createElement('div');
    component['refPopover'] = panel as HTMLDivElement;

    component['onPointerDown']({ composedPath: () => [panel] } as unknown as PointerEvent);

    expect(component['isPointerDownInside']).toBe(true);
  });

  it('should not flag isPointerDownInside when the press starts outside', () => {
    component['refPopover'] = document.createElement('div') as HTMLDivElement;

    component['onPointerDown']({ composedPath: () => [document.createElement('div')] } as unknown as PointerEvent);

    expect(component['isPointerDownInside']).toBe(false);
  });
});

describe('componentDidRender', () => {
  it('should request show and sync listeners/positioning when open', () => {
    const requestShow = vi.fn();
    const requestHide = vi.fn();
    component['topLayer'] = { requestShow, requestHide, cancel: vi.fn() } as any;
    const syncAutoUpdateSpy = vi.spyOn(component as any, 'syncAutoUpdate').mockImplementation(() => {});
    const syncDismissListenersSpy = vi.spyOn(component as any, 'syncDismissListeners').mockImplementation(() => {});
    component.open = true;

    component.componentDidRender();

    expect(requestShow).toHaveBeenCalledTimes(1);
    expect(requestHide).not.toHaveBeenCalled();
    expect(syncAutoUpdateSpy).toHaveBeenCalledWith(true);
    expect(syncDismissListenersSpy).toHaveBeenCalledWith(true);
  });

  it('should request hide and sync listeners/positioning when closed', () => {
    const requestShow = vi.fn();
    const requestHide = vi.fn();
    component['topLayer'] = { requestShow, requestHide, cancel: vi.fn() } as any;
    const syncAutoUpdateSpy = vi.spyOn(component as any, 'syncAutoUpdate').mockImplementation(() => {});
    const syncDismissListenersSpy = vi.spyOn(component as any, 'syncDismissListeners').mockImplementation(() => {});
    component.open = false;

    component.componentDidRender();

    expect(requestHide).toHaveBeenCalledTimes(1);
    expect(requestShow).not.toHaveBeenCalled();
    expect(syncAutoUpdateSpy).toHaveBeenCalledWith(false);
    expect(syncDismissListenersSpy).toHaveBeenCalledWith(false);
  });
});
