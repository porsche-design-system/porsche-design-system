import { updateOptionsDisabled } from './optgroup-utils';
import { expect } from '@jest/globals';
import type { TagName } from '@porsche-design-system/shared';

const tagNameWithBooleanCombinations: [TagName, boolean][] = [
  ['p-select-option', false],
  ['p-multi-select-option', false],
  ['p-select-option', true],
  ['p-multi-select-option', true],
];

describe('updateOptionsDisabled()', () => {
  it.each<[TagName, boolean]>(tagNameWithBooleanCombinations)(
    'should update disabled attribute of each option: %s with value: %s',
    (tagName, newDisabledValue) => {
      const host = document.createElement('p-optgroup');

      const children: (HTMLPMultiSelectOptionElement | HTMLPSelectOptionElement)[] = Array(3).fill(
        document.createElement(tagName)
      );

      children.forEach((child) => {
        child.disabled = !newDisabledValue;
        host.append(child);
      });

      updateOptionsDisabled(host, newDisabledValue);

      expect(
        Array.from(host.children)
          .map((child: HTMLPMultiSelectOptionElement | HTMLPSelectOptionElement) => child.disabled)
          .every(Boolean)
      ).toBe(newDisabledValue);
    }
  );
});
