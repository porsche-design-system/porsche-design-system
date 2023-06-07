import { Modal } from './modal';
import * as modalUtils from './modal-utils';
import * as domUtils from '../../utils/dom';
import type { FirstAndLastFocusableElement } from './modal-utils';

jest.mock('../../utils/dom');

describe('modal', () => {
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
      jest.spyOn(modalUtils, 'getFirstAndLastFocusableElement').mockImplementation(() => focusableElements);
      jest.spyOn(domUtils, 'getShadowRootHTMLElement').mockImplementation(() => document.createElement('slot'));
    });

    it('should call setScrollLock() with correct parameters if modal is open', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');
      component.open = true;
      component.componentDidLoad();

      expect(utilsSpy).toBeCalledWith(component.host, true, component['dismissBtn'], component['dismissModal']);
    });

    it('should not call setScrollLock() if modal is not open', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');
      component.componentDidLoad();

      expect(utilsSpy).not.toBeCalled();
    });
  });

  describe('componentDidRender', () => {
    it('should focus dialog if modal is open', () => {
      component.open = true;
      const spy = jest.spyOn(component['dialog'], 'focus');

      component.componentDidRender();

      expect(spy).toBeCalledWith();
    });
    it('should not focus dialog if modal is not open', () => {
      component.open = false;
      const spy = jest.spyOn(component['dialog'], 'focus');

      component.componentDidRender();

      expect(spy).not.toBeCalled();
    });
  });

  describe('render', () => {
    beforeEach(() => {
      jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    });

    it('should call warnIfAriaAndHeadingPropsAreUndefined() with correct parameters when open="true"', () => {
      const warnIfAriaAndHeadingPropsAreUndefinedSpy = jest.spyOn(modalUtils, 'warnIfAriaAndHeadingPropsAreUndefined');
      component.open = true;
      component.render();

      expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).toBeCalledWith(
        component.host,
        component.heading,
        component.aria
      );
    });

    it('should not call warnIfAriaAndHeadingPropsAreUndefined() when open="false"', () => {
      const warnIfAriaAndHeadingPropsAreUndefinedSpy = jest.spyOn(modalUtils, 'warnIfAriaAndHeadingPropsAreUndefined');
      component.open = false;
      component.render();

      expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).not.toBeCalled();
    });

    it('should not call hasNamedSlot() when heading is provided', () => {
      const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
      component.heading = 'Some Heading';
      component.render();

      expect(hasNamedSlotSpy).not.toBeCalled();
    });

    it('should call hasNamedSlot() with correct parameters when no heading is provided', () => {
      const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
      const header = document.createElement('header');
      header.slot = 'heading';
      component.host.appendChild(header);
      component.render();

      expect(hasNamedSlotSpy).toBeCalledWith(component.host, 'heading');
    });
  });

  describe('disconnectedCallback', () => {
    it('should call setScrollLock() with correct parameters', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');
      component.disconnectedCallback();

      expect(utilsSpy).toBeCalledWith(component.host, false);
    });
  });
});
