import { Modal } from './modal';
import * as focusTrapUtils from '../../utils/focusTrap';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import * as domUtils from '../../utils/dom';
import * as warnIfAriaAndHeadingPropsAreUndefined from '../../utils/log/warnIfAriaAndHeadingPropsAreUndefined';
import * as hasHeading from '../../utils/form/hasHeading';
import type { FirstAndLastFocusableElement } from '../../utils';

jest.mock('../../utils/dom');

let component: Modal;

beforeEach(() => {
  component = new Modal();
  component.host = document.createElement('p-modal');
  component.host.attachShadow({ mode: 'open' });
  component['closeBtn'] = document.createElement('button');
  component['dialog'] = document.createElement('div');
});

describe('componentDidLoad', () => {
  const focusableElements: FirstAndLastFocusableElement = [
    document.createElement('button'),
    document.createElement('button'),
  ];

  beforeEach(() => {
    jest.spyOn(focusTrapUtils, 'getFirstAndLastFocusableElement').mockImplementation(() => focusableElements);
    jest.spyOn(domUtils, 'getShadowRootHTMLElements').mockImplementation(() => component.host.querySelectorAll('slot'));
  });

  it('should call this.updateFocusTrap() with correct parameters if modal is open', () => {
    const spy = jest.spyOn(component, 'updateFocusTrap' as any);
    component.open = true;
    component.componentDidLoad();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not call this.updateFocusTrap() if modal is not open', () => {
    const spy = jest.spyOn(component, 'updateFocusTrap' as any);
    component.componentDidLoad();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call getShadowRootHTMLElement() with correct parameters and add event listener', () => {
    const slot = document.createElement('slot');
    const slotSpy = jest.spyOn(slot, 'addEventListener');
    component.host.appendChild(slot);
    const getShadowRootHTMLElementsSpy = jest
      .spyOn(domUtils, 'getShadowRootHTMLElements')
      .mockReturnValueOnce(component.host.querySelectorAll('slot'));
    component.componentDidLoad();
    expect(getShadowRootHTMLElementsSpy).toHaveBeenCalledWith(component.host, 'slot');
    expect(slotSpy).toHaveBeenCalledTimes(1);
  });
});

describe('componentDidRender', () => {
  it('should focus dialog if modal is open', () => {
    component.open = true;
    const spy = jest.spyOn(component['dialog'], 'focus');

    component.componentDidRender();

    expect(spy).toHaveBeenCalledWith();
  });
  it('should not focus dialog if modal is not open', () => {
    component.open = false;
    const spy = jest.spyOn(component['dialog'], 'focus');

    component.componentDidRender();

    expect(spy).not.toHaveBeenCalled();
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
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(2, component.host, 'footer');
    expect(hasNamedSlotSpy).toHaveBeenCalledTimes(2);
  });
});

describe('disconnectedCallback', () => {
  it('should call this.updateFocusTrap() with correct parameters', () => {
    const spy = jest.spyOn(component, 'updateFocusTrap' as any);
    component.disconnectedCallback();

    expect(spy).toHaveBeenCalledWith(false);
  });
});

describe('this.updateFocusTrap()', () => {
  it('should call setFocusTrap() with correct parameters for isOpen = true', () => {
    const utilsSpy = jest.spyOn(focusTrapUtils, 'setFocusTrap');
    component['updateFocusTrap'](true);

    expect(utilsSpy).toHaveBeenCalledWith(
      component.host,
      true,
      component['dialog'],
      component['dismissBtn'],
      component['dismissModal']
    );
  });

  it('should call setScrollLock() with correct parameters for isOpen = true', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component['updateFocusTrap'](true);

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setFocusTrap() with correct parameters for isOpen = false', () => {
    const utilsSpy = jest.spyOn(focusTrapUtils, 'setFocusTrap');
    component['updateFocusTrap'](false);

    expect(utilsSpy).toHaveBeenCalledWith(
      component.host,
      false,
      component['dialog'],
      component['dismissBtn'],
      component['dismissModal']
    );
  });

  it('should call setScrollLock() with correct parameters for isOpen = false', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component['updateFocusTrap'](false);

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});
