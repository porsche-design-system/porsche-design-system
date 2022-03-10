import { observeAttributes, unobserveAttributes, attributeMutationMap } from './attribute-observer';

describe('observeAttributes()', () => {
  beforeEach(() => {
    attributeMutationMap.clear();
  });

  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('should add callback and key to attributeMutationMap', () => {
    const node = document.createElement('input');
    const callback = () => {};

    observeAttributes(node, ['checked'], callback);
    expect(attributeMutationMap.size).toBe(1);
    expect(attributeMutationMap.get(node)).toEqual(callback);
  });

  describe('on attribute change', () => {
    it('should run callback once when observeAttributes is reapplied', async () => {
      const input = document.createElement('input');
      const cb = jest.fn();

      observeAttributes(input, ['disabled'], cb);
      expect(attributeMutationMap.size).toBe(1);

      unobserveAttributes(input);
      expect(attributeMutationMap.size).toBe(0);

      observeAttributes(input, ['disabled'], cb);
      expect(attributeMutationMap.size).toBe(1);

      input.setAttribute('disabled', '');

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when observeAttributes is called multiple times', async () => {
      const input = document.createElement('input');
      const cb = jest.fn();

      observeAttributes(input, ['disabled'], cb);
      observeAttributes(input, ['disabled'], cb);
      observeAttributes(input, ['disabled'], cb);

      input.setAttribute('disabled', '');

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when multiple elements are observed', async () => {
      const input1 = document.createElement('input');
      const input2 = document.createElement('input');

      const cb1 = jest.fn();
      const cb2 = jest.fn();

      observeAttributes(input1, ['disabled'], cb1);
      observeAttributes(input2, ['disabled'], cb2);

      input1.setAttribute('disabled', '');

      await tick();
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).not.toBeCalled();
    });

    it('should run callback once when multiple attributes are changed', async () => {
      const input = document.createElement('input');
      const cb = jest.fn();
      const name = 'Some name';

      observeAttributes(input, ['disabled', 'checked', 'name'], cb);

      input.setAttribute('disabled', '');
      input.setAttribute('checked', '');
      input.setAttribute('name', name);

      await tick();
      expect(cb).toBeCalledTimes(1);
    });
  });
});

describe('unobserveAttributes()', () => {
  beforeEach(() => {
    attributeMutationMap.clear();
  });

  it('should remove correct element from attributeMutationMap', () => {
    const node1 = document.createElement('input');
    const node2 = document.createElement('select');
    const node3 = document.createElement('input');
    const callback1 = () => {};
    const callback2 = () => {};
    const callback3 = () => {};

    observeAttributes(node1, ['checked'], callback1);
    observeAttributes(node2, ['disabled'], callback2);
    observeAttributes(node3, ['checked'], callback3);
    expect(attributeMutationMap.size).toBe(3);

    unobserveAttributes(node1);
    expect(attributeMutationMap.size).toBe(2);
    expect(attributeMutationMap.get(node1)).toEqual(undefined);
    expect(attributeMutationMap.get(node2)).toEqual(callback2);
    expect(attributeMutationMap.get(node3)).toEqual(callback3);

    unobserveAttributes(node3);
    expect(attributeMutationMap.size).toBe(1);
    expect(attributeMutationMap.get(node1)).toEqual(undefined);
    expect(attributeMutationMap.get(node2)).toEqual(callback2);
    expect(attributeMutationMap.get(node3)).toEqual(undefined);
  });
});
