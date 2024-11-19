import { getSegmentedControlItemAriaAttributes, getIconColor } from './segmented-control-item-utils';
import type { IconColor } from '../../icon/icon-utils';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getSegmentedControlItemAriaAttributes>>([
    [false, false, { 'aria-label': 'Some label' }],
    [true, true],
    [true, false, { 'aria-label': 'Some label' }],
    [false, true],
  ])('should return correct css for isSelected: %s and isDisabled: %s', (...args) => {
    expect(getSegmentedControlItemAriaAttributes(...args)).toMatchSnapshot();
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
