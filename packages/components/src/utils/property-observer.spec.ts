import { observeProperties } from './property-observer';

describe('observeProperties()', () => {
  const callback = jest.fn();

  it('should define getter and setter for single prop', () => {
    const node = document.createElement('input');
    observeProperties(node, ['checked'], callback);

    const spyGet = jest.spyOn(node, 'checked', 'get').mockReturnValueOnce(false);
    const spySet = jest.spyOn(node, 'checked', 'set');

    expect(spyGet).not.toBeCalled();
    expect(spySet).not.toBeCalled();

    expect(node.checked).toBe(false);
    expect(spyGet).toBeCalledTimes(1);

    node.checked = true;
    expect(spySet).toBeCalledTimes(1);

    expect(node.checked).toBe(true);
    expect(spyGet).toBeCalledTimes(2);
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

    expect(spyCheckedGet).not.toBeCalled();
    expect(spyDisabledGet).not.toBeCalled();
    expect(spyIndeterminateGet).not.toBeCalled();

    node.checked = true;
    node.disabled = true;
    node.indeterminate = true;

    expect(spyCheckedSet).toBeCalledTimes(1);
    expect(spyDisabledSet).toBeCalledTimes(1);
    expect(spyIndeterminateSet).toBeCalledTimes(1);

    expect(node.checked).toBe(true);
    expect(node.disabled).toBe(true);
    expect(node.indeterminate).toBe(true);

    expect(spyCheckedGet).toBeCalledTimes(1);
    expect(spyDisabledGet).toBeCalledTimes(1);
    expect(spyIndeterminateGet).toBeCalledTimes(1);
  });

  it('should execute callback via setter', () => {
    const node = document.createElement('input');
    observeProperties(node, ['checked'], callback);

    expect(callback).not.toBeCalled();
    node.checked = true;
    expect(callback).toBeCalledTimes(1);
  });
});
