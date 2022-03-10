import { observeChildren, unobserveChildren, childrenMutationMap } from './children-observer';

describe('observeChildren()', () => {
  beforeEach(() => {
    childrenMutationMap.clear();
  });

  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('should add callback and key to childrenMutationMap', () => {
    const node = document.createElement('input');
    const callback = () => {};

    observeChildren(node, callback);
    expect(childrenMutationMap.size).toBe(1);
    expect(childrenMutationMap.get(node)).toEqual(callback);
  });

  describe('on children change', () => {
    it('should run callback once when observeChildren is reapplied', async () => {
      const div = document.createElement('div');
      const cb = jest.fn();

      observeChildren(div, cb);
      expect(childrenMutationMap.size).toBe(1);

      unobserveChildren(div);
      expect(childrenMutationMap.size).toBe(0);

      observeChildren(div, cb);
      expect(childrenMutationMap.size).toBe(1);

      div.appendChild(document.createElement('span'));

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when observeChildren is called multiple times', async () => {
      const div = document.createElement('div');
      const cb = jest.fn();

      observeChildren(div, cb);
      observeChildren(div, cb);
      observeChildren(div, cb);

      div.appendChild(document.createElement('span'));

      await tick();
      expect(cb).toBeCalledTimes(1);
    });

    it('should run callback once when multiple elements are observed', async () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');

      const cb1 = jest.fn();
      const cb2 = jest.fn();

      observeChildren(div1, cb1);
      observeChildren(div2, cb2);

      div1.appendChild(document.createElement('span'));

      await tick();
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).not.toBeCalled();
    });

    it('should run callback once when multiple attributes are changed', async () => {
      const input = document.createElement('input');
      const cb = jest.fn();
      const name = 'Some name';

      observeChildren(input, cb, ['disabled', 'checked', 'name']);

      input.setAttribute('disabled', '');
      input.setAttribute('checked', '');
      input.setAttribute('name', name);

      await tick();
      expect(cb).toBeCalledTimes(1);
    });
  });
});

describe('unobserveChildren()', () => {
  beforeEach(() => {
    childrenMutationMap.clear();
  });

  it('should remove correct element from childrenMutationMap', () => {
    const node1 = document.createElement('input');
    const node2 = document.createElement('select');
    const node3 = document.createElement('input');
    const callback1 = () => {};
    const callback2 = () => {};
    const callback3 = () => {};

    observeChildren(node1, callback1);
    observeChildren(node2, callback2);
    observeChildren(node3, callback3);
    expect(childrenMutationMap.size).toBe(3);

    unobserveChildren(node1);
    expect(childrenMutationMap.size).toBe(2);
    expect(childrenMutationMap.get(node1)).toEqual(undefined);
    expect(childrenMutationMap.get(node2)).toEqual(callback2);
    expect(childrenMutationMap.get(node3)).toEqual(callback3);

    unobserveChildren(node3);
    expect(childrenMutationMap.size).toBe(1);
    expect(childrenMutationMap.get(node1)).toEqual(undefined);
    expect(childrenMutationMap.get(node2)).toEqual(callback2);
    expect(childrenMutationMap.get(node3)).toEqual(undefined);
  });
});
