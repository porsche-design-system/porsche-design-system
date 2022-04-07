import { getThemedBackgroundColor } from './tags-style-utils';
import { getThemedColors } from '../../../../styles';

describe('getThemedBackgroundColor()', () => {
  const themedColorsLight = getThemedColors('light');
  const themedColorsDark = getThemedColors('dark');

  it.each<Parameters<typeof getThemedBackgroundColor>>([
    ['default', themedColorsLight],
    ['neutral-contrast-high', themedColorsLight],
    ['notification-success', themedColorsLight],
    ['notification-warning', themedColorsLight],
    ['notification-error', themedColorsLight],
    ['notification-neutral', themedColorsLight],
    ['background-surface', themedColorsLight],
    ['default', themedColorsDark],
    ['neutral-contrast-high', themedColorsDark],
    ['notification-success', themedColorsDark],
    ['notification-warning', themedColorsDark],
    ['notification-error', themedColorsDark],
    ['notification-neutral', themedColorsDark],
    ['background-surface', themedColorsDark],
  ])('should return correct css for color: %s, isFocusable: %s and theme: %s', (...args) => {
    expect(getThemedBackgroundColor(...args)).toMatchSnapshot();
  });
});
