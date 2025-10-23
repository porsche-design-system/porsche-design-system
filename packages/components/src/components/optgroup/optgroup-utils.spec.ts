import type { MultiSelectOption } from '../multi-select/multi-select/multi-select-utils';
import type { SelectOption } from '../select/select/select-utils';
import { updateOptionsDisabled } from './optgroup-utils';

describe('updateOptionsDisabled()', () => {
  it('should update disabledParent attribute of each option to disabled attribute of parent', () => {
    const host = document.createElement('p-optgroup');
    const disabledParent = true;

    const children = [true, false].map((disabled) => {
      const child: SelectOption = document.createElement('p-select-option');
      child.disabled = disabled;
      return child;
    });

    children.forEach((child) => {
      host.append(child);
    });

    updateOptionsDisabled(host, disabledParent);

    expect(
      Array.from(host.children)
        .map((child: MultiSelectOption) => child.disabledParent)
        .every(Boolean)
    ).toBe(disabledParent);
  });
});
