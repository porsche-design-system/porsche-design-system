import {
  getContentHeight,
  observeResize,
  observeWindowResize,
  onWindowResize,
  registeredAccordions,
  resizeMap,
  setCollapsibleElementHeight,
  unobserveResize,
  unobserveWindowResize,
  useMutationObserverFallbackOverride,
  warnIfCompactAndSizeIsSet,
} from './accordion-utils';
import { Accordion } from './accordion';
import * as childrenObserverUtils from '../../../utils/children-observer';
import * as accordionUtils from './accordion-utils';

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
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should print warning when compact and size is defined', () => {
    const host = document.createElement('p-accordion');

    warnIfCompactAndSizeIsSet(host, true, 'small');
    warnIfCompactAndSizeIsSet(host, false, 'medium');
    expect(console.warn).toBeCalledTimes(0);

    warnIfCompactAndSizeIsSet(host, true, 'medium');
    warnIfCompactAndSizeIsSet(
      host,
      true,
      '{"base":"small","xs":"small","s":"medium","m":"small","l":"medium","xl":"small"}'
    );

    expect(console.warn).toBeCalledTimes(2);
  });
});

describe('observeResize()', () => {
  beforeEach(() => {
    resizeMap.clear();
  });

  const tick = () => new Promise((resolve) => setTimeout(resolve, 40));

  it('should add callback and key to resizeMap', () => {
    const node = document.createElement('div');
    const callback = () => {};

    observeResize(node, callback);
    expect(resizeMap.size).toBe(1);
    expect(resizeMap.get(node)).toEqual(callback);
  });

  describe('on size change', () => {
    const createResizeableNode = (): HTMLDivElement => {
      const node = document.createElement('div');
      // in order for JSDOM to trigger the ResizeObserver event correctly,
      // the readonly offsetHeight property needs to be manually overridden
      Object.defineProperty(node, 'offsetHeight', { value: 20 });
      document.body.appendChild(node);
      return node;
    };

    it('should run callback once when observeResize is reapplied', async () => {
      const node = createResizeableNode();
      const cb = jest.fn();

      observeResize(node, cb);
      expect(resizeMap.size).toBe(1);

      unobserveResize(node);
      expect(resizeMap.size).toBe(0);

      observeResize(node, cb);
      expect(resizeMap.size).toBe(1);

      node.style.height = '20px';

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when observeResize is called multiple times', async () => {
      const node = createResizeableNode();

      const cb = jest.fn();

      observeResize(node, cb);
      observeResize(node, cb);
      observeResize(node, cb);

      node.style.height = '20px';

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when multiple divs are observed', async () => {
      const node1 = createResizeableNode();
      const node2 = createResizeableNode();

      const cb1 = jest.fn();
      const cb2 = jest.fn();

      observeResize(node1, cb1);
      observeResize(node2, cb2);

      node1.style.height = '20px';

      await tick();
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).toBeCalledTimes(0);
    });

    it('should pass ResizeObserverEntry to callback', async () => {
      const node = createResizeableNode();
      let tempResizeEntry;

      const cb = jest.fn((resizeEntry: ResizeObserverEntry) => (tempResizeEntry = resizeEntry));

      observeResize(node, cb);

      node.style.height = '20px';

      await tick();
      expect(cb).toHaveBeenCalledWith(tempResizeEntry);
    });
  });
});

describe('unobserveResize()', () => {
  beforeEach(() => {
    resizeMap.clear();
  });

  it('should remove correct element from resizeMap', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('select');
    const node3 = document.createElement('div');
    const callback1 = () => {};
    const callback2 = () => {};
    const callback3 = () => {};

    observeResize(node1, callback1);
    observeResize(node2, callback2);
    observeResize(node3, callback3);
    expect(resizeMap.size).toBe(3);

    unobserveResize(node1);
    expect(resizeMap.size).toBe(2);
    expect(resizeMap.get(node1)).toEqual(undefined);
    expect(resizeMap.get(node2)).toEqual(callback2);
    expect(resizeMap.get(node3)).toEqual(callback3);

    unobserveResize(node3);
    expect(resizeMap.size).toBe(1);
    expect(resizeMap.get(node1)).toEqual(undefined);
    expect(resizeMap.get(node2)).toEqual(callback2);
    expect(resizeMap.get(node3)).toEqual(undefined);
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

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
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
