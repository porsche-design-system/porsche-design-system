import { updateOptionsDisabled } from './optgroup-utils';
import { expect } from '@jest/globals';

describe('updateOptionsDisabled()', () => {
  it('should update disabled attribute of each option to initial option value', () => {
    const host = document.createElement('p-optgroup');

    const children = [true, false].map((disabled) => {
      const child: HTMLPSelectOptionElement = document.createElement('p-select-option');
      child.disabled = disabled;
      return child;
    });

    children.forEach((child) => {
      host.append(child);
    });

    updateOptionsDisabled(host, true);

    expect(
      Array.from(host.children)
        .map((child: HTMLPMultiSelectOptionElement) => child.disabled)
        .every(Boolean)
    ).toBe(true);
  });

  it('should update disabled attribute of each option to initial option value', () => {
    const host = document.createElement('p-optgroup');

    const initialState = [true, false];

    const children = initialState.map((disabled) => {
      const child: HTMLPSelectOptionElement = document.createElement('p-select-option');
      child.disabled = disabled;
      return child;
    });

    children.forEach((child) => {
      host.append(child);
    });

    updateOptionsDisabled(host, false);

    expect(Array.from(host.children).map((child: HTMLPMultiSelectOptionElement) => child.disabled)).toEqual(
      initialState
    );
  });
});
