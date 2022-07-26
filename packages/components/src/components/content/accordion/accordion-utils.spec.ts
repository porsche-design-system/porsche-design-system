import * as accordionUtils from './accordion-utils';
import {
  getContentHeight,
  observeWindowResize,
  onWindowResize,
  registeredAccordions,
  setCollapsibleElementHeight,
  unobserveWindowResize,
  warnIfCompactAndSizeIsSet,
} from './accordion-utils';
import { Accordion } from './accordion';
import * as childrenObserverUtils from '../../../utils/children-observer';
import { useMutationObserverFallbackOverride } from '../../../utils';

describe('setCollapsibleElementHeight()', () => {
  it('should set style.height on element to "200px" if isOpen = true', () => {
    const collapsible = document.createElement('div');

    expect(collapsible.style.height).toBe('');

    setCollapsibleElementHeight(collapsible, true, '200px');

    expect(collapsible.style.height).toBe('200px');
  });

  it('should set style.height on element to "0" if isOpen = false', () => {
    const collapsible = document.createElement('div');

    expect(collapsible.style.height).toBe('');

    setCollapsibleElementHeight(collapsible, false, '200px');

    expect(collapsible.style.height).toBe('0px');
  });

  it('should not throw error when no element is present', () => {
    expect(() => setCollapsibleElementHeight(undefined, false, '200px')).not.toThrow();
  });
});

describe('getContentHeight()', () => {
  it('should return height value with extra padding in rem', () => {
    expect(getContentHeight({ height: 16 } as DOMRectReadOnly, false)).toBe('1.5rem');
  });

  it('should return height value without extra padding for compact = true in rem', () => {
    expect(getContentHeight({ height: 16 } as DOMRectReadOnly, true)).toBe('1rem');
  });
});

describe('warnIfCompactAndSizeIsSet()', () => {
  it('should print warning when compact and size is defined', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
    const host = document.createElement('p-accordion');

    warnIfCompactAndSizeIsSet(host, true, 'small');
    warnIfCompactAndSizeIsSet(host, false, 'medium');

    expect(spy).not.toBeCalled();

    warnIfCompactAndSizeIsSet(host, true, 'medium');
    warnIfCompactAndSizeIsSet(
      host,
      true,
      '{"base":"small","xs":"small","s":"medium","m":"small","l":"medium","xl":"small"}'
    );

    expect(spy).toBeCalledTimes(2);
  });
});

describe('onWindowResize()', () => {
  it('should call setContentHeight() for each accordion', () => {
    const component1 = new Accordion();
    const component2 = new Accordion();

    const spy1 = jest.spyOn(component1, 'setContentHeight');
    const spy2 = jest.spyOn(component2, 'setContentHeight');

    observeWindowResize(component1);
    observeWindowResize(component2);

    onWindowResize();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});

describe('observeWindowResize()', () => {
  beforeEach(() => {
    registeredAccordions.length = 0;
  });

  it('should push accordion to registeredAccordions', () => {
    const component = new Accordion();
    observeWindowResize(component);

    expect(registeredAccordions).toHaveLength(1);
  });

  it('should not push accordion to registeredAccordions if it is a duplicate', () => {
    const component = new Accordion();
    observeWindowResize(component);
    observeWindowResize(component);

    expect(registeredAccordions).toHaveLength(1);
  });

  it('should add event listener', () => {
    const windowSpy = jest.spyOn(window, 'addEventListener');
    observeWindowResize(undefined);

    expect(windowSpy).toBeCalledWith('resize', expect.anything());
  });
});

describe('unobserveWindowResize()', () => {
  beforeEach(() => {
    registeredAccordions.length = 0;
  });

  it('should remove accordion from registeredAccordions', () => {
    const component = new Accordion();
    observeWindowResize(component);

    expect(registeredAccordions).toHaveLength(1);

    unobserveWindowResize(component);

    expect(registeredAccordions).toHaveLength(0);
  });

  it('should remove event listener if no registeredAccordions are defined', () => {
    const windowSpy = jest.spyOn(window, 'removeEventListener');
    unobserveWindowResize(undefined);

    expect(windowSpy).toBeCalledWith('resize', expect.anything());
  });
});

describe('mutationObserverFallback', () => {
  it('should call observeWindowResize() and observeChildren()', () => {
    const accordionUtilsSpy = jest.spyOn(accordionUtils, 'observeWindowResize');
    const observeChildrenSpy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    useMutationObserverFallbackOverride(true);

    const component = new Accordion();
    component.host = document.createElement('p-accordion');

    component.connectedCallback();

    expect(accordionUtilsSpy).toBeCalledWith(component);
    expect(observeChildrenSpy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('removeMutationObserverFallback()', () => {
  it('should call unobserveWindowResize() and unobserveChildren()', () => {
    const accordionUtilsSpy = jest.spyOn(accordionUtils, 'unobserveWindowResize');
    const observeChildrenSpy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

    useMutationObserverFallbackOverride(true);

    const component = new Accordion();
    component.host = document.createElement('p-accordion');
    component.disconnectedCallback();

    expect(accordionUtilsSpy).toBeCalledWith(component);
    expect(observeChildrenSpy).toBeCalledWith(component.host);
  });
});
