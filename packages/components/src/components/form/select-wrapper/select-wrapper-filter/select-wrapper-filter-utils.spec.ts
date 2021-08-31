import { getAriaAttributes } from './select-wrapper-filter-utils';

describe('getAriaAttributes()', () => {
  it.each<[boolean, string, number]>([
    [false, 'dropdown-id', 1],
    [true, 'dropdown-id', 1],
  ])(
    'should return correct aria attributes for isOpen: %o, dropdownId: %o and activeDescendantId: %o',
    (isOpen, dropdownId, activeDescendantId) => {
      expect(getAriaAttributes(isOpen, dropdownId, activeDescendantId)).toMatchSnapshot();
    }
  );
});
