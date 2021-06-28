import { observeResize, unobserveResize, resizeMap } from '../../../src/utils/resize-observer';

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
    const getNode = (): HTMLDivElement => {
      const node = document.createElement('div');
      Object.defineProperty(node, 'offsetHeight', { writable: true, configurable: true, value: 20 });
      document.body.appendChild(node);
      return node;
    };

    it('should run callback once when observeResize is reapplied', async () => {
      const node = getNode();
      const cb = jest.fn();

      observeResize(node, cb);
      unobserveResize(node);
      observeResize(node, cb);

      node.style.height = '20px';

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when observeResize is called multiple times', async () => {
      const node = getNode();

      const cb = jest.fn();

      observeResize(node, cb);
      observeResize(node, cb);
      observeResize(node, cb);

      node.style.height = '20px';

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when multiple divs are observed', async () => {
      const node1 = getNode();
      const node2 = getNode();

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
      const node = getNode();
      let tempResizeEntry;

      const cb = jest.fn((resizeEntry: ResizeObserverEntry) => (tempResizeEntry = resizeEntry));

      observeResize(node, cb);

      node.style.height = '20px';

      await tick();
      expect(cb).toHaveBeenCalledWith(tempResizeEntry);
    });
  });

  it('should not execute callback when resizeMap is cleared', async () => {
    const node = document.createElement('div');
    const cb = jest.fn();

    observeResize(node, cb);
    resizeMap.clear();

    node.style.height = '30px';
    await tick();

    expect(cb).toBeCalledTimes(0);
  });
});

describe('unobserveResize()', () => {
  beforeEach(() => {
    resizeMap.clear();
  });

  it('should remove correct element from resizeCallbacks array', () => {
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
    expect(resizeMap.get(node2)).toEqual(callback2);
    expect(resizeMap.get(node3)).toEqual(callback3);

    unobserveResize(node3);
    expect(resizeMap.size).toBe(1);
    expect(resizeMap.get(node2)).toEqual(callback2);
  });
});
