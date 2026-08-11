import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as childrenObserverUtils from '../../utils/children-observer';
import * as dialogUtils from '../../utils/dialog/dialog';
import * as observerUtils from '../../utils/dialog/observer';
import * as domUtils from '../../utils/dom';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import { Flyout } from './flyout';
import * as flyoutUtilsUtils from './flyout-utils';

let component: Flyout;

class MockResizeObserver {
  constructor(callback: any) {
    this.callback = callback;
  }

  public callback: any;

  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

beforeEach(() => {
  component = new Flyout();
  component.host = document.createElement('p-flyout');
  component['dialog'] = document.createElement('dialog');
  component['scroller'] = document.createElement('div');
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
  it('should call addStickyTopCssVarStyleSheet()', () => {
    const addStickyTopCssVarStyleSheetSpy = vi.spyOn(flyoutUtilsUtils, 'addStickyTopCssVarStyleSheet');
    component.componentDidLoad();
    expect(addStickyTopCssVarStyleSheetSpy).toHaveBeenCalledWith(component.host);
  });
  it('should call updateSlotObserver()', () => {
    const updateSlotObserverSpy = vi.spyOn(component as any, 'updateSlotObserver');
    component.componentDidLoad();
    expect(updateSlotObserverSpy).toHaveBeenCalled();
  });
});

describe('componentDidUpdate', () => {
  it('should call updateSlotObserver()', () => {
    const updateSlotObserverSpy = vi.spyOn(component as any, 'updateSlotObserver');
    component.componentDidUpdate();
    expect(updateSlotObserverSpy).toHaveBeenCalled();
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

  it('should call hasNamedSlot() with correct parameters', () => {
    const hasNamedSlotSpy = vi.spyOn(domUtils, 'hasNamedSlot');
    const header = document.createElement('header');
    header.slot = 'heading';
    component.host.appendChild(header);
    component.render();

    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(1, component.host, 'header');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(2, component.host, 'footer');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(3, component.host, 'sub-footer');
    expect(hasNamedSlotSpy).toHaveBeenCalledTimes(3);
  });
});

describe('updateSlotObserver', () => {
  it('should call observeStickyArea() with correct parameters if hasHeader is true', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasHeader'] = true;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['header']);
  });
  it('should not call observeStickyArea() with if hasHeader is false', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasHeader'] = false;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
  it('should call observeStickyArea() with correct parameters if hasFooter is true', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = true;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['footer']);
  });
  it('should not call observeStickyArea() with if hasFooter is false', () => {
    const observeStickyAreaSpy = vi.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = false;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
  it('should call handleUpdateStickyTopCssVar() with correct parameters', () => {
    const handleUpdateStickyTopCssVarSpy = vi
      .spyOn(flyoutUtilsUtils, 'handleUpdateStickyTopCssVar')
      .mockReturnValueOnce();

    component['updateSlotObserver']();

    expect(handleUpdateStickyTopCssVarSpy).toHaveBeenCalledWith(
      component.host,
      component['hasHeader'],
      component['header']
    );
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
  it('should emit dismiss without payload', () => {
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['dismissDialog']();

    expect(emitSpy).toHaveBeenCalledWith();
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
