import { getButtonAttributes, getIconColor } from './segmented-control-item-utils';
import { IconColor } from '../../icon/icon-utils';

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
  it.each<[Parameters<typeof getIconColor>, IconColor]>([
    [[false], 'primary'],
    [[true], 'contrast-medium'],
  ])('should return correct icon color for isDisabled: %s', (args, iconColor) => {
    expect(getIconColor(...args)).toBe(iconColor);
  });
});
