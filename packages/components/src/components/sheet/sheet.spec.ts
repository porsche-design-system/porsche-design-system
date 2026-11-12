import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as dialogUtils from '../../utils/dialog/dialog';
import * as warnIfAriaAndHeadingPropsAreUndefined from '../../utils/log/warnIfAriaAndHeadingPropsAreUndefined';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import { Sheet } from './sheet';

vi.mock('../../utils/dom');

let component: Sheet;

beforeEach(() => {
  component = new Sheet();
  component.host = document.createElement('p-sheet');
  component.host.attachShadow({ mode: 'open' });
  component['dialog'] = document.createElement('dialog');
});

describe('componentWillRender', () => {
  it('should call setScrollLock() with correct parameters if dialog is open', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setScrollLock() with correct parameters if dialog is not open', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = false;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});

describe('componentDidRender', () => {
  it('should call showDialog() with correct parameters when open', () => {
    const showDialogSpy = vi.spyOn(dialogUtils, 'showDialog').mockReturnValueOnce();
    component.open = true;
    component.componentDidRender();

    expect(showDialogSpy).toHaveBeenCalledWith(component['dialog'], component['scroller']);
  });

  it('should not call showDialog() when closed', () => {
    const showDialogSpy = vi.spyOn(dialogUtils, 'showDialog').mockReturnValueOnce();
    component.open = false;
    component.componentDidRender();

    expect(showDialogSpy).not.toHaveBeenCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should call setScrollLock() and clean up swipe controller', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    const destroySpy = vi.spyOn(component['swipeController'], 'destroy');
    component.open = true;
    component.disconnectedCallback();

    expect(utilsSpy).toHaveBeenCalledWith(false);
    expect(destroySpy).toHaveBeenCalledTimes(1);
  });
});

describe('render', () => {
  it('should call warnIfAriaAndHeadingPropsAreUndefined() with correct parameters when open="true"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = vi.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = true;
    component.aria = {};
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).toHaveBeenCalledWith(component.host, undefined, component.aria);
  });

  it('should not call warnIfAriaAndHeadingPropsAreUndefined() when open="false"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = vi.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = false;
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).not.toHaveBeenCalled();
  });
});

describe('dismiss request', () => {
  it('should emit dismiss with reason dismiss-button when the dismiss button is activated', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;

    component['onDismissButtonClick']();

    expect(emitMock).toHaveBeenCalledWith({ reason: 'dismiss-button' });
  });

  it('should emit dismiss with reason escape and prevent the native close', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;
    const event = new Event('cancel', { cancelable: true });

    component['onDialogCancel'](event);

    expect(event.defaultPrevented).toBe(true);
    expect(emitMock).toHaveBeenCalledWith({ reason: 'escape' });
  });

  it('should not emit dismiss on escape when dismissButton is false', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;
    component.dismissButton = false;
    const event = new Event('cancel', { cancelable: true });

    component['onDialogCancel'](event);

    expect(event.defaultPrevented).toBe(true);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('should emit dismiss with reason escape when swipeHandle is enabled and dismissButton is false', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;
    component.dismissButton = false;
    component.swipeHandle = true;
    const event = new Event('cancel', { cancelable: true });

    component['onDialogCancel'](event);

    expect(event.defaultPrevented).toBe(true);
    expect(emitMock).toHaveBeenCalledWith({ reason: 'escape' });
  });

  it('should emit dismiss with reason backdrop when the backdrop is clicked', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;

    component['onDialogBackdropClick']({ target: { tagName: 'DIALOG' } } as any);

    expect(emitMock).toHaveBeenCalledWith({ reason: 'backdrop' });
  });

  it('should not emit dismiss when the pointer went down inside the panel', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;
    component['isPointerDownInside'] = true;

    component['onDialogBackdropClick']({ target: { tagName: 'DIALOG' } } as any);

    expect(emitMock).not.toHaveBeenCalled();
  });
});

describe('body scroll lock', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should lock body scrolling while open', () => {
    component.open = true;
    component.componentWillRender();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scrolling when closed', () => {
    component.open = true;
    component.componentWillRender();
    component.open = false;
    component.componentWillRender();
    expect(document.body.style.overflow).toBe('');
  });

  it('should unlock body scrolling when removed from the DOM while open', () => {
    component.open = true;
    component.componentWillRender();
    component.disconnectedCallback();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('native dialog control', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const stubDialog = (): HTMLDialogElement => {
    const dialog = component['dialog'];
    dialog.showModal = vi.fn(() => {
      dialog.open = true;
    });
    dialog.close = vi.fn(() => {
      dialog.open = false;
    });
    dialog.focus = vi.fn();
    component['scroller'] = document.createElement('div');
    component['scroller'].scrollTo = vi.fn();
    return dialog;
  };

  it('should show the native dialog exactly once while open', () => {
    const dialog = stubDialog();
    component.open = true;

    component.componentDidRender();
    component.componentDidRender();

    expect(dialog.showModal).toHaveBeenCalledTimes(1);
  });

  it('should close the native dialog when open becomes false', () => {
    vi.useFakeTimers();
    const dialog = stubDialog();
    component.open = true;
    component.componentDidRender();
    component.open = false;

    component.componentDidRender();
    vi.runAllTimers();

    expect(dialog.close).toHaveBeenCalledTimes(1);
  });
});

describe('swipe gesture wiring', () => {
  afterEach(() => {
    component.disconnectedCallback();
    vi.restoreAllMocks();
  });

  it('should wire DOM listeners in componentDidRender and emit dismiss({ reason: "swipe" }) on mouse drag', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;
    const dialog = component['dialog'];
    dialog.showModal = vi.fn(() => {
      dialog.open = true;
    });
    dialog.close = vi.fn(() => {
      dialog.open = false;
    });
    dialog.focus = vi.fn();

    const scroller = document.createElement('div');
    scroller.scrollTo = vi.fn();
    const sheet = document.createElement('div');
    sheet.getBoundingClientRect = () => ({ height: 400 }) as DOMRect;
    const swipeHandle = document.createElement('button');
    sheet.appendChild(swipeHandle);
    scroller.appendChild(sheet);
    dialog.appendChild(scroller);

    component['scroller'] = scroller;
    component['sheet'] = sheet;
    component['swipeHandleButton'] = swipeHandle;
    component.open = true;
    component.swipeHandle = true;

    let now = 1_000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);

    component.componentDidRender();

    swipeHandle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 50, clientY: 100 }));
    now += 100;
    window.dispatchEvent(new MouseEvent('mousemove', { buttons: 1, clientX: 50, clientY: 220, cancelable: true }));
    expect(sheet.style.transform).toBe('translate3d(0, 120px, 0)');

    window.dispatchEvent(new MouseEvent('mouseup', { button: 0, clientX: 50, clientY: 220 }));
    expect(emitMock).toHaveBeenCalledTimes(1);
    expect(emitMock).toHaveBeenCalledWith({ reason: 'swipe' });

    const syntheticClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    swipeHandle.dispatchEvent(syntheticClick);
    expect(syntheticClick.defaultPrevented).toBe(true);
  });
});
