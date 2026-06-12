import type { EventEmitter } from '@stencil/core';
import { vi } from 'vitest';
import { onCancelDialog, onClickDialog, onTransitionEnd, showDialog } from './dialog';

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
});
