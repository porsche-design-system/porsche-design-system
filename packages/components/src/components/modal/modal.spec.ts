import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as childrenObserverUtils from '../../utils/children-observer';
import * as dialogUtils from '../../utils/dialog/dialog';
import * as observerUtils from '../../utils/dialog/observer';
import * as domUtils from '../../utils/dom';
import * as warnIfAriaAndHeadingPropsAreUndefined from '../../utils/log/warnIfAriaAndHeadingPropsAreUndefined';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import { Modal } from './modal';

let component: Modal;

beforeEach(() => {
  component = new Modal();
  component.host = document.createElement('p-modal');
  component.host.attachShadow({ mode: 'open' });
  component['dialog'] = document.createElement('dialog');
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
});

describe('componentWillRender', () => {
  it('should call setScrollLock() with correct parameters if flyout is open', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setScrollLock() with correct parameters if flyout is not open', () => {
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

describe('componentDidLoad', () => {
  it('should call observeStickyArea() with correct parameters if hasFooter is true', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = true;
    component.componentDidLoad();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['footer']);
  });
  it('should not call observeStickyArea() with if hasFooter is false', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = false;
    component.componentDidLoad();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
});

describe('componentDidUpdate', () => {
  it('should call observeStickyArea() with correct parameters if hasFooter is true', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = true;
    component.componentDidUpdate();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['footer']);
  });
  it('should not call observeStickyArea() with if hasFooter is false', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = false;
    component.componentDidUpdate();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should call setScrollLock() with correct parameters', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.disconnectedCallback(); // component gets removed from dom

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
  it('should call unobserveChildren() with correct parameters', () => {
    const unobserveChildrenSpy = vi.spyOn(childrenObserverUtils, 'unobserveChildren');
    component.open = true;
    component.disconnectedCallback(); // component gets removed from dom

    expect(unobserveChildrenSpy).toHaveBeenCalledWith(component.host);
  });
});

describe('render', () => {
  beforeEach(() => {
    vi.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should call warnIfAriaAndHeadingPropsAreUndefined() with correct parameters when open="true"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = vi.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = true;
    component.aria = {};
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).toHaveBeenCalledWith(component.host, false, component.aria);
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

  it('should call hasNamedSlot() with correct parameters', () => {
    const hasNamedSlotSpy = vi.spyOn(domUtils, 'hasNamedSlot');

    const header = document.createElement('header');
    header.slot = 'heading';
    component.host.appendChild(header);
    component.render();

    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(1, component.host, 'header');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(2, component.host, 'footer');
    expect(hasNamedSlotSpy).toHaveBeenCalledTimes(2);
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

describe('dismiss request', () => {
  it('should emit dismiss with reason dismiss-button when the dismiss button is activated', () => {
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['onDismissButtonClick']();

    expect(emitSpy).toHaveBeenCalledWith({ reason: 'dismiss-button' });
  });

  it('should emit dismiss with reason escape and prevent the native close', () => {
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;
    const event = new Event('cancel', { cancelable: true });

    component['onDialogCancel'](event);

    expect(event.defaultPrevented).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith({ reason: 'escape' });
  });

  it('should not emit dismiss on escape when dismissButton is false', () => {
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;
    component.dismissButton = false;
    const event = new Event('cancel', { cancelable: true });

    component['onDialogCancel'](event);

    expect(event.defaultPrevented).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit dismiss with reason backdrop when the backdrop is clicked', () => {
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['onDialogBackdropClick']({ target: { tagName: 'DIALOG' } } as any);

    expect(emitSpy).toHaveBeenCalledWith({ reason: 'backdrop' });
  });

  it('should not emit dismiss when the pointer went down inside the panel', () => {
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;
    component['isPointerDownInside'] = true;

    component['onDialogBackdropClick']({ target: { tagName: 'DIALOG' } } as any);

    expect(emitSpy).not.toHaveBeenCalled();
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
