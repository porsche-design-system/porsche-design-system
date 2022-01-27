import { Modal } from './modal';
import * as modalUtils from './modal-utils';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('modal', () => {
  let component: Modal;

  beforeEach(() => {
    component = new Modal();
    component.host = document.createElement('p-modal');
  });

  describe('connectedCallback', () => {
    it('should call setScrollLock() if modal is open', () => {
      component.open = true;
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');

      component.connectedCallback();

      expect(utilsSpy).toHaveBeenCalledWith(component.host, true, expect.anything());
    });

    it('should not call setScrollLock() if modal is not open', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');

      component.connectedCallback();

      expect(utilsSpy).not.toHaveBeenCalled();
    });
  });

  describe('componentDidLoad', () => {
    it('should call getFocusableElements()', () => {
      const spy = jest.spyOn(modalUtils, 'getFocusableElements');

      component.componentDidLoad();

      expect(spy).toBeCalledWith(component.host, undefined);
    });
  });

  describe('componentWillRender', () => {
    it('should call warnIfAriaAndHeadingPropsAreUndefined() and not call hasSlottedHeading()', () => {
      const spyWarnIfAriaAndHeadingPropsAreUndefined = jest.spyOn(modalUtils, 'warnIfAriaAndHeadingPropsAreUndefined');
      const spyHasSlottedHeading = jest.spyOn(modalUtils, 'hasSlottedHeading');
      component.heading = 'Some Heading';
      component.host.attachShadow({ mode: 'open' });

      component.componentWillRender();

      expect(spyWarnIfAriaAndHeadingPropsAreUndefined).toBeCalledWith(
        component.host,
        component.heading,
        component.aria
      );
      expect(spyHasSlottedHeading).toHaveBeenCalledTimes(0);
    });

    it('should call hasSlottedHeading() when no heading is provided', () => {
      const spyHasSlottedHeading = jest.spyOn(modalUtils, 'hasSlottedHeading');
      const header = document.createElement('header');
      header.slot = 'heading';
      component.host.appendChild(header);
      component.host.attachShadow({ mode: 'open' });

      component.componentWillRender();

      expect(spyHasSlottedHeading).toHaveBeenCalledWith(component.host);
    });
  });

  describe('disconnectedCallback', () => {
    it('should call setScrollLock()', () => {
      const utilsSpy = jest.spyOn(modalUtils, 'setScrollLock');

      component.disconnectedCallback();

      expect(utilsSpy).toHaveBeenCalledWith(component.host, false, expect.anything());
    });
  });
});
