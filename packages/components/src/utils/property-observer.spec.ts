import { observeProperties } from './property-observer';

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
});
