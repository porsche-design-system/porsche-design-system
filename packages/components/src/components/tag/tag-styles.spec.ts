import * as colorsUtils from '../../styles/colors';
import * as tagUtils from './tag-utils';
import * as isThemeDarkUtils from '../../utils/theme/isThemeDark';
import * as tagSharedUtils from './tag-shared-utils';
import { getColors, getComponentCss } from './tag-styles';
import { getThemedColors } from '../../styles/colors';
import type { Theme } from '../../types';

describe('getColors()', () => {
  it('should call hasInvertedThemeColor(), getThemedColors() and getThemedBackgroundColor() with correct parameters', () => {
    const themedColors = getThemedColors('light');
    const hasInvertedThemeColorSpy = jest.spyOn(tagUtils, 'hasInvertedThemeColor');
    const getThemedBackgroundColorSpy = jest.spyOn(tagSharedUtils, 'getThemedBackgroundColor');

    getColors(themedColors, 'background-surface', 'light');

    expect(hasInvertedThemeColorSpy).toBeCalledWith('background-surface', 'light');
    expect(getThemedBackgroundColorSpy).toBeCalledWith('background-surface', getThemedColors('light'));
  });

  it('should call hasInvertedThemeColor(), isThemeDark() and getThemedColors() with correct parameters', () => {
    const getThemedColorsSpy = jest.spyOn(colorsUtils, 'getThemedColors');
    const isThemeDarkSpy = jest.spyOn(isThemeDarkUtils, 'isThemeDark');
    const themedColors = getThemedColors('light');

    jest.spyOn(tagUtils, 'hasInvertedThemeColor').mockReturnValue(true);
    getColors(themedColors, 'background-surface', 'light');

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
    expect(getColors(themedColors, 'background-surface', theme)).toMatchSnapshot();
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
    ['notification-neutral', true, 'light'], // 'notification-neutral' is deprecated (replaced with 'notification-information')
    ['notification-information', true, 'light'],
    ['background-surface', true, 'light'],
    ['background-default', true, 'dark'],
    ['background-default', false, 'dark'],
    ['neutral-contrast-high', true, 'dark'],
    ['notification-success', true, 'dark'],
    ['notification-warning', true, 'dark'],
    ['notification-error', true, 'dark'],
    ['notification-neutral', true, 'dark'], // 'notification-neutral' is deprecated (replaced with 'notification-information')
    ['notification-information', true, 'dark'],
    ['background-surface', true, 'dark'],
  ])('should return correct css for color: %s, isFocusable: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
