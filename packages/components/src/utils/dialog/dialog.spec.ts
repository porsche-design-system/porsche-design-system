import type { EventEmitter } from '@stencil/core';
import { vi } from 'vitest';
import {
  getAutofocusElement,
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
    const host = document.createElement('div');
    const dialog = createMockDialog(false);
    host.attachShadow({ mode: 'open' }).append(dialog);
    const input = document.createElement('input');
    input.setAttribute('autofocus', '');
    input.focus = vi.fn();
    host.append(document.createElement('p'), input);

    showDialog(dialog, createScrollArea());

    expect(dialog.focus).toHaveBeenCalledTimes(1);
    expect(input.focus).toHaveBeenCalledTimes(1);
    expect(vi.mocked(dialog.focus).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(input.focus).mock.invocationCallOrder[0]
    );
  });

  it('should only focus the dialog without a slotted autofocus element', () => {
    const host = document.createElement('div');
    const dialog = createMockDialog(false);
    host.attachShadow({ mode: 'open' }).append(dialog);
    host.append(document.createElement('input'));

    showDialog(dialog, createScrollArea());

    expect(dialog.focus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(document.body);
  });
});

describe('getAutofocusElement()', () => {
  it('should return the first element with an autofocus attribute of the host', () => {
    const host = document.createElement('div');
    const dialog = document.createElement('dialog');
    host.attachShadow({ mode: 'open' }).append(dialog);
    const first = document.createElement('button');
    first.setAttribute('autofocus', '');
    const second = document.createElement('button');
    second.setAttribute('autofocus', '');
    const wrapper = document.createElement('div');
    wrapper.append(first);
    host.append(wrapper, second);

    expect(getAutofocusElement(dialog)).toBe(first);
  });

  it('should ignore elements with an autofocus attribute in the shadow root', () => {
    const host = document.createElement('div');
    const dialog = document.createElement('dialog');
    const dismissButton = document.createElement('button');
    dismissButton.setAttribute('autofocus', '');
    dialog.append(dismissButton);
    host.attachShadow({ mode: 'open' }).append(dialog);

    expect(getAutofocusElement(dialog)).toBeNull();
  });

  it('should return null when the dialog is not rendered in a shadow root', () => {
    expect(getAutofocusElement(document.createElement('dialog'))).toBeNull();
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
