import { Accordion } from './accordion';
import * as accordionUtils from './accordion-utils';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

const resizeObserver = { ...window.ResizeObserver };
const removeResizeObserver = (): boolean => delete window.ResizeObserver;
// @ts-ignore
const restoreResizeObserver = (): void => (window.ResizeObserver = resizeObserver);

describe('accordion', () => {
  afterEach(() => {
    restoreResizeObserver();
  });

  describe('componentWillLoad', () => {
    it('should call throwIfCompactAndSizeIsSet()', () => {
      const spy = jest.spyOn(accordionUtils, 'warnIfCompactAndSizeIsSet');
      const component = new Accordion();
      component.host = document.createElement('p-accordion');
      component.componentWillLoad();

      expect(spy).toBeCalledWith(component.host, undefined, 'small');
    });
  });

  describe('connectedCallback()', () => {
    it('should not add resize event listener to window if ResizeObserver is available', () => {
      const component = new Accordion();
      const utilsSpy = jest.spyOn(accordionUtils, 'observeWindowResize');

      expect(window.ResizeObserver).toBeDefined();

      component.connectedCallback();

      expect(component['contentObserver']).toBeUndefined();
      expect(utilsSpy).not.toHaveBeenCalled();
    });

    it('should add resize event listener to window if ResizeObserver is unavailable', () => {
      const utilsSpy = jest.spyOn(accordionUtils, 'observeWindowResize');
      removeResizeObserver();

      expect(window.ResizeObserver).toBeUndefined();

      const component = new Accordion();
      component.host = document.createElement('p-accordion');
      component.connectedCallback();

      expect(component['contentObserver']).toBeDefined();
      expect(utilsSpy).toHaveBeenCalledWith(component);
    });
  });

  describe('componentDidLoad', () => {
    it('should call observeResize() if ResizeObserver is available', () => {
      const spy = jest.spyOn(accordionUtils, 'observeResize');
      const component = new Accordion();
      component.componentDidLoad();

      expect(spy).toBeCalledWith(undefined, expect.anything(), { box: 'border-box' });
    });
  });

  describe('componentDidRender', () => {
    it('should set contentHeight if ResizeObserver is unavailable', () => {
      const spy = jest.spyOn(accordionUtils, 'getContentHeight');

      removeResizeObserver();

      const host = document.createElement('p-accordion');
      const content = document.createElement('p');
      content.innerText = 'Some content';

      const component = new Accordion();
      component.host = host;
      component['content'] = content;
      component.connectedCallback();

      component.componentDidRender();

      expect(spy).toHaveBeenCalledWith(
        {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0,
        },
        undefined
      );
      expect(component['contentHeight']).toBe('0.5rem');
    });
  });

  describe('disconnectedCallback', () => {
    it('should remove resize event listener if ResizeObserver is unavailable', () => {
      removeResizeObserver();

      const utilsSpy = jest.spyOn(accordionUtils, 'unobserveWindowResize');

      const component = new Accordion();
      component.host = document.createElement('p-accordion');
      component.connectedCallback();
      component.disconnectedCallback();

      expect(utilsSpy).toHaveBeenCalledWith(component);
    });

    it('should call unobserveResize() if ResizeObserver is available', () => {
      const spy = jest.spyOn(accordionUtils, 'unobserveResize');
      const component = new Accordion();
      component.disconnectedCallback();

      expect(spy).toBeCalledWith(undefined);
    });
  });
});
