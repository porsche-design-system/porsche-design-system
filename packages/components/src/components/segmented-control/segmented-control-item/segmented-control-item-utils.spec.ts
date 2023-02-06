import { getButtonAttributes, getIconColor } from './segmented-control-item-utils';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonAttributes>>([
    [false, false],
    [true, true],
    [true, false],
    [false, true],
  ])('should return correct css for isSelected: %s and isDisabled: %s', (...args) => {
    expect(getButtonAttributes(...args)).toMatchSnapshot();
  });
});

describe('getIconColor()', () => {
  it.each<Parameters<typeof getIconColor>>([[false], [true]])(
    'should return correct icon color for isDisabled: %s',
    (...args) => {
      const expectedResult = args[0] ? 'contrast-medium' : 'primary';
      expect(getIconColor(...args)).toBe(expectedResult);
    }
  );
});
