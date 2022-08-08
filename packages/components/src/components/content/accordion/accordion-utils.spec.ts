import {
  getContentHeight,
  observeResize,
  observeWindowResize,
  onWindowResize,
  registeredElements,
  resizeMap,
  setCollapsibleElementHeight,
  unobserveResize,
  unobserveWindowResize,
  useResizeObserverFallbackOverride,
  warnIfCompactAndSizeIsSet,
} from './accordion-utils';
import { Accordion } from './accordion';
import * as accordionUtils from './accordion-utils';
import * as childrenObserverUtils from '../../../utils/children-observer';

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
      expect(cb2).not.toBeCalled();
    });

    it('should pass ResizeObserverEntry to callback', async () => {
      const node = createResizeableNode();
      let tempResizeEntry;

      const cb = jest.fn((resizeEntry: ResizeObserverEntry) => (tempResizeEntry = resizeEntry));

      observeResize(node, cb);

      node.style.height = '20px';

      await tick();
      expect(cb).toBeCalledWith(tempResizeEntry);
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
    const host1 = document.createElement('p-accordion');
    const host2 = document.createElement('p-accordion');
    const component1 = new Accordion();
    const component2 = new Accordion();
    component1.host = host1;
    component2.host = host2;
    const mockCallback1 = jest.fn(() => {});
    const mockCallback2 = jest.fn(() => {});

    observeWindowResize(component1.host, mockCallback1);
    observeWindowResize(component2.host, mockCallback2);

    onWindowResize();

    expect(mockCallback1).toBeCalledTimes(1);
    expect(mockCallback2).toBeCalledTimes(1);
  });
});

describe('observeWindowResize()', () => {
  beforeEach(() => {
    registeredElements.clear();
  });

  it('should push accordion to registeredComponents', () => {
    const component = new Accordion();
    const mockCallback = jest.fn(() => {});
    observeWindowResize(component.host, mockCallback);

    expect(registeredElements.size).toBe(1);
  });

  it('should not push accordion to registeredComponents if it is a duplicate', () => {
    const component = new Accordion();
    const mockCallback = jest.fn(() => {});
    observeWindowResize(component.host, mockCallback);
    observeWindowResize(component.host, mockCallback);

    expect(registeredElements.size).toBe(1);
  });

  it('should add event listener', () => {
    const windowSpy = jest.spyOn(window, 'addEventListener');
    observeWindowResize(undefined, undefined);

    expect(windowSpy).toBeCalledWith('resize', expect.any(Function));
  });
});

describe('unobserveWindowResize()', () => {
  beforeEach(() => {
    registeredElements.clear();
  });

  it('should remove accordion from registeredComponents', () => {
    const component = new Accordion();
    const mockCallback = jest.fn(() => {});
    observeWindowResize(component.host, mockCallback);

    expect(registeredElements.size).toBe(1);

    unobserveWindowResize(component.host);

    expect(registeredElements.size).toBe(0);
  });

  it('should remove event listener if no registeredComponents are defined', () => {
    const windowSpy = jest.spyOn(window, 'removeEventListener');
    unobserveWindowResize(undefined);

    expect(windowSpy).toBeCalledWith('resize', expect.any(Function));
  });
});

describe('resizeObserverFallback', () => {
  it('should call observeWindowResize() and observeChildren()', () => {
    const accordionUtilsSpy = jest.spyOn(accordionUtils, 'observeWindowResize');
    const observeChildrenSpy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    useResizeObserverFallbackOverride(true);

    const component = new Accordion();
    component.host = document.createElement('p-accordion');

    component.connectedCallback();

    expect(accordionUtilsSpy).toBeCalledWith(component.host, component['setContentHeight']);
    expect(observeChildrenSpy).toBeCalledWith(component.host, expect.any(Function));
  });
});

describe('removeResizeObserverFallback()', () => {
  it('should call unobserveWindowResize() and unobserveChildren()', () => {
    const accordionUtilsSpy = jest.spyOn(accordionUtils, 'unobserveWindowResize');
    const observeChildrenSpy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

    useResizeObserverFallbackOverride(true);

    const component = new Accordion();
    component.host = document.createElement('p-accordion');
    component.disconnectedCallback();

    expect(accordionUtilsSpy).toBeCalledWith(component.host);
    expect(observeChildrenSpy).toBeCalledWith(component.host);
  });
});
