import { Modal } from './modal';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import * as domUtils from '../../utils/dom';
import * as warnIfAriaAndHeadingPropsAreUndefined from '../../utils/log/warnIfAriaAndHeadingPropsAreUndefined';
import * as hasHeading from '../../utils/form/hasHeading';
import * as applyConstructableStylesheetStyleUtils from '../../utils/applyConstructableStylesheetStyle';
import { expect } from '@jest/globals';
import { getSlottedAnchorStyles } from '../../styles';
import * as childrenObserverUtils from '../../utils/children-observer';
import * as dialogUtils from '../../utils/dialog/dialog';
import * as observerUtils from '../../utils/dialog/observer';

jest.mock('../../utils/dom');

let component: Modal;

beforeEach(() => {
  component = new Modal();
  component.host = document.createElement('p-modal');
  component.host.attachShadow({ mode: 'open' });
  component['closeBtn'] = document.createElement('button');
  component['dialog'] = document.createElement('dialog');
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

    expect(spy).toHaveBeenCalledWith(component.host, expect.anything(), undefined, {
      attributes: false,
      childList: true,
      subtree: false,
    });
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
  it('should call observeStickyArea() with correct parameters if hasFooter is true', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = true;
    component.componentDidLoad();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['header']);
  });
  it('should not call observeStickyArea() with if hasFooter is false', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = false;
    component.componentDidLoad();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
  });
});

describe('componentDidUpdate', () => {
  it('should call observeStickyArea() with correct parameters if hasFooter is true', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = true;
    component.componentDidUpdate();

    expect(observeStickyAreaSpy).toHaveBeenCalledWith(component['scroller'], component['header']);
  });
  it('should not call observeStickyArea() with if hasFooter is false', () => {
    const observeStickyAreaSpy = jest.spyOn(observerUtils, 'observeStickyArea').mockReturnValueOnce();
    component['hasFooter'] = false;
    component.componentDidUpdate();

    expect(observeStickyAreaSpy).not.toHaveBeenCalled();
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

  it('should call warnIfAriaAndHeadingPropsAreUndefined() with correct parameters when open="true"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = jest.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = true;
    component.heading = 'Some Heading';
    component.aria = {};
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).toHaveBeenCalledWith(component.host, true, component.aria);
  });

  it('should not call warnIfAriaAndHeadingPropsAreUndefined() when open="false"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = jest.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = false;
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).not.toHaveBeenCalled();
  });

  it('should call hasHeading() with correct parameters', () => {
    const spy = jest.spyOn(hasHeading, 'hasHeading');
    component.heading = 'Some Heading';
    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, component.heading);
  });

  it('should call hasNamedSlot() with correct parameters', () => {
    const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
    const header = document.createElement('header');
    header.slot = 'heading';
    component.host.appendChild(header);
    component.render();

    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(1, component.host, 'heading');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(2, component.host, 'heading');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(3, component.host, 'header');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(4, component.host, 'footer');
    expect(hasNamedSlotSpy).toHaveBeenCalledTimes(4);
  });
});
