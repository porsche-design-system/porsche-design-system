import { observeMutations, unobserveMutations, mutationMap } from '../../../src/utils';

describe('observeMutations()', () => {
  beforeEach(() => {
    mutationMap.clear();
  });

  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('should add callback and key to mutationMap', () => {
    const node = document.createElement('input');
    const callback = () => {};

    observeMutations(node, ['checked'], callback);
    expect(mutationMap.size).toBe(1);
    expect(mutationMap.get(node)).toEqual(callback);
  });

  describe('on attribute change', () => {
    it('should run callback once when observeMutations is reapplied', async () => {
      const input = document.createElement('input');

      const cb = jest.fn();

      observeMutations(input, ['disabled'], cb);
      unobserveMutations(input);
      observeMutations(input, ['disabled'], cb);

      input.setAttribute('disabled', '');

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when observeMutations is called multiple times', async () => {
      const input = document.createElement('input');

      const cb = jest.fn();

      observeMutations(input, ['disabled'], cb);
      observeMutations(input, ['disabled'], cb);
      observeMutations(input, ['disabled'], cb);

      input.setAttribute('disabled', '');

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when multiple inputs are observed', async () => {
      const input1 = document.createElement('input');
      const input2 = document.createElement('input');

      const cb1 = jest.fn();
      const cb2 = jest.fn();

      observeMutations(input1, ['disabled'], cb1);
      observeMutations(input2, ['disabled'], cb2);

      input1.setAttribute('disabled', '');

      await tick();
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).toBeCalledTimes(0);
    });

    it('should run callback once when multiple attributes are changed', async () => {
      const input = document.createElement('input');
      const cb = jest.fn();
      const name = 'Some name';

      observeMutations(input, ['disabled', 'checked', 'name'], cb);

      input.setAttribute('disabled', '');
      input.setAttribute('checked', '');
      input.setAttribute('name', name);

      await tick();
      expect(cb).toBeCalledTimes(1);
    });
  });

  it('should not execute callback when mutationMap is cleared', async () => {
    const input = document.createElement('input');
    const cb = jest.fn();

    observeMutations(input, ['disabled'], cb);
    mutationMap.clear();

    input.setAttribute('disabled', '');
    await tick();

    expect(cb).toBeCalledTimes(0);
  });
});

describe('unobserveMutations()', () => {
  beforeEach(() => {
    mutationMap.clear();
  });

  it('should remove correct element from mutationCallbacks array', () => {
    const node1 = document.createElement('input');
    const node2 = document.createElement('select');
    const node3 = document.createElement('input');
    const callback1 = () => {};
    const callback2 = () => {};
    const callback3 = () => {};

    observeMutations(node1, ['checked'], callback1);
    observeMutations(node2, ['disabled'], callback2);
    observeMutations(node3, ['checked'], callback3);
    expect(mutationMap.size).toBe(3);

    unobserveMutations(node1);
    expect(mutationMap.size).toBe(2);
    expect(mutationMap.get(node2)).toEqual(callback2);
    expect(mutationMap.get(node3)).toEqual(callback3);

    unobserveMutations(node3);
    expect(mutationMap.size).toBe(1);
    expect(mutationMap.get(node2)).toEqual(callback2);
  });
});
