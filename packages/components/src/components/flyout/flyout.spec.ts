import { Flyout } from './flyout';
import * as flyoutUtilsUtils from './flyout-utils';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import * as applyConstructableStylesheetStyleUtils from '../../utils/applyConstructableStylesheetStyle';
import * as domUtils from '../../utils/dom';
import { getSlottedAnchorStyles } from '../../styles';
import * as childrenObserverUtils from '../../utils/children-observer';
import * as dialogUtils from '../../utils/dialog/dialog';
import * as observerUtils from '../../utils/dialog/observer';
import { expect } from '@jest/globals';

jest.mock('../../utils/dom');

let component: Flyout;

class MockResizeObserver {
  constructor(callback) {
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
  it('should call applyConstructableStylesheetStyles() with correct parameters', () => {
    const utilsSpy = jest.spyOn(applyConstructableStylesheetStyleUtils, 'applyConstructableStylesheetStyles');
    component.open = true;
    component.connectedCallback();

    expect(utilsSpy).toHaveBeenCalledWith(component.host, getSlottedAnchorStyles);
  });
  it('should call observeChildren with correct parameters', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');
    component.connectedCallback();

    expect(spy).toHaveBeenCalledWith(component.host, expect.anything());
  });
});

describe('componentWillRender', () => {
  it('should call setScrollLock() with correct parameters if flyout is open', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setScrollLock() with correct parameters if flyout is not open', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = false;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});

describe('componentDidRender', () => {
  it('should call setDialogVisibility() with correct parameters', () => {
    const setDialogVisibilitySpy = jest.spyOn(dialogUtils, 'setDialogVisibility');
    component.componentDidRender();

    expect(setDialogVisibilitySpy).toHaveBeenCalledWith(component.open, component['dialog'], component['scroller']);
  });
});

describe('componentDidLoad', () => {
  it('should call updateSlotObserver()', () => {
    const updateSlotObserverSpy = jest.spyOn(component as any, 'updateSlotObserver');
    component.componentDidLoad();
    expect(updateSlotObserverSpy).toHaveBeenCalled();
  });
});

describe('componentDidUpdate', () => {
  it('should call updateSlotObserver()', () => {
    const updateSlotObserverSpy = jest.spyOn(component as any, 'updateSlotObserver');
    component.componentDidUpdate();
    expect(updateSlotObserverSpy).toHaveBeenCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should call setScrollLock() with correct parameters', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.disconnectedCallback(); // component gets removed from dom

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
  it('should call unobserveChildren() with correct parameters', () => {
    const unobserveChildrenSpy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');
    component.open = true;
    component.disconnectedCallback(); // component gets removed from dom

    expect(unobserveChildrenSpy).toHaveBeenCalledWith(component.host);
  });
});

describe('render', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation();
  });

  it('should call hasNamedSlot() with correct parameters', () => {
    const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
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
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasHeader'] = true;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['header']);
  });
  it('should not call observeStickyArea() with if hasHeader is false', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasHeader'] = false;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
  it('should call observeStickyArea() with correct parameters if hasFooter is true', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = true;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['footer']);
  });
  it('should not call observeStickyArea() with if hasFooter is false', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = false;
    component['updateSlotObserver']();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
  it('should call handleUpdateStickyTopCssVar() with correct parameters', () => {
    const handleUpdateStickyTopCssVarSpy = jest
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
