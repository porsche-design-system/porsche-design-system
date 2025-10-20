import { vi } from 'vitest';
import { observeProperties } from './property-observer';

describe('observeProperties()', () => {
  const callback = vi.fn();

  it('should define getter and setter for single prop', () => {
    const node = document.createElement('input');
    observeProperties(node, ['checked'], callback);

    const spyGet = vi.spyOn(node, 'checked', 'get').mockReturnValueOnce(false);
    const spySet = vi.spyOn(node, 'checked', 'set');

    expect(spyGet).not.toHaveBeenCalled();
    expect(spySet).not.toHaveBeenCalled();

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

    const spyCheckedGet = vi.spyOn(node, 'checked', 'get');
    const spyCheckedSet = vi.spyOn(node, 'checked', 'set');
    const spyDisabledGet = vi.spyOn(node, 'disabled', 'get');
    const spyDisabledSet = vi.spyOn(node, 'disabled', 'set');
    const spyIndeterminateGet = vi.spyOn(node, 'indeterminate', 'get');
    const spyIndeterminateSet = vi.spyOn(node, 'indeterminate', 'set');

    expect(spyCheckedGet).not.toHaveBeenCalled();
    expect(spyDisabledGet).not.toHaveBeenCalled();
    expect(spyIndeterminateGet).not.toHaveBeenCalled();

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

    expect(callback).not.toHaveBeenCalled();
    node.checked = true;
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
