import {
  getContentHeight,
  observeResize,
  resizeMap,
  setCollapsibleElementHeight,
  unobserveResize,
  warnIfCompactAndSizeIsSet,
} from './accordion-utils';

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
      Object.defineProperty(node, 'offsetHeight', { writable: true, configurable: true, value: 20 });
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
