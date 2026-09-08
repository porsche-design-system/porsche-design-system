import { vi } from 'vitest';
import { forceUpdate } from '@stencil/core';
import * as childrenObserverUtils from '../../utils/children-observer';
import { Banner } from './banner';

let component: Banner;

beforeEach(() => {
  component = new Banner();
  component.host = document.createElement('p-banner');
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

  it('should tear down the top layer and the escape listener', () => {
    const cancel = vi.fn();
    component['topLayer'] = { requestShow: vi.fn(), requestHide: vi.fn(), cancel } as any;
    const syncEscapeListenerSpy = vi.spyOn(component as any, 'syncEscapeListener').mockImplementation(() => {});

    component.disconnectedCallback();

    expect(cancel).toHaveBeenCalledTimes(1);
    expect(syncEscapeListenerSpy).toHaveBeenCalledWith(false);
  });
});

describe('componentDidRender', () => {
  it('should request show and register the escape listener when open with a dismiss button', () => {
    const requestShow = vi.fn();
    const requestHide = vi.fn();
    component['topLayer'] = { requestShow, requestHide, cancel: vi.fn() } as any;
    const syncEscapeListenerSpy = vi.spyOn(component as any, 'syncEscapeListener').mockImplementation(() => {});
    component.open = true;
    component.dismissButton = true;

    component.componentDidRender();

    expect(requestShow).toHaveBeenCalledTimes(1);
    expect(requestHide).not.toHaveBeenCalled();
    expect(syncEscapeListenerSpy).toHaveBeenCalledWith(true);
  });

  it('should request hide and remove the escape listener when closed', () => {
    const requestShow = vi.fn();
    const requestHide = vi.fn();
    component['topLayer'] = { requestShow, requestHide, cancel: vi.fn() } as any;
    const syncEscapeListenerSpy = vi.spyOn(component as any, 'syncEscapeListener').mockImplementation(() => {});
    component.open = false;
    component.dismissButton = true;

    component.componentDidRender();

    expect(requestHide).toHaveBeenCalledTimes(1);
    expect(requestShow).not.toHaveBeenCalled();
    expect(syncEscapeListenerSpy).toHaveBeenCalledWith(false);
  });

  it('should not register the escape listener when open but dismissButton is false', () => {
    component['topLayer'] = { requestShow: vi.fn(), requestHide: vi.fn(), cancel: vi.fn() } as any;
    const syncEscapeListenerSpy = vi.spyOn(component as any, 'syncEscapeListener').mockImplementation(() => {});
    component.open = true;
    component.dismissButton = false;

    component.componentDidRender();

    expect(syncEscapeListenerSpy).toHaveBeenCalledWith(false);
  });

  it('should focus the dismiss button when it is rendered', () => {
    component['topLayer'] = { requestShow: vi.fn(), requestHide: vi.fn(), cancel: vi.fn() } as any;
    vi.spyOn(component as any, 'syncEscapeListener').mockImplementation(() => {});
    const dismissButton = document.createElement('button');
    const focusSpy = vi.spyOn(dismissButton, 'focus');
    component['refDismiss'] = dismissButton;
    component.open = true;

    component.componentDidRender();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});

describe('syncEscapeListener', () => {
  it('should register the keydown listener once when activated (idempotent)', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');

    component['syncEscapeListener'](true);
    component['syncEscapeListener'](true); // idempotent

    expect(addSpy).toHaveBeenCalledWith('keydown', component['onEscape']);
    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(component['hasKeydownListener']).toBe(true);
  });

  it('should remove the keydown listener once when deactivated (idempotent)', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    component['syncEscapeListener'](true);

    component['syncEscapeListener'](false);
    component['syncEscapeListener'](false); // idempotent

    expect(removeSpy).toHaveBeenCalledWith('keydown', component['onEscape']);
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(component['hasKeydownListener']).toBe(false);
  });
});

describe('onEscape', () => {
  it('should dismiss when Escape is pressed while open', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissBanner').mockImplementation(() => {});
    component.open = true;

    component['onEscape']({ key: 'Escape' } as KeyboardEvent);

    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });

  it('should not dismiss for other keys', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissBanner').mockImplementation(() => {});
    component.open = true;

    component['onEscape']({ key: 'Enter' } as KeyboardEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });

  it('should not dismiss when the banner is closed', () => {
    const dismissSpy = vi.spyOn(component as any, 'dismissBanner').mockImplementation(() => {});
    component.open = false;

    component['onEscape']({ key: 'Escape' } as KeyboardEvent);

    expect(dismissSpy).not.toHaveBeenCalled();
  });
});

describe('dismissBanner', () => {
  it('should emit the dismiss event', () => {
    const emit = vi.fn();
    component.dismiss = { emit } as any;

    component['dismissBanner']();

    expect(emit).toHaveBeenCalledTimes(1);
  });
});

