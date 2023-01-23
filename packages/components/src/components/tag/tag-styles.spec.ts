import * as colorsUtils from '../../styles/colors';
import * as tagUtils from './tag-utils';
import * as isThemeDarkUtils from '../../utils/theme/isThemeDark';
import * as tagSharedUtils from './tag-shared-utils';
import { getColors, getComponentCss } from './tag-styles';
import { getThemedBackgroundColor } from './tag-shared-utils';
import { getThemedColors } from '../../styles/colors';
import type { Theme } from '../../types';
import type { TagColor } from './tag-utils';

describe('getThemedBackgroundColor()', () => {
  it.each<[TagColor, Theme]>([
    ['background-default', 'light'],
    ['neutral-contrast-high', 'light'],
    ['notification-success', 'light'],
    ['notification-warning', 'light'],
    ['notification-error', 'light'],
    ['notification-information', 'light'],
    ['background-surface', 'light'],
    ['background-default', 'dark'],
    ['neutral-contrast-high', 'dark'],
    ['notification-success', 'dark'],
    ['notification-warning', 'dark'],
    ['notification-error', 'dark'],
    ['notification-information', 'dark'],
    ['background-surface', 'dark'],
  ])('should return correct backgroundColor for color: %s, theme: %s', (color, theme) => {
    const themedColors = getThemedColors(theme);
    expect(getThemedBackgroundColor(color, themedColors)).toMatchSnapshot();
  });
});

describe('getColors()', () => {
  it('should call hasInvertedThemeColor(), getThemedColors() and getThemedBackgroundColor() with correct parameters', () => {
    const themedColors = getThemedColors('light');
    const hasInvertedThemeColorSpy = jest.spyOn(tagUtils, 'hasInvertedThemeColor');
    const getThemedBackgroundColorSpy = jest.spyOn(tagSharedUtils, 'getThemedBackgroundColor');

    getColors('background-surface', 'light', themedColors);

    expect(hasInvertedThemeColorSpy).toBeCalledWith('background-surface', 'light');
    expect(getThemedBackgroundColorSpy).toBeCalledWith('background-surface', getThemedColors('light'));
  });

  it('should call hasInvertedThemeColor(), isThemeDark() and getThemedColors() with correct parameters', () => {
    const getThemedColorsSpy = jest.spyOn(colorsUtils, 'getThemedColors');
    const isThemeDarkSpy = jest.spyOn(isThemeDarkUtils, 'isThemeDark');
    const themedColors = getThemedColors('light');

    jest.spyOn(tagUtils, 'hasInvertedThemeColor').mockReturnValue(true);
    getColors('background-surface', 'light', themedColors);

    expect(getThemedColorsSpy).toBeCalledWith('dark');
    expect(isThemeDarkSpy).toBeCalledWith('light');
  });

  it.each<[theme: Theme, hasInvertedTheme: boolean]>([
    ['light', true],
    ['light', false],
    ['dark', true],
    ['dark', false],
  ])('should return correct css for theme: %s and hasInvertedTheme: %s', (theme, hasInvertedTheme) => {
    jest.spyOn(tagUtils, 'hasInvertedThemeColor').mockReturnValue(hasInvertedTheme);
    const themedColors = getThemedColors(theme);
    expect(getColors('background-surface', theme, themedColors)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-default', true, 'light'],
    ['background-default', false, 'light'],
    ['neutral-contrast-high', true, 'light'],
    ['notification-success', true, 'light'],
    ['notification-warning', true, 'light'],
    ['notification-error', true, 'light'],
    ['notification-information', true, 'light'],
    ['background-surface', true, 'light'],
    ['background-default', true, 'dark'],
    ['background-default', false, 'dark'],
    ['neutral-contrast-high', true, 'dark'],
    ['notification-success', true, 'dark'],
    ['notification-warning', true, 'dark'],
    ['notification-error', true, 'dark'],
    ['notification-information', true, 'dark'],
    ['background-surface', true, 'dark'],
  ])('should return correct css for color: %s, isFocusable: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
