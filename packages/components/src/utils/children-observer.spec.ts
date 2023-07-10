import { observeChildren, unobserveChildren, observedNodesMap } from './children-observer';

describe('observeChildren()', () => {
  beforeEach(() => {
    observedNodesMap.clear();
  });

  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('should add callback and key to childrenMutationMap', () => {
    const node = document.createElement('input');
    const callback = () => {};

    observeChildren(node, callback);
    expect(observedNodesMap.size).toBe(1);
    expect(observedNodesMap.get(node)).toEqual(callback);
  });

  describe('on children change', () => {
    it('should run callback once when observeChildren is reapplied', async () => {
      const div = document.createElement('div');
      const cb = jest.fn();

      observeChildren(div, cb);
      expect(observedNodesMap.size).toBe(1);

      unobserveChildren(div);
      expect(observedNodesMap.size).toBe(0);

      observeChildren(div, cb);
      expect(observedNodesMap.size).toBe(1);

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

    it('should run all callbacks of observing parents when nested child node changes', async () => {
      const parent = document.createElement('div');
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      parent.appendChild(child1);
      parent.appendChild(child2);

      const subParent = document.createElement('div');
      const subChild1 = document.createElement('div');
      subParent.appendChild(subChild1);
      child2.append(subParent);

      const cb1 = jest.fn();
      const cb2 = jest.fn();

      observeChildren(parent, cb1);
      observeChildren(subParent, cb2);

      subParent.appendChild(document.createElement('span'));

      await tick();
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).toBeCalledTimes(1);
    });
  });
});

describe('unobserveChildren()', () => {
  beforeEach(() => {
    observedNodesMap.clear();
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
    expect(observedNodesMap.size).toBe(3);

    unobserveChildren(node1);
    expect(observedNodesMap.size).toBe(2);
    expect(observedNodesMap.get(node1)).toEqual(undefined);
    expect(observedNodesMap.get(node2)).toEqual(callback2);
    expect(observedNodesMap.get(node3)).toEqual(callback3);

    unobserveChildren(node3);
    expect(observedNodesMap.size).toBe(1);
    expect(observedNodesMap.get(node1)).toEqual(undefined);
    expect(observedNodesMap.get(node2)).toEqual(callback2);
    expect(observedNodesMap.get(node3)).toEqual(undefined);
  });
});
