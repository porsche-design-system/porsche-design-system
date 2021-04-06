import {
  observeChangeEvent,
  observeProperties,
  observeMutations,
  unobserveMutations,
  mutationMap,
  initAttributePropChangeListener,
} from '../../../src/utils';
import * as domUtils from '../../../src/utils/dom';
import * as attributePropChangeListenerUtils from '../../../src/utils/attribute-prop-change-listener';

describe('initAttributePropChangeListener()', () => {
  beforeEach(() => {
    mutationMap.clear();
  });

  it('should call observeChangeEvent, observeProperties and observerMutations', () => {
    const spy1 = jest.spyOn(attributePropChangeListenerUtils, 'observeChangeEvent');
    const spy2 = jest.spyOn(attributePropChangeListenerUtils, 'observeProperties');
    const spy3 = jest.spyOn(attributePropChangeListenerUtils, 'observeMutations');

    const host = document.createElement('div');
    const node = document.createElement('input');
    initAttributePropChangeListener(host, node, ['checked']);

    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);
    expect(spy3).toHaveBeenCalledTimes(1);
  });
});

describe('observeChangeEvent()', () => {
  // TODO: enable once debugging code is removed
  xit('should call addEventListener with correct parameters', () => {
    const spy = jest.spyOn(domUtils, 'addEventListener');
    const node = document.createElement('input');
    const callback = () => {};

    observeChangeEvent(node, callback);
    expect(spy).toHaveBeenCalledWith(node, 'change', callback);
  });
});

describe('observeProperties()', () => {
  const callback = jest.fn();

  it('should define getter and setter for single prop', () => {
    const node = document.createElement('input');
    observeProperties(node, ['checked'], callback);

    const spyGet = jest.spyOn(node, 'checked', 'get').mockReturnValueOnce(false);
    const spySet = jest.spyOn(node, 'checked', 'set');

    expect(spyGet).toHaveBeenCalledTimes(0);
    expect(spySet).toHaveBeenCalledTimes(0);

    expect(node.checked).toBe(false);
    expect(spyGet).toHaveBeenCalledTimes(1);

    node.checked = true;
    expect(spySet).toHaveBeenCalledTimes(1);

    expect(node.checked).toBe(true);
    expect(spyGet).toHaveBeenCalledTimes(2);
  });

  it('should define getter and setter for multiple props', () => {
    const node = document.createElement('input');
    observeProperties(node, ['checked', 'disabled', 'indeterminate'], callback);

    const spyCheckedGet = jest.spyOn(node, 'checked', 'get');
    const spyCheckedSet = jest.spyOn(node, 'checked', 'set');
    const spyDisabledGet = jest.spyOn(node, 'disabled', 'get');
    const spyDisabledSet = jest.spyOn(node, 'disabled', 'set');
    const spyIndeterminateGet = jest.spyOn(node, 'indeterminate', 'get');
    const spyIndeterminateSet = jest.spyOn(node, 'indeterminate', 'set');

    expect(spyCheckedGet).toHaveBeenCalledTimes(0);
    expect(spyDisabledGet).toHaveBeenCalledTimes(0);
    expect(spyIndeterminateGet).toHaveBeenCalledTimes(0);

    node.checked = true;
    node.disabled = true;
    node.indeterminate = true;

    expect(spyCheckedSet).toHaveBeenCalledTimes(1);
    expect(spyDisabledSet).toHaveBeenCalledTimes(1);
    expect(spyIndeterminateSet).toHaveBeenCalledTimes(1);

    expect(node.checked).toBe(true);
    expect(node.disabled).toBe(true);
    expect(node.indeterminate).toBe(true);

    expect(spyCheckedGet).toHaveBeenCalledTimes(1);
    expect(spyDisabledGet).toHaveBeenCalledTimes(1);
    expect(spyIndeterminateGet).toHaveBeenCalledTimes(1);
  });

  it('should execute callback via setter', () => {
    const node = document.createElement('input');
    observeProperties(node, ['checked'], callback);

    expect(callback).toHaveBeenCalledTimes(0);
    node.checked = true;
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute _valueTracker.setValue() if it exists', () => {
    const setValue = jest.fn();
    const node = document.createElement('input');
    (node as any)._valueTracker = { setValue };
    observeProperties(node, ['checked'], callback);

    expect(setValue).toHaveBeenCalledTimes(0);
    node.checked = true;
    expect(setValue).toHaveBeenCalledTimes(1);
  });
});

describe('observeMutations()', () => {
  beforeEach(() => {
    mutationMap.clear();
  });

  it('should add node and callback to mutationCallbacks array', () => {
    const node = document.createElement('input');
    const callback = () => {};

    observeMutations(node, ['checked'], callback);
    expect(mutationMap.size).toBe(1);
    expect(mutationMap.get(node)).toEqual(callback);
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
