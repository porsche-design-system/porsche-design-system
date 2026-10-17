import type { EventEmitter } from '@stencil/core';
import { vi } from 'vitest';
import {
  focusAutofocusElement,
  isDialogBackdropTarget,
  onCancelDialog,
  onClickDialog,
  onTransitionEnd,
  showDialog,
} from './dialog';

const createMockDialog = (open: boolean): HTMLDialogElement => {
  const dialog = document.createElement('dialog');
  // jsdom doesn't implement showModal/close, so stub them and keep `open` in sync
  dialog.open = open;
  dialog.showModal = vi.fn(() => {
    dialog.open = true;
  });
  dialog.close = vi.fn(() => {
    dialog.open = false;
  });
  dialog.focus = vi.fn();
  return dialog;
};

const createScrollArea = (): HTMLElement => {
  const scrollArea = document.createElement('div');
  scrollArea.scrollTo = vi.fn();
  return scrollArea;
};

// Focus only works for connected elements, so the host is appended to the document and removed after each test.
const createHost = (): HTMLElement => document.body.appendChild(document.createElement('div'));

const createAutofocusElement = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName);
  element.setAttribute('autofocus', '');
  return element;
};

afterEach(() => {
  document.body.innerHTML = '';
});

const createEventEmitterMock = (): EventEmitter => ({ emit: vi.fn() }) as unknown as EventEmitter;

describe('showDialog()', () => {
  it('should run the open sequence (scroll reset, showModal, focus)', () => {
    const dialog = createMockDialog(false);
    const scrollArea = createScrollArea();

    showDialog(dialog, scrollArea);

    expect(scrollArea.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(dialog.showModal).toHaveBeenCalledTimes(1);
    expect(dialog.focus).toHaveBeenCalledTimes(1);
    expect(dialog.inert).toBe(false);
  });

  it('should focus the slotted element with an autofocus attribute after the dialog', () => {
    const host = createHost();
    const dialog = createMockDialog(false);
    host.attachShadow({ mode: 'open' }).append(dialog);
    const input = createAutofocusElement('input');
    const focusSpy = vi.spyOn(input, 'focus');
    host.append(document.createElement('p'), input);

    showDialog(dialog, createScrollArea());

    expect(dialog.focus).toHaveBeenCalledTimes(1);
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(vi.mocked(dialog.focus).mock.invocationCallOrder[0]).toBeLessThan(focusSpy.mock.invocationCallOrder[0]);
    expect(document.activeElement).toBe(input);
  });

  it('should only focus the dialog without a slotted autofocus element', () => {
    const host = createHost();
    const dialog = createMockDialog(false);
    host.attachShadow({ mode: 'open' }).append(dialog);
    host.append(document.createElement('input'));

    showDialog(dialog, createScrollArea());

    expect(dialog.focus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(document.body);
  });
});

describe('focusAutofocusElement()', () => {
  it('should focus the first element with an autofocus attribute of the host in tree order', () => {
    const host = createHost();
    const dialog = document.createElement('dialog');
    host.attachShadow({ mode: 'open' }).append(dialog);
    const first = createAutofocusElement('button');
    const second = createAutofocusElement('button');
    const wrapper = document.createElement('div');
    wrapper.append(first);
    host.append(wrapper, second);

    focusAutofocusElement(dialog);

    expect(document.activeElement).toBe(first);
  });

  it('should skip elements with an autofocus attribute that cannot be focused', () => {
    const host = createHost();
    const dialog = document.createElement('dialog');
    host.attachShadow({ mode: 'open' }).append(dialog);
    const notFocusable = createAutofocusElement('div');
    const disabled = createAutofocusElement('input');
    disabled.disabled = true;
    const focusable = createAutofocusElement('input');
    host.append(notFocusable, disabled, focusable);

    focusAutofocusElement(dialog);

    expect(document.activeElement).toBe(focusable);
  });

  it('should not move the focus when no element with an autofocus attribute can be focused', () => {
    const host = createHost();
    const dialog = document.createElement('dialog');
    host.attachShadow({ mode: 'open' }).append(dialog);
    const disabled = createAutofocusElement('input');
    disabled.disabled = true;
    host.append(disabled, document.createElement('input'));

    focusAutofocusElement(dialog);

    expect(document.activeElement).toBe(document.body);
  });

  it('should focus the element when the host is rendered in another shadow root', () => {
    const outerHost = createHost();
    const outerRoot = outerHost.attachShadow({ mode: 'open' });
    const host = document.createElement('div');
    outerRoot.append(host);
    const dialog = document.createElement('dialog');
    host.attachShadow({ mode: 'open' }).append(dialog);
    const input = createAutofocusElement('input');
    host.append(input);

    focusAutofocusElement(dialog);

    expect(outerRoot.activeElement).toBe(input);
  });

  it('should ignore elements with an autofocus attribute in the shadow root', () => {
    const host = createHost();
    const dialog = document.createElement('dialog');
    const dismissButton = createAutofocusElement('button');
    dialog.append(dismissButton);
    host.attachShadow({ mode: 'open' }).append(dialog);

    focusAutofocusElement(dialog);

    expect(document.activeElement).toBe(document.body);
  });

  it('should do nothing when the dialog is not rendered in a shadow root', () => {
    const dialog = document.createElement('dialog');
    const button = createAutofocusElement('button');
    const focusSpy = vi.spyOn(button, 'focus');
    dialog.append(button);
    createHost().append(dialog);

    focusAutofocusElement(dialog);

    expect(focusSpy).not.toHaveBeenCalled();
  });
});

describe('onTransitionEnd()', () => {
  it('should emit motionVisibleEnd on background-color transitionend when open', () => {
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'background-color' } as unknown as TransitionEvent;

    onTransitionEnd(event, true, motionVisibleEnd, motionHiddenEnd);

    expect(motionVisibleEnd.emit).toHaveBeenCalledWith(event);
    expect(motionHiddenEnd.emit).not.toHaveBeenCalled();
  });

  it('should emit motionHiddenEnd on background-color transitionend when closing', () => {
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'background-color' } as unknown as TransitionEvent;

    onTransitionEnd(event, false, motionVisibleEnd, motionHiddenEnd);

    expect(motionHiddenEnd.emit).toHaveBeenCalledWith(event);
    expect(motionVisibleEnd.emit).not.toHaveBeenCalled();
  });

  it('should ignore transitionend for other properties', () => {
    const motionVisibleEnd = createEventEmitterMock();
    const motionHiddenEnd = createEventEmitterMock();
    const event = { propertyName: 'opacity' } as unknown as TransitionEvent;

    onTransitionEnd(event, true, motionVisibleEnd, motionHiddenEnd);

    expect(motionVisibleEnd.emit).not.toHaveBeenCalled();
    expect(motionHiddenEnd.emit).not.toHaveBeenCalled();
  });
});

