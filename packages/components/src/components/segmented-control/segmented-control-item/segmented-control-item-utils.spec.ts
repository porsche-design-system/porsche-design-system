import type { IconColor } from '../../icon/icon-utils';
import { getIconColor, getSegmentedControlItemAriaAttributes } from './segmented-control-item-utils';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getSegmentedControlItemAriaAttributes>>([
    [false, false, 'none', 'Some message', { 'aria-label': 'Some label' }],
    [true, true, 'none', 'Some message'],
    [true, false, 'none', 'Some message', { 'aria-label': 'Some label' }],
    [false, true, 'none', 'Some message'],
    [true, false, 'success', 'Some success message'],
    [false, false, 'error', 'Some error message'],
  ])('should return correct aria attributes for isSelected: %s and isDisabled: %s', (...args) => {
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
