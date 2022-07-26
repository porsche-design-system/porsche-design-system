import {
  observeResize,
  observeWindowResize,
  onWindowResize,
  registeredComponents,
  resizeMap,
  unobserveResize,
  unobserveWindowResize,
  useMutationObserverFallbackOverride,
} from './resize-observer';
import { Accordion } from '../components/content/accordion/accordion';
import * as childrenObserverUtils from './children-observer';
import * as resizeObserverUtils from './resize-observer';

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
    const component1 = new Accordion();
    const component2 = new Accordion();
    const mockCallback1 = jest.fn(() => {});
    const mockCallback2 = jest.fn(() => {});

    observeWindowResize(component1, mockCallback1);
    observeWindowResize(component2, mockCallback2);

    onWindowResize();

    expect(mockCallback1).toBeCalledTimes(1);
    expect(mockCallback2).toBeCalledTimes(1);
  });
});

describe('observeWindowResize()', () => {
  beforeEach(() => {
    registeredComponents.clear();
  });

  it('should push accordion to registeredComponents', () => {
    const component = new Accordion();
    const mockCallback = jest.fn(() => {});
    observeWindowResize(component, mockCallback);

    expect(registeredComponents.size).toBe(1);
  });

  it('should not push accordion to registeredComponents if it is a duplicate', () => {
    const component = new Accordion();
    const mockCallback = jest.fn(() => {});
    observeWindowResize(component, mockCallback);
    observeWindowResize(component, mockCallback);

    expect(registeredComponents.size).toBe(1);
  });

  it('should add event listener', () => {
    const windowSpy = jest.spyOn(window, 'addEventListener');
    observeWindowResize(undefined, undefined);

    expect(windowSpy).toBeCalledWith('resize', expect.anything());
  });
});

describe('unobserveWindowResize()', () => {
  beforeEach(() => {
    registeredComponents.clear();
  });

  it('should remove accordion from registeredComponents', () => {
    const component = new Accordion();
    const mockCallback = jest.fn(() => {});
    observeWindowResize(component, mockCallback);

    expect(registeredComponents.size).toBe(1);

    unobserveWindowResize(component);

    expect(registeredComponents.size).toBe(0);
  });

  it('should remove event listener if no registeredComponents are defined', () => {
    const windowSpy = jest.spyOn(window, 'removeEventListener');
    unobserveWindowResize(undefined);

    expect(windowSpy).toBeCalledWith('resize', expect.anything());
  });
});

describe('mutationObserverFallback', () => {
  it('should call observeWindowResize() and observeChildren()', () => {
    const resizeObserverUtilsSpy = jest.spyOn(resizeObserverUtils, 'observeWindowResize');
    const observeChildrenSpy = jest.spyOn(childrenObserverUtils, 'observeChildren');

    useMutationObserverFallbackOverride(true);

    const component = new Accordion();
    component.host = document.createElement('p-accordion');

    component.connectedCallback();

    expect(resizeObserverUtilsSpy).toBeCalledWith(component, component['setContentHeight']);
    expect(observeChildrenSpy).toBeCalledWith(component.host, expect.anything());
  });
});

describe('removeMutationObserverFallback()', () => {
  it('should call unobserveWindowResize() and unobserveChildren()', () => {
    const resizeObserverUtilsSpy = jest.spyOn(resizeObserverUtils, 'unobserveWindowResize');
    const observeChildrenSpy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

    useMutationObserverFallbackOverride(true);

    const component = new Accordion();
    component.host = document.createElement('p-accordion');
    component.disconnectedCallback();

    expect(resizeObserverUtilsSpy).toBeCalledWith(component);
    expect(observeChildrenSpy).toBeCalledWith(component.host);
  });
});
