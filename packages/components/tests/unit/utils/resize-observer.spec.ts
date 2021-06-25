import { observeResize, unobserveResize, resizeMap } from '../../../src/utils';

describe('observeResize()', () => {
  beforeEach(() => {
    resizeMap.clear();
  });

  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('should add callback and key to resizeMap', () => {
    const node = document.createElement('input');
    const callback = () => {};

    observeResize(node, callback);
    expect(resizeMap.size).toBe(1);
    expect(resizeMap.get(node)).toEqual(callback);
  });

  describe('on attribute change', () => {
    it('should run callback once when observeResize is reapplied', async () => {
      const input = document.createElement('input');

      const cb = jest.fn();

      observeResize(input, cb);
      unobserveResize(input);
      observeResize(input, cb);

      input.setAttribute('disabled', '');

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when observeResize is called multiple times', async () => {
      const input = document.createElement('input');

      const cb = jest.fn();

      observeResize(input, cb);
      observeResize(input, cb);
      observeResize(input, cb);

      input.style.height = '20px';

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when multiple inputs are observed', async () => {
      const input1 = document.createElement('input');
      const input2 = document.createElement('input');

      const cb1 = jest.fn();
      const cb2 = jest.fn();

      observeResize(input1, cb1);
      observeResize(input2, cb2);

      input1.style.height = '20px';

      await tick();
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).toBeCalledTimes(0);
    });

    it('should run callback once when multiple attributes are changed', async () => {
      const input = document.createElement('input');
      const cb = jest.fn();

      observeResize(input, cb);

      input.style.height = '20px';
      input.style.height = '30px';
      input.style.height = '0px';

      await tick();
      expect(cb).toBeCalledTimes(1);
    });
    it('should pass ResizeObserverEntry to callback');
  });

  it('should not execute callback when resizeMap is cleared', async () => {
    const input = document.createElement('input');
    const cb = jest.fn();

    observeResize(input, cb);
    resizeMap.clear();

    input.style.height = '30px';
    await tick();

    expect(cb).toBeCalledTimes(0);
  });
});

describe('unobserveResize()', () => {
  beforeEach(() => {
    resizeMap.clear();
  });

  it('should remove correct element from resizeCallbacks array', () => {
    const node1 = document.createElement('input');
    const node2 = document.createElement('select');
    const node3 = document.createElement('input');
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