describe('onCancelDialog()', () => {
  it('should preventDefault and call callback when not disabled', () => {
    const cb = vi.fn();
    const event = { preventDefault: vi.fn() } as unknown as Event;

    onCancelDialog(event, cb);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should preventDefault but not call callback when disabled', () => {
    const cb = vi.fn();
    const event = { preventDefault: vi.fn() } as unknown as Event;

    onCancelDialog(event, cb, true);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(cb).not.toHaveBeenCalled();
  });
});

describe('onClickDialog()', () => {
  it('should call callback when clicking the backdrop (DIALOG target)', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as MouseEvent;

    onClickDialog(event, cb, false);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should call callback when clicking the scroller', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIV', className: 'scroller' } } as unknown as MouseEvent;

    onClickDialog(event, cb, false);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when disabled', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as MouseEvent;

    onClickDialog(event, cb, true);

    expect(cb).not.toHaveBeenCalled();
  });

  it('should not call callback when the pointer gesture started inside the panel', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as MouseEvent;

    onClickDialog(event, cb, false, true);

    expect(cb).not.toHaveBeenCalled();
  });

  it('should call callback when the pointer gesture started on the backdrop', () => {
    const cb = vi.fn();
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as MouseEvent;

    onClickDialog(event, cb, false, false);

    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('isDialogBackdropTarget()', () => {
  it('should return true for the DIALOG element', () => {
    const event = { target: { tagName: 'DIALOG', className: '' } } as unknown as Event;
    expect(isDialogBackdropTarget(event)).toBe(true);
  });

  it('should return true for the scroller', () => {
    const event = { target: { tagName: 'DIV', className: 'scroller' } } as unknown as Event;
    expect(isDialogBackdropTarget(event)).toBe(true);
  });

  it('should return false for panel content', () => {
    const event = { target: { tagName: 'DIV', className: 'modal' } } as unknown as Event;
    expect(isDialogBackdropTarget(event)).toBe(false);
  });
});
